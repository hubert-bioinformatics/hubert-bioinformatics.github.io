# Radar Agent — 뉴스·논문 자동 수집 설계

Radar 컬렉션(`src/content/radar/`)에 들어갈 논문·뉴스 글을 주기적으로 만들어
PR 로 올리는 자동화. hubert님이 PR 을 병합하면 그때 공개된다.

모든 피드는 2026-07-30 에 직접 요청해 보고 확인했다.

---

## 1. 어디서 가져오나

### 논문 — PubMed E-utilities (주력)

RSS 가 아니라 검색 API 다. `esearch` 로 PMID 목록을 받고 `efetch` 로 상세를 받는다.

```
esearch.fcgi?db=pubmed&term=<검색어>&datetype=pdat&reldate=7&retmax=60&sort=date&retmode=json
efetch.fcgi?db=pubmed&id=<PMID,...>&retmode=xml
```

efetch XML 이 주는 것: `ArticleTitle`, **`AbstractText` (초록 전문)**, `Journal>Title`,
`ArticleId` (DOI/PMID), 저자, 발행일.

주력으로 쓰는 이유는 셋이다. 초록 전문이 오니까 요약 품질이 RSS 요약문보다 훨씬
낫고, 검색어를 우리가 정할 수 있어서 관심 주제를 정확히 겨냥할 수 있고, NCBI 공식
API 라 막힐 걱정이 없다. (PubMed 의 RSS 엔드포인트는 500 을 뱉는다 — 못 쓴다.)

호출 제한은 키 없이 초당 3회, `NCBI_API_KEY` 를 넣으면 초당 10회. 우리 규모면
키 없이 충분하지만 있으면 쓰도록 만든다.

### 프리프린트 — bioRxiv / medRxiv

| 소스 | 주소 | 확인 |
|---|---|---|
| bioRxiv genomics | `connect.biorxiv.org/biorxiv_xml.php?subject=genomics` | 200, 31건 |
| bioRxiv bioinformatics | `connect.biorxiv.org/biorxiv_xml.php?subject=bioinformatics` | 200, 31건 |
| medRxiv genetic_and_genomic_medicine | `connect.medrxiv.org/medrxiv_xml.php?subject=...` | 200, 31건 |

**주의**: 이 피드들은 RSS 2.0 이 아니라 **RDF(RSS 1.0)** 이다. 문서 앞부분에
`<items><rdf:Seq>` 목록이 먼저 나오고 실제 `<item rdf:about="...">` 는 그 뒤에
따로 붙는다. 정규식으로 `<item...</item>` 을 잡으면 앞의 `<items>` 블록이 먼저
걸려서 엉뚱한 걸 파싱한다. 반드시 `rss-parser` 같은 정식 파서를 쓴다.

### 저널

| 소스 | 주소 | 확인 |
|---|---|---|
| Nature Genetics | `nature.com/ng.rss` | 200, 9건 |
| Nature Methods | `nature.com/nmeth.rss` | 200, 9건 |
| Nature Biotechnology | `nature.com/nbt.rss` | 200, 9건 |
| Nature Reviews Genetics | `nature.com/nrg.rss` | 200, 9건 (전량 유전체) |

### 뉴스

처음 골랐던 Nature news·STAT·Fierce Biotech 는 유전체 전문지가 아니라 매칭률이
낮았다. 실측: 세 피드 합쳐 121건 중 유전체 관련 7건, 그나마 철회 공지·고분자
화학·진통제 기사였다. 전문 매체로 갈아탄다.

| 소스 | 주소 | 전체 → 매칭 |
|---|---|---|
| ScienceDaily Genetics | `sciencedaily.com/rss/plants_animals/genetics.xml` | 60 → 15 |
| ScienceDaily Personalized Medicine | `sciencedaily.com/rss/health_medicine/personalized_medicine.xml` | 60 → 10 |
| GEN (Genetic Eng. & Biotech News) | `genengnews.com/feed/` | 10 → 4 |
| phys.org biology | `phys.org/rss-feed/biology-news/` | 30 → 4 |
| Nature news | `nature.com/nature.rss` | 76 → 4 |

