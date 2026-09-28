---
title: "AI 에이전트 탐색 기반 공간전사체 세포 분할 도구 MCseg"
date: 2026-09-25
kind: paper
summary: "이미지 처리 지식 없이 로컬 환경에서 Xenium 데이터의 세포 경계와 전사체 할당 정밀도를 높인다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.09.20.752837v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.09.20.752837"
authors: ["Chan", "C.-R.", "Chang", "N.-W.", "Wang", "C.-Y.", "Tan", "H.-Y."]
topics: ["공간전사체", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

고해상도 공간전사체 데이터 분석에서 세포 경계 분할과 전사체 할당은 핵심 과정이지만, 기존 워크플로우는 세포 경계의 순도와 전사체 포획량 사이에서 타협해야 하거나 복잡한 파라미터 튜닝을 요구하는 한계가 있었다. MCseg는 AI 에이전트 기반 탐색으로 최적화된 세포 분할 엔진을 탑재하여 별도의 코드 작성 없이 고정된 파라미터로 실행할 수 있는 분석 플랫폼이다. 이 연구는 최적화 알고리즘을 세포 이미지 전처리와 연계해 세포 분할 정밀도 및 계통 특이적 전사체 누출을 개선한 결과를 제시한다.

## 무엇을 했나

- 세포 이미지 처리와 분할 연산 조합을 AI 에이전트가 반복 평가하도록 설계하여 Xenium 세포 경계 기준의 고정 파라미터 MCseg 엔진을 구축했다.
- 폐선암 데이터셋 평가에서 MCseg는 Optuna로 튜닝한 Cellpose 기준 모델 대비 평균 Panoptic Quality를 0.432에서 0.472로 향상시켰다.
- 대장암 조직 15개 영역 분석 시 Space Ranger 대비 동등한 UMI 밀도에서 세포 간 전사체 누출을 줄이고 계통별 발현 구분을 명확히 했다.
- 별도의 조직 맞춤형 구조 탐색 없이 동결 유방암 조직 데이터에도 동일한 고정 워크플로우가 직접 적용됨을 확인했다.

## 왜 눈여겨볼 만한가

Xenium 데이터를 다룰 때 Space Ranger의 기본 분할 알고리즘이나 Cellpose 파라미터 최적화에 번거로움을 느끼던 연구자에게 유용한 대안이 될 수 있다. 별도 코드 작성 없이 로컬 환경에 다운로드해 사용할 수 있어 이미지 분석 파이프라인 구축 부담을 줄이면서 전사체 누출 현상(transcript bleeding)을 완화하는 데 기여할 것으로 보인다. 다만 AI 에이전트가 Xenium 경계를 주요 기준으로 학습된 만큼, 다른 공간 플랫폼이나 염색 조건이 크게 다른 샘플에서의 범용성은 추가적인 검증이 필요할 것으로 판단된다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.09.20.752837v1?rss=1
) · DOI 10.64898/2026.09.20.752837
