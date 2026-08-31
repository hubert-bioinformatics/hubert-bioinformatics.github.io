---
title: "10x Flex 프로브를 활용한 단일세포 융합유전자 검출"
date: 2026-08-29
kind: paper
summary: "벌크 시퀀싱으로 확인한 융합 접합부 타깃 프로브를 10x Flex 워크플로우에 추가하여 검출력을 향상시켰다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.08.26.747171v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.08.26.747171"
authors: ["Maksimovic", "J.", "Streeton-Cook", "V.", "Grima", "C. V.", "Hanna", "D."]
topics: ["단일세포", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 전사체 분석은 세포 상태 파악에는 유용하지만, 시퀀싱 커버리지의 한계로 암 발생의 주요 원인인 융합유전자를 직접 검출하기 어렵다. 이 연구에서는 벌크 RNA-seq 데이터에서 확인한 융합 접합부 시퀀스를 바탕으로 맞춤형 프로브를 설계해 10x Flex 및 Visium 파이프라인에 결합하는 방식을 제시한다. 이를 통해 전전사체 발현 프로파일과 융합유전자 카운트를 단일세포 수준에서 동시에 분석했다.

## 무엇을 했나

- 벌크 RNA-seq 분석 등에서 확보한 융합 접합부 시퀀스 기반으로 프로브를 디자인할 수 있는 Flexify R 패키지를 개발했다.
- 설계한 타깃 프로브를 10x Genomics Flex 및 Visium 실험 과정에 추가하고 Cell Ranger로 전사체와 융합유전자 카운트를 통합 추출했다.
- MCF7 세포주 검증을 거쳐 소아 B세포 급성 림프구성 백혈병(B-ALL) 코호트 샘플 2종에 해당 기법을 적용했다.
- 미세잔류질환(MRD) 상태의 잔류 백혈병 세포와 재발 관련 계통 가변성을 가진 골수성 세포, 비모세포 계통에 잔존하는 전백혈병 클론을 단일세포 수준에서 식별했다.

## 왜 눈여겨볼 만한가

scRNA-seq에서 3' 또는 5' 숏리드 시퀀싱만으로는 캡처하기 힘들었던 융합유전자를 10x Flex의 프로브 기반 상보성을 활용해 효율적으로 검출해 낸 접근이다. 다만 융합 접합부 시퀀스를 사전에 알고 있어야 맞춤형 프로브를 합성할 수 있으므로, 벌크 RNA-seq 등 사전 분석 데이터가 구비된 조건에서 우선 활용할 수 있다. 주요 융합유전자가 잘 알려진 림프구성 백혈병이나 고형암 연구에서 MRD 추적 및 클론 진화 분석을 진행할 때 도입을 검토할 만하다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.08.26.747171v1?rss=1
) · DOI 10.64898/2026.08.26.747171
