---
title: "모델 손실 궤적 기반의 대용량 단일세포 스케칭 알고리즘 SKIM"
date: 2026-08-10
kind: paper
summary: "공간 거리 기반 스케칭의 노이즈 취약성을 극복하고 downstream 분석 성능과 연산 속도를 개선했다."
sourceName: "PLoS computational biology"
sourceUrl: "https://doi.org/10.1371/journal.pcbi.1014638"
journal: "PLoS computational biology"
doi: "10.1371/journal.pcbi.1014638"
authors: ["Bai J", "Zhou F", "Tan C", "Gao Y", "He Y", "Huang X", "Wang Y"]
topics: ["전사체", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

대용량 scRNA-seq 데이터의 연산 부담을 줄이기 위한 기존 스케칭(sketching) 기법은 발현 공간상의 기하학적 거리에만 의존하여 미세한 발현 변이를 놓치거나 이상 세포를 과도하게 선별하는 한계가 있었다. 연구진은 딥러닝 모델의 에포크별 재구성 손실 변화인 '동적 피드백'을 활용해 세포 간 다중 척도 변이를 포착하는 SKIM 알고리즘을 개발했다. 이를 통해 노이즈에 취약한 외곽 세포를 제거하고 데이터의 생물학적 신호를 효율적으로 보존하도록 했다.

## 무엇을 했나

- 학습 에포크에 따른 세포별 재구성 손실(reconstruction loss) 궤적을 '동적 피드백'으로 정의하여 전역 패턴부터 국소 변이까지 반영하는 공간을 구축했다.
- 동적 피드백 공간에서 불안정한 궤적을 보이는 이상 세포를 필터링한 후, 군집화 및 크기 인지 샘플링을 적용해 집단 간 균형을 맞춘 서브셋을 추출했다.
- 9개 벤치마크 데이터셋을 바탕으로 세포형 주석, 데이터 통합, bulk deconvolution, 분화 궤적 추정 등 4가지 검증에서 기존 SOTA 스케칭 기법 4종을 앞섰다.
- 216,611개 세포 데이터에서 10% 스케치를 생성할 때 기존 기법 대비 20배 이상의 연산 속도 향상을 확인했다.

## 왜 눈여겨볼 만한가

백만 세포 단위의 대규모 atlas 데이터를 다룰 때 연산 자원 문제로 전체 데이터를 직접 통합하거나 궤적 추정을 수행하기 부담스러운 상황에서 유용한 선택지가 될 수 있다. 기존 Geometric Sketching 계열이 기하학적 외곽에 위치한 노이즈나 이상 세포(outlier)를 희귀 세포로 오인해 과다 추출하던 문제를 손실 궤적 정보로 완화한 점이 실용적이다. 다만 동적 피드백 추출을 위해 딥러닝 모델 학습 과정이 선행되어야 하므로, 표현 학습 백엔드의 하이퍼파라미터 설정에 따른 스케칭 안정성은 개별 데이터셋별로 사전 검증이 필요해 보인다.

## 원문

- [PLoS computational biology](https://doi.org/10.1371/journal.pcbi.1014638) · DOI 10.1371/journal.pcbi.1014638
