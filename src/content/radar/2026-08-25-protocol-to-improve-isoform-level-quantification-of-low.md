---
title: "STALARD 선택적 증폭 기반 저발현 아이소폼 정량 프로토콜"
date: 2026-08-25
kind: paper
summary: "12사이클 표적 증폭으로 RT-qPCR Cq값을 10~12회 낮추고 나노포어 시퀀싱까지 연결한다."
sourceName: "STAR protocols"
sourceUrl: "https://doi.org/10.1016/j.xpro.2026.104792"
journal: "STAR protocols"
doi: "10.1016/j.xpro.2026.104792"
authors: ["Jeong D", "Park C", "Lee I"]
topics: ["시퀀싱 기술", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

발현량이 극히 적은 전사체의 아이소폼을 정량할 때는 일반적인 RT-qPCR이나 시퀀싱의 검출 한계로 인해 신뢰도 높은 데이터를 얻기 어렵다. 본 연구진은 STALARD(selective target amplification for low-abundance RNA detection) 기술을 활용해 저발현 RNA를 선택적으로 사전 증폭하는 표준 프로토콜을 제시한다. 일반적인 연구 장비 환경에서 RT-qPCR 및 나노포어 시퀀싱 분석으로 이어지는 전체 실험 절차를 다룬다.

## 무엇을 했나

- RNA 추출부터 프라이머 디자인, 역전사, 선택적 표적 증폭, 하류 분석으로 이어지는 워크플로우를 단계별로 정립했다.
- 1 µg의 RNA 입력 물질을 바탕으로 12사이클 동안 표적 전사체 선택 증폭을 진행했다.
- 사전 증폭된 산물을 RT-qPCR 분석에 적용하고 옵션으로 나노포어 시퀀싱과 연동하도록 구성했다.
- 실험 기법 적용 시 Cq 값이 약 10~12회 감소하여 저발현 아이소폼을 정량 가능한 범위로 끌어올림을 확인했다.

## 왜 눈여겨볼 만한가

고가의 전용 장비나 특수 시약 없이 기존 PCR 장비와 프라이머 설계 조정만으로 저발현 아이소폼의 검출 감도를 확보할 수 있는 방법이다. 긴 읽기(Long-read) 기반의 나노포어 시퀀싱과 연계할 경우 저발현 변이체 전사체의 구조적 확인까지 연동할 수 있을 것으로 보인다. 다만 특정 표적만을 선택적으로 증폭하는 방식이므로 전사체 전체(Transcriptome-wide) 분석보다는 특정 후보 아이소폼 검증에 한해 검토해 볼 만하다.

## 원문

- [STAR protocols](https://doi.org/10.1016/j.xpro.2026.104792) · DOI 10.1016/j.xpro.2026.104792
