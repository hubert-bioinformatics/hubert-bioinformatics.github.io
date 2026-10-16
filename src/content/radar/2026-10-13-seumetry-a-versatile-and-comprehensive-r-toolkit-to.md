---
title: "Seurat 기반 고차원 세포 측정 데이터 분석 툴킷 Seumetry"
date: 2026-10-13
kind: paper
summary: "유동세포술 및 질량세포법 데이터를 Seurat 객체로 통합해 다각도로 분석한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag730"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag730"
authors: ["Borggrewe M", "Flosbach M", "Testa L", "Ly C", "Baumdick M", "Prinz I", "Billeb E", "Bonn S"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

기존의 수동 게이팅 기반 분석은 50개 이상의 파라미터를 동시에 측정하는 고차원 세포 측정 데이터를 처리하는 데 시간이 오래 걸리고 미세 집단을 놓치는 문제가 있었다. 본 연구에서는 단일세포 RNA 시퀀싱 분석 표준인 Seurat의 기능과 세포 측정 데이터 전용 분석법을 결합한 오픈소스 프레임워크 Seumetry를 제시한다.

## 무엇을 했나

- 세포 측정 데이터에 특화된 품질 관리(QC), 시각화, 세포군 존재비 및 단백질 발현 차이 분석 기능을 개발했다.
- 사람 장 조직의 면역 세포를 직접 측정한 복잡한 데이터셋에 Seumetry를 적용해 면역 세포 집단을 정확히 식별했다.
- 공개 데이터셋과의 벤치마킹을 통해 기존 수동 게이팅 결과와 잘 일치함을 확인했다.

## 왜 눈여겨볼 만한가

scRNA-seq 분석 파이프라인에 익숙한 연구자라면 Seurat 객체 기반으로 유동·질량세포법 데이터를 통합 관리할 수 있어 분석 진입 장벽이 낮아질 것으로 보인다. 다만 기존 Seurat 사용자 환경과의 호환성에 의존하므로, 대규모 다중 오믹스 통합 분석 시 파이프라인 구조를 미리 점검해 볼 필요가 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag730) · DOI 10.1093/bioinformatics/btag730
