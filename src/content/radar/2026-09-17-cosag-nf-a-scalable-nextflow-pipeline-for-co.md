---
title: "단일세포 미생물 게놈의 공동 조립과 최적화를 자동화하는 CoSAG-nf"
date: 2026-09-17
kind: paper
summary: "sourmash 기반 클러스터링과 CheckM2 검증을 거쳐 SAG의 완성도를 높이고 오염을 줄인다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag671"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag671"
authors: ["Xu L", "Quan ZX"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 증폭 게놈(SAG)은 미생물 군집 이질성을 파악하는 데 유용하지만, MDA 특유의 단편화와 오염으로 인해 고품질 게놈 재구성이 어렵다. 유사한 SAG를 함께 조립(co-assembly)하면 완성도를 크게 높일 수 있으나, 기존에는 대용량 데이터를 처리할 수 있는 자동화 도구가 없었다. 연구진은 nf-core 표준을 준수하여 SAG 클러스터링, 이상치 제거, 공통 조립까지 전 과정을 자동화한 Nextflow 파이프라인 CoSAG-nf를 제시한다.

## 무엇을 했나

- sourmash의 MinHash 시그니처를 활용해 얼라인먼트 없이 SAG 간 유사도를 계산하고 1차 클러스터링을 수행한다.
- 4염기 서열 빈도(tetranucleotide frequency) 프로파일링을 반복 적용하여 클러스터 내부의 이상치 SAG를 파악하고 제외한다.
- CheckM2 품질 평가를 바탕으로 동적 최적화를 거쳐 게놈 완성도를 극대화하고 오염률을 최소화하는 SAG 조합을 조립한다.
- 컨테이너화된 Nextflow 환경에서 실행되어 HPC 및 클라우드 플랫폼 간 재현성을 보장하고 최종 통합 HTML 리포트를 출력한다.

## 왜 눈여겨볼 만한가

기존에 수작업이나 단발성 스크립트로 처리하던 SAG 공동 조립 과정을 nf-core 규격에 맞춰 대용량으로 처리할 수 있는 길이 열렸다. MDA로 확보한 미생물 단일세포 데이터의 낮은 완성도와 오염 문제를 개선하고 분석 재현성을 확보할 때 유용할 것으로 보인다. 다만 반복적인 CheckM2 평가와 조립 단계가 포함되어 있어 샘플 수가 많을 경우 HPC나 클라우드 연산 자원 배분을 사전 검토해야 한다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag671) · DOI 10.1093/bioinformatics/btag671
