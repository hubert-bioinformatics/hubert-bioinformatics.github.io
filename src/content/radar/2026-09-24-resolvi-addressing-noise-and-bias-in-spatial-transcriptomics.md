---
title: "공간전사체 노이즈와 배치 효과를 보정하는 확률 모델 ResolVI"
date: 2026-09-24
kind: paper
summary: "세포 분할 및 정량 과정의 오차를 보정하여 다양한 공간전사체 후속 분석 성능을 높인다."
sourceName: "Nature Methods"
sourceUrl: "https://www.nature.com/articles/s41592-026-03212-9"
journal: "Nature Methods"
doi: "10.1038/s41592-026-03212-9"
authors: ["Can Ergen"]
topics: ["공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

공간전사체 분석에서는 세포 분할과 정량화 단계에서 발생하는 고유한 노이즈와 배치 편차가 데이터 신뢰도를 떨어뜨린다. ResolVI는 이러한 기술적 오류와 배치 차이를 통제하기 위해 개발된 확률적 데이터 표현 모델이다. 데이터의 변동성을 확률 분포로 변환하여 보정함으로써 다양한 공간전사체 후속 분석의 정확도를 개선한다.

## 무엇을 했나

- 공간전사체 데이터 정량화 및 세포 분할 과정에서 발생하는 구조적 노이즈와 배치 편차 문제를 다루었다.
- 기술적 오차와 배치 효과가 보정된 probabilistic representation을 생성하는 ResolVI를 구축했다.
- 여러 공간전사체 분석 과제에 해당 모델을 적용하여 후속 분석 성능이 향상됨을 확인했다.

## 왜 눈여겨볼 만한가

이미지 기반 또는 스팟 기반 공간전사체 실험에서 빈번하게 발생하는 세포 경계 왜곡과 시편 간 배치 효과를 확률 모델링으로 완화한다. 단순 표준화 방식을 넘어 오차 보정된 데이터 표현을 제공하므로 downstream 분석의 신뢰성을 제고하는 데 유용할 수 있다. 다만 특정 분석 플랫폼(Xenium, Visium 등)에 대한 최적화 여부나 컴퓨팅 자원 요구량은 초록에서 확인되지 않으므로 실무 적용 시 자체 데이터 기반 검증이 필요하다.

## 원문

- [Nature Methods](https://www.nature.com/articles/s41592-026-03212-9) · DOI 10.1038/s41592-026-03212-9
