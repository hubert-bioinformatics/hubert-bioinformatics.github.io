---
title: "나노포어 WGS 기반 인간 반복 서열·메틸화 통합 분석 파이프라인 ECHO"
date: 2026-09-01
kind: paper
summary: "Snakemake 기반으로 단일 분자 롱리드 데이터를 활용해 하플로타입별 반복 서열 변이와 메틸화 프로파일을 일괄 처리한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag648"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag648"
authors: ["Poggiali B", "Putzeys L", "Andersen JD", "Vidaki A"]
topics: ["생물정보학", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

인간 게놈의 상당 부분을 차지하는 반복 서열(Repeatome)은 유전자 조절과 질환에 중요한 역할을 하지만, 기존 분석 환경에서는 다양한 반복 서열 형태를 한 번에 통합 분석하기 어려웠다. 옥스포드 나노포어 시퀀싱의 발전으로 메틸화와 하플로타입 정보를 포함한 롱리드 데이터 활용이 가능해졌으나 이를 다루는 일체형 파이프라인은 부족했다. 연구진은 나노포어 전전체 시퀀싱 데이터로부터 반복 서열의 유전 및 에피유전 변이를 자동 분석하는 Snakemake 기반 워크플로우 ECHO를 개발했다.

## 무엇을 했나

- 옥스포드 나노포어 전전체 시퀀싱(WGS) 데이터를 입력받아 전처리부터 최종 분석까지 수행하는 Snakemake 기반 자동화 파이프라인을 구축했다.
- 인간 게놈 전반에 존재하는 다양한 반복 서열 요소를 대상으로 서열 변이와 DNA 메틸화 수준을 동시에 파악하도록 구성했다.
- 하플로타입 구분(haplotype-resolved) 정보를 반영하여 반복 영역 내 유전적·에피유전적 변이를 종합적으로 평가할 수 있는 분석 환경을 제공한다.

## 왜 눈여겨볼 만한가

반복 서열 분석 시 개별 요소마다 다른 도구를 엮어 쓰던 번거로움을 줄이고 워크플로우의 재현성을 확보하는 데 유용하다. ONT WGS 데이터를 이미 다루고 있거나 Repeatome 영역의 에피유전체 변화를 탐색하려는 연구실에서 우선적으로 검토해 볼 만하다. 다만 파이프라인 성능이 나노포어 데이터의 뎁스와 리드 길이에 크게 좌우되므로, 안정적인 하플로타입 분해능을 얻으려면 고품질 롱리드 데이터 확보가 선행되어야 할 것으로 보인다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag648) · DOI 10.1093/bioinformatics/btag648
