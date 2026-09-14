---
title: "기능적 계층 구조로 희귀 세포 상태와 전이를 포착하는 scMustree"
date: 2026-09-10
kind: paper
summary: "탑다운 분해와 기능 기반 바텀업 병합을 결합해 단일세포 전사체 분석에서 세분화된 계층 구조를 복원한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag672"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag672"
authors: ["Xu Y", "Wang S", "Ding L", "Li HD", "Wang J"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

기존 단일세포 클러스터링 알고리즘은 단일 수준의 평면적 구획을 산출하는 경향이 있어, 연속적인 생물학적 전이나 희귀 세포 상태를 포착하는 데 한계가 있었다. scMustree는 탑다운 반복 분해와 바텀업 기능 병합을 결합하여 전사체 데이터 기반의 다중 스케일 계층 구조를 복원한다. 이를 통해 단순 클러스터링을 넘어 세포 간 기능적 연관성과 계통 구조를 통합적으로 분석하도록 돕는다.

## 무엇을 했나

- 전사체 균일성에 따른 탑다운 분해 후, DEG 및 Isolation Forest 스코어링 기반의 기능 순위에 맞춰 바텀업 병합을 수행하는 프레임워크를 구축했다.
- 11개 벤치마크 데이터셋을 대상으로 클러스터링 정확도와 계층적 생물학적 해석 가능성을 검증했다.
- 암 조직 내 섬유아세포 및 T세포 서브셋과 알츠하이머병 데이터셋의 지질 관련 미세아교세포 등 미분류 세포 상태를 식별했다.

## 왜 눈여겨볼 만한가

Leiden이나 Louvain 기반의 기존 클러스터링은 특정 해상도 파라미터에 의존해 단층 구획만 산출하므로, 세부 아형이나 연속적 전이 상태를 탐색하려면 하위 클러스터링을 반복해야 했다. scMustree는 기능적 유사도를 반영한 다단계 계층 구조를 제시하므로 희귀 세포 상태 발굴이나 계통 연관성 파악이 필요할 때 적용을 검토할 만하다. 다만 탑다운 분해와 기능 스코어링 절차가 결합되어 있어 대용량 single-cell 데이터셋 처리 시 computational overhead가 존재할 것으로 예상된다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag672) · DOI 10.1093/bioinformatics/btag672
