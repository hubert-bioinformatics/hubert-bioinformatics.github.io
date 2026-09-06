---
title: "팬캔서 멀티오믹스 환자 그래프 생성 기법과 데이터 누출 통제 벤치마크"
date: 2026-09-01
kind: paper
summary: "TCGA 8,204건 데이터로 그래프 수준 융합과 교차검증 엄격성이 멀티오믹스 암 분류 및 예후 예측에 미치는 영향을 평가했다."
sourceName: "Computational biology and chemistry"
sourceUrl: "https://doi.org/10.1016/j.compbiolchem.2026.109341"
journal: "Computational biology and chemistry"
doi: "10.1016/j.compbiolchem.2026.109341"
authors: ["Gubbala S", "Amilpur S", "Dasari CM"]
topics: ["생물정보학", "오믹스"]
aiGenerated: true
reviewed: false
draft: false
---

멀티오믹스 데이터로 환자 간 유사도 그래프를 구축할 때, 그래프 생성 전반에서 검증 데이터 정보가 유입되는 데이터 누출(data leakage)이 쉽게 일어난다. 이 연구는 TCGA 31개 암종 8,204건의 1차 종양 데이터를 바탕으로 전처리부터 이웃 탐색까지 훈련 폴드 내에서만 수행하는 엄격한 내포 교차검증(nested CV) 프레임워크를 구축했다. 이를 통해 초기 특징 융합과 그래프 수준 융합 방식 간의 실제 암종 분류 및 예후 예측 성능 차이를 정량 평가했다.

## 무엇을 했나

- TCGA 31개 암종 8,204건의 1차 종양 데이터에서 RNA 발현량, CNV, 변이 데이터를 수집해 분석 대상으로 삼았다.
- 임퓨테이션, 유전자 선별, 스케일링, 유사도 계산, kNN 이웃 탐색을 훈련 폴드에서만 진행하는 5×3 내포 교차검증 구조를 설계했다.
- 동일한 GATv2 인코더 환경에서 초기 특징 융합(early fusion), SNF-lite, 융합 kNN 유사도 그래프의 하위 예측 성능을 비교했다.
- 융합 kNN 방식이 정확도 약 0.92, Macro-F1 약 0.89를 기록해 초기 특징 융합(정확도 ~0.89, Macro-F1 ~0.84)보다 우수한 암종 분류 성능을 보였다.

## 왜 눈여겨볼 만한가

환자 유사도 그래프 기반 학습에서 흔히 발생하는 전역(global) 그래프 생성 시의 데이터 누출을 엄격히 통제한 상태에서 신뢰할 수 있는 기준 성능을 제시한다. 멀티오믹스 통합 시 단순 특징 벡터 결합보다 kNN 기반 그래프 수준 융합이 유리하며, Cox 생존 분석 목적함수를 추가해도 분류 성능 저하 없이 독립적인 예후 층화가 가능함을 보여준다. 다만 아블레이션 분석 결과 RNA 발현량이 분류 신호의 대부분을 차지하므로, 변이나 CNV 데이터를 추가로 프로파일링하는 비용 대비 실익은 연구 목적에 따라 신중히 판단할 필요가 있다.

## 원문

- [Computational biology and chemistry](https://doi.org/10.1016/j.compbiolchem.2026.109341) · DOI 10.1016/j.compbiolchem.2026.109341
