---
title: "화학적 유도로 제작한 대장암 오가노이드의 scRNA-seq 재분석"
date: 2026-08-07
kind: paper
summary: "기존 배양법 대비 스트레스 반응을 줄이고 배아-종양 가소성 특성을 개선함을 확인했다."
sourceName: "Biochemical and biophysical research communications"
sourceUrl: "https://doi.org/10.1016/j.bbrc.2026.154396"
journal: "Biochemical and biophysical research communications"
doi: "10.1016/j.bbrc.2026.154396"
authors: ["Libo F", "Dong X", "Yu L"]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

환자 유래 오가노이드(PDO)는 암 연구에 폭넓게 쓰이지만 배양 과정에서 세포 스트레스와 전사체 드리프트가 발생하고 종양미세환경(TME)이 소실된다. 이를 극복하고자 화학적 유도 오가노이드(CiPDO)가 제안되었으나 원발암 조직과 단일세포 수준에서 비교 평가한 연구는 부족했다. 본 연구는 공개 scRNA-seq 데이터셋(GSE261012)을 재분석하여 기존 PDO와 CiPDO의 전사체 재현성을 정량 비교했다.

## 무엇을 했나

- 동일 대장암 환자의 원발암, 기존 PDO, 화학 유도 PDO(CiPDO) 샘플이 포함된 공개 scRNA-seq 데이터(GSE261012)를 재분석했다.
- Scanpy로 QC와 클러스터링을 진행한 뒤 oncofetal, 증식, 스트레스/저산소증, EMT, 분화 관련 모듈 점수를 산출하여 비교 검정했다.
- 두 오가노이드 배양법 모두 TME 세포군(섬유아세포, 면역세포)을 상실했으나, 상피세포 영역에서 CiPDO가 기존 PDO보다 유의하게 높은 oncofetal 점수를 나타냈다.
- CiPDO는 기존 PDO에 비해 스트레스/저산소증 모듈 점수가 낮고 과도한 세포 증식 반응이 감소한 전사체 상태를 보였다.

## 왜 눈여겨볼 만한가

단일 환자 샘플(N=1) 재분석에 기반한 결과이므로 다빈도 검증 전까지는 일반화에 신중할 필요가 있다. 그럼에도 배양 유도 스트레스나 전사체 변형이 약물 반응 평가를 교란하는 실험 구조라면, 화학적 유도 시스템이 암세포 가소성을 모사하는 대안이 될 수 있는지 검토해 볼 만하다. 기존 PDO 배양 과정에서 발생하는 인공적 전사체 편향을 파악하고 배양 조건을 개선하려는 현업 연구자에게 유용한 비교 기준을 제공한다.

## 원문

- [Biochemical and biophysical research communications](https://doi.org/10.1016/j.bbrc.2026.154396) · DOI 10.1016/j.bbrc.2026.154396
