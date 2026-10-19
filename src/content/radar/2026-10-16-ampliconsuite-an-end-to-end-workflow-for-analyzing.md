---
title: "암 유전체 WGS 기반 국소 증폭 분석 워크플로우"
date: 2026-10-16
kind: paper
summary: "종양 유전체의 국소 증폭(focal amplification)을 전 과정에 걸쳐 분석하는 툴킷이다."
sourceName: "Nature Methods"
sourceUrl: "https://www.nature.com/articles/s41592-026-03264-x"
journal: "Nature Methods"
doi: "10.1038/s41592-026-03264-x"
authors: ["Jens Luebeck"]
topics: ["생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

암 유전체 WGS 데이터에서 국소 증폭 영역을 정확히 해상도 높게 파악하는 것은 복잡한 구조 변이 분석 과정에서 여전히 까다로운 과제다. 이 연구는 WGS 데이터로부터 국소 증폭을 일관되게 분석할 수 있는 통합 워크플로우를 제시한다.

## 무엇을 했나

- 암 유전체 전장유전체시퀀싱(WGS) 데이터를 입력으로 활용한다.
- 국소 증폭(focal amplifications) 영역을 식별하고 특성을 분석하는 툴킷인 AmpliconSuite를 개발했다.
- 데이터 전처리부터 국소 증폭 구조 해석까지 이어지는 엔드투엔드 워크플로우를 구축했다.

## 왜 눈여겨볼 만한가

WGS 기반 암 유전체 분석 파이프라인에서 국소 증폭과 ecDNA 관련 구조 변이를 다룰 때 표준적인 분석 도구로 검토해 볼 만하다. 다만 초록 수준의 정보만으로는 기존 Caller들과의 성능 비교나 대규모 임상 샘플에서의 실행 속도 등 구체적인 제약 사항을 파악하기 어렵다. 실제 현업 도입을 위해서는 상세 벤치마크 결과와 리소스 소모량을 추가로 확인해야 한다.

## 원문

- [Nature Methods](https://www.nature.com/articles/s41592-026-03264-x) · DOI 10.1038/s41592-026-03264-x
