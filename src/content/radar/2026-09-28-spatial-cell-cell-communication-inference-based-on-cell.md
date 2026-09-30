---
title: "이종 그래프 기반 공간 세포 간 상호작용 추정"
date: 2026-09-28
kind: paper
summary: "spot 기반 공간전사체와 단일세포 데이터를 통합해 세포 간 상호작용을 추정한다."
sourceName: "PLoS computational biology"
sourceUrl: "https://doi.org/10.1371/journal.pcbi.1014835"
journal: "PLoS computational biology"
doi: "10.1371/journal.pcbi.1014835"
authors: ["Li X", "Wu D", "Zhang Y", "Chen M", "Liu C"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

공간전사체로 세포 간 상호작용을 파악하려 할 때, spot 기반 데이터는 세포 매핑의 불확실성과 리간드-수용체 동시 발현에 따른 위양성 문제가 있었다. 이번 연구는 이종 그래프 학습을 통해 단일세포와 공간전사체, 리간드-수용체 사전 지식을 결합하여 이러한 한계를 보완한다.

## 무엇을 했나

- 단일세포 전사체, 공간전사체, 리간드-수용체 지식을 통합하는 이종 그래프 학습 프레임워크인 SpaHCC를 개발했다.
- 분자적 특성, 공간적 이웃 정보, 세포 기능 상태를 함께 활용해 상호작용 후보를 우선순위화했다.
- 알츠하이머병, cSCC, PDAC 데이터셋에 적용하여 공간적 일관성을 갖춘 상호작용 신호와 질환 관련 패턴을 확인했다.

## 왜 눈여겨볼 만한가

spot 기반 공간전사체 데이터에서 단일세포 해상도의 상호작용을 추정할 때, 경로 및 전사인자 분석을 통해 생물학적 해석력을 높이려는 시도다. 다만 단일세포 데이터와 공간전사체 데이터를 동시에 입력으로 요구하므로, 두 데이터가 모두 갖춰진 실험 디자인에서만 활용해 볼 수 있다.

## 원문

- [PLoS computational biology](https://doi.org/10.1371/journal.pcbi.1014835) · DOI 10.1371/journal.pcbi.1014835
