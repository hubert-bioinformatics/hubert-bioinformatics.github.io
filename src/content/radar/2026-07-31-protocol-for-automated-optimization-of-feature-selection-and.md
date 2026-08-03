---
title: "scAutoTune을 이용한 단일세포 전사체 분석 파라미터 자동 최적화 프로토콜"
date: 2026-07-31
kind: paper
summary: "Grid 기반 탐색과 Silhouette 지표로 Seurat 데이터의 최적 UMAP 및 클러스터를 도출한다."
sourceName: "STAR protocols"
sourceUrl: "https://doi.org/10.1016/j.xpro.2026.104730"
journal: "STAR protocols"
doi: "10.1016/j.xpro.2026.104730"
authors: ["Sun SH", "Pezaris JS"]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

scRNA-seq 분석에서 고가변 유전자 선택과 클러스터링 파라미터 설정은 데이터셋 특성에 따라 크게 좌우되며, 그동안 연구자의 경험적 주관에 의존하는 경우가 많았다. 이 프로토콜은 scAutoTune을 활용해 이러한 탐색 과정을 자동화하고 객관화하는 방안을 제시한다. Grid 기반 탐색과 정량적 평가 지표를 결합하여 데이터셋에 최적화된 하위 분석 환경을 구축할 수 있다.

## 무엇을 했나

- 공개 scRNA-seq 데이터셋으로부터 Seurat 객체를 생성하고 scAutoTune 파이프라인의 실행 환경을 구축했다.
- Harmony 배치 보정 옵션을 포함하여 특성 선택 및 클러스터링 파라미터 조합에 대한 Grid 기반 스위핑(sweeping)을 수행했다.
- Silhouette 기반 성과 지표를 계산하고 GAM(Generalized Additive Model) 평활화 지형을 통해 파라미터 변동에 따른 성능 추이를 시각화했다.
- 도출된 최적 파라미터 설정을 적용하여 해석 가능성이 확보된 UMAP 임베딩 및 클러스터 결과를 생성했다.

## 왜 눈여겨볼 만한가

Seurat 워크플로우에서 고가변 유전자 수나 resolution 값을 주관적으로 정하던 관행에서 벗어나 Silhouette 지표 기반으로 정량화할 수 있다. 파라미터 조합을 탐색하는 Grid sweep 방식 특성상 셀 수가 많거나 범위가 넓어지면 계산 비용이 급증할 수 있으므로 사전 서브샘플링이나 자원 배분이 필요할 수 있다. Harmony 배치 보정을 지원하므로 다중 샘플 scRNA-seq 데이터에서 배치 효과를 다루며 클러스터링 파라미터를 객관적으로 결정하고자 할 때 검토해 볼 만하다.

## 원문

- [STAR protocols](https://doi.org/10.1016/j.xpro.2026.104730) · DOI 10.1016/j.xpro.2026.104730
