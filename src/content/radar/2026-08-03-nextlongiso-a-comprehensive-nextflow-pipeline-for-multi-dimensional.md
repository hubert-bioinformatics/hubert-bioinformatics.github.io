---
title: "롱리드 전사체 다차원 분석을 통합한 Nextflow 파이프라인"
date: 2026-08-03
kind: paper
summary: "PacBio와 ONT 데이터에서 전사체 동정과 스플라이싱, TE 전사 등 하류 분석을 단일 워크플로우로 통합했다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag518"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag518"
authors: ["Tan J", "Wu Y", "Sun Y"]
topics: ["생물정보학", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

롱리드 RNA-seq은 전장 전사체 구조 분석에 유용하지만 분석 도구가 파편화되어 있어 구조 동정부터 조절 기전 해석까지 일관된 분석을 수행하기 어려웠다. 도구 간 데이터 포맷을 정합화하는 과정에서 공수가 크게 들고 통합적 해석에 한계가 존재했다. NextLongIso는 Nextflow 환경에서 PacBio와 ONT 데이터를 받아 전사체 동정과 다양한 하류 조절 분석을 연계 처리하는 통합 파이프라인이다.

## 무엇을 했나

- PacBio 및 Oxford Nanopore 롱리드 RNA-seq 데이터를 모두 지원하는 Nextflow 기반 파이프라인을 구축했다.
- 전사체 재구성(Discovery) 단계와 대립적 스플라이싱(AS) 및 아이소폼 스위칭 분석 모듈을 연동했다.
- 대립적 프로모터 활용 및 다중 아데닐화에 따른 전사체 경계 동역학(Boundary dynamics)을 추적하도록 설계했다.
- 전사체 내 이동성 유전자(Transposable element) 연관 전사 수준까지 단일 파이프라인 내에서 정량화했다.

## 왜 눈여겨볼 만한가

Iso-Seq이나 ONT 전사체 데이터 처리 시 파편화된 도구들을 잇는 데이터 정합화 과정과 핸들링 부담을 줄여줄 것으로 보인다. 전사체 아이소폼 동정에 그치지 않고 프로모터 변형이나 TE 전사 등 복합적인 하류 조절 기전을 한 번에 파악하려 할 때 검토해 볼 만하다. 다만 파이프라인 통합과 재현성 확보에 초점이 맞춰진 연구이므로 개별 분석 알고리즘 자체의 성능 향상 여부는 실제 데이터 세트로 직접 검증할 필요가 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag518) · DOI 10.1093/bioinformatics/btag518
