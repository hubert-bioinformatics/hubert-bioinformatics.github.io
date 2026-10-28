---
title: "세포 마커 데이터베이스 CellMarker 3.0 업데이트"
date: 2026-10-27
kind: paper
summary: "사람과 마우스의 수동 큐레이션 및 알고리즘 예측 마커를 통합하고 웹 분석 도구를 확장했다."
sourceName: "Nucleic acids research"
sourceUrl: "https://doi.org/10.1093/nar/gkag1040"
journal: "Nucleic acids research"
doi: "10.1093/nar/gkag1040"
authors: ["Hu C", "Li T", "Zhu M", "Li L", "Ren B", "Yang K", "Wang Z", "Li M"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 및 공간전사체 분석에서 세포 주석(cell type annotation)을 수행할 때 신뢰할 수 있는 레퍼런스 마커를 찾는 일은 여전히 손이 많이 가는 작업이다. 기존 데이터베이스들은 수동 큐레이션 중심이거나 최신 알고리즘의 예측 결과를 포괄하는 데 한계가 있었다.

## 무엇을 했나

- 기존 버전 대비 274개 조직, 1877개 세포 타입, 64,040개의 마커를 추가하여 총 930개 조직과 4,455개 세포 타입의 정보를 구축했다.
- Spapros, Seurat FindAllMarkers, SEMITONES, Cepo, CelliD, COSG 등 6가지 알고리즘으로 도출된 컴퓨터 예측 마커를 새롭게 포함했다.
- CEL-Seq2와 SNARE-seq 등 168종의 시퀀싱 기술에서 나온 마커 정보를 통합하고 단백질 코딩 유전자 외에 rRNA와 위유전자(pseudogene)까지 범위를 넓혔다.
- 기존 scRNA-seq 분석 모듈을 최적화하고 Spatial Expression과 Spatial Chat 등 두 개의 공간전사체 분석 모듈을 새로 추가했다.

## 왜 눈여겨볼 만한가

수동 큐레이션 마커와 주요 알고리즘의 예측 마커가 함께 정리되어 있어 scRNA-seq 및 Visium·Xenium 같은 공간전사체 데이터의 cell type annotation 과정에서 교차 검증용으로 활용하기에 적당해 보인다. 다만 웹 기반 분석 도구의 성능이나 대규모 데이터 처리 속도 측면에서 실제 현업 파이프라인을 대체하기보다는 보조적인 레퍼런스 탐색 용도로 검토해 볼 만하다.

## 원문

- [Nucleic acids research](https://doi.org/10.1093/nar/gkag1040) · DOI 10.1093/nar/gkag1040
