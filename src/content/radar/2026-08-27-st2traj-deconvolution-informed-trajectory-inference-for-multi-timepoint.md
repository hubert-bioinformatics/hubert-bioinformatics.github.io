---
title: "디컨볼루션 비율 기반 다중 시점 공간전사체 궤적 추정 도구 st2traj"
date: 2026-08-27
kind: paper
summary: "스팟 내 세포 혼합 문제를 디컨볼루션으로 해소하고 시점 간 발달 궤적을 추정한다"
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag645"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag645"
authors: ["Wang Z", "Zhang C"]
topics: ["공간전사체", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

다중 시점 공간전사체 분석은 조직 내 발달 및 병리 과정을 추적하는 데 유용하지만, 스팟 내에 여러 세포 상태가 섞여 있고 절편 간 위치를 직접 1:1로 맞추기 어렵다는 한계가 있다. 단일 스팟의 평균 발현량만으로 연속적인 세포 상태 변화나 궤적을 추정하면 왜곡이 생기기 쉽다. 연구진은 세포 유형 디컨볼루션으로 얻은 세포 구성 비율을 궤적 추정 프레임워크에 결합한 st2traj를 제안한다.

## 무엇을 했나

- 스팟 내 세포 상태 구성 비율을 활용해 다중 시점 공간전사체 데이터에서 연속적인 발달 궤적을 추정하는 프레임워크인 st2traj를 개발했다.
- 인간 심장 유사스팟(pseudo-spot) 벤치마크 데이터를 사용해 5개 디컨볼루션 알고리즘을 비교하고, DECODE가 균형 잡힌 성능을 보임을 확인했다.
- 다중 시점 인간 및 닭 심장 공간전사체 데이터에 적용하여 스팟 수준 정규화 발현량 기반 추정보다 매끄러운 궤적 필드와 높은 공간 일관성을 확보했다.

## 왜 눈여겨볼 만한가

Visium과 같이 단일세포 해상도가 아닌 스팟 기반 공간전사체 플랫폼으로 시계열 연구를 진행할 때 스팟 내 세포 혼합으로 인한 궤적 왜곡을 줄이는 대안이 될 수 있다. 다만 스팟 구성 비율을 전제로 하므로, 신뢰할 수 있는 단일세포 레퍼런스 데이터 세트와 적절한 디컨볼루션 모델 선정이 결과의 정확도를 좌우할 것으로 보인다. moscot이나 CASCAT 등 기존 최적 수송(optimal transport) 기반 도구들과 상호보완적인 특성을 나타내므로 데이터 특성에 맞춘 비교 검증이 필요하다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag645) · DOI 10.1093/bioinformatics/btag645
