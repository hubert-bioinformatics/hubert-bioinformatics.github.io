---
title: "종양 미세환경 단일세포 및 공간전사체 데이터베이스 TISCH3"
date: 2026-11-19
kind: paper
summary: "477개 데이터셋으로 확장하고 공간 데이터 전용 모듈과 세포 조성 추정 기능을 탑재했다."
sourceName: "Nucleic acids research"
sourceUrl: "https://doi.org/10.1093/nar/gkag1227"
journal: "Nucleic acids research"
doi: "10.1093/nar/gkag1227"
authors: ["Lu Y", "Zuo S", "Han Y", "Cui H", "Huang C", "Zhao G", "Mei L", "Lian Y"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

종양 미세환경 연구에서 단일세포 전사체 자원은 크게 늘었으나, 세포의 공간적 위치와 상호작용을 함께 탐색할 수 있는 통합 자원은 부족했다. TISCH3는 기존 scRNA-seq 자원을 확장하고 공간전사체 데이터를 새로 통합하여 이러한 한계를 보완한다. 단일세포 레퍼런스 기반의 세포 조성 추정과 공간 분석 기능을 웹 환경에서 직접 제공한다.

## 무엇을 했나

- 48개 암종 대상의 scRNA-seq 데이터셋 218개와 27개 암종 대상의 공간전사체 데이터셋 69개를 추가해 총 477개 데이터셋을 구축했다.
- 공간전사체 샘플을 개별 큐레이션 및 전처리하고 scRNA-seq 레퍼런스를 연동하여 스팟별 세포 조성을 추정했다.
- 공간 유전자 발현 지도, 공간 가변 유전자(SVG), 세포 공존 분석, 세포 간 통신 네트워크 등 6개 전용 분석 모듈을 구현했다.
- 기존 TISCH2의 단일세포 분석 파이프라인을 유지하면서 별도 가입 없이 데이터와 분석 결과를 다운로드할 수 있도록 했다.

## 왜 눈여겨볼 만한가

자체 공간전사체 데이터 세트를 구축하기 전 public 데이터로 종양 미세환경 내 SVG나 세포 간 상호작용을 빠르게 스크리닝할 때 유용한 자원이다. Visium 등 스팟 기반 공간전사체의 세포 분해(deconvolution) 결과를 웹에서 즉시 확인할 수 있어 초기 가설 검증 단계를 단축해 줄 것으로 보인다. 다만 데이터셋별 큐레이션 조건이나 외부 레퍼런스 선택에 따른 편향이 존재할 수 있으므로 주요 관찰 결과는 자체 데이터로 재검증을 거치는 것이 바람직하다.

## 원문

- [Nucleic acids research](https://doi.org/10.1093/nar/gkag1227) · DOI 10.1093/nar/gkag1227
