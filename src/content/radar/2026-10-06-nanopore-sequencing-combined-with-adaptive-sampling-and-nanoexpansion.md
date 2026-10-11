---
title: "나노포어 적응형 샘플링과 NanoExpansion을 이용한 반복 확장 질환 분석"
date: 2026-10-06
kind: paper
summary: "타겟 나노포어 시퀀싱과 전용 파이썬 툴로 STR 확장과 서열 중단을 정확히 분석한다."
sourceName: "NAR genomics and bioinformatics"
sourceUrl: "https://doi.org/10.1093/nargab/lqag117"
journal: "NAR genomics and bioinformatics"
doi: "10.1093/nargab/lqag117"
authors: ["Morandi L", "Casadei F", "De Fanti S", "Bonan L", "Ravaioli F", "Palombo F", "Fiorentino A", "de Pasqua S"]
topics: ["시퀀싱 기술", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

기존 단축 리드 시퀀싱이나 전통적인 PCR 방식은 긴 짧은 tandem repeat(STR) 확장 부위를 정확히 해독하는 데 한계가 있었다. 본 연구는 나노포어 적응형 샘플링(adaptive sampling)과 전용 분석 툴인 NanoExpansion을 결합해 이러한 반복 확장 질환을 정밀하게 특성화하는 파이프라인을 제시한다.

## 무엇을 했나

- 근긴장성 디스트로피 1·2형, ALS, 헌팅턴병 등 총 132명의 임상 검체를 대상으로 나노포어 GridION 및 PromethION 플랫폼에서 적응형 샘플링을 수행했다.
- 확장된 대립유전자 크기를 측정하고 서열 중단(sequence interruptions)을 검출하기 위해 파이썬 기반 툴인 NanoExpansion을 개발했다.
- 비교를 위해 롱-PCR 시퀀싱도 함께 진행하여 성능을 대조했다.
- 알려진 양성 검체의 변이를 모두 정확히 검출했으며, 미확인 SCA 및 CANVAS 환자 군에서도 원인 변이를 식별했다.

## 왜 눈여겨볼 만한가

롱-PCR 방식이 800개가 넘는 반복 서열을 과소평가하는 경향을 보이는 반면, 이 파이프라인은 긴 리드의 장점을 살려 대립유전자 크기와 내부 서열 중단까지 포착해 낸다. 다만 GridION이나 PromethION 장비에서 적응형 샘플링을 세팅해야 하므로, 기존 숏리드 중심의 임상 진단 워크플로에 도입하려면 별도의 나노포어 인프라와 생물정보학 파이프라인 구축이 선행되어야 할 것으로 보인다.

## 원문

- [NAR genomics and bioinformatics](https://doi.org/10.1093/nargab/lqag117) · DOI 10.1093/nargab/lqag117
