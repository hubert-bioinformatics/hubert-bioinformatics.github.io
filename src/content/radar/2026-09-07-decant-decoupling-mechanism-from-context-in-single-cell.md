---
title: "단일세포 약물 반응에서 세포 맥락과 작용기전을 분리하는 DECANT"
date: 2026-09-07
kind: paper
summary: "세포주, 투여량, 처리 시간에 따른 노이즈를 줄이고 약물 고유의 작용기전 임베딩을 추출한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag662"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag662"
authors: ["Qi R", "Teng W", "Yang X", "Cheng Y", "Shaytan AK", "Liu B"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 약물 스크리닝 데이터는 세포주 정체성, 투여량, 처리 시간 등 다양한 맥락 변수가 약물 고유의 전사체 반응과 뒤엉켜 있다. 이로 인해 기존 반응 예측 모델들은 일반화 가능한 약물 기전보다 맥락 정보에 편향된 잠재 공간을 학습하는 한계가 있었다. DECANT는 대조군과 처치군 세포 집합을 쌍으로 매칭해 맥락 정보와 작용기전 표현을 분리하는 학습 구조를 제시한다.

## 무엇을 했나

- 대조군과 처치군 단일세포 집합을 매칭하여 맥락 정보를 억제하고 기전에 정렬된 약물 표현을 분리 학습하는 DECANT 모델을 구축했다.
- 미학습 화합물(unseen compound) 조건의 벤치마크 환경에서 기존 스크리닝 예측 모델 및 슈도벌크 베이스라인과 유전자·프로그램 수준 예측 성능을 비교했다.
- DECANT는 기존 모델 대비 가장 우수한 전사체 반응 예측 성능을 기록했으며, 세포주·용량·처리 시간이 달라져도 임베딩 구조가 안정적으로 유지됨을 확인했다.
- 생성된 약물 임베딩 공간이 동일 작용기전 패밀리별로 인접하게 형성되고 하위 생물학적 프로그램과 잘 연동됨을 확인했다.

## 왜 눈여겨볼 만한가

신약 스크리닝이나 화합물 재창출 시 특정 세포주나 투여 조건에 편향되지 않은 공통 작용기전을 파악하려 할 때 유용한 접근이다. 단순 전사체 반응 예측에 그치지 않고 임베딩 공간에서 유사 약물 검색과 생물학적 기전 해석이 함께 가능하지만, 인비트로 스크리닝 데이터를 벗어나 복잡한 조직 미세환경 수준의 맥락까지 분리할 수 있는지는 검증이 필요하다. 공개 웹서버와 코드가 제공되므로 대규모 단일세포 섭동 데이터를 다루는 연구에서 화합물 우선순위 선정 도구로 검토해 볼 만하다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag662) · DOI 10.1093/bioinformatics/btag662
