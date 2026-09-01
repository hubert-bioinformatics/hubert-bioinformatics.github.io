---
title: "최적 수송 모델로 세포·종 간 단일세포 섭동 반응을 전이하는 scPILOT"
date: 2026-08-29
kind: paper
summary: "잠재 공간의 최적 수송과 생성 모델을 결합해 미학습 환자 및 세포주 데이터에서도 섭동 효과를 추론한다."
sourceName: "Advanced science (Weinheim, Baden-Wurttemberg, Germany)"
sourceUrl: "https://doi.org/10.1002/advs.77461"
journal: "Advanced science (Weinheim, Baden-Wurttemberg, Germany)"
doi: "10.1002/advs.77461"
authors: ["Wang J", "Liu Z", "Zhang Z", "Cao Y", "Ren J", "Cheng P", "Tian J", "Xie L"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 수준의 섭동(perturbation) 반응은 세포 유형, 환자, 종에 따른 변동성이 크기 때문에 기존 예측 모델을 새로운 생물학적 컨텍스트에 일반화하기 어려웠다. 본 연구에서는 판별자 보조 학습 기반의 생성적 잠재 표현과 잠재 최적 수송(latent optimal transport)을 결합한 scPILOT 프레임워크를 제안한다. 이를 통해 이미 관찰된 컨텍스트의 섭동 반응을 미학습 쿼리 컨텍스트로 전이하여 예측할 수 있도록 했다.

## 무엇을 했나

- 판별자 보조 학습으로 생성적 잠재 표현을 구축하고, 세포 수준 반응 추론과 쿼리 맞춤형 반응 전이 절차를 분리한 scPILOT 프레임워크를 개발했다.
- 세포 유형, 환자, 종, 세포주 등 다양한 미학습(held-out) 컨텍스트 벤치마크 데이터를 대상으로 섭동 반응 전이 성능을 평가했다.
- 세포 유형($R^2$ 0.945, MMD2 0.137), 종($R^2$ 0.853, MMD2 0.287), 환자($R^2$ 0.598, MMD2 0.025) 미학습 벤치마크에서 각각 높은 예측 정확도를 확보했다.
- 보충 분석을 통해 예측 성능이 데이터셋 자체의 학습 가능성 및 쿼리-컨텍스트 간 유사도와 유의미하게 연관되어 있음을 확인했다.

## 왜 눈여겨볼 만한가

단일세포 섭동 데이터를 다른 종이나 세포 유형으로 전이해 예측할 수 있어, 실험적 제약이 큰 조건에서 AI 가상 세포(AIVC) 구축이나 약물 스크리닝의 보조 도구로 활용을 검토해 볼 만하다. 다만 환자 간 전이 성능($R^2$ 0.598)은 세포 유형이나 종 간 전이에 비해 낮게 형성되므로, 환자 간 이질성이 큰 임상 데이터 적용 시에는 해석에 주의가 필요하다. 또한 모델의 성패가 쿼리와 참조 데이터 간의 컨텍스트 일치도에 의존하는 만큼, 입력을 구성할 때 대조군 데이터셋의 적절성을 먼저 평가해야 한다.

## 원문

- [Advanced science (Weinheim, Baden-Wurttemberg, Germany)](https://doi.org/10.1002/advs.77461) · DOI 10.1002/advs.77461