ScienceDaily 는 대학 보도자료를 재작성한 것이라 깊이는 얕지만 유전체 밀도가 가장
높다. 뉴스 물량의 대부분을 여기서 채우고 GEN 으로 업계 소식을 보탠다.

### 못 쓰는 것 (기록용 — 다시 시도하지 말 것)

| 소스 | 결과 |
|---|---|
| PubMed RSS | HTTP 500 — E-utilities 로 대체 |
| Genome Biology / Genome Medicine | 200 이지만 RSS 아닌 HTML, item 0건 |
| Bioinformatics (OUP), NAR | HTTP 404 |
| GenomeWeb, Bio-IT World, Endpoints, The Scientist | HTTP 403 — 봇 차단 |
| EurekAlert, EMBL-EBI, NHGRI, ScienceDaily Biotech | HTTP 404 |
| Illumina IR, Oxford Nanopore | 연결 실패 / 404 |
| Broad Institute, Sanger | 200 이지만 유전체 매칭 0건 |

---

## 2. 무엇을 가져오나 — 검색어

hubert님 요청으로 생물정보학·NGS·오믹스를 추가했다. 옆의 건수는 실제로 최근
7일 PubMed 결과 수다.

```yaml
topics:
  - id: single-cell         # 75건/주
    label: 단일세포
    pubmed: '"single cell RNA-seq"[tiab] OR "scRNA-seq"[tiab] OR "single-cell transcriptomics"[tiab]'
    keywords: [single-cell, scRNA, 10x, Chromium, cell atlas]
    weight: 3

  - id: spatial             # 54건/주
    label: 공간전사체
    pubmed: '"spatial transcriptomics"[tiab] OR "Visium"[tiab] OR "Xenium"[tiab]'
    keywords: [spatial, Visium, Xenium, MERFISH]
    weight: 3

  - id: transcriptome
    label: 전사체
    pubmed: '"RNA-seq"[tiab] AND ("method"[tiab] OR "benchmark"[tiab] OR "pipeline"[tiab])'
    keywords: [RNA-seq, transcriptome, differential expression, isoform]
    weight: 2

  - id: bioinformatics      # 16건/주
    label: 생물정보학
    pubmed: '"bioinformatics"[tiab] AND ("tool"[tiab] OR "pipeline"[tiab] OR "benchmark"[tiab] OR "software"[tiab])'
    keywords: [bioinformatics, pipeline, workflow, Nextflow, Snakemake, benchmark]
    weight: 3

  - id: ngs                 # 85건/주
    label: NGS
    pubmed: '"next-generation sequencing"[tiab] AND ("method"[tiab] OR "platform"[tiab] OR "quality"[tiab])'
    keywords: [NGS, library prep, base calling, coverage, read depth]
    weight: 2

  - id: omics               # 386건/주 → 좁힘
    label: 오믹스
    pubmed: '("multi-omics"[tiab] OR "multiomics"[tiab]) AND ("integration"[tiab] OR "method"[tiab])'
    keywords: [multi-omics, proteomics, metabolomics, epigenomics, integration]
    weight: 2

  - id: clinical-genomics   # 10건/주
    label: 임상유전체
    pubmed: '"clinical exome"[tiab] OR ("whole genome sequencing"[tiab] AND "diagnosis"[tiab])'
    keywords: [WGS, WES, variant interpretation, ACMG, rare disease]
    weight: 2

  - id: seq-tech            # 42건/주
    label: 시퀀싱 기술
    pubmed: '"long-read sequencing"[tiab] OR "nanopore"[tiab] OR "PacBio HiFi"[tiab]'
    keywords: [long-read, nanopore, PacBio, HiFi, Illumina]
    weight: 2
```

두 가지 손봤다. `"NGS"[tiab]` 만 쓰면 약어가 다른 뜻으로 쓰인 논문이 섞여서
방법·플랫폼 조건을 붙였다. 오믹스는 그냥 두면 주당 386건이라 전체의 절반을
차지해 버려서 multi-omics 통합 쪽으로 좁혔다.

