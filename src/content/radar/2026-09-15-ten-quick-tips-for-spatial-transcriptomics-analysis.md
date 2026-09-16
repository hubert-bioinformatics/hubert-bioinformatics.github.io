---
title: "공간전사체 실험 설계부터 데이터 분석까지의 핵심 가이드"
date: 2026-09-15
kind: paper
summary: "시퀀싱 및 이미지 기반 공간전사체 플랫폼별 특성과 통합 분석 흐름을 정리했다."
sourceName: "PLoS computational biology"
sourceUrl: "https://doi.org/10.1371/journal.pcbi.1014757"
journal: "PLoS computational biology"
doi: "10.1371/journal.pcbi.1014757"
authors: ["Kurogi N", "Shimbara K", "Koreeda T", "Tsuyuzaki K"]
topics: ["공간전사체", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

Visium, Xenium 등 공간전사체 플랫폼과 분석 도구가 빠르게 다양화되면서 연구 목적에 맞는 적절한 기술 선택과 데이터 처리에 난항을 겪는 경우가 많다. 이 논문은 시퀀싱 기반과 이미지 기반 기술을 아우르며 연구 설계부터 데이터 분석, 멀티오믹스 통합까지 전 과정을 10가지 팁으로 정리한다. 연속 절편을 통한 3차원 조직 재구성의 어려움 등 현 시점의 주요 기술적 한계점도 함께 다룬다.

## 무엇을 했나

- Visium, Stereo-seq 등 시퀀싱 기반 플랫폼과 MERFISH, Xenium, CosMx 등 이미지 기반 플랫폼의 특성을 체계적으로 분류했다.
- 연구 질문에 맞춘 플랫폼 선정 기준과 공간전사체 데이터 전처리, 분석, 시각화에 필요한 주요 소프트웨어를 정리했다.
- scRNA-seq 및 공간 단백체 데이터와의 통합 분석 방법과 공공 데이터셋 활용 방안을 제시했다.
- 연속 조직 절편 기반의 3차원 조직 구조 복원 문제 등 공간전사체 분석이 가진 기술적 제약사항을 지적했다.

## 왜 눈여겨볼 만한가

공간전사체 연구를 새로 시작하거나 scRNA-seq 데이터와의 공간 통합 분석을 기획할 때 워크플로우 전반을 점검하는 가이드로 유용하다. 특정 플랫폼에 종속되지 않은 중립적인 시각에서 분석 단계별 고려사항과 한계를 짚어주므로 초기 시행착오를 줄이는 데 도움이 될 것으로 보인다. 다만 실무 가이드론 성격이 강하므로 개별 분석 툴의 정밀한 벤치마킹 성능이나 구체적인 파라미터는 관련 논문을 추가로 확인해야 한다.

## 원문

- [PLoS computational biology](https://doi.org/10.1371/journal.pcbi.1014757) · DOI 10.1371/journal.pcbi.1014757
