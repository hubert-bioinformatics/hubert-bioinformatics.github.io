---
title: "파지-숙주 시계열 전사체 DB PhageExpressionAtlas 구축"
date: 2026-08-17
kind: paper
summary: "표준화된 파이프라인으로 23개 연구의 42개 파지 시계열 dual RNA-seq 데이터를 재가공해 통합 제공한다."
sourceName: "NAR genomics and bioinformatics"
sourceUrl: "https://doi.org/10.1093/nargab/lqag097"
journal: "NAR genomics and bioinformatics"
doi: "10.1093/nargab/lqag097"
authors: ["Wolfram-Schauerte M", "Trust C", "Waffenschmidt N", "Nieselt K"]
topics: ["생물정보학", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

파지-숙주 상호작용을 다룬 시계열 전사체 데이터는 지속적으로 축적되어 왔으나, 표준화된 처리 파이프라인의 부재로 연구 간 비교나 커스텀 재분석이 어려웠다. 이 연구에서는 파지 감염 시계열 dual RNA-seq 데이터를 일관된 파이프라인으로 재가공한 DB인 PhageExpressionAtlas를 구축했다. 이를 통해 산재해 있던 전사체 데이터를 통합적으로 탐색하고 교차 분석할 수 있는 환경을 제공한다.

## 무엇을 했나

- 23개 연구에서 수집한 42개의 파지 감염 시계열 dual RNA-seq 데이터를 파이프라인으로 일관되게 재처리했다.
- 대화형 탐색 및 시각화 인터페이스를 구축하여 원 연구의 결과를 재현하고 여러 파지-숙주 시스템으로 가설 검증을 확장했다.
- 파지 유전자 분류 전략에 따른 발현 양상을 분석하여 감염 전 단계에 걸쳐 미지의 파지 유전자가 주를 이룸을 확인했다.
- 숙주의 방어 시스템과 파지의 반방어(anti-defense) 기전에 대한 유전자 발현 동역학을 분석해 공통 및 특이 전사 조절 패턴을 제시했다.

## 왜 눈여겨볼 만한가

파지와 숙주 전사체를 동시에 다루는 dual RNA-seq의 특성상 일관된 파이프라인 재가공을 통한 표준 데이터베이스 구축은 교차 연구 분석의 진입장벽을 낮춰준다. 파지 방어 기전이나 반방어 시스템 연구 시 발현 시점과 패턴을 빠르게 비교·검증하는 레퍼런스로 활용해 볼 만하다. 다만 수집된 데이터(42개) 외의 신규 파지-숙주 조합에 대해서는 가공 데이터를 직접 제공하지 않으므로 적용 범위에 제한이 존재한다.

## 원문

- [NAR genomics and bioinformatics](https://doi.org/10.1093/nargab/lqag097) · DOI 10.1093/nargab/lqag097
