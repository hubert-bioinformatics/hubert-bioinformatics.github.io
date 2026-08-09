---
title: "단일세포·단일핵 전사체 기반 lncRNA 통합 분석 파이프라인 scLncR"
date: 2026-08-06
kind: paper
summary: "발굴부터 WGCNA, 슈도타임 분석까지 지원하며 독립적 발현 매트릭스로 lncRNA 신호를 강화한다."
sourceName: "Annals of botany"
sourceUrl: "https://doi.org/10.1093/aob/mcag241"
journal: "Annals of botany"
doi: "10.1093/aob/mcag241"
authors: ["Yin S", "Lu Y", "Yan W", "Zhu Z", "Liu R", "Li G"]
topics: ["단일세포", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 및 단일핵 전사체(scRNA-seq/snRNA-seq) 데이터에서 lncRNA를 분석할 때는 예측, 정량화, 세포 유형별 특성화, 기능 해석을 각기 다른 도구로 개별 수행해야 하는 불편함이 있었다. 특히 식물 연구 분야에서는 lncRNA 분석에 특화된 재현 가능한 파이프라인이 부족했다. 연구진은 lncRNA 후보 발굴부터 네트워크 및 궤적 분석까지 단일 환경에서 처리할 수 있는 모듈형 분석 프레임워크 scLncR을 개발했다.

## 무엇을 했나

- lncRNA 예측, 독립적 발현 매트릭스 처리, WGCNA, 슈도타임 궤적 분석 및 기능 농축 모듈을 통합하고 CLI 및 Shiny 기반 GUI 환경을 구현했다.
- lncRNA 전용 매트릭스 분리 처리 방식을 도입하여 기존 군집화 및 세포 유형 분류의 틀을 유지하면서 lncRNA 감지 신호를 강화했다.
- 애기장대(Arabidopsis) 뿌리 단일세포 데이터에 적용하여 뿌리털 세포 상태 및 유전적 맥락과 연관된 lncRNA 후보 3종을 발굴하고 기능을 해석했다.

## 왜 눈여겨볼 만한가

mRNA 대비 발현량이 적어 단일세포 데이터에서 노이즈로 묻히기 쉬운 lncRNA를 독립 매트릭스로 다루어 신호 포착률을 높인 점이 유용하다. 식물 시스템을 타깃으로 공개되었으나 전반적인 sc/snRNA-seq lncRNA 분석 과정의 공수를 줄여주는 툴킷으로 활용할 수 있다. 다만 lncRNA 예측 알고리즘 성능은 참조 유전체 어노테이션의 완성도에 종속되므로, 신규 lncRNA 발굴 시 기존 데이터베이스와의 비교 검증 절차가 병행되어야 할 것으로 보인다.

## 원문

- [Annals of botany](https://doi.org/10.1093/aob/mcag241) · DOI 10.1093/aob/mcag241
