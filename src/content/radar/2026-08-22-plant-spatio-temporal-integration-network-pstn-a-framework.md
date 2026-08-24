---
title: "시점 간 연관성을 고려하는 단일세포 및 공간전사체 통합 모델 PSTN"
date: 2026-08-22
kind: paper
summary: "시간적 변화가 빠른 감염 과정에서 시점별 데이터를 연동해 공간 매핑 정확도를 높였다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag637"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag637"
authors: ["Zhu Y", "Zhang H", "Zhang X", "Zhao E", "Dai Y", "Liu H", "Li L", "Mei X"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

기존 단일세포 및 공간전사체 통합 알고리즘은 시점별 데이터를 독립적으로 처리해 동적 생물학적 과정의 시간적 연속성을 반영하지 못했다. 식물-병원균 상호작용처럼 급격한 전사체 재편이 일어나는 시스템에서는 이러한 방식이 매핑 정확도를 떨어뜨린다. 연구진은 양방향 시간 정규화를 도입해 시간 흐름을 유지한 채 세포를 공간에 매핑하는 PSTN 프레임워크를 제시했다.

## 무엇을 했나

- 발현량 재구성과 양방향 최대 유사도 기반 시간 정규화를 결합한 시공간 통합 알고리즘 PSTN을 개발했다.
- 벼 도열병균 감염 모델의 0, 12, 24시간 시점별 매칭된 scRNA-seq 및 공간전사체 데이터에 적용했다.
- 4,000개 고변이유전자(HVG) 조건에서 MSE 0.09 이하를 기록하며 Tangram, cell2location, DestVI 대비 우수한 매핑 상관관계를 보였다.
- 유전자 순열 대조군 실험과 마우스 대뇌 피질 데이터셋 적용을 통해 교차 모달리티 유전자 대응성과 정적 데이터 재구성 성능을 추가 검증했다.

## 왜 눈여겨볼 만한가

cell2location이나 Tangram처럼 단일 시점 매핑에 맞춰진 기존 도구와 달리, 시계열 공간전사체 실험을 수행하는 감염·발달 연구에서 유용한 대안이 될 수 있다. 다만 시간적 연관성을 정규화하는 과정에서 시점 간 샘플링 간격이나 생물학적 변화 폭에 따른 파라미터 조율이 필요할 것으로 보인다. 실무적으로는 연구 설계 단계부터 동일 시점의 scRNA-seq와 공간전사체 데이터가 함께 확보되어야 제대로 활용할 수 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag637) · DOI 10.1093/bioinformatics/btag637
