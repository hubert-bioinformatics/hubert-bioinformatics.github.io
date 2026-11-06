---
title: "자궁경부 상피 세포 상태 시그니처의 플랫폼 간 재현성 검증"
date: 2026-11-05
kind: paper
summary: "발굴 코호트의 유전자 시그니처를 고정한 채 외부 scRNA-seq, Visium, Xenium 데이터에서 재현성을 평가했다."
sourceName: "Functional & integrative genomics"
sourceUrl: "https://doi.org/10.1007/s10142-026-02088-4"
journal: "Functional & integrative genomics"
doi: "10.1007/s10142-026-02088-4"
authors: ["Zheng Y", "Yi H", "Zhu L", "Huang J", "Liu S", "Zheng X"]
topics: ["공간전사체", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 분석에서 암 세포 상태 시그니처는 코호트마다 재분석 및 재정의 과정을 거치며 재현성이 과장되는 경향이 있다. 연구진은 자궁경부 상피 세포 상태 시그니처와 문턱값을 임의로 수정하지 않고 고정한 상태에서 다양한 전사체 플랫폼에 적용해 실제 재현 가능성을 검증했다.

## 무엇을 했나

- 단일세포 코호트(E-MTAB-12305)에서 자궁경부 상피 세포 상태를 정의하고 123개 샘플 보정 슈도벌크 시그니처로 동결했다.
- 동결된 시그니처를 외부 scRNA-seq, Visium 4개 샘플, 11개 대리 유전자를 활용한 Xenium 22개 샘플 및 자체 scRNA-seq 데이터셋에 적용했다.
- Xenium 데이터에서 공간적 군집화를 확인하고, TCGA-CESC 데이터셋을 재분석하여 예후 및 줄기세포능(CytoTRACE2)과의 연관성을 검증했다.

## 왜 눈여겨볼 만한가

새로운 데이터셋에 맞춰 파라미터를 재조정하지 않는 discovery-locked 방식으로 scRNA-seq부터 Visium, Xenium 공간전사체까지 교차 검증을 시도한 점에서 평가 체계로서 의미가 있다. Xenium 상에서 공간적 군집성은 일부 유지되었으나, 해당 시그니처가 악성도, 전이 능력, 예후나 세포 간 상호작용으로 직결되지는 않았다. 단일세포 및 공간전사체 데이터에서 도출된 세포 상태 시그니처를 임상적 기능으로 확대 해석할 때 주의가 필요함을 시사한다.

## 원문

- [Functional & integrative genomics](https://doi.org/10.1007/s10142-026-02088-4) · DOI 10.1007/s10142-026-02088-4
