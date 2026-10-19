---
title: "AlphaGenome Variant Impact 스코어 성능 벤치마크"
date: 2026-10-17
kind: paper
summary: "AVI 스코어의 성능을 신규 ClinVar 데이터와 스플라이싱 에세이로 검증했다."
sourceName: "bioRxiv Genomics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.10.11.758362v1?rss=1\n"
journal: "bioRxiv Genomics"
doi: "10.64898/2026.10.11.758362"
authors: ["Cavus", "O. A.", "Kuskucu", "A."]
topics: ["생물정보학", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

대규모 유전체 스코어 모델들이 쏟아져 나오고 있으나, 학습에 쓰이지 않은 미지의 데이터셋에서의 실제 성능을 엄밀히 검증한 독립 평가는 부족하다. 본 연구는 AlphaGenome Variant Impact(AVI) 스코어의 성능을 기존 스플라이싱 예측 툴들과 비교하여 그 실효성을 검증했다.

## 무엇을 했나

- 개발사 학습 데이터에 포함되지 않은 8만여 개의 희귀 단일염기변이와 6개의 스플라이싱 에세이 데이터를 독립적인 평가 셋으로 구축했다.
- 엑손에서 3염기 이상 떨어진 인트론 변이 구간에서 AUROC를 측정한 결과, AVI는 0.957을 기록했다.
- 딥 인트론 변이와 실제 스플라이싱 에세이 검증에서는 SpliceAI가 AVI보다 우수한 순위 산정 성능을 보였다.
- ClinGen 보정 기준을 적용했을 때, AVI는 병원성 변이의 52%에 강한 근거를 부여했으나 양성 변이에 대해서는 SpliceAI보다 낮은 비율을 보였다.

## 왜 눈여겨볼 만한가

임상 유전체 분석에서 변이 해석용 스코어를 새로 도입할 때 기존 툴과의 비교는 필수적이다. 이번 벤치마크 결과에 따르면 AVI는 특정 구간에서 CADD보다는 우수하지만, 스플라이싱 예측 성능 면에서는 SpliceAI나 새롭게 등장한 SpliceAI2에 비해 확실한 우위를 점한다고 보기 어렵다. 특히 연구진도 진단용 목적이 아닌 연구용으로만 한정하고 있으므로, 실제 파이프라인 적용 시에는 이러한 성능 한계를 염두에 두어야 한다.

## 원문

- [bioRxiv Genomics](
https://www.biorxiv.org/content/10.64898/2026.10.11.758362v1?rss=1
) · DOI 10.64898/2026.10.11.758362
