---
title: "롱리드 시퀀싱 기반 마우스 뇌 조직 전전체 메틸화 분석 프로토콜"
date: 2026-10-08
kind: paper
summary: "HMW DNA 추출부터 modBAM 기반 차등 메틸화 영역 도출 및 기능 분석까지 포함하는 파이프라인이다."
sourceName: "STAR protocols"
sourceUrl: "https://doi.org/10.1016/j.xpro.2026.104827"
journal: "STAR protocols"
doi: "10.1016/j.xpro.2026.104827"
authors: ["Yaman Ü", "Gustavsson E", "Lee J", "Ugolini H", "Macpherson H", "Mumford P", "Wiseman F", "Hardy J"]
topics: ["생물정보학", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

기존의 바이설파이트 치환 방식은 DNA 손상과 라이브러리 편향을 유발해 전전체 수준의 온전한 메틸화 관찰에 어려움이 있었다. 3세대 롱리드 시퀀싱은 화학적 변환 없이 5mC를 직접 판독할 수 있으나, 생체 조직에서 시퀀싱 및 데이터 분석까지 연결되는 표준 프로토콜은 드물었다. 본 연구는 알츠하이머 마우스 모델의 피질 조직을 활용해 HMW DNA 추출부터 DMR 분석까지 이어지는 일련의 워크플로우를 정리했다.

## 무엇을 했나

- 알츠하이머 병리 모델(AppNL-G-F) 마우스의 피질 조직에서 High-Molecular-Weight(HMW) DNA를 추출하고 롱리드 시퀀싱을 진행했다.
- 바이설파이트 처리 없이 롱리드 신호에서 직접 5-메틸시토신(5mC) 변형 정보를 확보했다.
- 변형 베이스 정보가 포함된 modBAM 파일로부터 차등 메틸화 영역(DMR)을 선별하고 주석화하는 파이프라인을 구축했다.
- 선별된 DMR을 바탕으로 유전자 기능 풍부도(functional enrichment) 분석까지 연계되는 재현 가능한 파이프라인을 검증했다.

## 왜 눈여겨볼 만한가

바이설파이트 변환에 따른 데이터 손실이나 숏리드 분석의 매핑 한계를 극복하고 게놈 전반의 5mC를 직접 관찰할 때 유용한 참고 자료가 될 수 있다. 다만 롱리드 시퀀싱 특성상 시초 단계에서 고품질 HMW DNA 수득이 필수적이므로 조직 수집 및 추출 전처리 수준이 결과의 품질을 좌우할 것으로 보인다. ONT나 PacBio 기반으로 modBAM을 활용한 메틸화 분석 환경을 내제화하려는 연구실에서 실험·인포매틱스 절차를 벤치마킹하기에 적합하다.

## 원문

- [STAR protocols](https://doi.org/10.1016/j.xpro.2026.104827) · DOI 10.1016/j.xpro.2026.104827
