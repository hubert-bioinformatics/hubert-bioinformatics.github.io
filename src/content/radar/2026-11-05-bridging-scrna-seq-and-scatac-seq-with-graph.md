---
title: "그래프 도메인 적응 기반 scATAC-seq 세포형 주섭 모델 scGDA"
date: 2026-11-05
kind: paper
summary: "독립적 k-NN 그래프와 이중 GNN으로 과보정을 줄이고 단일세포 염색질 접근성을 정밀하게 분류한다"
sourceName: "IEEE transactions on neural networks and learning systems"
sourceUrl: "https://doi.org/10.1109/TNNLS.2026.3747934"
journal: "IEEE transactions on neural networks and learning systems"
doi: "10.1109/TNNLS.2026.3747934"
authors: ["Liu Y", "Xia Y", "Yan H", "Shen LC", "Zhu YH", "Qiang JP", "Wei G", "Wu XD"]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

scATAC-seq 데이터의 세포형 주섭은 scRNA-seq과의 양식 간 격차로 인해 정확한 레이블 이전이 쉽지 않다. 기존의 교차 오믹스 레이블 전파 방식은 과도한 보정을 유발해 실제 생물학적 변이성을 가리는 문제가 존재했다. 본 연구는 그래프 도메인 적응 프레임워크인 scGDA를 제안하여 양식별 구조적 표현 학습과 교차 양식 정렬을 동시에 달성한다.

## 무엇을 했나

- scRNA-seq과 scATAC-seq 데이터셋에 대해 각각 독립적인 k-최근접 이웃(k-NN) 그래프를 구축했다.
- 이중 그래프 신경망(GNN) 모듈을 적용해 각 오믹스 내부의 국소적 및 전역적 구조 특성을 포착했다.
- 추출된 오믹스별 표현을 공유 임베딩 공간에서 정렬하여 scRNA-seq 표지를 scATAC-seq으로 이전했다.
- 다양한 벤치마크 데이터셋 테스트를 통해 기존 교차 오믹스 레이블 전파 기법 대비 우수한 분류 정확도를 입증했다.

## 왜 눈여겨볼 만한가

scATAC-seq 단독 주섭 시 Peak 데이터의 희소성으로 분류가 불확실할 때 짝지어진 scRNA-seq 레퍼런스를 안정적으로 활용할 수 있는 대안이다. 기존 도메인 적응 기법이 세부 세포군 간 생물학적 차이까지 뭉개버리던 과보정 문제를 그래프 구조 보존으로 완화한 점이 실무적으로 유용하다. 다만 이중 GNN 학습과 k-NN 그래프 생성에 따른 계산 부하가 존재하므로 대규모 데이터셋 처리 시 메모리 및 속도 측면의 검증이 필요해 보인다.

## 원문

- [IEEE transactions on neural networks and learning systems](https://doi.org/10.1109/TNNLS.2026.3747934) · DOI 10.1109/TNNLS.2026.3747934
