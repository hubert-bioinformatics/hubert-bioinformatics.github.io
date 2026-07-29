/**
 * 관리자 빌드 후처리.
 *
 * @astrojs/cloudflare 는 매 빌드마다 dist/server/wrangler.json 을 새로 만드는데,
 * SESSION KV 바인딩에 id 를 넣어주지 않아 그대로 배포하면 실패한다.
 * 여기서 실제 네임스페이스 id 를 채워 넣는다.
 *
 * KV 네임스페이스 id 는 비밀값이 아니라 식별자다 (접근에는 계정 인증이 별도로 필요).
 */
import fs from 'node:fs/promises';

const CONFIG = 'dist/server/wrangler.json';
const SESSION_KV_ID =
  process.env.SESSION_KV_ID ?? '900f38a4050648158f1041d90622f980';

const cfg = JSON.parse(await fs.readFile(CONFIG, 'utf8'));

cfg.kv_namespaces = (cfg.kv_namespaces ?? []).map((ns) =>
  ns.binding === 'SESSION' ? { ...ns, id: SESSION_KV_ID } : ns,
);
if (cfg.previews?.kv_namespaces) {
  cfg.previews.kv_namespaces = cfg.previews.kv_namespaces.map((ns) =>
    ns.binding === 'SESSION' ? { ...ns, id: SESSION_KV_ID } : ns,
  );
}

// nodejs_compat 이 없으면 Keystatic 이 쓰는 Node API 가 워커에서 동작하지 않는다
cfg.compatibility_flags = [...new Set([...(cfg.compatibility_flags ?? []), 'nodejs_compat'])];

await fs.writeFile(CONFIG, JSON.stringify(cfg, null, 2) + '\n', 'utf8');

console.log('wrangler.json 보정 완료');
console.log('  SESSION KV id     :', SESSION_KV_ID);
console.log('  compatibility_flags:', cfg.compatibility_flags.join(', '));
console.log('  main              :', cfg.main);
console.log('  assets.directory  :', cfg.assets?.directory);
