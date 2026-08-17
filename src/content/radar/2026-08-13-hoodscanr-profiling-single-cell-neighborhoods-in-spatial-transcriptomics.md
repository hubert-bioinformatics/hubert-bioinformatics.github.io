---
title: "단일세포 단위 공간 미세환경 확률을 계산하는 hoodscanR"
date: 2026-08-13
kind: paper
summary: "세포별 공간 이웃의 다중 소속 확률을 정량화하여 이웃 기반 DEG 및 클러스터링을 지원하는 R 패키지다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag609"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag609"
authors: ["Liu N", "Martin J", "Bhuva DD", "Chen J", "Li M", "Lee SC", "Kharbanda M", "Cheng J"]
topics: ["공간전사체", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

기존 공간전사체 이웃 분석 방식은 단일 세포를 하나의 이웃 그룹에 무조건 할당하는 한계가 있었다. 이로 인해 경계면에 위치하거나 복합적인 미세환경에 노출된 세포의 상태를 정밀하게 반영하기 어려웠다. 연구진은 세포 단위에서 여러 이웃 영역에 대한 소속 확률을 산출하는 분석 도구 hoodscanR을 개발해 이 문제를 다루었다.

## 무엇을 했나

- 공간전사체 데이터에서 주석 기반 이웃 정보를 바탕으로 각 세포의 이웃 소속 확률 프로파일을 계산하는 Bioconductor 패키지 hoodscanR을 구축했다.
- 확률적 표현을 기반으로 이웃 시각화, 불확실성 평가, 이웃 기반 클러스터링, 공간 이웃을 고려한 차등발현 분석 기능을 통합했다.
- 유방암 및 폐암 공간전사체 데이터셋에 적용하여 혼합된 조직 미세환경을 구분하고 이웃 위치에 따른 종양세포의 전사체 변화를 발굴했다.

## 왜 눈여겨볼 만한가

세포를 특정 이웃으로 단정하지 않고 확률 프로파일로 다루기 때문에 암-기질 경계면처럼 이질성이 높은 구역 분석에 유용할 것으로 보인다. 특히 이웃 미세환경별 DEG 분석을 지원하므로, 동일 세포형이 주변 환경 변화에 따라 보이는 전사체 반응을 추적할 때 적용해 볼 만하다. 다만 세포 주석 정보의 선행 정의 수준에 영향을 받을 수 있으므로 주석 데이터의 정교함이 확보된 공간 데이터셋에서 우선 검토할 필요가 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag609) · DOI 10.1093/bioinformatics/btag609
