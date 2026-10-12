---
title: "10x와 Parse scRNA-seq의 체계적 편향 비교 분석"
date: 2026-10-11
kind: paper
summary: "핵내 RNA 포획률과 GC 편향 차이로 인해 두 플랫폼의 발현량과 세포 조성 데이터는 직접 호환되지 않는다"
sourceName: "bioRxiv Genomics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.10.09.758116v1?rss=1\n"
journal: "bioRxiv Genomics"
doi: "10.64898/2026.10.09.758116"
authors: ["Caskey", "M.", "Hallgrimsdottir", "I. B."]
topics: ["전사체", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

Droplet 기반 10x Chromium과 split-pool 바코딩 기반 Parse Evercode는 대표적인 단일세포 전사체 플랫폼이지만, 두 플랫폼 간 기술적 편향에 대한 체계적인 비교는 미흡했다. 연구진은 여러 조직과 종을 아우르는 5개 연구의 7개 페어링 샘플을 활용해 유전자 포획과 전사체 조성 측면에서 10x와 Parse를 대조했다. 특히 Parse 리드를 프라이밍 전략별로 분리해 시약 수준의 효과와 플랫폼 자체의 효과를 구별하여 분석했다.

## 무엇을 했나

- 다양한 종과 조직을 포함한 5개 연구의 10x Chromium 및 Parse Evercode WT 맞춤 샘플 7쌍을 수집해 유전자 수와 전사체 조성 차이를 분석했다.
- Parse의 리드를 프라이밍 전략별로 분리하여 바코딩 기술 자체의 플랫폼 효과와 프라이밍 화학 반응에 따른 편향을 구분했다.
- 프라이밍 전략에 따라 Parse 내부의 GC 함량 편향이 발생하는 것을 확인했으며, 플랫폼 차원에서는 Parse에서 핵 RNA가 상대적으로 더 많이 포획되는 조성 변화를 발견했다.
- 특정 드롭렛 모델을 가정하지 않는 오염 측정법을 적용해 분석한 결과, Parse의 배경 RNA 오염 수준은 기존 주장과 달리 10x와 비슷한 수준임을 확인했다.

## 왜 눈여겨볼 만한가

10x와 Parse 데이터를 교차 분석하거나 기존 10x 데이터셋에 Parse 데이터셋을 단순 합산하려는 실험실에 직접적인 가이드를 제공한다. Parse의 경우 핵 전사체 비율이 높게 나타나므로 세포 조성이나 DEG 분석 시 10x와 직접 비교하면 기술적 아티팩트가 생길 수 있다. 또한 split-pool 방식이라도 ambient RNA 오염 수치가 10x와 유사하다는 점에서, 데이터 전처리 시 오염 제거 파이프라인을 동일하게 엄격히 적용할 필요가 있어 보인다.

## 원문

- [bioRxiv Genomics](
https://www.biorxiv.org/content/10.64898/2026.10.09.758116v1?rss=1
) · DOI 10.64898/2026.10.09.758116
