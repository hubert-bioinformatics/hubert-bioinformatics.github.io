---
title: "scDNA-seq 데이터에서 극소수 클론의 체세포 변이를 찾는 SCARCE"
date: 2026-08-13
kind: paper
summary: "세포형 표지자 정보와 통계적 농축 분석을 결합해 0.06% 비율의 희귀 클론 변이까지 선별한다"
sourceName: "Genome research"
sourceUrl: "https://doi.org/10.1101/gr.281609.125"
journal: "Genome research"
doi: "10.1101/gr.281609.125"
authors: ["Gillman R", "Dukda S", "Sadir J", "Louie RHY", "Goodnow C", "Luciani F", "Singh M", "Field MA"]
topics: ["오믹스", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

암 이외의 자가면역질환 등에서도 체세포 변이의 중요성이 밝혀지고 있으나, 벌크 시퀀싱으로는 세포군 내 희귀 변이를 포착하기 어렵다. 단일세포 수준에서도 기술적 아티팩트와 극소수 클론의 낮은 비율로 인해 실제 변이를 선별하는 데 한계가 존재했다. 연구진은 scDNA-seq 데이터에서 표현형 정보와 유전형을 통합해 희귀 체세포 변이를 통계적으로 우선순위화하는 프레임워크 SCARCE를 개발했다.

## 무엇을 했나

- 세포 표면 마커 표현형이나 변이 기반 클러스터링으로 하위 집단을 정의하고, 집단 간 변이 빈도를 비교하는 통계 분석 알고리즘을 구축했다.
- Mission Bio Tapestri 플랫폼 데이터와 클론 증폭 기반 단일세포 전전체 시퀀싱(scWGS) 데이터셋을 활용해 변이 선별 성능을 검증했다.
- 전체 16,316개 세포 중 10개(0.06%)에만 존재하는 극소수 클론의 변이를 정밀하게 검출했으며, 검증 샘플의 알려진 병원성 변이들을 상위 후보로 발굴했다.

## 왜 눈여겨볼 만한가

Mission Bio Tapestri와 같은 scDNA-seq 패널이나 타깃 단일세포 데이터 분석 시, 노이즈와 아티팩트 속에서 진성 희귀 변이를 필터링하는 후속 분석 도구로 검토해 볼 만하다. 특히 표면 마커(AbSeq 등)를 함께 측정한 멀티오믹스 데이터가 있다면 특정 면역세포 분파에 국한된 모자이시즘 변이를 찾는 데 유용할 것으로 보인다. 다만 DNA 기반 시퀀싱 데이터에 맞춰 개발된 만큼, 커버리지 불균일성이 심한 일반적인 scRNA-seq 데이터에 바로 적용하기에는 제약이 있을 수 있다.

## 원문

- [Genome research](https://doi.org/10.1101/gr.281609.125) · DOI 10.1101/gr.281609.125
