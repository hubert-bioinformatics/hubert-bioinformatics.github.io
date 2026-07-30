/**
 * Claude Code CLI 헤드리스 호출 (Max 구독)
 *
 * Actions 에서는 못 쓴다 — claude-code-action 이 지원하는 인증은 API 키 /
 * Bedrock / Vertex / Foundry 뿐이고 구독 토큰 입력값이 없다. 이건 hubert님
 * 컴퓨터에서 `RADAR_LLM=claude` 로 돌릴 때만 쓰인다.
 *
 * 쓰기 전에 준비할 것:
 *   npm install -g @anthropic-ai/claude-code
 *   claude login
 *
 * 주의 두 가지:
 *   - ANTHROPIC_API_KEY 가 환경에 있으면 로그인 상태와 무관하게 API 키가
 *     우선해서 과금이 시작된다. 헤드리스(-p)에서는 확인 절차도 없다.
 *   - --bare 는 쓰면 안 된다. OAuth·키체인을 건너뛰어 구독 인증이 안 된다.
 */

import { spawn } from 'node:child_process';

function run(args, stdin) {
  return new Promise((resolve, reject) => {
    const child = spawn('claude', args, { stdio: ['pipe', 'pipe', 'pipe'] });
    let out = '';
    let err = '';

    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    child.on('error', (e) =>
      reject(new Error(e.code === 'ENOENT' ? 'claude 명령을 찾을 수 없다. npm i -g @anthropic-ai/claude-code' : e.message)),
    );
    child.on('close', (code) =>
      code === 0 ? resolve(out) : reject(new Error(`claude 종료 코드 ${code}: ${err.slice(0, 400)}`)),
    );

    child.stdin.end(stdin);
  });
}

export async function askJson({ system, input, schema }) {
  if (process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      'ANTHROPIC_API_KEY 가 설정돼 있다. 이 상태로 돌리면 구독이 아니라 API 로 과금된다. unset 하고 다시 실행하라.',
    );
  }

  const raw = await run(
    [
      '-p',
      '--output-format', 'json',
      '--json-schema', JSON.stringify(schema),
      '--append-system-prompt', system,
      '--allowedTools', '',        // 도구 없이 순수 변환기로 쓴다
      '--max-turns', '1',
    ],
    input,
  );

  const envelope = JSON.parse(raw);
  const result = envelope.structured_output ?? envelope.result;
  if (!result) {
    throw new Error(`구조화된 출력이 없다: ${raw.slice(0, 400)}`);
  }
  return typeof result === 'string' ? JSON.parse(result) : result;
}

export const name = 'claude';
