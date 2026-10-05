---
title: "디콘볼루션 세포 비율 기반 공간 영역 동정 도구 stPularity"
date: 2026-10-02
kind: paper
summary: "우세 세포만 취하던 방식 대신 전체 세포 구성 비율을 활용해 공간 구역을 클러스터링한다."
sourceName: "Journal of computational biology : a journal of computational molecular cell biology"
sourceUrl: "https://doi.org/10.1177/15578666261491611"
journal: "Journal of computational biology : a journal of computational molecular cell biology"
doi: "10.1177/15578666261491611"
authors: ["Edula CSR", "Sun Y", "Zhang X"]
topics: ["공간전사체", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

공간전사체 디콘볼루션 분석 후 공간 영역을 정의할 때, 각 스팟에서 가장 비율이 높은 세포 종류만 남기고 나머지 조성 정보를 버리는 방식이 주로 사용된다. 이 과정에서 스팟 내부의 복잡한 세포 구성 신호가 손실되는 문제가 있다. stPularity는 디콘볼루션 결과로 나오는 세포 비율 벡터와 공간 좌표를 직접 활용해 손실 없이 공간 구역을 클러스터링하는 도구다.

## 무엇을 했나

- 공간 좌표를 바탕으로 평활화한 세포 비율 데이터로 k-NN 그래프를 구축하고, 모듈러리티와 정규화 엔트로피 순도를 동시에 고려하는 개작된 Louvain 알고리즘을 적용했다.
- 레이블이 없는 내부 지표 기반의 베이즈 최적화를 도입해 하이퍼파라미터와 클러스터 수 결정 과정을 자동화했다.
- 4개의 벤치마크 데이터셋 평가에서 기존 우세 세포 할당 방식 대비 3개 데이터셋에서 ARI를 0.14~0.26 높였다.
- 디콘볼루션 결과에 인위적인 노이즈를 주입한 조건에서도 우세 세포 할당 방식보다 공간 구조를 안정적으로 복원했다.

## 왜 눈여겨볼 만한가

전체 발현량 행렬을 재처리하는 공간 클러스터링 도구들에 비하면 절대적인 ARI 수치는 낮을 수 있으나, 이미 디콘볼루션이 끝난 데이터에서 추가적인 전사체 재처리 없이 저차원(4~38개 세포 타입)에서 빠르게 구역을 정의할 수 있다. 세포 비율 기반 정보와 유전자 발현 PCA 정보는 상호보완적이므로, 디콘볼루션 후속 파이프라인에서 버려지던 세포 구성 벡터로부터 해석 가능한 공간 구조를 신속히 확인하려는 상황에 유용할 것으로 보인다.

## 원문

- [Journal of computational biology : a journal of computational molecular cell biology](https://doi.org/10.1177/15578666261491611) · DOI 10.1177/15578666261491611
