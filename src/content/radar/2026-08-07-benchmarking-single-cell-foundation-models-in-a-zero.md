---
title: "단일세포 파운데이션 모델 4종의 제로샷 벤치마크 평가"
date: 2026-08-07
kind: paper
summary: "세포 분류와 통합은 기존 전용 모델이 우수했으나 단백질 발현 예측에서는 파운데이션 모델이 더 뛰어났다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.08.03.739553v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.08.03.739553"
authors: ["Gaballa", "Y.", "Ahmed", "S.", "Abdelaal", "T."]
topics: ["단일세포", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

대용량 scRNA-seq 데이터로 사전 학습한 파운데이션 모델이 다수 등장했으나, 기존 전용 분석 도구 대비 제로샷 조건에서의 실질적인 우위는 명확히 검증되지 않았다. 연구진은 scGPT, SCimilarity, UCE, Transcriptformer 4종의 파운데이션 모델을 세포 타입 분류, 데이터 통합, 단백질 발현 예측 등 4개 다운스트림 태스크에 적용해 성능을 다각도로 측정했다.

## 무엇을 했나

- scGPT, SCimilarity, UCE, Transcriptformer 4개 파운데이션 모델에서 추가 파인튜닝 없이 제로샷 임베딩을 추출했다.
- 공개 단일세포 데이터셋을 바탕으로 세포 타입 아노테이션, 인간 데이터 통합, 종간 데이터 통합, 단백질 발현량 예측 등 4가지 태스크에 적용했다.
- 세포 타입 아노테이션과 데이터 통합 태스크에서는 scVI를 포함한 기존 베이스라인 모델들이 파운데이션 모델보다 우수한 성능을 나타냈다.
- 단백질 발현량 예측 태스크에서는 SCimilarity(최저 오차)와 Transcriptformer(최고 상관계수) 등 파운데이션 모델 임베딩이 베이스라인 예측 정확도를 상회했다.

## 왜 눈여겨볼 만한가

추가 학습이 없는 제로샷 조건의 파운데이션 모델을 기존 scVI 중심의 통합 및 아노테이션 분석 파이프라인의 완전한 대체재로 보기에는 한계가 있다. 그러나 단백질 발현 예측처럼 전사체 임베딩이 지닌 범용 표현형 정보가 유용한 태스크에서는 기존 베이스라인보다 나은 성능을 기대해 볼 수 있다. 현시점에서는 기존 전용 도구를 완전히 대체하기보다, 태스크 특성에 따라 보조적 임베딩 추출 도구로 선택적 검토를 진행하는 것이 현실적이다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.08.03.739553v1?rss=1
) · DOI 10.64898/2026.08.03.739553
