---
title: "CELLSEARCH 기반 FFPE 림프절 미세전이 암세포 검출 및 CNA 분석"
date: 2026-09-21
kind: paper
summary: "EpCAM으로 분리한 FFPE 림프절 암세포의 단일세포 및 풀링 WGA를 거쳐 low-pass WGS로 복제수 변이를 분석했다."
sourceName: "The Journal of pathology"
sourceUrl: "https://doi.org/10.1002/path.70122"
journal: "The Journal of pathology"
doi: "10.1002/path.70122"
authors: ["Bergmann T", "Hölbling M", "Sudarsanam M", "Driemel C", "Daniels ME", "Swierz J", "Jaschinski S", "Seidl M"]
topics: ["NGS", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

림프절 전이 여부는 두경부 편평세포암을 비롯한 상피성 암종의 병기 결정과 치료 방향 설정에 핵심적이다. 그러나 기존 FFPE 조직 병리 검사는 전체 림프절의 극소수 단면만 확인하므로 미세전이나 격리된 암세포를 놓칠 위험이 존재한다. 연구진은 혈중 순환 암세포 검출 장비인 CELLSEARCH를 조직 해리 샘플에 적용하여 감도를 높이고, 포획된 암세포의 low-pass WGS까지 연결하는 워크플로우를 고안했다.

## 무엇을 했나

- 50μm FFPE 림프절 절편을 해리한 후 EpCAM 항체 기반 자성 입자로 암세포를 농축하고, CK/DAPI 염색 및 ACCEPT 이미지 분석 소프트웨어로 정량했다.
- 두경부 편평세포암 환자의 전이 양성 림프절 50개와 음성 림프절 50개를 비교하여 임상적 감도와 특이도를 평가했다.
- 대조군 배경 신호를 기준으로 림프절당 12개 초과의 암세포 포획을 양성 판정 기준으로 제시하여 민감도와 특이도 100%를 확인했다.
- 농축된 세포에 단일세포 및 풀링 전유전체 증폭(WGA)을 거쳐 low-pass WGS를 수행하고 종양 특이적 복제수 변이(CNA)를 프로파일링했다.

## 왜 눈여겨볼 만한가

CTC 분석 플랫폼을 FFPE 조직 해리액에 적용하여 림프절 내 미세전이 검출과 유전체 변이 분석을 단일 워크플로우로 묶은 시도다. 다만 FFPE 검체의 한계로 인해 단일세포 WGA 성공률이 27%에 머물러, 단일세포 단위의 유전체 분석 시에는 무시할 수 없는 데이터 손실이 발생하는 것으로 보인다. 안정적인 CNA 프로파일링을 위해서는 풀링 샘플(성공률 75% 이상) 분석을 병행하는 조건에서 검토해 볼 만하다.

## 원문

- [The Journal of pathology](https://doi.org/10.1002/path.70122) · DOI 10.1002/path.70122
