---
title: "공간 전사체와 단백체를 동시 분석하는 그래프 기반 통합 모델 MultiSpaceNet"
date: 2026-09-25
kind: paper
summary: "모달리티 분리 후 어텐션으로 융합하여 공간 도메인 구분과 RNA 기반 단백질 예측을 하나의 모델로 처리한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag676"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag676"
authors: ["Zhang Z", "Chen B", "Bai J", "Wang J", "Ren J", "Liu C", "Liu Z", "Cao Y"]
topics: ["생물정보학", "오믹스"]
aiGenerated: true
reviewed: false
draft: false
---

동일 조직 절편에서 공간 전사체와 단백체를 동시 측정하는 기술이 도입되었으나, 기존 통합 알고리즘은 단백질 예측이 불가능한 구조이거나 유사도 에지가 손실되는 한계가 있었다. MultiSpaceNet은 세포 노드를 공유하되 공간·전사체·단백체 관계를 별도의 에지로 구성하고 세포 단위 어텐션으로 융합하는 그래프 방식을 제안한다. 이를 통해 하나의 모델로 공간 도메인 구획과 단백질 발현량 예측을 동시에 구현했다.

## 무엇을 했나

- 동일 조직 내 세포를 공유 노드로 두고 공간 위치, 전사체, 단백체 관계를 서로 다른 에지 타입으로 연결한 단일 그래프 구조를 설계했다.
- 각 모달리티 분기를 독립적으로 유지한 뒤 세포 단위 어텐션 융합 메커니즘을 적용하여 정보 누출 없는 공동 표현을 학습시켰다.
- 5개 벤치마크 데이터셋을 바탕으로 공간 데이터 통합 분야의 기존 9개 알고리즘과 성능을 비교 검증했다.
- 공간 도메인 동정(평균 ARI 0.472) 성능을 입증했으며, RNA 정보를 통한 단백질 발현량 예측과 반복 절편 간 구조 보존 능력에서 우수함을 확인했다.

## 왜 눈여겨볼 만한가

공간 도메인 구획과 단백질 발현량 예측(Imputation)을 위해 개별 모델을 따로 구축하던 기존 분석 워크플로우를 단일 파이프라인으로 단축할 수 있다. 세포별 모달리티 우세도(modality dominance) 지도까지 함께 도출되므로, 동일 절편 유래의 공간 멀티오믹스 데이터를 다룰 때 우선적으로 적용을 검토해 볼 만하다. 다만 초록에 명시된 공간 도메인 ARI 평균 수치(0.472)가 보여주듯, 입력 데이터의 품질이나 단백질 패널의 신호 강도에 따라 성능 편차가 발생할 수 있어 실제 데이터 적용 시 타당성 검증이 요구된다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag676) · DOI 10.1093/bioinformatics/btag676