프리프린트·저널·뉴스 RSS 는 검색이 안 되므로 받아온 전체 항목을 `keywords` 로
거른다.

---

## 3. 어떻게 고르나

주당 원본이 논문 668건 + 프리프린트 93건 + 뉴스 37건쯤 된다. 세 단계로 줄인다.

1. **중복 제거** — `state/seen.json` 에 지금까지 다룬 DOI·PMID·URL 을 적어 두고
   이미 있는 건 버린다. 프리프린트가 나중에 저널에 실리면 DOI 가 달라지므로
   제목 정규화(소문자·공백·구두점 제거) 값도 함께 본다.
2. **점수 매기기** — 코드로 계산. 주제 키워드 일치(가중치 합) + 저널 티어
   (Nature 계열 +3, 프리프린트 +1) + 최신성(3일 이내 +2). 상위 30건만 남긴다.
3. **최종 선별** — 상위 20건의 제목+초록 첫 문장을 한 번에 Claude 에 넘겨
   "이 중 5건을 중요한 순서로 고르고 각각 한 줄 이유"를 받는다. 코드 점수만으로는
   같은 주제 반복이나 리뷰 논문 같은 걸 못 거른다.

   **논문과 뉴스를 나눠서 뽑지 않는다.** 20건을 한 바구니에 담아 중요도 순으로
   5건을 고른다. 그날 논문이 좋으면 5건 다 논문이 되고, 큰 뉴스가 터지면 뉴스가
   여러 건 들어온다. 코드가 비율을 강제하지 않는다.

---

## 4. 어떤 글이 나오나

`radar` 컬렉션 스키마를 그대로 쓴다. 본문은 덩어리를 고정한다 — 자유 서술로 두면
길이와 형식이 매번 달라진다. 초록을 그대로 옮기지 않고 한국어로 다시 쓴다.

### 논문 (`kind: paper`)

실제 PubMed 결과(PMID 42498883)로 만든 예시:

```markdown
---
title: "장문 리드로 뇌 조직의 아이소폼을 세포·위치 단위까지 본 Fullscope-seq"
date: 2026-08-03
kind: paper
summary: "공간전사체에 장문 시퀀싱을 붙여, 기존에 유전자 단위까지만 보이던 것을 아이소폼 단위로 끌어내렸다."
sourceName: "Nature Methods"
sourceUrl: "https://doi.org/10.1038/s41592-026-03174-y"
journal: "Nature Methods"
doi: "10.1038/s41592-026-03174-y"
authors: ["Liu", "Hong", "Zhang", "Xi"]
topics: ["공간전사체", "단일세포", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

기존 공간전사체는 짧은 리드를 쓰기 때문에 "이 위치에서 이 유전자가 얼마나
발현되나"까지만 답할 수 있었다. Fullscope-seq 는 여기에 장문 시퀀싱을 붙여
"어느 아이소폼이 발현되나"를 세포 단위, 위치 단위로 구분해 냈다.

## 무엇을 했나

- cDNA 를 프로그램된 방식으로 이어 붙여(concatenation) 장문 플랫폼에서
  전장 전사체를 단일세포 해상도로 읽는 방법을 만들었다. 넓은 시야(large FOV)를
  유지한 게 핵심이다.
- 마카크 원숭이 뇌에 적용해 피질 층·세포 유형·뇌 영역별로 전사체 사용이
  달라지는(differential transcript usage) 유전자를 수천 개 찾아냈다.
- 영역 사이의 주요 아이소폼 전환을 수백 건 확인했고, 피질 표층과 심층 사이에도
  차이가 있었다. 층별 차이는 세포 구성으로 설명되는 반면, 영역별 차이는
  세포 구성과 공간 맥락 양쪽의 영향을 받았다.
- 이렇게 찾은 아이소폼 변이가 신경정신질환 연관 유전자에 유의하게 몰려 있었고,
  플랫폼과 종을 바꿔도 재현됐다.

## 왜 눈여겨볼 만한가

10x Visium·Xenium 으로 공간 데이터를 다루다 보면 "같은 유전자인데 조직 부위마다
기능이 다른 것 같다"는 상황을 자주 만난다. 그동안은 아이소폼 수준에서 확인할
방법이 없어 추정에 머물렀는데, 이 방법은 그 지점을 직접 겨냥한다.

다만 장문 플랫폼이 필요하고 라이브러리 준비 절차가 늘어난다. 지금 돌리는
파이프라인에 바로 얹기보다는, 아이소폼이 결론을 바꿀 수 있는 과제에 한해
검토해 볼 만하다.

## 원문

- [Nature Methods](https://doi.org/10.1038/s41592-026-03174-y) · DOI 10.1038/s41592-026-03174-y · PMID 42498883
```

