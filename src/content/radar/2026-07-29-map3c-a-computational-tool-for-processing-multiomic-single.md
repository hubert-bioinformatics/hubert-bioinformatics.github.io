---
title: "멀티오믹스 단일세포 Hi-C 데이터 전처리 도구 map3C"
date: 2026-07-29
kind: paper
summary: "크로마틴 구조와 전사체나 메틸화 데이터를 동시에 처리하는 파이프라인이다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag562"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag562"
authors: ["Galasso J", "Wang Y", "Alber F", "Ernst J", "Luo C"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

멀티오믹스 단일세포 Hi-C 기법이 등장하면서 구조와 기능을 동시에 보려는 시도가 늘고 있으나, 기존 도구들은 하위 분석에 필요한 기능이 부족한 한계가 있었다. 이번에 공개된 map3C는 이러한 멀티오믹스 scHi-C 데이터의 전처리와 품질 관리를 지원하기 위해 개발되었다.

## 무엇을 했나

- 크로마틴 3차원 구조와 유전자 발현량이나 DNA 메틸화를 동시에 프로파일링하는 멀티오믹스 scHi-C 데이터를 입력 데이터로 활용한다.
- map3C 소프트웨어를 통해 멀티오믹스 단일세포 Hi-C 데이터의 전처리 및 품질 관리(QC)를 수행한다.
- 데이터 내에서 게놈의 구조 변이(structural variant) 위치를 식별하는 기능을 파이프라인에 통합했다.

## 왜 눈여겨볼 만한가

기존 scHi-C 처리 도구들이 다루지 못했던 멀티오믹스 데이터 통합과 구조 변이 탐색을 한 번에 해결할 수 있는 대안이 될 수 있다. 다만, 다양한 멀티오믹스 조합별로 실제 파이프라인 구동 시 요구되는 연산 자원이나 호환성에 대해서는 직접 벤치마크를 돌려보며 검증할 필요가 있어 보인다. 툴은 깃허브를 통해 오픈소스 형태로 사용할 수 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag562) · DOI 10.1093/bioinformatics/btag562
