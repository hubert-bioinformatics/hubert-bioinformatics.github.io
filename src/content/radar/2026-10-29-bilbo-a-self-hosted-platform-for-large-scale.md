---
title: "RNA-Seq 파이프라인과 GO 의미론적 클러스터링을 결합한 BILBO 플랫폼"
date: 2026-10-29
kind: paper
summary: "전처리부터 RAG 기반 문헌 연결까지 통합 지원하는 온프레미스 RNA-Seq 분석 플랫폼이다"
sourceName: "Functional & integrative genomics"
sourceUrl: "https://doi.org/10.1007/s10142-026-02091-9"
journal: "Functional & integrative genomics"
doi: "10.1007/s10142-026-02091-9"
authors: ["da Silva VLC", "Alvarenga JVR", "Linhares-Neto MV", "Noman M", "Chalfun-Junior A"]
topics: ["생물정보학", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

대용량 RNA-Seq 데이터 분석은 파이프라인 재현성을 확보하기도 어렵지만 도출된 DEG 결과를 생물학적으로 해석하는 과정에서 병목이 자주 발생한다. 기존 워크플로우는 발현량 정량화와 단백질 기능 주석 집계 과정이 분리되어 있어 후속 해석을 위해 별도의 도구를 조합해야 했다. BILBO는 데이터 수집부터 분석, GO 의미론적 클러스터링 및 RAG 기반 문헌 연결까지 단일 컨테이너 환경으로 묶어 이 문제를 해결한다.

## 무엇을 했나

- 전처리, 정렬, 정량화, DEG 분석 등 공개 도구를 표준화하여 자체 호스팅 가능한 컨테이너 기반 파이프라인을 구축했다.
- GO 주석 간 Wang 의미론적 유사도 기반 계층적 클러스터링과 실루엣 정제 기법을 적용해 기능별 대표 유전자를 추출하는 프레임워크를 개발했다.
- RAG 기술을 도입해 선별된 대표 유전자와 기능 클러스터에 관련된 기존 논문의 DOI 및 관련 문단을 자동 연결하도록 구성했다.
- SEQC/MAQC-III 데이터셋 벤치마크에서 nf-core/rnaseq 대비 발현 차이 효과 크기(Spearman ≥ 0.994)를 유지하면서 최대 임시 디스크 사용량을 68% 줄였다.

## 왜 눈여겨볼 만한가

이미 nf-core/rnaseq 등 검증된 파이프라인을 안정적으로 운용 중인 환경이라면 도입 실익이 낮을 수 있다. 벤치마크 결과 실행 시간이 25% 늘어났다는 점도 대용량 샘플 처리 시 고려해야 할 한계다. 다만 임시 스토리지 용량이 부족한 온프레미스 환경이거나, DEG 분석 이후 GO 상위 개념 정리 및 관련 문헌 탐색에 많은 시간을 쏟는 연구팀이라면 검토해 볼 만하다.

## 원문

- [Functional & integrative genomics](https://doi.org/10.1007/s10142-026-02091-9) · DOI 10.1007/s10142-026-02091-9
