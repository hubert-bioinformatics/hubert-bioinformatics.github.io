---
title: "10x 3' cDNA 보관분을 PacBio 롱리드로 재시퀀싱하여 변이 식별하기"
date: 2026-09-17
kind: paper
summary: "10x 3' 라이브러리 제조 후 남은 cDNA로 단일세포 전사체와 변이 정보를 후속 결합하는 타겟 롱리드 분석법을 검증했다."
sourceName: "European journal of haematology"
sourceUrl: "https://doi.org/10.1111/ejh.70322"
journal: "European journal of haematology"
doi: "10.1111/ejh.70322"
authors: ["Papavasileiou S", "Wu C", "Boey D", "Margerie L", "Mo J", "Olsson-Strömberg U", "Söderlund S", "Nilsson G"]
topics: ["시퀀싱 기술", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

혈액암 단일세포 분석에서 정상 세포와 암세포를 구별하려면 전사체와 체세포 변이를 동시에 확인해야 하지만, 표준 10x Genomics 3' 워크플로우는 변이 탐지에 한계가 있다. 연구진은 이미 분석이 끝난 10x 3' 증폭 cDNA를 재활용하여 PacBio 타겟 롱리드 시퀀싱으로 세포별 변이 상태를 후속 할당하는 방식을 평가했다. 이 과정에서 ambient RNA로 인한 오분류 한계를 확인하고 이를 완화하기 위한 타겟별 임계값 기준을 제시했다.

## 무엇을 했나

- KIT 변이주와 BCR::ABL1 융합 유전자를 발현하는 세포주 혼합 모델을 구축하고 10x 3' 라이브러리 제작 후 남은 증폭 cDNA를 회수했다.
- 회수한 cDNA에서 타겟 영역을 농축한 뒤 PacBio 롱리드 시퀀싱을 수행하여 세포 바코드별로 변이 정보를 매핑했다.
- 드롭렛 유체학 특성상 발생한 ambient RNA로 인해 변이가 없는 세포에서도 변이 전사체가 검출되는 현상을 확인하고 타겟별 탐지 임계값을 설정했다.
- 만성골수성백혈병(CML) 환자 검체에 적용하여 진단 시점 샘플에서는 BCR::ABL1 양성 세포를 보류분 cDNA로 구별해냈으나 이마티닙 치료 중인 샘플에서는 검출하지 못했다.

## 왜 눈여겨볼 만한가

이미 10x 3' 시퀀싱을 마친 보존 cDNA를 그대로 활용하므로 추가 세포 확보 없이 변이 정보를 얹을 수 있다는 장점이 있다. 그러나 3' 말단 클로닝 특성상 변이 위치가 5' 쪽에 가깝거나 발현량이 낮으면 유효 리드를 얻기 어렵고, ambient RNA에 의한偽양성 노이즈가 존재한다. 따라서 단순 변이 유무 판단보다는 타겟 유전자의 위치와 발현량을 고려한 컷오프를 엄격히 설정하여 제한적인 클론 추적용으로 검토해 볼 만하다.

## 원문

- [European journal of haematology](https://doi.org/10.1111/ejh.70322) · DOI 10.1111/ejh.70322