### 뉴스 (`kind: news`)

뉴스는 짧게 간다. RSS 가 두세 문장짜리 요약만 주기 때문에 논문처럼 4단 구조로
늘리면 내용 없는 살을 붙이게 된다. 원문 페이지를 긁어 오는 방법도 있지만
사이트마다 깨지고 저작권도 걸려서 하지 않는다.

```markdown
---
title: "CRISPR 로 전립선암을 면역치료에 노출시키다"
date: 2026-08-03
kind: news
summary: "면역세포가 암세포를 알아보지 못하는 게 전립선암 면역치료의 벽이었는데, CRISPR 로 그 지점을 건드렸다."
sourceName: "ScienceDaily"
sourceUrl: "https://www.sciencedaily.com/releases/2026/07/260726015250.htm"
topics: ["임상유전체"]
aiGenerated: true
reviewed: false
draft: false
---

CRISPR 로 전립선암 세포를 편집해 면역계가 더 쉽게 찾아내고 파괴하도록 만들었다.
생쥐 실험에서 면역치료 효과가 크게 올라갔고, 연구진은 치료가 어려운 다른 고형암에도
같은 접근이 통할 수 있다고 본다.

전립선암은 면역치료가 잘 듣지 않는 대표적인 암이다. 암세포 자체를 편집해
"보이게" 만드는 쪽으로 접근했다는 점이 눈에 띈다.

## 원문

- [ScienceDaily](https://www.sciencedaily.com/releases/2026/07/260726015250.htm) · 2026-07-26
```

`/radar` 페이지는 이미 `aiGenerated: true` 인 글에 **AI 요약** 배지와 하단
고지문을 붙이도록 만들어져 있다.

---

## 5. 요약은 무엇으로

**Gemini 무료 티어 (Flash 계열)**. GitHub Actions 에서 돌아서 노트북과 무관하고,
API 요금이 0 이다.

### 왜 이걸 고르게 됐나 — 확인한 사실

| 확인한 것 | 결과 |
|---|---|
| Claude API 요금이 구독에 포함되나 | **아니다.** 별도 제품, 별도 청구 |
| 무료 Claude API 키가 있나 | **없다.** Start/Build/Scale/Custom 전부 유료 티어이고 무료 티어 자체가 없다 |
| Actions 에서 Max 구독을 쓸 수 있나 | **공식 문서상 불가.** `claude-code-action` 이 지원하는 인증은 API 키 / Bedrock / Vertex / Foundry 넷뿐 |
| 무료 상시 VM 에 CLI 를 올리면 | **비현실적.** Oracle Always Free 는 7일간 CPU·네트워크·메모리가 모두 10% 미만이면 인스턴스를 회수한다. 주 3회 몇 분 도는 작업이 정확히 그 조건이다 |
| Gemini 무료 티어가 있나 | **있다.** Flash 계열(3.6/3.5/2.5, Flash-Lite 포함) 입출력 토큰 무료 |

"무료 + 상시 + 노트북 무관" 셋을 동시에 만족하는 건 이 조합뿐이다.

호출량은 회당 선별 1회 + 요약 5회 = 6회, 주 3회면 **주당 18회**다. 어떤 무료
한도로도 여유롭다.

