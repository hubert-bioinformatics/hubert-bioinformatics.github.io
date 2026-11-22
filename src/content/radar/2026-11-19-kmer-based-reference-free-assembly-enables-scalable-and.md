---
title: "참조 유전체 없이 RNA-Bloom으로 scRNA-seq 분석하기"
date: 2026-11-19
kind: paper
summary: "k-mer 기반 de novo 어셈블러 RNA-Bloom으로 레퍼런스 없는 종의 세포군 구조와 주석을 복원한다."
sourceName: "Chromosome research : an international journal on the molecular, supramolecular and evolutionary aspects of chromosome biology"
sourceUrl: "https://doi.org/10.1007/s10577-026-09825-2"
journal: "Chromosome research : an international journal on the molecular, supramolecular and evolutionary aspects of chromosome biology"
doi: "10.1007/s10577-026-09825-2"
authors: ["Liu B", "Guo L", "Ma F", "Bao Y", "Liang C", "Zhang W"]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

scRNA-seq 분석은 고품질 참조 유전체에 의존하므로 비모델 생물 연구에 제약이 컸다. 기존 de novo 어셈블러는 3' 편향되고 희소한 단일세포 시퀀싱 데이터 처리 시 성능이 저하되는 문제가 있다. 이 연구에서는 k-mer 기반 어셈블러 RNA-Bloom을 적용해 참조 유전체 없는 scRNA-seq 분석 파이프라인의 성능과 확장성을 평가했다.

## 무엇을 했나

- 단일세포 데이터에 특화된 multi-k-mer de Bruijn 그래프 기반 어셈블러 RNA-Bloom을 적용해 파이프라인을 구축했다.
- 사람 유방암 데이터셋을 활용해 Trinity 및 레퍼런스 기반 Cell Ranger 파이프라인과 어셈블리 품질 및 세포군 보존성을 비교했다.
- 약 18,000개 세포 데이터셋에서 스케일러빌리티를 검증하고 소 데이터셋에 적용해 비모델 생물로의 확장성을 확인했다.

## 왜 눈여겨볼 만한가

참조 유전체가 구축되지 않은 비모델 생물의 scRNA-seq 연구에서 현실적인 분석 대안이 될 수 있다. 레퍼런스 기반 분석에 비해 세포당 검출되는 유전자 수가 다소 적다는 한계가 있으나, 주요 세포군 구조 및 주석 정확도는 안정적으로 유지된다. 대용량 세포 데이터셋에서도 계산 확장성을 확보했으므로 레퍼런스가 부재한 환경에 한해 우선 검토해 볼 만하다.

## 원문

- [Chromosome research : an international journal on the molecular, supramolecular and evolutionary aspects of chromosome biology](https://doi.org/10.1007/s10577-026-09825-2) · DOI 10.1007/s10577-026-09825-2
