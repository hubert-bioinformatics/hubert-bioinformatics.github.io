#!/bin/bash
export HOME=/root
cd /root/blog-next || exit 1

git reset -q

# ── 1. 스크롤 버튼 ─────────────────────────────────────────
git add src/components/ScrollJump.astro src/layouts/Base.astro
git commit -q -F - <<'MSG'
add a scroll jump button that flips direction

맨 위/맨 아래로 보내는 버튼. 두 개를 놓으면 모바일에서 하단 탭 위가
답답해져서 하나로 합치고, 스크롤 위치가 절반을 넘으면 방향이 뒤집히게 했다.

붙이면서 걸린 것 세 가지:
- 모바일 하단 탭(Base.astro 의 fixed bottom-0)과 겹쳐서 모바일에서는
  bottom 을 더 띄웠다 (bottom-20 / sm:bottom-6).
- z-30 으로 뒀다. 헤더·탭이 z-40, moment 라이트박스가 z-50 이라 그 위로
  올라가면 사진 확대 화면에 버튼이 떠오른다.
- ClientRouter(View Transitions)를 쓰기 때문에 스크립트가 최초 1회만 돈다.
  astro:page-load 에 물리지 않으면 첫 페이지에서만 동작하고 조용히 죽는다.
  window 리스너는 페이지가 바뀌어도 남으므로 AbortController 로 걷어낸다.

한 화면(400px) 이상 스크롤되지 않는 페이지에서는 아예 숨긴다.
prefers-reduced-motion 이면 부드러운 스크롤 대신 즉시 이동한다
(global.css:140 에 이미 같은 취지의 미디어 쿼리가 있어 이중으로 안전하다).

검증: 전 페이지 삽입 확인, 배포본에서 위치(하단 72px/우측 31px, 44x44),
z-index 30, 초기 상태(dir=down, 아이콘 180도 회전) 확인.
실제 스크롤 동작은 브라우저 창이 표시되지 않는 환경이라 확인하지 못했다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG

# ── 2. 노트북 변환 ─────────────────────────────────────────
git add -A
git commit -q -F - <<'MSG'
convert embedded notebook json into readable markdown

ml-data 글을 열면 Practice 섹션이 1,800줄짜리 JSON 덩어리로 펼쳐졌다.
이전할 때 .ipynb 파일 내용을 변환하지 않고 코드 펜스로 감싸 붙여 놨던 것이다.
문법상 멀쩡한 코드 블록이라 "깨진" 게 아니라 읽을 수가 없는 상태였다.
(그래서 코드 블록으로 감싸는 방향으로는 해결되지 않는다 — 이미 감싸져 있었다)

scripts/notebooks.mjs 가 노트북 JSON 을 찾아 셀 단위로 풀어낸다.

  markdown 셀   → 본문 산문
  code 셀       → ```python 블록
  outputs       → ```text 블록
  image/png     → 파일로 떼어내 이미지로 삽입
  error         → ANSI 색상 코드를 벗긴 트레이스백

nbformat 과 cells 가 있는 것만 건드려서, 일반 JSON 예제 블록은 그대로 둔다.

제목 레벨은 "노트북에서 가장 얕은 제목 = h3" 으로 맞춘다. 글에서 이미
## Practice 아래에 들어가는 자리라 h3 부터 시작해야 하는데, 무조건 +2 를
하면 이미 ### 을 쓰던 dataframe-in-pandas 가 h6 126개까지 내려가 본문보다
글씨가 작아졌다. 상대 깊이는 유지한다. 노트북이 12개 섞인 파일이 있어
노트북마다 따로 계산한다.

pandas DataFrame 의 text/html 출력은 쓰지 않는다. <style scoped> 블록이
딸려 와 페이지에 CSS 를 주입한다. 같은 출력의 text/plain 이 ASCII 표라
코드 블록에 그대로 두면 충분히 읽힌다.

원본은 <파일>.ipynb-backup 으로 남기고 gitignore 에 넣었다.

검증:
- 14개 파일, 노트북 30개, 셀 800여 개 변환. 남은 nbformat 0개
- 이미지 14개 추출, 전부 Astro 이미지 파이프라인을 타 webp 로 변환됨
- astro build exit 0, 139 페이지
- ch1: 326KB -> 123KB, pre 블록 1개(JSON) -> 129개(코드+출력), h3 20개
- dataframe-in-pandas: 8,027줄 -> 2,146줄
- 전 파일 ANSI 잔재 0개

만들면서 고친 것: --file 없이 실행하면 indexOf 가 -1 을 반환해 첫 인자를
파일명으로 잡던 버그. --dry 단독 실행이 바로 깨져서 발견했다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
MSG

git push -q origin main && echo "pushed" && git log --oneline -3
