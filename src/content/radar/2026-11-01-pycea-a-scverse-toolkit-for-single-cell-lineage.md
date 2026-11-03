---
title: "scRNA-seq 계통 추적 데이터를 AnnData와 통합 분석하는 Pycea"
date: 2026-11-01
kind: paper
summary: "AnnData 확장 구조인 TreeData를 통해 Scanpy 생태계에서 계통 나무를 직접 분석하고 시각화한다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.10.30.763227v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.10.30.763227"
authors: ["Colgan", "W. N.", "Weine", "E.", "Koblan", "L. W.", "Jones", "M. G."]
topics: ["단일세포", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 계통 추적 데이터는 세포의 변화 과정을 추적하는 데 유용하지만 기존 전사체 데이터 구조와 호환되지 않아 워크플로우 통합이 어려웠다. 본 연구는 AnnData를 확장한 TreeData 데이터 구조와 파이썬 툴킷 Pycea를 제안하여 scverse 생태계 내에서 계통 분석을 단일 파이프라인으로 처리하도록 했다.

## 무엇을 했나

- 단일세포 발현량 데이터와 계통 나무 정보를 함께 저장할 수 있도록 AnnData를 확장한 TreeData 데이터 구조를 설계했다.
- TreeData를 바탕으로 계통 나무 시각화, 클레이드 식별, 거리 비교, 조상 상태 추정 및 계통 통계 기능을 제공하는 Pycea 툴킷을 개발했다.
- Scanpy 등 기존 scverse 생태계 도구와 데이터 포맷 변환 없이 바로 연동하여 사용할 수 있도록 파이썬 라이브러리로 공개했다.

## 왜 눈여겨볼 만한가

scRNA-seq 카운트 매트릭스 분석과 계통 추적 분석 간 포맷 변환 과정에서 발생하는 번거로움을 크게 줄여줄 것으로 보인다. 다만 계통 나무 자체를 신규 재구성하는 알고리즘보다는 이미 구축된 나무의 시각화와 후속 통계 분석 및 발현량 데이터와의 통합에 특화된 툴킷이라는 점을 고려해 파이프라인 적용 여부를 검토해야 한다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.10.30.763227v1?rss=1
) · DOI 10.64898/2026.10.30.763227
