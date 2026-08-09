---
title: "대사체 시그니처를 유전자 경로로 변환하는 hypeR-GEM"
date: 2026-08-08
kind: paper
summary: "GEM을 기반으로 대사물질을 효소 유전자에 매핑해 대사체 데이터의 GSEA 분석을 가능하게 한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag588"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag588"
authors: ["Huang Z", "Perls T", "Sebastiani P", "Segrè D", "Monti S"]
topics: ["오믹스", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

대사체학 분석은 유전자 중심의 생물학 지식 DB와 직접 연결하기 어려워 경로 해석 및 다중 오믹스 통합에 한계가 존재했다. 연구진은 전신 대사 모델(GEM)을 활용해 대사물질을 반응 기반의 효소 부호화 유전자 시그니처로 변환하는 hypeR-GEM을 개발했다. 이를 통해 대사체 데이터에서도 유전자 세트 풍부화 분석(GSEA)을 직접 수행할 수 있게 되었다.

## 무엇을 했나

- GEM(Genome-scale metabolic models)을 이용해 대사물질과 효소 코딩 유전자 간 반응 관계를 추론하는 R 패키지 hypeR-GEM을 구축했다.
- 짝지어진 대사체-전사체 및 대사체-단백질체 데이터셋을 통해 매핑된 효소 유전자와 경로가 실제 DEG/DEP 결과와 일치하는지 검증했다.
- 고령화 관련 대사체 데이터(New England Centenarian Study)에 적용하여 지질 대사 경로 및 기존 대사물질 주석에서 누락된 신규 경로를 발굴했다.

## 왜 눈여겨볼 만한가

단백질체나 전사체 데이터 없이 대사체 데이터만 단독으로 보유한 연구에서 기존 유전자 기반 기능 경로 DB를 직접 활용할 수 있는 길이 열렸다. 대사체 시그니처를 유전자 단위로 변환해 주기 때문에 동일 샘플의 RNA-seq이나 단백질체 데이터와 레이어를 맞춰 통합 분석할 때 유용할 것으로 보인다. 다만 GEM 모델에 정의된 대사 반응 네트워크의 완성도와 주석 수준에 의존하므로, 범용 모델에 미포함된 미지 대사물질이나 비효소적 반응에 대해서는 해석 제한이 따를 수 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag588) · DOI 10.1093/bioinformatics/btag588
