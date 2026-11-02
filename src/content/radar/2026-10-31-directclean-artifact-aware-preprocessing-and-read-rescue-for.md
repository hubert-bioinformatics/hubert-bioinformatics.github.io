---
title: "ONT direct-cDNA 전처리 및 리드 구출 툴 DirectClean"
date: 2026-10-31
kind: paper
summary: "기존 Pychopper 대비 높은 리드 보존율을 보이며 키메라 비율을 대폭 낮춘다."
sourceName: "NAR genomics and bioinformatics"
sourceUrl: "https://doi.org/10.1093/nargab/lqag132"
journal: "NAR genomics and bioinformatics"
doi: "10.1093/nargab/lqag132"
authors: ["Guo Q", "Li Y", "Yang R"]
topics: ["시퀀싱 기술", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

ONT direct-cDNA 시퀀싱은 PCR 증폭 없이 전장 전사체를 분석할 수 있으나 역전사 과정에서 다양한 키메라 아티팩트가 발생한다. 기존 전처리 도구는 주로 프라이머 방향 및 어댑터 탐지에 치중해 아티팩트가 포함된 리드를 통째로 버리는 한계가 있었다. DirectClean은 정교한 아티팩트 분류와 접합 부위 기준의 리드 분할 기법을 도입해 손실되는 유효 데이터 비율을 최소화한다.

## 무엇을 했나

- 가닥 방향성 확인, 아티팩트 제거, 복원 가능한 키메라 리드의 접합부 분할 기능을 통합한 DirectClean 파이프라인을 개발했다.
- 4개의 direct-cDNA 데이터셋에서 기존 전처리 도구인 Pychopper와 비교하여 리드 및 베이스 보존율을 평가했다.
- VCaP 데이터셋 적용 결과 raw 데이터의 키메라 비율을 30.9%에서 16.9%로 줄이고 Pychopper(57.6%)보다 높은 65.2%의 리드 보존율을 기록했다.
- 준인공 데이터 및 실제 데이터 분석을 통해 분할 구출된 리드가 신규 트랜스크립트 모델을 편향되게 증가시키지 않음을 검증했다.

## 왜 눈여겨볼 만한가

ONT direct-cDNA 시퀀싱 시 Pychopper 등 기존 파이프라인에서 폐기되던 리드를 구출하여 전체 데이터 효율을 향상시킬 수 있는 대안이다. 템플릿 스위칭이나 내부 어댑터 연결로 왜곡되기 쉬운 아이소폼 재구성 및 유전자 융합 분석의 신뢰도를 한 단계 높이는 데 유용할 것으로 보인다. 다만 리드 분할 과정을 거치므로 융합 유전자 분석 시 거짓 양성(false positive) 여부를 신중히 검토하며 도입하는 것이 바람직하다.

## 원문

- [NAR genomics and bioinformatics](https://doi.org/10.1093/nargab/lqag132) · DOI 10.1093/nargab/lqag132
