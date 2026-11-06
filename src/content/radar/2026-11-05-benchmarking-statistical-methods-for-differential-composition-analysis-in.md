---
title: "대규모 scRNA-seq 세포 조성 분석 통계 기법 12종 벤치마크"
date: 2026-11-05
kind: paper
summary: "대규모 scRNA-seq의 세포 비율 변화를 분석하는 통계 기법 12종을 비교 검증하고 분석 가이드를 제시했다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.11.04.764099v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.11.04.764099"
authors: ["Wu", "W.", "He", "M.", "Hu", "Y.", "Su", "C."]
topics: ["단일세포", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

대규모 코호트 scRNA-seq 데이터에서 조건별 세포 비율 변화(differential composition)를 해석하는 분석은 질환 메커니즘 규명에 필수적이다. 하지만 조성성(compositionality), 과산포, 영값 문제 및 공변량 교란으로 인해 통계적 오류가 발생하기 쉬움에도 체계적인 성능 평가가 부재했다. 이 연구는 3개의 대규모 데이터셋을 바탕으로 기존 12개 통계 기법의 분석 정확도와 한계를 평가했다.

## 무엇을 했나

- 대표적인 대규모 scRNA-seq 데이터 3종과 이를 반영한 치환 및 시뮬레이션 데이터를 구축했다.
- 조성 분석에 사용되는 12개 통계 기법을 적용하여 방법론 간 결과 일치도, FDR 제어력, 검정력을 비교했다.
- 실제 데이터 적용 시 기법 간 일치도가 낮았으며 대다수 알고리즘이 과도한 위발견(false discovery)을 일으킴을 확인했다.
- FDR을 적절히 제어하면서도 뛰어난 검정력을 유지한 LOCOM을 가장 우수한 방법으로 꼽았고, ANCOM-BC와 clr 변환 기반 선형 회귀가 뒤를 이었다.

## 왜 눈여겨볼 만한가

scRNA-seq 코호트 데이터에서 특정 세포군의 비율 변화를 주장할 때 통계 기법 선택이 결과를 크게 좌우할 수 있음을 보여준다. 흔히 쓰이는 다수의 통계 알고리즘이 FDR을 통제하지 못해 위양성 결과를 남발할 위험이 존재한다. 세포 조성 분석을 수행할 때는 단순 회귀 모델 대신 LOCOM이나 ANCOM-BC 같은 검증된 툴을 최우선으로 검토하는 것이 바람직하다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.11.04.764099v1?rss=1
) · DOI 10.64898/2026.11.04.764099