### 데이터 취급

무료 티어는 입력·출력이 Google 제품 개선에 사용된다(유료 티어는 제외). 다만
우리가 넣는 건 PubMed 초록과 공개 뉴스 헤드라인이고 나오는 건 그 한국어
요약이다. 원래 공개된 텍스트라 잃을 게 없다.

**사내 데이터나 미공개 연구는 이 파이프라인에 넣지 않는다.**

### 요약기는 갈아끼울 수 있게 만든다

```
scripts/radar/llm/
  gemini.mjs       무료 티어 — Actions 기본값
  claude-cli.mjs   Max 구독(claude -p) — 로컬에서 더 좋은 글이 필요할 때
  index.mjs        RADAR_LLM 환경변수로 선택 (기본 gemini)
```

프롬프트 파일과 출력 JSON 스키마를 양쪽이 공유한다. 평소엔 Actions 가 Gemini 로
상시 돌리고, 특정 논문을 제대로 쓰고 싶으면 로컬에서 `RADAR_LLM=claude` 로 다시
돌려 PR 을 덮어쓴다.

초록을 한국어로 옮기고 핵심 3~4개를 뽑는 일은 Flash 급으로 충분하다. 차이가
나는 건 "왜 눈여겨볼 만한가" 의 실무 논평인데, 그건 어차피 PR 에서 손볼 대목이다.

`claude-cli.mjs` 를 쓸 때 주의: **`ANTHROPIC_API_KEY` 가 환경에 있으면 안 된다.**
이 변수가 있으면 로그인 상태와 무관하게 API 키가 우선해 과금이 시작되고,
헤드리스 모드(`-p`)에서는 확인 절차도 없이 바로 쓰인다. `--bare` 플래그도 쓰면
안 된다(OAuth·키체인을 건너뛰어 구독 인증이 안 된다).

---

## 6. 언제 도나

**GitHub Actions cron, 주 3회 — 월·수·금 07:00 KST (UTC 22:00 일·화·목)**,
회당 5건. 주당 15건.

```yaml
on:
  schedule:
    - cron: '0 22 * * 0,2,4'   # UTC. KST 로 월·수·금 07:00
  workflow_dispatch:            # 수동 실행
```

GitHub 서버에서 도니까 노트북 전원과 무관하다. 저장소가 공개로 바뀔 예정이라
Actions 분당 요금도 없다.

수집 범위는 7일(`reldate=7`). 겹치는 건 `seen.json` 이 거른다. Actions cron 은
부하에 따라 몇 분에서 길게는 한 시간까지 밀릴 수 있는데, 이 용도에서는 상관없다.

**논문/뉴스 비율은 고정하지 않는다.** 후보 20건을 한 바구니에 담고 중요도 순으로
5건을 뽑는다(§3). 물량이 비대칭이라 자연히 논문 쪽이 많아진다 — 논문 후보는 주당
668건, 유전체 뉴스는 37건이다. 큰 뉴스가 나온 날은 뉴스가 여러 건 올라온다.

회당 10건에서 5건으로 줄이면서 선별이 훨씬 빡빡해졌다. 후보 20건 중 5건이니
상위 25% 이고, 원본 대비로는 상위 0.7% 다. 검토 부담도 회당 5건이면 3분이면 된다.

수집 범위는 직전 실행 이후 7일(`reldate=7`). 겹치는 건 `seen.json` 이 거른다.
수동 실행(`workflow_dispatch`)도 열어 둔다.

---

## 7. 검토·발행 흐름

```
Actions cron → run.mjs
   수집 (Node)           PubMed + RSS
   중복 제거·점수 (Node)   후보 20건
   선별 (Gemini)          중요도 순 5건 + 이유
   요약 (Gemini)          건별 .md 생성
   PR (peter-evans/create-pull-request)
        → hubert님이 PR 에서 확인 (수정도 PR 위에서 가능)
        → merge → main 반영 → GitHub Pages 배포 → 공개
```

