---
title: "Stereo-seq 기반 해마 CA1-Subiculum 분자 구획화 프레임워크"
date: 2026-09-17
kind: paper
summary: "snRNA-seq 및 공간전사체로 FN1·ETV1 마커를 발굴하고 AD 조직의 영역별 전사체 변화를 해석했다."
sourceName: "GigaScience"
sourceUrl: "https://doi.org/10.1093/gigascience/giag094"
journal: "GigaScience"
doi: "10.1093/gigascience/giag094"
authors: ["Liu Y", "He Y", "Wei Y", "Wang P", "Huang C", "Tao Q", "Zhu L", "Xu X"]
topics: ["공간전사체", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

해마 CA1과 Subiculum 경계는 기존의 세포조직학적 기준만으로는 구분이 모호하여 연구 간 주석(annotation)의 재현성이 떨어지는 문제가 있었다. 본 연구는 고해상도 공간전사체(Stereo-seq)와 단일핵 전사체(snRNA-seq) 데이터를 결합해 분자 마커 기반으로 두 영역을 정밀 구획하는 프레임워크를 제시한다.

## 무엇을 했나

- 12명의 인간 해마 Stereo-seq 데이터와 snRNA-seq 참조 데이터를 통합해 CA1과 Subiculum을 구분하는 데이터 기반 구획화 기준을 세웠다.
- Subiculum 영역 흥분성 신경세포 하위 집단에서 특이적으로 발현하는 FN1과 ETV1을 주요 영역 정의 마커로 발굴했다.
- 발굴한 분자 마커의 영역 특이성을 10x Genomics 공간전사체, 마우스 ISH 및 공간전사체 데이터셋에서 교차 검증했다.
- 알츠하이머병(AD) 조직에 해당 프레임워크를 적용해 Subiculum 내 미토콘드리아 에너지 대사 관련 유전자의 농축 등 영역 특이적 전사체 변화를 관찰했다.

## 왜 눈여겨볼 만한가

기존의 육안이나 HE 염색 기반 부위 타깃팅 시 자주 발생하는 해마 경계면 주석의 모호함을 정량적 분자 마커(FN1, ETV1)로 보완할 수 있는 접근이다. 다만 서브세포 수준의 고해상도 공간전사체 데이터나 참조용 단일세포 데이터셋이 전제되어야 하므로 일반적인 저해상도 플랫폼 단독 적용 시에는 한계가 있을 수 있다. 인간 해마 샘플을 다루는 AD 연구에서 부위별 특이 전사체를 정밀하게 비교 분석하고자 할 때 사전 주석 파이프라인으로 검토해 볼 만하다.

## 원문

- [GigaScience](https://doi.org/10.1093/gigascience/giag094) · DOI 10.1093/gigascience/giag094
