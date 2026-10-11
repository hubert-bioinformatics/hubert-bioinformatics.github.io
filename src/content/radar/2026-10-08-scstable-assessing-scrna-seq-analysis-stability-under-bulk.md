---
title: "단일세포 분석의 안정성 평가 프레임워크 scStable"
date: 2026-10-08
kind: paper
summary: "벌크 전사체의 샘플 간 변이를 단일세포 데이터에 주입해 분석 안정성을 평가한다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.10.01.755876v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.10.01.755876"
authors: ["Jiang", "C.", "Li", "J. J."]
topics: ["전사체", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 RNA sequencing 연구는 적은 수의 샘플만 프로파일링하는 경우가 많아 실제 샘플 간 변이에 따른 분석 결과의 안정성을 검증하기 어렵다. scStable은 단일 샘플의 세포 수준 이질성을 유지하면서 벌크 데이터 기반의 샘플 간 변이를 모사한 가상 샘플을 생성해 이 문제를 다룬다.

## 무엇을 했나

- 단일 샘플 참조 데이터의 세포 수준 이질성을 보존하면서 벌크 데이터 유래 샘플 간 변이를 주입하는 가상 샘플 생성 프레임워크 scStable을 개발했다.
- 21개의 매칭된 위암 scRNA-seq 및 bulk RNA-seq 코호트 데이터에서 ZINB-WaVE, 서브샘플링, 가우스 노이즈 주입 방식과 성능을 비교했다.
- scStable이 기존 방식들보다 실제 관찰된 샘플 간 변이를 더 정확하게 재현함을 확인했다.
- 생성된 가상 샘플을 활용해 안정적인 차발견 유전자(DEG) 선별과 클러스터링 방법 및 하이퍼파라미터 최적화를 수행했다.

## 왜 눈여겨볼 만한가

적은 샘플 수로 인해 단일세포 분석 결과의 재현성을 고민하던 연구자에게 유용한 도구가 될 수 있다. 다만 벌크-단일세포 매칭 데이터가 필수적이므로, 해당 코호트가 없는 연구에서는 적용에 제약이 있을 것으로 보인다. 안정성 기반의 DEG 우선순위화나 파라미터 튜닝이 필요한 분석 파이프라인에서 검토해 볼 만하다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.10.01.755876v1?rss=1
) · DOI 10.64898/2026.10.01.755876
