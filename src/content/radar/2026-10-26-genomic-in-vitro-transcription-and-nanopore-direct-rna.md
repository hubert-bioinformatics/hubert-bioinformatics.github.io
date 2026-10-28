---
title: "나노포어 direct RNA 시퀀싱을 위한 게놈 기반 IVT 음성 대조군"
date: 2026-10-26
kind: paper
summary: "인간 세포주 gDNA의 in vitro 전사체로 나노포어 DRS의 RNA 수정 검출 오인율을 측정했다."
sourceName: "GigaScience"
sourceUrl: "https://doi.org/10.1093/gigascience/giag098"
journal: "GigaScience"
doi: "10.1093/gigascience/giag098"
authors: ["Tzadikario T", "Akeson S", "Dorer S", "Esfahani NG", "Stein AJ", "Kakhaki PD", "Choudhary U", "Amar K"]
topics: ["시퀀싱 기술", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

나노포어 direct RNA 시퀀싱(DRS)에서 RNA 수정(modification)을 정확히 검출하려면 신뢰할 수 있는 음성 대조군이 필수적이지만, 표준화된 벤치마크 데이터가 부족했다. 이번 연구는 표준 뉴클레오티드로만 구성된 in vitro 전사(IVT) RNA를 이용해 수정 검출 모델의 위양성률을 평가할 수 있는 기준점을 제시한다.

## 무엇을 했나

- 인간 B-림프구 세포주의 게놈 DNA를 주형으로 삼아 in vitro 전사(IVT)를 진행해 표준 뉴클레오티드로만 구성된 RNA를 합성했다.
- 제작된 IVT RNA 샘플을 나노포어 direct RNA 시퀀싱(DRS)으로 분석했다.
- 시퀀싱 결과물에 Dorado modification calling 모델을 적용했다.
- 8가지 주요 RNA 수정을 대상으로 9-mer 서열 특이적 위양성률(false-positive rate)을 산출했다.

## 왜 눈여겨볼 만한가

RNA 수정 검출 알고리즘을 개발하거나 평가할 때, 생물학적 수정이 전혀 없는 순수한 '진짜 음성(true negative)' 대조군 데이터로 활용하기에 적절하다. 특히 9-mer 단위의 서열별 위양성률을 제공하므로, 특정 k-mer 컨텍스트에서 모델이 위양성을 내는 경향을 파악하는 데 유용하다. 다만 실제 세포 유래 RNA가 아닌 IVT RNA이므로, 2차 구조나 전사 후 변형의 복잡성을 완벽히 반영하기에는 한계가 있어 목적에 맞는 선별적용이 필요하다.

## 원문

- [GigaScience](https://doi.org/10.1093/gigascience/giag098) · DOI 10.1093/gigascience/giag098
