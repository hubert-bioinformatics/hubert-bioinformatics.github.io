---
title: "Stellarscope 기반 단일세포 전사체의 TE 정량 프로토콜"
date: 2026-11-24
kind: paper
summary: "다중 맵핑 한계로 배제되던 위치 특정 TE 전사체를 표준 유전자와 함께 정량화한다."
sourceName: "STAR protocols"
sourceUrl: "https://doi.org/10.1016/j.xpro.2026.104920"
journal: "STAR protocols"
doi: "10.1016/j.xpro.2026.104920"
authors: ["Liotta N", "Nixon DF", "Marston JL", "Bendall ML", "Reyes-Gopar H"]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

scRNA-seq 분석 시 이동성 유전자(TE) 유래 전사체는 서열 유사성으로 인한 다중 맵핑 문제 때문에 통상 정량 대상에서 제외되어 왔다. 본 연구는 분석 도구인 Stellarscope를 활용해 단일세포 수준에서 위치 특정 TE 전사체를 정량화하는 프로토콜을 제시한다. 이를 통해 정량된 TE 매트릭스를 기존 표준 유전자 매트릭스와 통합하여 동일한 단일세포 다운스트림 파이프라인에서 분석하는 방법을 설명한다.

## 무엇을 했나

- Stellarscope의 환경 구축, 참조 유전체 확보, 다중 맵핑 정렬 파라미터 설정을 단계별로 정리했다.
- 다중 맵핑된 리드를 재할당하여 표준 유전자와 위치 특정 TE의 전사체 매트릭스를 각각 산출하고 병합했다.
- 병합된 카운트 매트릭스를 기존 단일세포 전처리 및 분석 워크플로우에 연결하여 통합 다운스트림 분석을 수행했다.

## 왜 눈여겨볼 만한가

그동안 단일세포 데이터 분석에서 버려지던 반복 서열 및 TE 리드를 재활용하여 세포 상태나 종양 미세환경의 세부 변화를 추적하는 데 도움을 줄 수 있다. 다만 다중 맵핑 정렬과 리드 재할당 과정을 거쳐야 하므로 계산 자원과 분석 시간이 추가로 소요되는 한계가 있다. 표준 scRNA-seq 데이터셋에 바로 적용 가능한 절차이므로 기존 보유 데이터에서 TE 발현 양상을 탐색할 때 검토해 볼 만하다.

## 원문

- [STAR protocols](https://doi.org/10.1016/j.xpro.2026.104920) · DOI 10.1016/j.xpro.2026.104920
