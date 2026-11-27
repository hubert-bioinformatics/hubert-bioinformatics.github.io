---
title: "공간 다중오믹스 도메인 탐색을 위한 이중 그래프 기반 융합 모델 SPAMO"
date: 2026-11-26
kind: paper
summary: "모달리티별 노이즈 특성 차이를 극복하고 이웃 스팟 정보로 공간 도메인 분할 정확도를 높인다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag871"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag871"
authors: ["Su H", "Feng J", "Long W", "Hou Y", "Zhang Y"]
topics: ["오믹스", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

공간 다중오믹스 데이터는 각 모달리티의 희소성과 노이즈 특성이 달라 비감독 공간 도메인 구분이 쉽지 않다. 기존 융합 방법은 모달리티 고유 표현을 보존하지 못하거나 국소 범위를 벗어난 스팟이 섞이는 한계가 있었다. 연구진은 이중 그래프 인코딩과 이웃 제약 크로스모달 어텐션을 결합한 SPAMO 프레임워크를 제시한다.

## 무엇을 했나

- 공간 위치 기반 공유 KNN 그래프와 모달리티별 피처 기반 KNN 그래프를 조합하여 이중 그래프 표현을 구축했다.
- 동일 위치 및 이웃 스팟 범위로 제약된 크로스모달 어텐션과 게이트 잔차 융합을 거쳐 단일 및 교차 모달 정보를 통합했다.
- 사람 임파선 및 생쥐 뇌 조직 데이터와 시뮬레이션 벤치마크를 활용해 성능을 검증했다.
- 실제 데이터셋에서 모달리티 고유 표현을 유지하며 공간 도메인 검출 성능을 개선했다.

## 왜 눈여겨볼 만한가

공간 다중오믹스 분석 시 과도한 모달 융합으로 조직 경계가 모호해지거나 원거리 스팟이 오염되는 문제를 이웃 제약 어텐션으로 완화한 점이 실무적으로 유용하다. spatial RNA와 프로테오믹스 또는 ATAC 등 이종 다중오믹스 파이프라인 구축 시 도메인 분할 단계에 적용을 검토해 볼 만하다. 다만 모달리티 조합에 따른 튜닝 파라미터 영향이나 계산 복잡도에 대해서는 본문 데이터를 통한 추가 검증이 필요해 보인다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag871) · DOI 10.1093/bioinformatics/btag871
