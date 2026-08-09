# 다른 컴퓨터에서 이어서 작업하기

회사 노트북에서 하던 작업을 집 PC에서 이어받을 때 필요한 것만 정리했다.

---

## 먼저 — 옮길 게 별로 없다

| | |
|---|---|
| 저장소 코드 | GitHub 에 있다. clone 하면 끝 |
| Radar 자동 실행 | GitHub Actions 에서 돈다. **어느 컴퓨터도 켜져 있을 필요가 없다** |
| `GEMINI_API_KEY` | 저장소 Secrets 에 있다. 그대로 동작한다 |
| 배포된 사이트 | GitHub Pages 가 `main` 을 자동 배포한다. 주소만 알면 어디서든 본다 |
| 글쓰기 편집기 | Cloudflare Worker 에 따로 올라가 있다. 브라우저만 있으면 된다 |

즉 **아무것도 안 해도 블로그는 계속 돈다.** 아래는 "집에서 코드를 고치고
배포까지 하려면" 필요한 것들이다.

이 대화 기록은 따라오지 않는다. Claude Code 세션은 기기별로 저장된다.
대신 결정의 배경은 전부 문서에 적어 뒀다 — Radar 설계는
[radar-agent.md](./radar-agent.md), 스키마는 [SCHEMA.md](./SCHEMA.md),
프로젝트 전반은 저장소 루트의 `CLAUDE.md` 를 보면 된다.

---

## 1. 기본 세팅

### Node 22

`package.json` 이 `>=22.12.0` 을 요구한다. 회사 노트북은 v22.23.1 을 쓴다.

```bash
nvm install 22 && nvm use 22
```

### 저장소

```bash
git clone https://github.com/hubert-bioinformatics/hubert-bioinformatics.github.io
cd hubert-bioinformatics.github.io
npm install
npm run dev          # http://localhost:3030
```

여기까지면 글을 쓰고 미리 보는 건 다 된다.

> **WSL 을 쓴다면 `/mnt/c` 아래에 두지 말 것.**
> 파일 감시가 동작하지 않아 저장해도 화면이 안 바뀐다. 회사 노트북도 그것 때문에
> `/root/blog-next` 로 옮겼다. 한글이 들어간 Windows 경로는 인코딩 문제도 겹친다.
>
> 회사 노트북의 작업 폴더 이름은 저장소 이름을 바꾸기 전 그대로 `blog-next` 다.
> 폴더 이름은 아무 데도 영향을 주지 않아서 굳이 바꾸지 않았다.

---

## 2. 하려는 일에 따라 추가로 필요한 것

### 글만 쓴다 → 추가 설정 없음

`src/content/` 에 마크다운을 넣고 커밋·푸시하면 된다.
브라우저로 쓰고 싶으면 Keystatic 편집기를 쓴다 (아래 참고).

### PR 을 다루거나 워크플로를 돌린다 → `gh` 로그인

Radar PR 을 병합하거나 워크플로를 수동 실행하려면 필요하다.

```bash
gh auth login          # 브라우저로 GitHub 로그인
```

웹 GitHub 에서 클릭으로 해도 되므로 필수는 아니다.

### 글쓰기 편집기를 다시 배포한다 → `wrangler` 로그인

사이트 본체는 Cloudflare 와 무관하다. GitHub Pages 가 `main` 을 자동 배포한다.
Cloudflare Worker 에는 **Keystatic 편집기만** 올라가 있다.

```bash
npx wrangler login     # 브라우저로 Cloudflare 로그인
npm run deploy:admin
```

계정은 `kjhyug93@gmail.com`, Worker 이름은 `blog-next` 다.

> Worker 이름은 `package.json` 의 `name` 에서 나온다. 저장소 이름을 바꿨어도
> 이건 그대로 뒀다 — 이름을 바꾸면 편집기 주소가 바뀌고, 그러면 Keystatic 용
> GitHub App 의 콜백 URL 까지 GitHub 에서 손으로 고쳐야 한다. 얻는 게 없다.

