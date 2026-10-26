---
title: "롱리드 전사체와 질량분석 데이터를 통합하는 프로테오게노믹스 파이프라인 LRP2"
date: 2026-10-23
kind: paper
summary: "전사체 동정부터 ORF 예측, 차등 스플라이싱 분석, MS 데이터 검증까지 Nextflow 기반으로 자동화했다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag790"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag790"
authors: ["Schertzer MD", "Lewandowski JT", "Watts EF", "Rosenow W", "Mehlferber MM", "Jeffery ED", "Adamson SI", "Bruand J"]
topics: ["생물정보학", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

롱리드 시퀀싱으로 전사체 전장 구조를 밝힐 수 있게 되었지만, 실제 이 중 어떤 이소폼이 단백질로 번역되는지 질량분석(MS) 데이터와 연계해 검증하는 도구는 파편화되어 있었다. LRP2는 전사체 동정부터 ORF 예측, MS 펩타이드 검증까지 일괄 처리하는 Nextflow 기반 프로테오게노믹스 파이프라인이다. 대규모 롱리드 전사체 데이터와 DDA/DIA MS 데이터를 통합 분석할 수 있도록 구성했다.

## 무엇을 했나

- PacBio Isocall과 SQANTI QC를 결합해 수백 개 샘플 수준에서 기술적 아티팩트를 제거하고 롱리드 전사체 구조를 동정한다.
- CPAT과 SQANTI Protein으로 예측된 단백질 유전체를 분류하고, edgeR·DRIMSeq 및 롱리드용으로 변형된 LeafCutter를 적용해 다중 그룹 간 차등 발현과 이소폼 사용량을 분석한다.
- FragPipe를 연동해 DDA 및 DIA MS 데이터로부터 펩타이드 수준의 번역 증거를 결합하며, 좌표 기반 스플라이스 접합부 식별자를 사용해 데이터셋 간 신규 이소폼을 비교한다.

## 왜 눈여겨볼 만한가

기존에 파편화되어 있던 전사체 이소폼 예측 도구와 프로테오믹스 분석 도구(FragPipe 등)를 하나로 엮어 분석 전 과정을 모듈화했다는 점이 유용하다. 롱리드 RNA-seq과 동일 샘플의 질량분석 데이터를 모두 확보한 연구에서 신규 프로테오폼 검증을 수행할 때 우선 검토해 볼 만하다. 다만 MS 데이터를 포함하지 않는 일반적인 전사체 분석 목적에는 파이프라인 구조가 다소 과할 수 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag790) · DOI 10.1093/bioinformatics/btag790
