---
title: "nCATS 타깃 시퀀싱과 STRiker를 활용한 56개 STR 질환 통합 진단"
date: 2026-08-29
kind: paper
summary: "PCR 증폭 없이 56개 STR 로커스와 메틸화를 분석해 미진단 소뇌 실조증 환자의 32.4%에서 원인 변이를 동정했다."
sourceName: "Advanced science (Weinheim, Baden-Wurttemberg, Germany)"
sourceUrl: "https://doi.org/10.1002/advs.77475"
journal: "Advanced science (Weinheim, Baden-Wurttemberg, Germany)"
doi: "10.1002/advs.77475"
authors: ["Lee S", "Jung C", "Kim M", "Kim N", "Hwang GH", "Lee ST", "Chu K", "Lee SK"]
topics: ["NGS", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

기존의 PCR 증폭이나 short-read NGS 방식은 거대한 단기 반복 확장(STR) 변이를 정확히 읽기 어렵고 CpG 메틸화 정보를 잃는 한계가 존재한다. 이 연구에서는 증폭 과정이 없는 나노포어 Cas9 타깃 시퀀싱(nCATS)과 전용 분석 알고리즘인 STRiker를 결합해 단일 검사로 56개 STR 로커스를 분석하는 워크플로우를 제시한다.

## 무엇을 했나

- 환자 혈액 gDNA에서 PCR 증폭 없이 Cas9으로 56개 STR 로커스를 타깃팅하여 균일한 커버리지를 확보하도록 nCATS 조건을 최적화했다.
- 내부 모티프 구조와 de novo 반복 구조, 메틸화 상태를 탐지하는 전용 분석 알고리즘인 STRiker를 개발했다.
- 기존 유전자 검사로 원인을 찾지 못한 소뇌 실조증 환자 37명에 적용하여 12명(32.4%)에서 FGF14, RFC1, ATXN8OS 등의 병원성 반복확장을 규명했다.
- 가족 검식을 통해 추가 환자를 확인하는 한편, FGF14 내 반복 구조의 다양성과 CpG 메틸화에 따른 병원성 완화 효과를 관찰했다.

## 왜 눈여겨볼 만한가

short-read WES/WGS 데이터에서 호출하기 까다로운 대형 STR 변이와 에피제네틱 마커를 장비 분리 없이 동시 검증할 수 있는 접근법이다. 다만 nCATS 캡처 과정에서 고품질·고분자량 gDNA 확보가 필수적이며, 라이브러리 조제 숙련도에 따라 56개 로커스 간 커버리지 편차가 발생할 가능성이 있다. 광범위한 1차 스크리닝보다는 기존 검사에서 미진단으로 남은 신경계 질환 환자군을 대상으로 검토해 볼 만하다.

## 원문

- [Advanced science (Weinheim, Baden-Wurttemberg, Germany)](https://doi.org/10.1002/advs.77475) · DOI 10.1002/advs.77475
