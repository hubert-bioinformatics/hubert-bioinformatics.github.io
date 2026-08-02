---
title: "마우스 골막 및 골내막 중간엽 세포 분리를 위한 scRNA-seq 프로토콜"
date: 2026-07-30
kind: paper
summary: "EDTA 탈칼슘화와 효소 처리, lineage depletion을 조합해 중간엽 세포 수득률과 생존율을 높인 전처리 기법이다."
sourceName: "STAR protocols"
sourceUrl: "https://doi.org/10.1016/j.xpro.2026.104738"
journal: "STAR protocols"
doi: "10.1016/j.xpro.2026.104738"
authors: ["Kurilung A", "Wanchai V", "Xiong J", "Almeida M", "O'Brien CA", "Nookaew I"]
topics: ["단일세포", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

기존 마우스 뼈 조직의 단일세포 추출은 전체 조직을 한 번에 소화(bulk digestion)하는 방식을 주로 사용해 골막과 골내막 구획의 구분을 모호하게 만들었다. 또한 과도한 조혈모세포 혼입과 기계적·효소적 자극으로 인한 높은 정크 데이터 비율이 중간엽 세포 연구의 걸림돌이었다. 본 연구에서는 이를 해결하기 위해 순차적 비표적 세포 제거와 탈칼슘화 과정을 조합한 단일세포 전사체 전처리 프로토콜을 제시한다.

## 무엇을 했나

- EDTA 처리로 뼈 조직을 탈칼슘화한 후 Liberase™ 효소 소화 조건을 최적화하여 단일세포를 분리했다.
- 조혈모세포 및 내피세포 가계를 순차적으로 제거(depletion)하여 골막과 골내막 유래 중간엽 세포의 비중을 높였다.
- 세포 수득률(yield)과 생존율(viability)을 개선하여 scRNA-seq 데이터의 품질을 확보했다.
- 분석 단계에서 활용할 수 있도록 R 기반 Seurat 패키지를 이용한 데이터 전처리 및 시각화 기본 파이프라인을 제공했다.

## 왜 눈여겨볼 만한가

단독 효소 처리만으로는 분리하기 어려웠던 골조직 내 미세 환경 세포군, 특히 희소한 중간엽 줄기·기질세포의 해상도를 높일 수 있는 접근이다. 세포 제거(depletion) 절차가 추가되므로 핸들링 시간이 길어져 온-아이스(on-ice) 유지 및 퀄리티 컨트롤 관리가 변수가 될 수 있다. 근골격계 단일세포 연구에서 기질 세포군 시그널이 조혈모세포에 묻히는 문제를 겪고 있다면 전처리 단계에 도입을 검토해 볼 만하다.

## 원문

- [STAR protocols](https://doi.org/10.1016/j.xpro.2026.104738) · DOI 10.1016/j.xpro.2026.104738
