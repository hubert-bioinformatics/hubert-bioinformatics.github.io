---
title: "노이즈에 강한 대규모 전사체 양방향 군집화 알고리즘 NoiBic"
date: 2026-10-07
kind: paper
summary: "최장 공통 부분 수열 기반 시드 탐색으로 노이즈 환경에서도 기능 모듈을 찾는다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag743"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag743"
authors: ["Long C", "Li J", "Liu B", "Sun D", "Li G"]
topics: ["단일세포", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

대규모 전사체 데이터에서 유전자 기능 모듈을 찾을 때, 기술적·생물학적 노이즈는 일관된 발현 패턴을 가려 군집화의 정확도를 떨어뜨린다. 이 연구에서는 노이즈가 심한 조건에서도 의미 있는 바이클러스터를 찾아내기 위한 새로운 알고리즘을 제안한다.

## 무엇을 했나

- 최장 근사 공통 부분 수열(LACS) 기반의 시드 식별 전략과 노이즈 인식 열 확장 기법을 결합한 NoiBic 알고리즘을 개발했다.
- Bicluster 응집도, 매트릭스 크기, 노이즈 수준 등을 조절한 시뮬레이션 데이터셋에서 숨겨진 바이클러스터를 정확하게 복원하는 성능을 확인했다.
- 특히 노이즈가 많고 겹침이 존재하는 조건에서 우수한 복원력을 보였다.
- Bulk 및 scRNA-seq 데이터셋 적용을 통해 생물학적으로 의미 있는 유전자 모듈과 세포 타입 연관 바이클러스터를 식별해 냈다.

## 왜 눈여겨볼 만한가

기존 알고리즘들이 대규모 전사체나 단일세포 데이터의 높은 노이즈와 드롭아웃 앞에서 일관된 패턴을 놓치던 문제를 보완하는 도구다. C++17로 구현되어 대용량 데이터 처리 속도 면에서 유리할 것으로 보이나, 실제 scRNA-seq 분석 파이프라인에 기존의 UMAP/t-SNE 기반 Seurat 워크플로우를 대체하거나 보완하여 얼마나 실효성이 있을지는 직접 데이터에 돌려보며 검증이 필요하다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag743) · DOI 10.1093/bioinformatics/btag743
