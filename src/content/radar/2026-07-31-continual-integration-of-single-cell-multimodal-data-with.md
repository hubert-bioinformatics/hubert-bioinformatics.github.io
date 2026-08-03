---
title: "지속 학습 기반 단일세포 다중오믹스 통합 모델 MIRACLE"
date: 2026-07-31
kind: paper
summary: "전체 재통합 과정 없이 신규 오믹스 데이터를 누적 반영하여 아틀라스를 효율적으로 확장한다."
sourceName: "Nature computational science"
sourceUrl: "https://doi.org/10.1038/s43588-026-01030-9"
journal: "Nature computational science"
doi: "10.1038/s43588-026-01030-9"
authors: ["Zhou J", "Wang J", "Hu S", "Kan T", "Feng C", "Qiang X", "Dong G", "Shi J"]
topics: ["오믹스", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 다중오믹스 아틀라스를 업데이트하려면 매번 기존 데이터를 포함한 전체 재통합 과정을 거쳐야 해 연산 효율과 확장성에 한계가 있었다. 연구진은 온라인 학습 알고리즘 기반의 MIRACLE 프레임워크를 통해 이 문제를 해결하고자 했다.

## 무엇을 했나

- 동적 아키텍처 적응과 데이터 리허설 기법을 적용한 지속 학습(continual learning) 모델 MIRACLE을 구축했다.
- 교차 모달, 교차 조직, 교차 질병 조건의 신규 데이터셋을 순차적으로 통합하며 생물학적 신호 보존 성능을 검증했다.
- COVID-19, 독감 A형, 결핵 등 호흡기 감염병 데이터에 적용해 공통 면역 기전과 병원체 특이적 반응을 선별했다.

## 왜 눈여겨볼 만한가

새로운 데이터가 추가될 때마다 처음부터 다시 배치를 잡고 인베딩을 계산해야 했던 대규모 아틀라스 업데이트 비용을 낮출 수 있는 접근이다. 데이터 리허설 시 이전 데이터 추출 비율이나 배치 효과 제어 성능에 따라 세부 세포군 보존도가 달라질 수 있어 실제 적용 시 검증이 필요해 보인다.

## 원문

- [Nature computational science](https://doi.org/10.1038/s43588-026-01030-9) · DOI 10.1038/s43588-026-01030-9
