---
title: "Shiny 기반 오믹스 통합 분석 도구 BRIDGE"
date: 2026-07-27
kind: paper
summary: "단일 및 다중 오믹스 데이터를 로컬 환경에서 대화형으로 분석하고 시각화한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag558"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag558"
authors: ["Márquez-Oller D", "Pauli A", "Fallmann J"]
topics: ["전사체", "오믹스"]
aiGenerated: true
reviewed: false
draft: false
---

대규모 오믹스 데이터를 통합 분석하려면 복잡한 스크립팅과 전용 인프라가 필요해 연구 진입 장벽이 높았다. BRIDGE는 프로그래밍 전문 지식 없이도 RNA-seq와 단백질체 데이터를 로컬에서 손쉽게 통합하고 시각화할 수 있는 인터페이스를 제공한다.

## 무엇을 했나

- SQLite 데이터베이스 백엔드를 기반으로 독립적이고 프라이빗한 로컬 분석 환경을 구축했다.
- R Shiny를 활용하여 프로그래밍 지식 없이도 사용할 수 있는 모듈형 대화형 인터페이스를 구현했다.
- RNA-seq, 단백질체, 인산화 단백질체 분석을 위한 개별 분석 모듈과 통합 파이프라인을 제공한다.
- 내장된 캐싱과 비동기 처리 기능을 통해 일반적인 하드웨어에서도 효율적인 데이터 탐색과 시각화가 가능하도록 했다.

## 왜 눈여겨볼 만한가

별도의 대형 인프라 없이 로컬 환경이나 Docker 컨테이너로 가볍게 띄워 오믹스 데이터를 통합 탐색할 수 있다는 점에서 실용적이다. 다만 10x Genomics 같은 단일세포나 Visium·Xenium 같은 공간전사체 수준의 대용량 데이터셋 처리에 얼마나 최적화되어 있는지는 직접 구동해 보며 검토가 필요해 보인다. 복잡한 코드 작성 없이 웹 기반으로 RNA-seq와 단백질체 결과 간의 교차 분석을 빠르게 훑어봐야 하는 상황에서 유용하게 써볼 만하다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag558) · DOI 10.1093/bioinformatics/btag558
