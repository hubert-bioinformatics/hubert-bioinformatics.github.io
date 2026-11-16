---
title: "롱리드 데이터에서 샘플 특이적 CpG를 발굴하는 bsseq 모델"
date: 2026-11-13
kind: paper
summary: "롱리드 기반 우도 모델로 비참조 CpG를 포함해 메틸화 수준 측정 편향을 줄인다"
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag821"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag821"
authors: ["Hansen SB", "Hansen KD", "Limborg MT"]
topics: ["시퀀싱 기술", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

척추동물 게놈의 CpG 영역은 에피제네틱 수식과 변이가 빈번히 발생하지만, 샘플 특이적인 CpG 위치를 정밀하게 판별하는 데는 한계가 있었다. 이로 인해 참조 유전체 중심 분석 기법에서는 비참조 CpG가 누락되어 메틸화 수준 추정에 편향이 발생하기 쉽다. 본 연구는 롱리드 시퀀싱 데이터에서 참조 및 비참조 CpG 위치를 정밀하게 식별하는 리드 기반 우도 프레임워크를 개발하고 이를 bsseq 패키지에 통합했다.

## 무엇을 했나

- Nanopore 및 PacBio 단일 분자 롱리드 시퀀싱 데이터를 대상으로 개별 리드 단위의 우도 평가 알고리즘을 구축했다.
- 참조 유전체 표지 CpG뿐만 아니라 샘플 특이적인 비참조 CpG 위치를 고정밀·고민감도로 식별하도록 설계했다.
- 샘플 특이적 CpG를 분석에 포함하여 분석 대상 로커스 수를 늘리고 메틸화 수준 추정 시 발생하는 편향을 줄였다.
- 해당 프레임워크를 기존 R/Bioconductor 패키지인 bsseq 환경 내에서 직접 사용할 수 있도록 구현했다.

## 왜 눈여겨볼 만한가

롱리드 시퀀싱을 활용해 구조 변이나 헤테로지니어스한 샘플 고유의 CpG 메틸화를 정교하게 프로파일링할 때 유용해 보인다. 기존 bsseq 기반 파이프라인의 틀을 유지하면서 롱리드 데이터 특성에 맞춘 CpG 필터링을 추가할 수 있다는 점이 실무적 장점이다. 다만 롱리드 플랫폼별 에러 프로필이 우도 계산에 미치는 영향에 대해서는 실제 임상·암 샘플 데이터를 통한 추가 검증이 필요해 보인다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag821) · DOI 10.1093/bioinformatics/btag821
