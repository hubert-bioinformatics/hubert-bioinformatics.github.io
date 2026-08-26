---
title: "GWAS 연관 변이와 LD 변이의 기능을 자동 주석화하는 SNPannotator"
date: 2026-08-24
kind: paper
summary: "GTEx, eQTL Catalog 등 외부 DB를 연계해 eQTL·sQTL 및 기능 농축 결과를 보고서로 통합한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag603"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag603"
authors: ["Ani A", "Nolte IM", "Kamali Z", "Snieder H", "Vaez A"]
topics: ["생물정보학", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

GWAS를 통해 질환 연관 리드 변이는 다수 발굴되었으나, 연관 불균형(LD) 상태에 있는 변이들까지 포함해 그 생물학적 기전과 기능을 일일이 규명하는 작업은 여전히 번거롭다. SNPannotator는 리드 변이와 high LD 관계인 프록시 변이를 자동 추출하고, 다중 DB에서 주석 정보를 수집해 파이프라인 형태로 종합 보고서를 생성하는 R 기반 도구다.

## 무엇을 했나

- 리드 변이와 연관 불균형(LD) 상태에 있는 프록시(proxy) 변이들을 자동으로 탐색하는 멀티스텝 파이프라인을 구축했다.
- Ensembl, GTEx Portal, eQTL Catalog, STRING DB 등을 조회하여 게놈 위치, 유해성 예측, 조절 영역 주석, eQTL 및 sQTL 정보를 수집했다.
- 수집된 변이 정보를 기반으로 기능적 농축 분석(enrichment analysis)을 수행하고 결과를 사용자용 보고서 형태로 출력하도록 설계했다.
- R 패키지(CRAN, GitHub) 및 웹 기반 인터페이스로 구현하여 변이 조회와 LD 탐색 기능을 손쉽게 활용할 수 있게 했다.

## 왜 눈여겨볼 만한가

Post-GWAS 분석 시 여러 데이터베이스를 개별 방문하여 리드 변이 및 프록시 변이의 eQTL·sQTL 영향성을 일일이 집계하던 과정을 R 환경에서 자동화할 수 있다. 대규모 GWAS 데이터에서 후속 기능 검증(functional validation)을 진행할 후보 변이의 우선순위를 1차 스크리닝할 때 유용할 것으로 보인다. 다만 공공 DB 쿼리 기반 구조이므로, 조직 특이적 eQTL이나 최신 커스텀 데이터셋을 다룰 때는 별도의 파이프라인 연동 과정을 검토할 필요가 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag603) · DOI 10.1093/bioinformatics/btag603
