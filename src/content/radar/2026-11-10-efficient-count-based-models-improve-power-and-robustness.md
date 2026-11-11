---
title: "sceQTL 분석 효율을 높인 카운트 기반 pseudobulk 프레임워크 jaxQTL"
date: 2026-11-10
kind: paper
summary: "OneK1K 대규모 단일세포 데이터셋에서 기존 방법보다 빠르게 더 많은 eGene을 찾아냈다."
sourceName: "Nature Genetics"
sourceUrl: "https://www.nature.com/articles/s41588-026-02830-5"
journal: "Nature Genetics"
doi: "10.1038/s41588-026-02830-5"
authors: ["Zixuan Eleanor Zhang"]
topics: ["단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

대규모 단일세포 eQTL 분석은 계산 비용이 크고 검출 파워가 떨어지는 한계가 있었다. 본 연구는 카운트 기반 pseudobulk 프레임워크인 jaxQTL을 제안해 이 문제를 다룬다. 속도 향상과 함께 기존 도구보다 높은 eGene 발굴 성과를 보여준다.

## 무엇을 했나

- 단일세포 eQTL 분석을 위한 카운트 기반 pseudobulk 프레임워크 jaxQTL을 개발했다.
- 대규모 코호트 데이터인 OneK1K 단일세포 전사체 데이터셋에 적용해 성능을 검증했다.
- 기존 분석 도구 대비 한층 빠른 연산 속도를 달성했다.
- 동일 데이터에서 기존 방법보다 더 많은 수의 eGene을 발굴했다.

## 왜 눈여겨볼 만한가

대규모 scRNA-seq 코호트에서 eQTL 매핑을 진행할 때 계산 병목을 줄이고 발굴률을 높이는 대안이 될 수 있다. 다만 초록 수준에서는 구체적인 하드웨어 요구사항이나 상세 제약 조건이 명시되지 않아, 실무 적용 시 자체 데이터셋을 통한 사전 벤치마크가 필요해 보인다.

## 원문

- [Nature Genetics](https://www.nature.com/articles/s41588-026-02830-5) · DOI 10.1038/s41588-026-02830-5
