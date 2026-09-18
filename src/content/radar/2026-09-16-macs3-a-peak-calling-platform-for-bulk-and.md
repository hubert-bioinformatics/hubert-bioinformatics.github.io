---
title: "단일세포와 벌크 데이터 피크 콜링을 통합한 MACS3"
date: 2026-09-16
kind: paper
summary: "scATAC-seq 프래그먼트 파일 직가공과 클러스터별 피크 콜링 모듈을 추가해 기능을 확장했다."
sourceName: "Genomics, proteomics & bioinformatics"
sourceUrl: "https://doi.org/10.1093/gpbjnl/qzag097"
journal: "Genomics, proteomics & bioinformatics"
doi: "10.1093/gpbjnl/qzag097"
authors: ["Doherty P", "Hu Q", "Zhuang Z", "Zhang H", "Penikalapati SC", "Liu S", "Liu T"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

기존 MACS는 bulk ChIP-seq 데이터 중심으로 설계되어 scATAC-seq과 같은 단일세포 수준의 대용량 프래그먼트 데이터를 직접 처리하기 어려웠다. MACS3는 동적 국소 배경소음 추정 및 피크 정제라는 기존 프레임워크를 유지하면서 단일세포 워크플로우를 파이프라인 내로 직접 끌어왔다.

## 무엇을 했나

- 기존 MACS의 조각 쌓기(fragment pileup), 동적 국소 배경소음 계산, 통계적 농축 검정 알고리즘을 유지하면서 소프트웨어 구조를 개편했다.
- Paired-end 및 프래그먼트 파일 포맷을 지원하고, scATAC-seq 프래그먼트 파일에서 세포 바코드에 기반한 pseudobulk 및 클러스터 수준 피크 콜링을 구현했다.
- ATAC-seq 신호 처리 모듈과 변이 검출(variant calling) 기능을 추가하고 command-line 및 Python 시퀀싱 API 인터페이스를 제공한다.

## 왜 눈여겨볼 만한가

scATAC-seq 파이프라인 구축 시 별도의 개별 분할 스크립트나 BAM 변환 과정 없이, 프래그먼트 파일과 바코드 정보만으로 클러스터별 피크 콜링을 직접 수행할 수 있어 분석 공정이 단순해진다. 다만 기본 피크 검출 알고리즘 자체는 통계적 농축 검정 프레임워크를 공유하므로, 시그널이 매우 희소한 세포군에서는 분석 전 바코드 그룹핑이나 품질 관리 수준에 영향을 받을 것으로 보인다.

## 원문

- [Genomics, proteomics & bioinformatics](https://doi.org/10.1093/gpbjnl/qzag097) · DOI 10.1093/gpbjnl/qzag097
