---
title: "동질성 가정의 한계를 극복하는 scRNA-seq 세포 군집화 방법"
date: 2026-10-09
kind: paper
summary: "복잡한 세포 구조로 인한 저동질성 영역의 오류를 해결하기 위해 스펙트럼 분포 정렬과 대조 학습을 적용했다."
sourceName: "IEEE transactions on computational biology and bioinformatics"
sourceUrl: "https://doi.org/10.1109/TCBBIO.2026.3742164"
journal: "IEEE transactions on computational biology and bioinformatics"
doi: "10.1109/TCBBIO.2026.3742164"
authors: ["Dong R", "Shu Z", "Bai Y", "Tan K", "Wang H"]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

기존 그래프 대조 학습 기반의 scRNA-seq 세포 군집화 방법들은 인접 세포가 유사한 생물학적 특성을 가준다는 동질성(homophily) 가정에 의존해 왔다. 하지만 실제 scRNA-seq 데이터는 복잡하고 이질적인 세포 구조로 인해 이러한 가정이 자주 깨지며, 저동질성 영역에서 잘못된 연결이 생겨 군집화 성능이 떨어지는 문제가 있었다. 이 연구는 동질성 가정의 한계를 보완하기 위해 스펙트럼 분포 정렬을 결합한 새로운 대조 학습 프레임워크인 scHCL-SDA를 제안한다.

## 무엇을 했나

- 원본 발현 행렬에서 발현 뷰를 구성하고, 그래프 유도 다중 노이즈 필터링을 통해 증강 뷰를 생성했다.
- 크로스 뷰 분포 이동 문제를 해결하고 표현 일관성을 높이기 위해 스펙트럼 분포 정렬 메커니즘을 도입했다.
- 거짓 음성 샘플의 간섭을 줄이기 위해 Debiased InfoNCE 대조 학습과 점진적 융합 전략을 적용했다.
- 저동질성 그래프의 구조적 노이즈를 줄이기 위해 적응형 동질성 인식 일관성 대조 학습 메커니즘을 설계했다.

## 왜 눈여겨볼 만한가

이 방법은 이질성이 높은 scRNA-seq 데이터에서 그래프 구조의 노이즈와 잘못된 네거티브 샘플 문제를 동시에 다루려 시도한다. 다만 실제 임상 및 단일세포 코호트 데이터의 대규모 노이즈 환경에서 기존 알고리즘 대비 실질적인 클러스터링 해상도 개선 폭이 얼마나 되는지는 직접 코드를 구동하여 추가 검증이 필요해 보인다. 소스 코드가 공개되어 있으므로 복잡한 이질성을 가진 데이터셋을 다룰 때 기존 그래프 기반 툴의 대안으로 비교해 볼 만하다.

## 원문

- [IEEE transactions on computational biology and bioinformatics](https://doi.org/10.1109/TCBBIO.2026.3742164) · DOI 10.1109/TCBBIO.2026.3742164
