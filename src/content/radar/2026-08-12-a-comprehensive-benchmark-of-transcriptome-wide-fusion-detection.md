---
title: "롱리드 전사체 시퀀싱 기반 융합 유전자 검출 알고리즘 벤치마크"
date: 2026-08-12
kind: paper
summary: "다양한 시퀀싱 플랫폼과 분석 알고리즘별 융합 전사체 검출 정확도와 한계를 종합 검증했다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.08.07.743439v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.08.07.743439"
authors: ["Dorney", "R.", "Wu", "S.", "Hung", "J. Y.-H.", "Hebbard", "L."]
topics: ["전사체", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

롱리드 RNA 시퀀싱은 전장 전사체와 복잡한 구조의 융합 유전자를 검출하는 데 유용하지만, 기술적 아티팩트로 인한 위양성(false positive)을 구별하기 어렵다는 한계가 있다. 본 연구에서는 시뮬레이션 데이터와 암 세포주 전사체를 활용해 다양한 롱리드 시퀀싱 플랫폼과 6종의 분석 알고리즘을 종합 벤치마크했다. 시퀀싱 깊이, 리드 수 지원 임계값, 컨센서스 파이프라인 등 주요 분석 전략에 따른 정밀도와 감도 변화를 평가했다.

## 무엇을 했나

- ONT(cDNA, PCR-cDNA, dRNA), PacBio Kinnex, Illumina 데이터셋과 6종의 롱리드 융합 검출 알고리즘을 비교 평가했다.
- 시뮬레이션 전사체 및 3종의 암 세포주 데이터를 사용해 시퀀싱 깊이와 리드 지원 임계값 설정이 검출 정확도에 미치는 영향을 측정했다.
- ONT PCR-cDNA와 CTAT-LR-Fusion 조합이 정밀도와 재현율 간 가장 우수한 균형을 보였으며, 3개 유전자 결합 융합체 검출에는 JAFFAL이 가장 안정적인 성능을 나타냈다.
- 모든 알고리즘을 교차 검증하는 컨센서스 필터링 방식은 위양성을 줄였으나, 400개 시뮬레이션 융합체 중 단 1개만 모든 도구에서 공통 검출될 정도로 감도가 급격히 떨어졌다.

## 왜 눈여겨볼 만한가

롱리드 시퀀싱이 숏리드보다 복잡한 구조의 융합 전사체 파악 및 교잡 파트너(promiscuous partner) 오탐지를 줄이는 데 유리하지만, 절단점(breakpoint)의 정확한 위치 규명 한계와 높은 위양성 발생률은 여전히 주요 걸림돌이다. 현업에서 롱리드 기반 융합 유전자 파이프라인 구축 시 ONT PCR-cDNA와 CTAT-LR-Fusion 조합을 우선 고려해 볼 수 있다. 단, 위양성을 줄이기 위해 여러 알고리즘의 공통 결과만 취하는 컨센서스 전략은 과도한 위음성을 유발할 위험이 크므로 주의가 필요하다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.08.07.743439v1?rss=1
) · DOI 10.64898/2026.08.07.743439
