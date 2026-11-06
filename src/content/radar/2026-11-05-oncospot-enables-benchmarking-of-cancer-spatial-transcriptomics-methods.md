---
title: "종양 진화 모드별 공간전사체 분석법 벤치마크 시뮬레이터"
date: 2026-11-05
kind: paper
summary: "실제 종양의 참값을 반영하여 공간전사체 분석 툴의 성능을 평가하는 시뮬레이터 OncoSpot을 소개한다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.11.01.763496v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.11.01.763496"
authors: ["Bhattarai", "P.", "Yuan", "W.", "Zhou", "X. M.", "Mallory", "X."]
topics: ["공간전사체", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

실제 종양 조직은 유전자 복제수 변이와 하위 클론 구조에 대한 명확한 정답이 없어 공간전사체 분석 알고리즘을 객관적으로 평가하기 어려웠다. 기존 시뮬레이터는 정상 조직 위주로 설계되어 종양의 진화 과정과 복제수 변이에 따른 발현 변화를 충분히 담아내지 못했다.

## 무엇을 했나

- 공간적 진화 스캐폴드와 계통발생학적 복제수 변이, 암종별 전사 프로그램을 결합하여 Visium 데이터 형태의 시뮬레이터 OncoSpot을 개발했다.
- 난소암, 대장암, 간세포암 등 서로 다른 진화 양상을 보이는 세 가지 암종에 대해 공간전사체 데이터를 시뮬레이션했다.
- CopyKAT, CancerFinder, Clonalscope, RCTD 등의 분석 툴을 적용하여 암종 및 알고리즘 특성에 따른 성능 차이를 확인했다.
- Clonalscope의 종양 판별 오류와 같은 실제 데이터에서는 발견하기 어려운 알고리즘의 한계점을 참값을 통해 규명했다.

## 왜 눈여겨볼 만한가

다양한 공간전사체 분석 툴이 저마다의 가정에 따라 암종별로 성능이 크게 갈린다는 점을 실제 참값 기반으로 명확히 보여준다. 알고리즘 간 장단점을 객관적으로 비교하고 싶을 때 유용하게 검토해 볼 만한 벤치마크 프레임워크다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.11.01.763496v1?rss=1
) · DOI 10.64898/2026.11.01.763496
