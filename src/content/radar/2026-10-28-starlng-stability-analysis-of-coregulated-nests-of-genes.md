---
title: "Starlng을 이용한 안정적인 유전자 모듈 및 공동 발현 분석"
date: 2026-10-28
kind: paper
summary: "단일세포 데이터에서 노이즈에 강건한 유전자 공동 발현 모듈을 식별한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag801"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag801"
authors: ["Munteanu A"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

기존의 유전자 군집화 방법은 단일세포 데이터의 공간적 조직화나 발달 궤적에 따른 관계 동역학을 포착하기 어렵고, 노이즈와 알고리즘의 확률적 변동에 취약한 문제가 있었다. Starlng 프레임워크는 ClustAssess의 원리를 확장하여 유전자 그래프 군집화에서 유발되는 공변량을 평가하고 안정적인 유전자 모듈을 찾아내는 방식을 제시한다.

## 무엇을 했나

- ClustAssess 프레임워크를 기반으로 유전자 그래프 군집화에 따른 공변량을 평가하는 Starlng 파이프라인을 구축했다.
- 군집화 파라미터의 안정적인 구성과 강건한 유전자 모듈을 식별한 뒤 가상시간 분산을 기준으로 이상치 군집을 제거했다.
- 이를 통해 신뢰할 수 있고 재현 가능한 유전자 군집을 확인하고 상위 세포 군집과 세부 유전자 하위 그룹 간의 계층적 관계를 밝혔다.
- R 패키지로 구현된 Starlng을 통해 최적화되고 상호작용 가능한 분석 환경을 제공했다.

## 왜 눈여겨볼 만한가

단일세포 분석에서 유전자 조절 네트워크를 추론할 때 노이즈로 인한 불안정성을 보완할 수 있는 대안이 된다. 세포 발달 궤적과 연계된 유전자 공동 발현 패턴을 다룰 때 유용하게 검토해 볼 만하다. 다만 실제 대규모 단일세포 및 다중오믹스 데이터셋에서 연산 부하가 어느 정도인지 추가로 확인해 볼 필요가 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag801) · DOI 10.1093/bioinformatics/btag801
