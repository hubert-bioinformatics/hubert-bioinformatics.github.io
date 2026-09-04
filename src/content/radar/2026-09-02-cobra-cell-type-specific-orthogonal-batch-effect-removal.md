---
title: "세포 유형별 배치 효과를 직교 보정하는 scRNA-seq 도구 COBRA"
date: 2026-09-02
kind: paper
summary: "전체 유전자 발현 행렬을 유지하여 DEG 분석 등 하류 해석의 정확도를 높인다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag660"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag660"
authors: ["Seo S", "Won S", "Park K"]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

기존 scRNA-seq 배치 보정 알고리즘은 배치 효과가 모든 세포 유형에서 균일하다고 가정하거나, 차원 축소 공간에서 작동해 유전자 발현 정보가 손실되는 한계가 있었다. 또한 보정 과정에서 과도한 계산 자원이 소모되기도 했다. COBRA는 선형 모델을 기반으로 생물학적 변수와 배치를 직교화하여 세포 유형별 배치 효과를 독립적으로 제거한다.

## 무엇을 했나

- 생물학적 변인과 기술적 배치를 분리하기 위해 배치 관련 파라미터를 직교화하는 선형 모델 기반 보정 알고리즘 COBRA를 개발했다.
- 세포 유형 주석이 없는 데이터셋을 위해 배치 효과를 고려하면서 의사 세포 유형(pseudo-cell type)을 추정하는 반복 클러스터링 알고리즘을 도입했다.
- 시뮬레이션 데이터와 함께 제2형 당뇨병 및 COVID-19 환자 샘플의 scRNA-seq 데이터셋을 대상으로 보정 성능을 검증했다.
- 기존 알고리즘 대비 배치 혼합 효율성, 생물학적 군집 구조 보존, DEG(차등 발현 유전자) 검출 정확도에서 우수한 성능을 확인했다.

## 왜 눈여겨볼 만한가

기존 대다수 배치 보정 도구가 PCA 공간 등 차원 축소 데이터 위에서 작동해 보정 후 유전자 수준의 발현 행렬을 직접 활용하기 어려웠던 점을 직접적으로 해결한다. 보정 후에도 전체 유전자 발현 행렬(full gene expression matrix)이 그대로 유지되므로, 통합 데이터셋 기반의 DEG 분석이나 하류 파이프라인 연동에 유용할 것으로 보인다. 다만 선형 모델 프레임워크를 사용하는 특성상 비선형적 배치가 심하게 작용하는 데이터셋에서의 한계 여부는 실무 적용 시 확인이 필요하다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag660) · DOI 10.1093/bioinformatics/btag660