편집기는 콘텐츠(`src/content/`)와 스키마(`keystatic.config.ts`)를 바꿨을 때만
다시 배포하면 된다. 일반 페이지 수정은 Pages 쪽이라 관계없다.

### 로컬에서 Keystatic 편집기를 띄운다 → `.env`

`.env` 는 gitignore 대상이라 따라오지 않는다. 한 줄이면 된다.

```
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=<Keystatic 용으로 만든 GitHub App 의 slug>
```

값은 GitHub → Settings → Developer settings → GitHub Apps 에서 확인할 수 있다.
`PUBLIC_` 접두사가 붙은 대로 비밀 값이 아니다 (클라이언트 번들에 들어간다).

```bash
npm run dev:admin      # http://localhost:3030/keystatic
```

로컬 편집기는 `KEYSTATIC_STORAGE=local` 로 돌아서 파일을 직접 읽고 쓴다.
OAuth 설정이 필요 없다.

배포본 편집기는 이미 설정돼 있어 브라우저만 있으면 된다.

**https://blog-next.kjhyug93.workers.dev/keystatic**

이쪽은 GitHub 로그인 후 저장소에 직접 커밋한다.

### Radar 를 로컬에서 돌려 본다 → `GEMINI_API_KEY`

예약 실행은 Actions 가 하므로 **보통은 필요 없다.** 검색어를 바꾸고 결과를
바로 확인하고 싶을 때만 있으면 된다.

```bash
# 저장소 밖에 둬야 실수로 커밋되지 않는다
read -s -p "GEMINI_API_KEY: " K && echo "export GEMINI_API_KEY=$K" > ~/.radar.env
chmod 600 ~/.radar.env
```

키는 [AI Studio](https://aistudio.google.com/apikey) 에서 새로 받으면 된다.
**회사 노트북에서 복사해 오지 말 것.**

```bash
. ~/.radar.env
node scripts/radar/run.mjs --no-llm     # 수집만. 키 없이도 된다
node scripts/radar/run.mjs --dry        # 선별·요약까지, 파일은 안 씀
```

---

## 3. 주요 명령어

| 명령 | 하는 일 | 필요한 것 |
|---|---|---|
| `npm run dev` | 개발 서버 (3030) | — |
| `npm run build` | 정적 빌드 | — |
| `npm run dev:admin` | 로컬 Keystatic 편집기 | `.env` |
| `npm run deploy:admin` | 편집기를 Cloudflare Worker 로 배포 | wrangler 로그인 |
| `npm run photos` | 사진 EXIF 처리 | — |
| `node scripts/notebooks.mjs --dry` | 노트북 JSON 변환 미리보기 | — |
| `node scripts/radar/run.mjs --no-llm` | Radar 수집만 | — |

---

## 4. 따라오지 않는 것들 (알아만 두면 되는 것)

`scripts/.gist-cache/` 는 이전 작업 때 GitHub Gist 를 받아 둔 캐시다(1.3MB).
없어도 되고, 마이그레이션 스크립트를 다시 돌릴 일이 없으면 영영 필요 없다.

`photos-inbox/` 는 사진 처리 전 원본을 넣는 자리다. 비어 있는 게 정상이다.

`src/content/notes/*.ipynb-backup` 은 노트북 변환 전 원본이다. 회사 노트북에만
있고 gitignore 대상이라 따라오지 않는다. 되돌릴 일이 있으면 그쪽에서 해야 한다.

---

## 5. 두 컴퓨터를 오갈 때

특별할 건 없고 평범한 git 흐름이다. 다만 **Radar 가 자동으로 커밋을 만든다**는
점만 기억하면 된다. 월·수·금에 PR 이 열리고, 병합하면 `main` 이 앞서 간다.

```bash
git pull --ff-only origin main     # 작업 시작 전
# ... 작업 ...
git push origin main
```

Keystatic 편집기(브라우저)로 글을 쓰면 그것도 GitHub 에 직접 커밋된다.
편집기를 열어 둔 채로 다른 컴퓨터에서 푸시하면 편집기가 브랜치를 새로 만들려고
하니, 한쪽에서만 작업하는 게 편하다.
