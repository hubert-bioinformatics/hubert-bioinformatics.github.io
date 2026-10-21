---
title: "단일세포 메틸화 데이터로 질환 위험 연관 세포군을 찾는 met-scDRS"
date: 2026-10-20
kind: paper
summary: "뇌 조직 내 하위 세포군별 질환 위험 이질성과 관련 유전자의 에피유전적 기능 경로를 규명한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag751"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag751"
authors: ["Li X", "Shi Z", "Hou K", "Eyring KW", "Liu C", "Heffel MG", "Luo C", "Geschwind DH"]
topics: ["단일세포", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

GWAS로 발굴한 질환 위험 변이가 세포 수준에서 어떻게 작동하는지 규명하려면 전사체뿐만 아니라 후성유전체 변화를 함께 해석해야 한다. 하지만 기존 통합 분석 틀은 대부분 단일세포 전사체(scRNA-seq) 데이터에 치중되어 있어 DNA 메틸화 수준의 이질성을 직접 반영하기 어려웠다. met-scDRS는 단일세포 메틸롬 데이터에 다전전자 위험 점수 개념을 확장 적용하여 단일 세포 해상도로 질환 연관성을 평가한다.

## 무엇을 했나

- GWAS 질환 연관 유전자 세트와 단일세포 DNA 메틸화 데이터를 결합해 세포 단위 질환 연관 점수(disease relevance score)를 산출하는 met-scDRS 도구를 개발했다.
- 공개된 인간 뇌 단일세포 메틸롬 데이터와 75개 형질의 GWAS 결과를 결합해 세포 유형별 질환 농축성을 시뮬레이션 및 실데이터로 검증했다.
- 정신질환 위험과 연관된 뇌 공간 축(spatial axis)을 따르는 세포 유형 내 이질성 및 특정 질환 연관 하위 세포군을 발굴했다.
- 메틸화 수준과 질환 연관 점수 간 상관관계가 높은 유전자들이 시냅스 형성 및 신호 전달 기능 경로에 농축됨을 확인했다.

## 왜 눈여겨볼 만한가

기존 scDRS가 scRNA-seq 기반 전사체 표현형에 의존했던 한계를 넘어 단일세포 메틸롬 수준에서 다전전자 위험의 에피유전적 기전을 추적할 수 있는 선택지가 생겼다. 전사체만으로 구별하기 힘든 뇌 신경세포의 공간 축별 하위 집단이나 에피유전적 상태 변화를 해석할 때 유용할 것으로 보인다. 다만 단일세포 메틸화 데이터 특유의 데이터 희소성(sparsity)과 커버리지 제약이 있으므로, 참조용 데이터셋이 양호하게 갖춰진 뇌 질환 연구를 중심으로 우선 검토해 볼 만하다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag751) · DOI 10.1093/bioinformatics/btag751
