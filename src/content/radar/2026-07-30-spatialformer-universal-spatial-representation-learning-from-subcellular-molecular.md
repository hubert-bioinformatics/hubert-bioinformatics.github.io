---
title: "공간전사체 범용 표현 학습 모델 SpatialFormer"
date: 2026-07-30
kind: paper
summary: "서브셀룰러 분포부터 다세포 조직까지 아우르는 멀티모달 공간전사체 학습 프레임워크"
sourceName: "Nature computational science"
sourceUrl: "https://doi.org/10.1038/s43588-026-01016-7"
journal: "Nature computational science"
doi: "10.1038/s43588-026-01016-7"
authors: ["Wang J", "Huang Y", "Winther O"]
topics: ["공간전사체", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

기존 공간전사체 분석 모델들은 단일세포의 유전자 발현량과 세포 간의 공간적 위치 정보를 통합하는 데 한계가 있었다. 이 연구는 컨볼루션 신경망과 트랜스포머를 결합한 하이브리드 모델을 통해 서브셀룰러 수준의 분자 분포와 다세포 미세환경을 동시에 학습하는 방식을 제안한다.

## 무엇을 했나

- 71개의 Xenium 슬라이드에서 얻은 1,700만 개의 공간 단일세포와 7억 개의 세포 쌍 데이터를 활용해 사전학습을 수행했다.
- 유전자 발현 프로파일과 세포 틈새(niche) 정보를 쌍별(pairwise) 학습 전략으로 통합하여 멀티스케일 정보를 추출했다.
- 배치 효과 보정, 세포 타입 주석화, 공동 국소화(co-localization) 탐지 등의 다양한 태스크에서 모델의 성능을 검증했다.
- 폐섬유증의 면역세포 상호작용 및 유방암의 종양 전이 신호와 관련된 핵심 유전자 쌍을 교란 분석(perturbation analysis)으로 식별했다.

## 왜 눈여겨볼 만한가

대규모 Xenium 데이터셋으로 사전학습된 범용 모델이라는 점에서 다양한 공간전사체 데이터에 전이학습 형태로 활용해 볼 만하다. 다만 10x Chromium 등 타 플랫폼 데이터나 다른 조직 타입에서의 일반화 성능은 추가적인 검증이 필요해 보인다. 대규모 서브셀룰러 및 다세포 데이터를 다루는 만큼 학습과 추론 과정에서 상당한 컴퓨팅 리소스가 요구될 수 있다.

## 원문

- [Nature computational science](https://doi.org/10.1038/s43588-026-01016-7) · DOI 10.1038/s43588-026-01016-7