필요한 시크릿은 `GEMINI_API_KEY` 하나다. PR 생성은 Actions 기본 `GITHUB_TOKEN`
으로 되고, 워크플로에 권한만 준다.

```yaml
permissions:
  contents: write
  pull-requests: write
```

직접 쓰는 글(Keystatic)은 main 에 바로, Agent 글은 PR 로 — 앞서 정한 대로다.

PR 본문에는 이번 회차에 고른 글 목록과 각각의 선정 이유, 버려진 후보 수를 적는다.
검색어가 잘 맞는지 판단할 근거가 된다. 병합하기 싫으면 PR 을 닫으면 되고, 닫힌
PR 의 항목도 `seen.json` 에 남아 다음 회차에 다시 올라오지 않는다.

---

## 8. 코드 구조

```
scripts/radar/
  config.yml            주제·검색어·소스·건수
  prompts/
    select.md           선별 지시문
    summarize-paper.md  논문 요약 지시문
    summarize-news.md   뉴스 요약 지시문
  sources/
    pubmed.mjs          esearch + efetch → 정규화
    rss.mjs             rss-parser 로 RDF/RSS 공통 처리
  llm/
    gemini.mjs          무료 티어 호출 (fetch, SDK 불필요)
    claude-cli.mjs      claude -p 호출 (구독)
    index.mjs           RADAR_LLM 로 선택
  fetch.mjs             모든 소스 수집 → 하나의 배열
  dedupe.mjs            seen.json 대조 + 제목 정규화 비교
  score.mjs             키워드·저널·최신성 점수
  select.mjs            최종 선별
  summarize.mjs         요약 → frontmatter + 본문
  write.mjs             .md 파일 쓰기 + slug 생성
  run.mjs               전체 오케스트레이션
  state/seen.json       다룬 항목 기록 (커밋됨)
.github/workflows/radar.yml
```

새로 필요한 패키지는 `rss-parser`, `yaml` 둘뿐이다. Gemini 는 SDK 없이 `fetch`
로 REST 를 직접 부르고, Claude 는 `claude` 명령을 자식 프로세스로 부른다.
프롬프트를 코드가 아니라 `prompts/*.md` 로 빼는 이유는, 요약 문체를 손볼 때
코드를 안 건드리기 위해서다.

`run.mjs` 플래그:

| 플래그 | 동작 |
|---|---|
| `--dry` | 수집·선별까지만 하고 파일을 쓰지 않는다. 검색어 튜닝용 |
| `--limit N` | 이번 회차 건수 override |
| `--no-llm` | Claude 호출 없이 점수 상위 N건만 출력. 소스 점검용 |
| `--since YYYY-MM-DD` | 수집 기준일 지정 |

전부 로컬에서 돌려 볼 수 있게 만든다. Actions 에서 처음 돌려 디버깅하는 건 피한다.

---

## 9. 만들면서 확인할 것

- [ ] 주제 8개 각각 PubMed 결과가 실제로 나오는지 (검색어 검증)
- [ ] bioRxiv RDF 를 rss-parser 가 제대로 파싱하는지 (31건 다 나오는지)
- [ ] 같은 논문이 프리프린트·저널 양쪽에서 잡힐 때 중복 제거되는지
- [ ] 생성된 .md 가 `content.config.ts` 의 radar 스키마를 통과하는지 (빌드)
- [ ] `/radar` 페이지에 AI 배지·고지문이 붙는지
- [ ] Gemini 무료 티어 모델 ID 문자열 확정 (실제 호출로 확인)
- [ ] Gemini 무료 티어 분당·일당 한도가 주 18회 호출에 걸리지 않는지
- [ ] Gemini 응답이 JSON 스키마를 지키는지, 안 지킬 때 재시도가 도는지
- [ ] `RADAR_LLM=claude` 로 바꿔도 같은 결과 형태가 나오는지
- [ ] Actions 에서 PR 이 생성되는지 (`workflow_dispatch` 로 먼저 수동 실행)
- [ ] 며칠 건너뛴 뒤 실행했을 때 그 사이 항목이 한 번에 올라오는지
