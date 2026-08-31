---
title: "ONT 롱리드 전사체 분석을 자동화·표준화한 SALRR 플랫폼"
date: 2026-08-29
kind: paper
summary: "Hamilton 자동화와 Snakemake 파이프라인으로 사후 뇌 조직에서 미기재 아이소폼 8천여 개를 확인했다."
sourceName: "bioRxiv Genomics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.08.27.747499v1?rss=1\n"
journal: "bioRxiv Genomics"
doi: "10.64898/2026.08.27.747499"
authors: ["Kouam", "C.", "Mingle", "J.", "Alvarez Jerez", "P.", "Evans", "A."]
topics: ["전사체", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

사후 뇌 조직은 RNA 손상이 심하고 롱리드 시퀀싱의 라이브러리 제작 과정이 번거로워 대규모 연구에 적용하기 어려웠다. 여기에 데이터 표준 분석 파이프라인의 부재도 대량 데이터 처리의 걸림돌로 작용했다. 본 연구진은 Hamilton 자동화 장비 기반의 실험 공정과 Snakemake 기반 파이프라인을 통합한 SALRR을 구축해 이 문제를 다뤘다.

## 무엇을 했나

- Hamilton Microlab NGS STAR 플랫폼을 활용해 ONT 롱리드 cDNA 라이브러리 제작을 자동화함으로써 연구자 작업 시간을 67% 줄였다.
- ONT 신호 데이터 처리부터 아이소폼 정량화까지 수행하는 Snakemake 파이프라인을 작성하고 SIRV 스파이크인 보정 절차를 도입했다.
- 북미 뇌 표현형 콘소시엄(NABEC)의 사후 전두엽 피질 10개 샘플에 적용해 10,075개 유전자에서 31,607개의 고신뢰도 아이소폼을 찾아냈다.
- GENCODE v49에 없는 신규 스플라이스 변이 8,532개를 확보하고 GBA1, CCNF, CHCHD10, TREM2 등 뇌질환 관련 유전자 영역에서 복잡한 스플라이싱 패턴을 검출했다.

## 왜 눈여겨볼 만한가

사후 조직 특유의 RNA 분해 상황에서도 안정적으로 동작하고 라이브러리 제작 수작업을 줄인 점은 롱리드 기반 대규모 뇌질환 코호트 데이터 구축 시 실용적인 이점이 될 수 있다. 다만 자동화 공정을 도입하려면 Hamilton NGS STAR 장비 세팅이 전제되어야 한다. 초록 수준에서는 10개 샘플 분석 결과만 확인되므로 대량 코호트 적용 시의 계산 비용과 파이프라인 확장성은 실제로 운영하며 점검해 볼 필요가 있다.

## 원문

- [bioRxiv Genomics](
https://www.biorxiv.org/content/10.64898/2026.08.27.747499v1?rss=1
) · DOI 10.64898/2026.08.27.747499
