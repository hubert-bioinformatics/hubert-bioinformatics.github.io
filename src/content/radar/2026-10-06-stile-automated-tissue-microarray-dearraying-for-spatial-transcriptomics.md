---
title: "세포 중심 좌표 기반 공간전사체 TMA 자동 코어 분할 도구 STiLE"
date: 2026-10-06
kind: paper
summary: "이미지 의존성 없이 세포 좌표 데이터만으로 TMA 코어를 정확히 분리하며 AnnData 및 CSV 포맷을 지원한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag572"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag572"
authors: ["Sinha H", "Das A", "Chiu YC", "Gao SJ", "Huang Y"]
topics: ["공간전사체", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

TMA를 활용한 공간전사체 실험은 단일 슬라이드에서 수십 개 조직 코어를 동시 분석할 수 있으나, 기존 디에레이잉(dearraying) 도구는 조직 이미지 기반이라 좌표 중심의 공간전사체 플랫폼 출력 형식에 맞지 않아 코어 분할이 수작업 병목으로 남아있었다. STiLE은 조직 이미지에 의존하지 않고 세포의 중심(centroid) 좌표만을 활용해 TMA 코어를 자동 분할하는 도구다. 염색 불균일이나 조명 문제 등 이미지 아티팩트에 영향을 받지 않도록 설계되었다.

## 무엇을 했나

- 연결성 기반 요소 검출, HDBSCAN 밀도 클러스터링, 병합 알고리즘 및 격자 기반 피크 탐지를 조합해 좌표 기반 TMA 코어 분할 파이프라인을 구축했다.
- Vizgen MERSCOPE, 10x Xenium, NanoString CosMx 플랫폼에서 얻은 50~150개 코어 규모의 공개 TMA 데이터셋 7종과 아티팩트를 반영한 합성 데이터셋 396종으로 성능을 평가했다.
- 실제 실험 데이터와 합성 데이터셋 평가 모두에서 평균 ARI(Adjusted Rand Index) 0.99 이상의 정밀도로 코어를 구분해냈다.
- AnnData 및 CSV 포맷을 기본 지원하며, 대용량 슬라이드의 파라미터 조율과 시각적 검증을 위해 Streamlit 대시보드를 제공한다.

## 왜 눈여겨볼 만한가

Xenium이나 MERSCOPE, CosMx 같은 단일세포 해상도 공간전사체 데이터로 TMA를 분석할 때, 각 코어별로 영역을 일일이 지정하던 전처리 병목을 해소하는 데 유용하다. H&E나 형광 이미지 품질이 떨어져도 세포 x, y 좌표 테이블만 있으면 독립적으로 작동하므로 업스트림 분석 파이프라인에 자동화 단계로 붙이기 편하다. 다만 조직 코어의 형태가 심하게 찌그러졌거나 세포 밀도가 극도로 낮은 특수 샘플에서의 분할 성능은 실제 데이터로 직접 확인해볼 필요가 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag572) · DOI 10.1093/bioinformatics/btag572
