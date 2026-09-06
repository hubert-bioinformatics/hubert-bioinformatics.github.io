---
title: "롱리드 단일핵 전사체 상용 워크플로우 4종 성능 비교"
date: 2026-09-04
kind: paper
summary: "ONT 기반으로 10x 3'·5', ArgenTag, Parse 키트의 아이소폼 검출력과 데이터 특성을 대조했다."
sourceName: "bioRxiv Genomics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.09.01.748518v1?rss=1\n"
journal: "bioRxiv Genomics"
doi: "10.64898/2026.09.01.748518"
authors: ["Köhler", "F.", "Delgado-Tejedor", "A.", "Zehnsdorf", "M.", "Salgado Albarran", "M."]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

숏리드 기반 단일세포 분석은 전사체 아이소폼과 스플라이싱 패턴을 정확히 식별하는 데 구조적 한계가 있다. 이를 보완하기 위해 롱리드 시퀀싱을 결합한 단일핵 전사체 방식이 활용되고 있으나 상용 플랫폼별 실제 성능 차이는 명확히 비교되지 않았다. 본 연구는 표준화된 샘플과 Oxford Nanopore 시퀀싱을 사용해 주요 상용 워크플로우 4종의 성능을 계량적으로 평가했다.

## 무엇을 했나

- 동일한 다종 혼합 표준 단일핵 샘플을 바탕으로 10x Genomics 3', 10x Genomics 5', ArgenTag, Parse Biosciences 라이브러리를 제작했다.
- Oxford Nanopore 시퀀싱을 수행하여 각 워크플로우의 리드 수율, 리드 길이, 전사체 커버리지, 아이소폼 검출 능력을 매칭된 숏리드 데이터와 비교했다.
- 분석 결과 라이브러리 준비 방식에 따라 리드 특성 차이가 컸으며, 10x Genomics 3' 및 5' 포맷이 전사체 커버리지와 아이소폼 검출 균형에서 가장 뛰어난 성능을 보였다.

## 왜 눈여겨볼 만한가

롱리드 단일핵 전사체 연구를 시작할 때 목적에 맞는 라이브러리 키트를 선택하는 기준을 제시한다. 각 워크플로우마다 리드 길이와 수율 간 트레이드오프가 존재하므로, 정교한 아이소폼 발굴이 목적이라면 10x 기반 기술을 먼저 검토하는 것이 유효하다. 단, 이번 평가가 Oxford Nanopore 시퀀싱 데이터에 한정되어 있으므로 PacBio 시퀀싱 환경을 염두에 둔 연구라면 플랫폼 호환성을 추가로 점검할 필요가 있다.

## 원문

- [bioRxiv Genomics](
https://www.biorxiv.org/content/10.64898/2026.09.01.748518v1?rss=1
) · DOI 10.64898/2026.09.01.748518
