---
title: "다중오믹스와 PPI 네트워크 신호를 분리해 암 드라이버를 발굴하는 DRIVE"
date: 2026-09-27
kind: paper
summary: "오믹스 공통·고유 신호 분해와 그래프 구조 개선으로 드라이버 탐색 정확도를 높였다."
sourceName: "Advanced science (Weinheim, Baden-Wurttemberg, Germany)"
sourceUrl: "https://doi.org/10.1002/advs.77970"
journal: "Advanced science (Weinheim, Baden-Wurttemberg, Germany)"
doi: "10.1002/advs.77970"
authors: ["Gong X", "Li J", "Su M", "Yu P", "Ma T", "Zhai R", "Zhang C", "Zhang M"]
topics: ["오믹스", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

단백질 상호작용 네트워크의 이질성과 오믹스 데이터 간 신호 충돌, 부족한 드라이버 주석 정보는 멀티오믹스 기반 암 드라이버 유전자 예측을 방해하는 주요 원인이다. 연구진은 이를 극복하기 위해 PPI 이웃 구조를 세만틱 뷰로 나누고 오믹스 신호를 공통 및 고유 성분으로 분해하는 그래프 프레임워크 DRIVE를 제안한다. 포컬 및 맥스-마진 손실 함수 기반의 반지도 학습을 적용하여 주석 데이터가 극히 드문 상황에서도 안정적인 예측 성능을 구현했다.

## 무엇을 했나

- 변이, 복제수 변이, DNA 메틸화, 발현량 데이터와 PPI 네트워크를 결합하는 반지도 그래프 프레임워크 DRIVE를 개발했다.
- 대조적 상호정보량 학습과 직교성 제약으로 오믹스 공통·특이 신호를 분해하고, PPI 이웃을 밀접·느슨 세만틱 뷰로 분리하여 노이즈를 줄였다.
- 6개 벤치마크 네트워크 평가에서 기존 10개 방법론을 앞서며 평균 AUPRC 0.9204, AUROC 0.9704를 기록했다.
- 발굴한 186개 고신뢰도 후보 유전자 중 80.1%가 DepMap CRISPR 의존성 데이터의 지지를 받는 것을 확인했다.

## 왜 눈여겨볼 만한가

오믹스 데이터 간 신호 상충과 PPI 네트워크 노이즈로 발생하는 과도한 신호 혼재 문제를 그래프 및 표현 분해 기법으로 완화한 점이 실용적이다. 정답 주석이 부족한 희귀 암종이나 신규 다중오믹스 데이터셋에서 드라이버 타깃의 우선순위를 정할 때 유용하게 활용할 수 있을 것으로 보인다. 다만 모델 구동을 위해 다종 오믹스 프로파일링 데이터와 체계화된 네트워크 정보가 사전에 확보되어야 한다는 제약이 존재한다.

## 원문

- [Advanced science (Weinheim, Baden-Wurttemberg, Germany)](https://doi.org/10.1002/advs.77970) · DOI 10.1002/advs.77970
