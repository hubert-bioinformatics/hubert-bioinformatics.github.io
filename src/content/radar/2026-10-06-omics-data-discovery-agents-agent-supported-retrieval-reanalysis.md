---
title: "LLM 에이전트를 활용한 오믹스 데이터 자동 검색 및 재분석 프레임워크"
date: 2026-10-06
kind: paper
summary: "PMC 문헌에서 데이터와 메타데이터를 추출해 bulk RNA-seq 및 프로테오믹스 재분석과 메타분석을 자동화했다."
sourceName: "PLoS computational biology"
sourceUrl: "https://doi.org/10.1371/journal.pcbi.1014822"
journal: "PLoS computational biology"
doi: "10.1371/journal.pcbi.1014822"
authors: ["Hutton A", "Meyer JG"]
topics: ["전사체", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

공공 데이터베이스에 원천 데이터가 저장되어 있더라도 메타데이터, 코드, 중간 결과물이 논문 본문과 보충 자료에 흩어져 있어 재분석에 많은 수작업이 소요된다. 연구진은 LLM 에이전트와 컨테이너 기반 도구를 결합하여 문헌 검색부터 데이터 다운로드, 재정량, 연구 간 메타분석까지 연결하는 프레임워크를 구축했다.

## 무엇을 했나

- LLM 에이전트가 PMC 논문 텍스트에서 오믹스 메타데이터와 데이터 위치를 수집하고 다운로드하도록 구성했다.
- Model Context Protocol(MCP) 서버를 통해 컨테이너화된 분석 도구를 에이전트에 연결하고 bulk RNA-seq 및 프로테오믹스(DDA/DIA) 데이터셋 5건을 재분석했다.
- 재정량 결과 원저자가 보고한 샘플 발현량과 상관관계 0.85~0.997, 차등 발현 유전자/단백질의 fold-change Spearman 상관관계 0.88~0.91 수준으로 재현됨을 확인했다.
- 에이전트가 연구 간 데이터 호환성을 판단하고 간 섬유화 프로테오믹스 데이터를 활용해 랜덤 효과 메타분석까지 수행할 수 있음을 증명했다.

## 왜 눈여겨볼 만한가

GEO나 PRIDE의 데이터를 대규모로 재분석할 때 텍스트와 메타데이터 매칭 작업을 자동화하는 유용한 도구다. 다만 실제 5건의 재분석 모두 연구자의 지시와 워크플로우 보정이 개입되었으므로, 완전 자동화보다는 재분석 프로세스를 보조하는 코파일럿 형태에 가깝다. 전사체 분석 도구의 버전이나 전처리 파라미터 차이로 인한 통계적 유의 유전자 목록의 미세한 변동은 여전히 연구자가 직접 검토해야 한다.

## 원문

- [PLoS computational biology](https://doi.org/10.1371/journal.pcbi.1014822) · DOI 10.1371/journal.pcbi.1014822
