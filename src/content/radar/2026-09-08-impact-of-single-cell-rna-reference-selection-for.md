---
title: "유방암 공간전사체 디콘볼루션을 위한 scRNA-seq 레퍼런스 조건 평가"
date: 2026-09-08
kind: paper
summary: "Cell2location과 RCTD 기반 분석에서 레퍼런스 크기 및 아틀라스 일치도가 디콘볼루션 정확도에 미치는 영향을 분석했다."
sourceName: "International journal of cancer"
sourceUrl: "https://doi.org/10.1002/ijc.70733"
journal: "International journal of cancer"
doi: "10.1002/ijc.70733"
authors: ["Altendorfer S", "Walker SJ", "Daub CO"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

Spot 기반 공간전사체는 스팟 내 여러 세포가 혼재되어 scRNA-seq 레퍼런스를 활용한 디콘볼루션이 필수적이나, 참조 데이터의 구성이 추정 정확도에 미치는 영향은 명확히 정의되지 않았다. 본 연구에서는 유방암 공간전사체 데이터를 기반으로 레퍼런스 크기, 세포 구성, 아틀라스 종류에 따른 디콘볼루션 성능 변화를 체계적으로 평가했다.

## 무엇을 했나

- Xenium(원발암)과 MERFISH(전이암) 데이터에서 55μm 크기의 Visium 유사 의소스팟(pseudospot)을 생성하여 검증 기준을 마련했다.
- Cell2location과 RCTD를 주요 도구로 선정하여 레퍼런스 크기, 세포 타입 분포, 샘플 매칭 여부, 암종 통합 아틀라스 적용에 따른 영향을 비교했다.
- 레퍼런스 크기가 작더라도 디콘볼루션 정확도는 비교적 유지되었으며, 동일 환자 샘플을 매칭하거나 대규모 암 아틀라스를 사용할 때 결과가 가장 안정적이었다.
- 암세포 및 기질세포 등 주요 세포군의 공간적 영역은 정확히 분리되었으나, 특정 세포 유형의 비중이 체계적으로 과대 또는 과소 평가되는 현상을 확인했다.

## 왜 눈여겨볼 만한가

Visium 등 Spot 기반 공간전사체 데이터 분석 시 자원이 부족한 경우 소규모 레퍼런스나 잘 구축된 대규모 아틀라스를 활용해도 무방함을 보여준다. 다만 세포 종류와 주석 분해능(annotation level)에 따라 비중 추정에 편향이 발생하므로, 디콘볼루션으로 얻은 세포 비율 값을 절대적인 수치로 받아들이기보다는 공간적 패턴을 확인하는 참고 지표로 활용하는 것이 적절해 보인다.

## 원문

- [International journal of cancer](https://doi.org/10.1002/ijc.70733) · DOI 10.1002/ijc.70733
