---
title: "scRNA와 scATAC 멀티옴 통합 및 전사 조절 인자 추정 워크플로우 scMINA"
date: 2026-11-10
kind: paper
summary: "설명 가능한 AI를 활용해 세포 이질성을 규명하고 알츠하이머병 관련 핵심 전사인자 및 유전자를 발굴한다."
sourceName: "NAR genomics and bioinformatics"
sourceUrl: "https://doi.org/10.1093/nargab/lqag140"
journal: "NAR genomics and bioinformatics"
doi: "10.1093/nargab/lqag140"
authors: ["Zhang S", "Hu H", "Wang X", "Xiong C", "Kanekiyo T", "Asmann YW", "Ren Y"]
topics: ["단일세포", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

동일 세포에서 scRNA-seq와 scATAC-seq를 함께 측정하는 멀티옴 데이터는 모달리티별 기술적 편차와 데이터 통합의 복잡성으로 인해 하류 전사 조절 네트워크 해석에 한계가 있었다. 본 연구진은 모듈형 분석 워크플로우인 scMINA를 개발하여 멀티모달 데이터 통합과 공변량 보정을 체계화했다. 여기에 설명 가능한 AI(XAI) 기법을 결합해 세포 상태 변경 및 질환 관련 전사인자 추정의 해석 가능성을 높였다.

## 무엇을 했나

- scRNA-seq 및 scATAC-seq 데이터 통합, 기술적 공변량 보정, 전사 조절 특성 우선순위화를 위한 모듈형 워크플로우 scMINA를 구축했다.
- XAI 기반 속성 부여 기법을 도입해 세포 상태 이질성과 질환 관련 전사인자 및 유전자 후보를 정량적으로 산출했다.
- Seattle Alzheimer's Disease Brain Cell Atlas의 단일세포 멀티옴 데이터 세트에 scMINA를 적용했다.
- 뇌 조직 내 주요 아교세포 집단을 안정적으로 구분하고 알츠하이머병 병태생리에 연관된 전사 조절 특성을 도출했다.

## 왜 눈여겨볼 만한가

10x Multiome과 같은 동일 세포 라이브러리 분석 시 단순 차원 축소나 클러스터링을 넘어 전사 조절 네트워크의 주요 인자를 XAI 방식으로 설명력 있게 뽑아낼 수 있는 도구다. 다만 초록 기준으로 볼 때 paired 데이터 형태에 맞춰져 있어 unpaired 데이터셋에 대한 범용적 적용 여부는 추가 확인이 필요하다. 10x Multiome 데이터를 확보하고 핵심 TF 타깃을 신속히 선별해야 하는 전사체 분석 파이프라인 구축 시 검토해 볼 만하다.

## 원문

- [NAR genomics and bioinformatics](https://doi.org/10.1093/nargab/lqag140) · DOI 10.1093/nargab/lqag140
