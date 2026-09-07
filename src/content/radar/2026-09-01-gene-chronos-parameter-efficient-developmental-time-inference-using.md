---
title: "Geneformer 기반 프롬프트 튜닝으로 단일세포 발달 시간을 추론하는 Gene-Chronos"
date: 2026-09-01
kind: paper
summary: "시간적 대조 학습과 동결된 파운데이션 모델을 결합해 미학습 종 및 발달 단계 데이터에서도 높은 일반화 성능을 보인다."
sourceName: "Briefings in bioinformatics"
sourceUrl: "https://doi.org/10.1093/bib/bbag469"
journal: "Briefings in bioinformatics"
doi: "10.1093/bib/bbag469"
authors: ["Liu Y", "Gao H", "Tian T"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 및 공간전사체 데이터는 특정 시점의 정적 스냅샷 형태가 많아 연속적인 생물학적 발달 시간을 정확히 추론하기 어렵다. 최근 활용되는 단일세포 파운데이션 모델 또한 일반적인 표현형 학습에는 유용하나 시계열적 연속성을 직접 다루지는 못했다. 본 연구에서는 사전학습된 Geneformer 백본을 동결한 상태에서 가중치 효율적인 프롬프트 튜닝을 적용해 발달 시간을 추론하는 Gene-Chronos를 제안한다.

## 무엇을 했나

- 고정된(frozen) Geneformer 백본에 학습 가능한 시간 프롬프트 토큰과 시간 대조 손실 함수(temporal contrastive objective)를 결합한 프레임워크를 구축했다.
- 다양한 종과 다양한 발달 단계를 아우르는 복수의 벤치마크 단일세포 및 공간전사체 데이터셋을 대상으로 모델 성능을 검증했다.
- 기존 시간 추론 기법 대비 높은 정확도를 기록했으며, 학습에 사용되지 않은 외부 샘플에서도 높은 일반화 능력을 보였다.
- 어텐션(attention) 스코어 분석을 통해 발달 진행 과정과 연관된 핵심 유전자 및 시간적 발현 패턴을 도출했다.

## 왜 눈여겨볼 만한가

전체 파운데이션 모델을 파인튜닝하지 않고 프롬프트 토큰만 학습하는 구조이므로 계산 비용과 메모리 부담을 크게 줄일 수 있다. 기존 pseudotime 추론 방식이 데이터셋 간 이질성이나 배치 효과에 취약했던 점을 고려할 때, 이질적인 시계열 데이터나 타깃 종이 다른 임상·발달 연구 분석에 대안으로 검토해 볼 만하다. 다만 Geneformer 백본의 유전자 임베딩 특성에 의존하므로, 백본 모델에 포함되지 않은 유전자 패널이나 단일세포 해상도 한계에 따른 영향을 추가 확인할 필요가 있다.

## 원문

- [Briefings in bioinformatics](https://doi.org/10.1093/bib/bbag469) · DOI 10.1093/bib/bbag469
