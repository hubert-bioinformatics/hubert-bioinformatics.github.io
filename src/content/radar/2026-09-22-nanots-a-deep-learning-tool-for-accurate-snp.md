---
title: "나노포어 전사체 데이터의 SNP 검출 정확도를 높인 딥러닝 툴 NanoTS"
date: 2026-09-22
kind: paper
summary: "direct RNA 및 cDNA 데이터에서 5X 이상 커버리지로 높은 F1 스코어와 불균형 변이 검출력을 보였다."
sourceName: "Nature Methods"
sourceUrl: "https://www.nature.com/articles/s41592-026-03225-4"
journal: "Nature Methods"
doi: "10.1038/s41592-026-03225-4"
authors: ["Zelin Liu"]
topics: ["시퀀싱 기술", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

나노포어 롱리드 전사체 시퀀싱 데이터는 서열 오류율로 인해 정확한 변이 검출에 한계가 있었다. 특히 발현량이 한쪽 대립유전자에 편중된 변이는 기존 호출 도구에서 누락되기 쉬웠다. 본 연구진은 딥러닝 기반의 NanoTS를 개발하여 다양한 나노포어 전사체 데이터 세트에서 높은 정확도로 SNP를 분석하는 방안을 제시한다.

## 무엇을 했나

- 나노포어 direct RNA 및 cDNA 시퀀싱 데이터를 포함해 다양한 타입의 전사체 데이터에서 작동하는 딥러닝 기반 SNP 검출 도구인 NanoTS를 개발했다.
- 최소 5개의 지원 리드(read) 조건에서 direct RNA 데이터는 F1 스코어 0.980 이상, cDNA 데이터는 0.966 이상의 SNP 호출 정확도를 달성했다.
- 기존 도구에서 검출이 어려웠던 대립유전자 불균형(allelically imbalanced) 변이 호출 성능을 크게 끌어올렸다.
- 단일 유전자 질환(멘델 질환)의 원인이 되는 병원성 변이 검출 및 유전자형 확정(genotype calling)을 입증하여 임상 적용 가능성을 확인했다.

## 왜 눈여겨볼 만한가

WGS/WES 없이 전사체 데이터만으로 변이를 정확히 호출할 수 있다면 대립유전자 특이적 발현(ASE)이나 변이의 기능적 영향을 한 번에 분석하기 유용하다. NanoTS는 5X 수준의 낮은 read depth에서도 높은 정확도를 유지하므로 롱리드 RNA 시퀀싱 비용 부담을 줄이는 데 기여할 것으로 보인다. 다만 전사체 데이터 특성상 발현량이 없거나 극도로 낮은 유전자의 변이는 파악할 수 없으므로, DNA 변이 분석을 완전 대체하기보다는 유전체-전사체 교차 검증 용도로 활용하는 것이 적절하다.

## 원문

- [Nature Methods](https://www.nature.com/articles/s41592-026-03225-4) · DOI 10.1038/s41592-026-03225-4
