---
title: "타깃 scDNA-seq의 셀 콜링 재현성을 높인 오픈소스 파이프라인 CellSavior"
date: 2026-11-10
kind: paper
summary: "앙상블 클러스터링 기법으로 탭스트리 등 타깃 scDNA-seq 데이터의 바코드 노이즈를 정밀 분류한다"
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag808"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag808"
authors: ["Kim T", "Chung YS", "Park D", "Oh S", "Shim JK", "Cho H", "Kang SG", "Kim S"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

Tapestri 등 타깃 scDNA-seq 플랫폼은 비공개 상용 파이프라인과 경험적 임계값 설정에 의존해 데이터 분석의 재현성이 떨어지는 문제가 있었다. 셀 콜링 단계의 모호함은 실제 세포 바코드 탈락으로 이어져 하류 변이 분석 결과 전체를 왜곡할 수 있다. 본 연구진은 다양한 거리 지표 기반 앙상블 클러스터링을 도입해 셀 콜링의 편향을 줄인 오픈소스 프레임워크 CellSavior를 개발했다.

## 무엇을 했나

- 거리 지표 다변화와 신뢰도 가중 합병 알고리즘을 결합한 앙상블 클러스터링 기반 바코드 분류 프레임워크를 구축했다.
- 공개 데이터셋과 자체 데이터셋을 포함한 총 33개의 scDNA-seq 데이터에 알고리즘을 적용해 검증했다.
- 31개 데이터셋에서 상용 파이프라인과 일치하는 성능을 확인했으며 불일치 건에서는 주요 핫스팟 변이가 포함된 서브클론 세포군을 추가로 구출했다.

## 왜 눈여겨볼 만한가

Tapestri 플랫폼의 블랙박스형 상용 셀 콜링 알고리즘이나 임계값 설정 문제로 고민하던 연구진에게 실질적인 대안이 될 수 있다. 특히 변이 핫스팟을 가진 소수 암 클론이 배경 노이즈로 판정되어 누락되는 현상을 완화하는 데 유용할 것으로 보인다. 다만 타깃 scDNA-seq 데이터에 최적화된 결과이므로 coverage 변동성이 큰 전장 유전체 기반 scDNA-seq에 적용할 때는 추가 검증이 필요할 수 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag808) · DOI 10.1093/bioinformatics/btag808
