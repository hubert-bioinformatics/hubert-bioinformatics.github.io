---
title: "공간 미세환경을 반영하는 디컨볼루션 알고리즘 NicheDeSig"
date: 2026-07-30
kind: paper
summary: "고정된 레퍼런스 시그니처의 한계를 극복하고 공간 니치에 따른 세포 상태 변화를 함께 추정한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag578"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag578"
authors: ["Xue W", "Zhang J", "Chen T", "Shen W", "Ma J", "Xu Y", "Wong HS", "Wu S"]
topics: ["공간전사체", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

기존의 스팟 기반 공간전사체 디컨볼루션은 고정된 단일세포 레퍼런스나 단순 매핑에 의존하여, 미세환경에 따른 세포의 유전자 발현 변화를 포착하기 어렵다는 한계가 있었다. NicheDeSig는 공간 니치 정보를 반영하여 컨텍스트에 따라 적응적으로 변하는 시그니처를 모델링함으로써 이 문제를 접근한다.

## 무엇을 했나

- 시뮬레이션 벤치마크 데이터셋에서 디컨볼루션 성능을 평가하고 시뮬레이션 대장암 데이터에서 공간적 충실도를 확인했다.
- 인간 뇌 dorsolateral prefrontal cortex(DLPFC) 데이터에서 층류 및 백질 연관 프로그램을 복원했다.
- 유방암(BRCA), 췌장암(PDAC-A), 대장암 간 전이 조직을 대상으로 도메인별 종양 미세환경 패턴을 분석했다.
- 오픈소스 코드를 깃허브와 Zenodo에 공개하여 재현성을 높였다.

## 왜 눈여겨볼 만한가

단순히 스팟 내 세포 비율만 계산하던 기존 방식에서 벗어나, 미세환경에 따른 세포 상태의 변이를 함께 분석할 수 있다는 점이 가장 큰 특징이다. 다만 초록 내용만으로는 실제 Visium이나 Xenium 같은 다양한 플랫폼 데이터에서 계산 부하가 얼마나 되는지, 레퍼런스 scRNA-seq과의 정합 과정에서 오는 노이즈를 얼마나 잘 견디는지 상세히 알기 어렵다. 공간전사체 데이터에서 미세환경 특이적 분자 프로그램을 파악해야 하는 연구라면 기존 디컨볼루션 툴과 비교하여 도입을 검토해 볼 만하다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag578) · DOI 10.1093/bioinformatics/btag578
