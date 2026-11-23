---
title: "나노포어 DRS 기반 m⁶A 검출을 위한 Dorado 파이프라인 검증"
date: 2026-11-20
kind: paper
summary: "IVT 대조군과 GLORI 데이터를 활용해 Dorado의 m⁶A 검출 성능과 노이즈 필터링 기준을 제시했다."
sourceName: "eLife"
sourceUrl: "https://doi.org/10.7554/eLife.110672"
journal: "eLife"
doi: "10.7554/eLife.110672"
authors: ["Ohnezeit D", "Loliashvili E", "Putzel G", "Verstraten R", "Silhavy AT", "Liu JF", "Nicholson L", "Pironti A"]
topics: ["시퀀싱 기술", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

나노포어 다이렉트 RNA 시퀀싱(DRS)과 Dorado를 활용한 m⁶A 분석은 단일 분자 수준 검출이 가능하지만 정밀도와 재현성에 대한 체계적인 검증이 부족했다. 연구진은 미수식 IVT RNA와 메틸화 효소 억제제 대조군을 이용해 Dorado 모델별 성능을 검증했다. 이를 통해 백그라운드 노이즈를 줄이는 필터링 기준을 마련하고 섬유아세포와 신경세포 간 m⁶A 정량 차이를 규명했다.

## 무엇을 했나

- 미수식 IVT RNA와 메틸화 효소 억제제를 처리한 샘플을 대조군으로 사용하여 여러 Dorado 버전 및 모델의 m⁶A 검출 정밀도를 평가했다.
- 동일한 입력 RNA에서 얻은 GLORI 데이터와 DRS 결과를 직접 비교하여 m⁶A/A 비율이 높은 영역에서 Dorado의 검출 일치도를 확인했다.
- 엄격한 노이즈 필터링을 적용해 사람 일차 섬유아세포와 HD10.6 신경세포 전사체 간 보존된 사이트의 m⁶A 정량 비율 차이를 측정했다.

## 왜 눈여겨볼 만한가

DRS 기반 m⁶A 분석 시 Dorado 알고리즘의 위양성을 통제하고 정량 신뢰도를 확보하기 위한 실질적 기준을 제공한다. GLORI 데이터와 DRS 단일 분자 정량 결과를 비교 검증하려는 에피트랜스크립톰 연구진에게 유용한 파이프라인 참조가 될 것으로 보인다. 다만 안정적인 정량 측정을 위해 미수식 대조군 검증과 엄격한 임계값 설정이 선행되어야 하는 제약이 있다.

## 원문

- [eLife](https://doi.org/10.7554/eLife.110672) · DOI 10.7554/eLife.110672
