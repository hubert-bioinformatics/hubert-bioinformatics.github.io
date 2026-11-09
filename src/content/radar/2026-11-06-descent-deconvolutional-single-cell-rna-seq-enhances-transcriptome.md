---
title: "벌크 RNA-seq에서 세포 프로파일을 복원해 암 예후를 예측하는 DeSCENT"
date: 2026-11-06
kind: paper
summary: "scRNA-seq 참조 데이터로 벌크 RNA-seq을 디콘볼루션하여 암 환자의 예후 예측 성능을 개선했다"
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag810"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag810"
authors: ["Zhao Y", "You Z", "Shen Y", "Chu J", "Gong X", "Li T", "Wang Z", "Xu C"]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

scRNA-seq은 종양 이질성을 파악하기에 유리하지만 대규모 임상 예후 정보와 함께 확보하기 어렵다. 반면 벌크 RNA-seq은 예후 데이터가 풍부하지만 세포 수준의 발현 변화를 직접 측정하지 못하는 한계가 있다. 연구진은 벌크 데이터에서 단일세포 수준의 프로파일을 추정하고 이를 결합해 예후 예측력을 높이는 DeSCENT를 제안했다.

## 무엇을 했나

- 벌크 RNA-seq 데이터에서 참조 데이터를 기반으로 세포 수준의 발현 프로파일을 정밀하게 디콘볼루션하는 모델을 개발했다.
- 복원된 세포 프로파일과 원본 벌크 발현형을 결합한 후 8개 TCGA 암 코호트를 대상으로 세 가지 예후 모델에 적용했다.
- 기존 벌크 전사체만 사용한 모델에 비해 평균 C-index와 시간에 따른 AUC 성능이 개선됨을 입증했다.
- 외부 코호트 검증에서도 베이스라인 대비 향상된 C-index를 보였으나 내부 검증에 비해서는 성능 감소가 관찰되었다.

## 왜 눈여겨볼 만한가

임상 예후 데이터가 부족한 scRNA-seq과 세포 해상도가 떨어지는 벌크 RNA-seq의 단점을 상호 보완한 접근법이다. TCGA 등 대규모 벌크 전사체 데이터셋을 보유하고 있으면서 세포 유형별 기여도를 함께 고려해 예후 모델을 고도화하고자 할 때 적용을 검토할 만하다. 다만 예측 오차 측면의 Brier score 결과가 혼재되어 있고 외부 데이터셋 적용 시 성능 저하가 나타나므로 실제 패널 설계나 임상 적용 전 코호트 간 편차에 대한 검증이 필요해 보인다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag810) · DOI 10.1093/bioinformatics/btag810
