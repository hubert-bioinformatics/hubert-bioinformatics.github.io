---
title: "공간 단백체 데이터의 세포 분류 정확도를 높이는 CellTune"
date: 2026-07-31
kind: paper
summary: "휴먼인더루프 능동 학습 워크플로우를 활용해 데이터 분석 정밀도를 향상한다."
sourceName: "Nature Methods"
sourceUrl: "https://www.nature.com/articles/s41592-026-03162-2"
journal: "Nature Methods"
doi: "10.1038/s41592-026-03162-2"
authors: ["Yuval Bussi"]
topics: ["오믹스", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

공간 단백체학 데이터 분석에서는 자동화된 세포 분류만으로 정밀한 결과를 얻기 어려운 한계가 있다. 이 연구에서는 분석 과정에 연구자 피드백을 결합한 휴먼인더루프(human-in-the-loop) 방식을 도입했다. 능동 학습(active learning) 워크플로우 기반 소프트웨어인 CellTune을 통해 공간 단백체 데이터의 세포 분류 정밀도를 높인다.

## 무엇을 했나

- 공간 단백체 데이터 분석을 위한 통합 소프트웨어 CellTune을 개발했다.
- 연구자의 도메인 지식을 반영하는 휴먼인더루프 능동 학습 워크플로우를 구축했다.
- 공간 단백체 데이터셋 내 세포 분류의 분석 정밀도를 향상시켰다.

## 왜 눈여겨볼 만한가

자동화 알고리즘만으로 해결하기 어려운 세포 라벨링 노이즈를 연구자 개입으로 보완하는 접근법이다. 공간 multiplexed imaging 데이터에서 세포 유형 분류 오류를 직접 수정하며 모델을 재학습시킬 때 유용할 것으로 보인다. 다만 제시된 정보만으로는 전사체(spatial transcriptomics) 데이터로의 확장성이나 구체적인 성능 수치가 확인되지 않으므로 공간 단백체 분석 단계를 중심으로 도입을 검토해 볼 만하다.

## 원문

- [Nature Methods](https://www.nature.com/articles/s41592-026-03162-2) · DOI 10.1038/s41592-026-03162-2
