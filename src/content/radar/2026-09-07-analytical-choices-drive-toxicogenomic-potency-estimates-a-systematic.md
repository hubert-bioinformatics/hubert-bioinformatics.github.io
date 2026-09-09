---
title: "분석 파이프라인과 경로 선택에 따른 독성 전사체 tPOD 변동성 평가"
date: 2026-09-07
kind: paper
summary: "동일한 세포 반응 데이터라도 전처리 및 패스웨이 집계 방식에 따라 독성 지표 산출물이 크게 달라진다"
sourceName: "Toxicological sciences : an official journal of the Society of Toxicology"
sourceUrl: "https://doi.org/10.1093/toxsci/kfag115"
journal: "Toxicological sciences : an official journal of the Society of Toxicology"
doi: "10.1093/toxsci/kfag115"
authors: ["Bruns IB", "Schultz DR", "Demuynck E", "Dewulf F", "Theologidis I", "Kunnen SJ", "Wijaya LS", "Frydas I"]
topics: ["생물정보학", "NGS"]
aiGenerated: true
reviewed: false
draft: false
---

차세대 화학물질 위험 평가에서 전사체 기반 독성 지표(tPOD) 활용이 늘고 있으나, 생물정보학 분석 절차에 따른 정량적 지표의 변동성은 명확히 검증되지 않았다. 연구진은 동일한 전사체 데이터셋에 5개의 독립된 분석 파이프라인을 적용하여 전처리, 벤치마크 농도(BMC) 모델링, 경로 집계 전략이 최종 hazard 측정에 미치는 영향을 비교했다.

## 무엇을 했나

- 시스플라틴을 농도 및 시간별로 처리한 RPTEC/TERT1 신장 세포 전사체 데이터에 5가지 독립 생물정보학 파이프라인을 적용했다.
- 정규화, 필터링, 모델링 소프트웨어 차이에 따른 유전자 레벨 BMC의 변동성을 산출하고 노출 시간별 수렴 경향을 분석했다.
- 유전자 수준 BMC를 경로 단위로 집계하는 방식과 경로 활성화 점수(Pathway activity score)를 직접 모델링하는 방식을 비교했다.
- 광범위한 경로 데이터베이스와 소규모 바이오마커 패널 및 공표현 모듈 간 tPOD 산출값의 민감도와 편차를 평가했다.

## 왜 눈여겨볼 만한가

전사체 데이터를 신약 스크리닝이나 규제 독성 평가에 적용할 때 파이프라인과 DB 선택이 안전성 판단 농도를 직접 좌우함을 보여준다. 특히 광범위한 KEGG/GO 경로보다는 정교하게 큐레이션된 바이오마커 패널이나 공표현 모듈을 사용할 때 tPOD의 편차가 줄어들고 민감도가 높아지는 경향을 보인다. 다만 본 연구는 단일 세포주와 단일 약물 반응에 기반하므로, 일반적인 독성 표준 분석 워크플로우를 확립하려면 다양한 조직 및 기전의 데이터셋에서 추가 검증이 필요하다.

## 원문

- [Toxicological sciences : an official journal of the Society of Toxicology](https://doi.org/10.1093/toxsci/kfag115) · DOI 10.1093/toxsci/kfag115
