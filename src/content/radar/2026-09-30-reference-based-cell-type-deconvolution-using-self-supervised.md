---
title: "세포간 공간 상관관계를 반영한 디콘볼루션 도구 ctdecon"
date: 2026-09-30
kind: paper
summary: "단일세포 발현체 데이터와 공간적 상호관계를 함께 학습해 스팟 내 세포 비율을 추정한다."
sourceName: "Molecular omics"
sourceUrl: "https://doi.org/10.1093/molecular-omics/aaiag023"
journal: "Molecular omics"
doi: "10.1093/molecular-omics/aaiag023"
authors: ["Lin J", "Feng A", "Cao Y", "Chen Y", "Wang Z", "Liu Z", "Zhao X"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

공간전사체 기술에서 시퀀싱 기반 플랫폼은 하나의 스팟 안에 여러 세포가 섞여 있어 세포 유형별 조성을 정밀하게 분리하기 어렵다. 기존 디콘볼루션 알고리즘은 주로 유전자 발현량에만 의존하여 스팟 주변의 공간적 맥락을 충분히 활용하지 못했다. ctdecon은 scRNA-seq 참조 데이터에 세포 간 공간 상관관계를 통합해 스팟 내 세포 비율 추정 성능을 개선했다.

## 무엇을 했나

- scRNA-seq 참조 데이터와 자기지도 대조 학습 알고리즘을 활용한 디콘볼루션 신경망 모델 ctdecon을 개발했다.
- 유전자 발현 정보에만 의존하던 기존 방식과 달리 공간 도메인 상의 세포 유형 간 위치 상관관계를 함께 결합해 스팟 내 혼합 신호를 분해했다.
- 기술적 노이즈에 대한 강건성을 확보하고 재구성 오차를 줄여, 스팟별 세포 비율과 공간 분해능을 갖춘 세포 분포 지도를 도출했다.

## 왜 눈여겨볼 만한가

기존 발현량 기반 디콘볼루션 알고리즘이 독립된 스팟 단위로만 연산하여 공간 연속성을 놓치기 쉬웠던 한계를 보완할 수 있는 접근이다. 다만 레퍼런스로 사용되는 scRNA-seq 데이터의 품질과 세포 정의 수준에 따라 해독 정확도가 크게 좌우될 것으로 보인다. Visium처럼 스팟당 여러 세포가 섞이는 시퀀싱 기반 공간전사체 데이터를 재분석할 때 적용을 검토해 볼 만하다.

## 원문

- [Molecular omics](https://doi.org/10.1093/molecular-omics/aaiag023) · DOI 10.1093/molecular-omics/aaiag023
