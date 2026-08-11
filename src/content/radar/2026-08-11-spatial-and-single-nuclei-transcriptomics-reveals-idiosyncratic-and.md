---
title: "단일핵·공간전사체로 본 갑상선암의 종양 특이적 변화와 세포 상태"
date: 2026-08-11
kind: paper
summary: "배치 보정을 배제한 분석 기법으로 BRAFV600E 유두암과 미분화암의 분화 마커 손실 및 EMT 양상을 규명했다."
sourceName: "Molecular oncology"
sourceUrl: "https://doi.org/10.1002/1878-0261.70289"
journal: "Molecular oncology"
doi: "10.1002/1878-0261.70289"
authors: ["Tourneur A", "Vitória JR", "Saiselet M", "Craciun L", "Larsimont D", "Lefort A", "Libert F", "Maenhaut C"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 데이터 분석 시 배치 효과(batch effect)를 보정하는 과정에서 종양 간 고유한 생물학적 이질성까지 지워지는 문제가 지속적으로 지적되어 왔다. 이 연구는 기술적 변이와 생물학적 변이를 정교하게 분리하는 실험 설계를 도입해 BRAFV600E 갑상선유두암(PTC)과 미분화갑상선암(ATC)의 분자적 특성을 재평가한다. 단일핵 전사체(snRNA-seq)와 공간전사체 데이터를 조합하여 종양 특이적 변이와 암세포 상태 변화를 상세히 추적했다.

## 무엇을 했나

- BRAFV600E 변이 PTC 및 ATC 시료를 대상으로 snRNA-seq과 공간전사체 분석을 결합해 시공간적 전사체를 확보했다.
- 기술적 변이와 생물학적 변이를 분리 추적할 수 있는 분석 설계를 적용하여 과도한 배치 통합으로 인한 데이터 왜곡을 방지했다.
- 암세포 및 면역세포에서 나타나는 전사체 변이의 상당수가 환자/종양 특이적(idiosyncratic)이며, 이는 유전체 이상 및 저산소증 상태와 밀접하게 연관됨을 입증했다.
- 갑상선 분화 마커(SLC5A5, TPO, TG, TSHR)의 단계적 손실이 오가노이드 성숙의 역순으로 진행됨을 파악하고, PTC의 partial EMT와 ATC의 full-scale EMT 특성을 구별했다.

## 왜 눈여겨볼 만한가

scRNA-seq 파이프라인에서 습관적으로 수행하는 배치 보정(integration)이 환자 고유의 종양 이질성 데이터를 어떻게 가릴 수 있는지 경각심을 준다. PTC에서 TSHR 발현 유지와 FN1 autocrine 루프에 의한 세포 증식 메커니즘은 타깃 설정 시 고려해 볼 만하다. 다만 본 연구의 배치 분리 전략이 다양한 암종 플랫폼에 일반화될 수 있을지는 실제 파이프라인 검증이 추가로 필요해 보인다.

## 원문

- [Molecular oncology](https://doi.org/10.1002/1878-0261.70289) · DOI 10.1002/1878-0261.70289
