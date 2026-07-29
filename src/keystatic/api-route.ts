import type { APIRoute } from 'astro';
import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import keystaticConfig from '../../keystatic.config';

/**
 * Keystatic API 라우트 — @keystatic/astro 의 것을 대체한다.
 *
 * 왜 직접 만드나:
 *   @keystatic/astro@5.2.0 의 핸들러는 시크릿을 `context.locals.runtime.env` 로 읽는데,
 *   Astro 6 부터 그 자리에 "접근하면 예외를 던지는 getter" 가 들어갔다.
 *   미들웨어로 locals 를 바꿔치기해도 라우트까지 전달되지 않아 우회가 불가능했다.
 *
 * 그래서 코어 핸들러(makeGenericAPIRouteHandler)를 직접 호출하고,
 * 시크릿은 Astro 6+ 의 정식 경로인 `cloudflare:workers` 에서 읽는다.
 * 쿠키 분해 로직은 원본 구현을 그대로 옮겼다(Astro 의 cookies API 로 넘겨야 해서).
 *
 * 패키지가 고쳐지면 이 파일을 지우고 keystatic() 통합이 주입하는 라우트를 쓰면 된다.
 */

export const prerender = false;

type Secrets = {
  clientId?: string;
  clientSecret?: string;
  secret?: string;
};

let cached: Secrets | undefined;

async function readSecrets(): Promise<Secrets> {
  if (cached) return cached;

  let src: Record<string, unknown> = {};
  try {
    // Cloudflare Workers 런타임. node 어댑터(로컬)에서는 모듈이 없어 catch 로 빠진다.
    const mod = await import(/* @vite-ignore */ 'cloudflare:workers');
    src = (mod.env ?? {}) as Record<string, unknown>;
  } catch {
    src = {};
  }

  const pick = (k: string) =>
    (src[k] as string | undefined) ??
    (import.meta.env[k as keyof ImportMetaEnv] as string | undefined) ??
    (typeof process !== 'undefined' ? process.env?.[k] : undefined);

  cached = {
    clientId: pick('KEYSTATIC_GITHUB_CLIENT_ID'),
    clientSecret: pick('KEYSTATIC_GITHUB_CLIENT_SECRET'),
    secret: pick('KEYSTATIC_SECRET'),
  };
  return cached;
}

export const ALL: APIRoute = async (context) => {
  const { clientId, clientSecret, secret } = await readSecrets();

  const handler = makeGenericAPIRouteHandler(
    { config: keystaticConfig, clientId, clientSecret, secret },
    { slugEnvName: 'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG' },
  );

  const { body, headers, status } = await handler(context.request);

  // set-cookie 는 Astro 의 cookies API 로 넘겨야 여러 개가 제대로 나간다
  const out = new Map<string, string[]>();
  if (headers) {
    if (Array.isArray(headers)) {
      for (const [key, value] of headers) {
        const k = key.toLowerCase();
        if (!out.has(k)) out.set(k, []);
        out.get(k)!.push(value);
      }
    } else if ('getSetCookie' in headers && typeof headers.getSetCookie === 'function') {
      const sc = headers.getSetCookie();
      if (sc?.length) out.set('set-cookie', sc);
    } else {
      for (const [key, value] of Object.entries(headers)) {
        out.set(key.toLowerCase(), [value as string]);
      }
    }
  }

  const setCookies = out.get('set-cookie');
  out.delete('set-cookie');
  for (const raw of setCookies ?? []) {
    const { name, value, ...opts } = parseString(raw);
    const sameSite = opts.sameSite?.toLowerCase();
    context.cookies.set(name, value, {
      domain: opts.domain,
      expires: opts.expires,
      httpOnly: opts.httpOnly,
      maxAge: opts.maxAge,
      path: opts.path,
      sameSite:
        sameSite === 'lax' || sameSite === 'strict' || sameSite === 'none'
          ? sameSite
          : undefined,
    });
  }

  return new Response(body, {
    status,
    headers: [...out.entries()].flatMap(([k, vals]) => vals.map((v) => [k, v] as [string, string])),
  });
};
