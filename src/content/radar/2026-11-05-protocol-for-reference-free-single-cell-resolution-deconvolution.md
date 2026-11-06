---
title: "CoexpressDeconvolve 기반 레퍼런스 프리 공간전사체 디콘볼루션 프로토콜"
date: 2026-11-05
kind: paper
summary: "단일세포 참조 데이터 없이 스팟 기반 공간전사체에서 세포 수준의 전전사체를 복원하는 분석 절차를 다룬다."
sourceName: "STAR protocols"
sourceUrl: "https://doi.org/10.1016/j.xpro.2026.104947"
journal: "STAR protocols"
doi: "10.1016/j.xpro.2026.104947"
authors: ["Perik-Zavodskaia O", "Perik-Zavodskii R", "Alrhmoun S", "Sennikov S"]
topics: ["공간전사체", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

Visium과 같은 스팟 기반 공간전사체는 스팟 하나에 여러 세포가 섞여 들어가 단일세포 해상도를 얻기 어렵다. 기존 디콘볼루션 알고리즘은 매칭되는 scRNA-seq 참조 데이터에 의존하므로 적절한 레퍼런스가 없는 조직 샘플에서는 적용에 한계가 있었다. 본 연구는 참조 데이터 없이 스팟 데이터만으로 단일세포 수준의 전전사체 프로파일을 재구성하는 CoexpressDeconvolve 분석 절차를 제시한다.

## 무엇을 했나

- 하우스키핑 유전자 기반의 세포 밀도 보정과 과분산 유전자 선별을 거쳐 유전자 공표현 매니폴드를 구축한다.
- 토픽 개수를 자동 결정한 후 Latent Dirichlet Allocation(LDA) 및 계층적 베이지안 샘플링을 수행해 스팟 내 신호를 분리한다.
- 분리된 단일세포 수준 전전사체 결과를 10x 호환 데이터 객체로 출력하여 기존 단일세포 분석 파이프라인에 연결한다.

## 왜 눈여겨볼 만한가

scRNA-seq 레퍼런스를 구하기 힘든 희귀 질환이나 임상 조직의 Visium 데이터 분석 시 유용한 비참조형 대안이 될 수 있다. LDA 및 베이지안 샘플링 계산 비용에 대한 고려는 필요하지만, 결과를 10x 호환 객체로 다이렉트 내보내기하여 기존 세포 간 상호작용(Cell-Cell Communication) 분석 도구로 바로 이어질 수 있다는 점이 실무적 장점이다.

## 원문

- [STAR protocols](https://doi.org/10.1016/j.xpro.2026.104947) · DOI 10.1016/j.xpro.2026.104947
