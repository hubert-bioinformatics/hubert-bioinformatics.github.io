---
title: "scRNA-seq 차원 축소 신뢰성을 높이는 ViScore와 ViVAE"
date: 2026-10-28
kind: paper
summary: "단일세포 데이터 임베딩의 공정한 평가를 위한 ViScore와 다중 스케일 구조를 보존하는 ViVAE 모델을 제안한다."
sourceName: "Cell systems"
sourceUrl: "https://doi.org/10.1016/j.cels.2026.101760"
journal: "Cell systems"
doi: "10.1016/j.cels.2026.101760"
authors: ["Novak D", "de Bodt C", "Lambert P", "Lee JA", "Van Gassen S", "Saeys Y"]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

기존 scRNA-seq 차원 축소 기법은 임베딩 결과의 신뢰성과 평가 기준의 엄밀성이 부족하다는 한계가 있었다. 본 연구에서는 이를 해결하기 위해 차원 축소 품질을 공정하고 확장성 있게 평가하는 프레임워크와, 다중 스케일 구조 보존 및 해석 기능을 갖춘 딥러닝 모델을 함께 선보인다.

## 무엇을 했나

- 기존 단일세포 차원 축소 평가 지표의 한계를 개선하고자 지도 및 비지도 방식을 모두 지원하는 평가 프레임워크 ViScore를 구축했다.
- 다중 스케일 수준에서 세포 간 구조를 보존하면서 모델 해석 기능을 제공하는 딥러닝 기반 임베딩 모델 ViVAE를 개발했다.
- 단일세포 전사체 데이터셋에 대한 정량적 비교 분석과 케이스 스터디를 통해 제안한 도구들의 구조 보존 성능과 신뢰성을 검증했다.

## 왜 눈여겨볼 만한가

기존 차원 축소 기법은 국소 및 전역 구조 보존 간의 균형이나 평가 객관성에 한계가 있었는데, ViScore와 ViVAE는 데이터 시각화와 해석의 엄밀성을 보완할 수 있는 선택지다. 다만 딥러닝 기반 모델 특성상 추가적인 계산 자원과 최적화 과정이 필요할 수 있어, 기존 분석 파라미터의 구조적 타당성을 검증하는 용도로 우선 적용해 볼 만하다.

## 원문

- [Cell systems](https://doi.org/10.1016/j.cels.2026.101760) · DOI 10.1016/j.cels.2026.101760
