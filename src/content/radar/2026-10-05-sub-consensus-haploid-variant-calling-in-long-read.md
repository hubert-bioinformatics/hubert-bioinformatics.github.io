---
title: "ONT 롱리드 시퀀싱에서 LoFreq 기반 서브컨센서스 변이 검출 성능 평가와 보정"
date: 2026-10-05
kind: paper
summary: "Phred score 보정으로 ONT 데이터의 높은 위양성률을 낮추는 방안을 제시한다."
sourceName: "PloS one"
sourceUrl: "https://doi.org/10.1371/journal.pone.0356259"
journal: "PloS one"
doi: "10.1371/journal.pone.0356259"
authors: ["Zair X", "Wilm A", "Benton MC", "Tham CY", "Yang L", "Florez de Sessions P", "Sessions OM", "Chew EH"]
topics: ["NGS", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

바이러스 진화 추적 등에서는 저빈도 변이 검출이 중요하지만, 기존 쇼트리드용 도구인 LoFreq를 롱리드인 ONT 데이터에 그대로 적용하면 위양성률이 높아지는 문제가 있었다. 본 연구는 다양한 조건에서 LoFreq의 성능을 벤치마크하고, 품질 점수 보정을 통해 정확도를 높이는 방법을 다룬다.

## 무엇을 했나

- SARS-CoV-2 스파이크 유전자 플라스미드와 대장균(E. coli) 전장 게놈으로 트루 셋을 구축하여 실험을 진행했다.
- ONT R9.4.1 및 R10.4.1 플로우셀을 사용하여 라이브러리를 시퀀싱했다.
- 케미스트리와 커버리지 깊이에 따른 LoFreq의 리콜(recall)과 위발견율(FDR)을 평가했다.
- Phred quality score를 조정하는 보정 방법을 도입하여 위양성 감소 효과를 검증했다.

## 왜 눈여겨볼 만한가

LoFreq는 0.1% 수준의 저빈도 변이도 잡아내는 민감도를 보이지만, 원시 ONT 데이터에서는 높은 위양성률 때문에 곧바로 쓰기 어렵다. 제시된 Phred 점수 보정법은 위양성을 줄이는 데 도움을 주지만, 10% 미만의 주파수에서는 효과가 떨어지고 구조 변이 검출에는 적합하지 않다는 한계가 있다. 따라서 10% 이상의 서브컨센서스 SNV 분석에 한해 간단한 파이프라인 보조 수단으로 검토해 볼 만하다.

## 원문

- [PloS one](https://doi.org/10.1371/journal.pone.0356259) · DOI 10.1371/journal.pone.0356259
