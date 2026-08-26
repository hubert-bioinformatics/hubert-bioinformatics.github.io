---
title: "단일 시점 scRNA-seq 데이터로 기억 유전자를 찾는 Power-Seek"
date: 2026-08-24
kind: paper
summary: "계통 추적이나 반복 실험 없이 고유값 스펙트럼의 파워 로우 패턴으로 내성 유전자를 찾는다."
sourceName: "Cell systems"
sourceUrl: "https://doi.org/10.1016/j.cels.2026.101707"
journal: "Cell systems"
doi: "10.1016/j.cels.2026.101707"
authors: ["Ghosh S", "Chakrabarti S", "Raju A"]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

암 약물 내성과 연관된 기억 유전자(memory genes)를 발굴하려면 Luria-Delbrück 방식의 계통 추적이나 다중 반복 실험이 필수적이라 in vitro 모델에 연구가 국한되었다. 연구진은 무작위 행렬 이론을 도입하여 기억 유전자가 세포 공분산 행렬의 고유값 스펙트럼에서 파워 로우 신호를 남긴다는 점을 밝혔다. 이를 바탕으로 단일 시점 scRNA-seq 데이터만으로 기억 유전자를 선별하는 알고리즘 Power-Seek을 개발했다.

## 무엇을 했나

- 무작위 행렬 이론(random matrix theory)을 적용해 세포 공분산 행렬 고유값 스펙트럼의 파워 로우(power-law) 패턴으로 기억 유전자를 식별하는 이론적 프레임워크를 수립했다.
- 세포 주기나 계통에 대한 사전 정보 없이 단일 시점 scRNA-seq 데이터만으로 기억 유전자를 발굴하는 알고리즘 Power-Seek을 개발했다.
- 흑색종 세포주 데이터에 적용하여 추가 실험 정보 없이도 기억 유전자를 정확하게 선별함을 입증했다.
- 인간 유방암 조직 검체 scRNA-seq 데이터에 적용해 임상 샘플에서 약물 내성 관련 발현 상태를 탐색할 수 있음을 확인했다.

## 왜 눈여겨볼 만한가

계통 바코딩이나 시계열 샘플링이 불가능한 환자 유래 조직 scRNA-seq 데이터에서 약물 내성을 유발하는 비유전적(non-genetic) 발현 상태를 직접 추적할 때 검토해 볼 만하다. 추가적인 실험적 처치 없이 기존 단일 시점 전사체 데이터셋 재분석만으로 후보 유전자를 뽑아낼 수 있다는 것이 장점이다. 다만 무작위 행렬 기반 고유값 분석 특성상 세포 수가 적거나 노이즈가 극심한 데이터셋에서도 파워 로우 패턴이 안정적으로 검출될지는 실제 데이터 적용을 통해 확인이 필요하다.

## 원문

- [Cell systems](https://doi.org/10.1016/j.cels.2026.101707) · DOI 10.1016/j.cels.2026.101707
