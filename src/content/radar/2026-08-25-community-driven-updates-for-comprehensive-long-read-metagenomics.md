---
title: "롱리드 조립과 비닝 기능을 강화한 nf-core/mag v5"
date: 2026-08-25
kind: paper
summary: "롱리드 전용 아셈블리와 바이러스·진핵생물 분류 기능이 추가되어 메타제노믹 분석 범위가 넓어졌다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag628"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag628"
authors: ["Alvarez Saravia D", "Rosenbaum A", "Straub D", "Downie J", "Borry M", "Fedewa G", "H Ubner A", "Lundin D"]
topics: ["생물정보학", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

숏리드 중심의 기존 메타제놈 아셈블리 및 비닝 파이프라인은 롱리드 시퀀싱 데이터 처리와 복잡한 분류군 해석에 제약이 있었다. nf-core/mag v5 업데이트는 롱리드 전용 분석 모듈과 비닝 정제(bin refinement) 프로세스를 내장하여 이러한 한계를 다룬다. 신규 비닝 툴과 최신 데이터베이스를 통합해 복잡한 메타제놈 분석 과정의 재현성을 높였다.

## 무엇을 했나

- 롱리드 전용 드 노보 아셈블리(de novo assembly) 기능과 비닝 정제(bin refinement) 모듈을 파이프라인에 새롭게 통합했다.
- 5종의 신규 비닝 도구를 추가하고 최신 데이터베이스 및 품질 평가 툴을 도입해 빈(bin) 검증 체계를 보강했다.
- 분류학적 할당(taxonomic classification) 범위를 기존 세균·고세균 중심에서 바이러스와 진핵생물까지 확장했다.
- 7년 간 커뮤니티 주도로 개발된 파이프라인 코드를 Nextflow 기반의 오픈소스(v5)로 업데이트하여 공개했다.

## 왜 눈여겨볼 만한가

PacBio HiFi나 ONT 롱리드 데이터를 활용해 메타제놈 분석을 수행할 때 별도의 자체 파이프라인을 구축하는 수고를 줄여준다. 복수의 비너(binner) 결과를 조합하고 정제하는 단계를 표준화된 Nextflow 워크플로우 내에서 처리할 수 있다는 점이 유용하다. 다만 신규 툴과 최신 DB가 다양하게 추가된 만큼 분석 환경에 맞춘 연산 자원(CPU·RAM) 할당 최적화가 수반되어야 할 것으로 보인다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag628) · DOI 10.1093/bioinformatics/btag628
