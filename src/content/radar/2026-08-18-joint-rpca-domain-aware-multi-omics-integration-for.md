---
title: "미생물 멀티오믹스 데이터 통합을 위한 Joint-RPCA 개발"
date: 2026-08-18
kind: paper
summary: "행렬 완성 기반 저차원 구조 추정으로 오믹스 간 공통 변동을 포착하고 계산 속도를 높였다."
sourceName: "Molecular systems biology"
sourceUrl: "https://doi.org/10.1038/s44320-026-00236-3"
journal: "Molecular systems biology"
doi: "10.1038/s44320-026-00236-3"
authors: ["Cordazzo Vargas B", "Martino C", "Dilmore AH", "Metcalf JL", "Burcham ZM", "Lahti L", "Bektanov A", "Borman T"]
topics: ["오믹스", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

마이크로바이옴 멀티오믹스 데이터는 모달리티 간 스케일 차이, 데이터의 높은 희소성, 상합성(compositionality) 문제로 인해 통계적 통합 분석이 쉽지 않다. 기존의 범용 멀티오믹스 도구들은 고유한 수학적 가정에 따라 결과가 크게 달라져 미생물 생태계 특성을 온전히 반영하기 어려웠다. 연구진은 OptSpace 행렬 완성 프레임워크를 바탕으로 모달리티 간 공유되는 저차원 구조를 추정하는 Joint-RPCA 알고리즘을 제시했다.

## 무엇을 했나

- OptSpace 행렬 완성(matrix completion) 프레임워크를 기반으로 오믹스 모달리티 간 공통 저차원 구조를 가정한 Joint-RPCA 알고리즘을 구축했다.
- 기존 범용 통합 기법들과 비교 분석을 수행하여 표현형 분류 정확도를 최대 6배 높이고 계산 시간을 100배 이상 단축함을 확인했다.
- iHMP(Integrative Human Microbiome Project) 및 포유류 장내 미생물 데이터셋에 적용하여 재현성 있는 멀티오믹스 패턴을 발굴했다.

## 왜 눈여겨볼 만한가

균주 조성, 대사체, 전사체 등 희소성이 극심하고 상합성 특징을 갖는 마이크로바이옴 멀티오믹스 분석 시 기존 범용 차원축소 기법보다 연산 효율과 정확도 측면에서 유용한 대안이 될 수 있다. 연산 속도가 빨라 대규모 샘플을 다루는 연구에서 연산 병목을 줄이는 데 유용할 것으로 보인다. 다만 미생물 데이터의 통계적 특성에 맞춰 설계된 알고리즘이므로 일반적인 단일세포 전사체나 공간전사체 데이터셋에 적용할 때는 상합성 및 희소성 가정이 부합하는지 먼저 검토할 필요가 있다.

## 원문

- [Molecular systems biology](https://doi.org/10.1038/s44320-026-00236-3) · DOI 10.1038/s44320-026-00236-3
