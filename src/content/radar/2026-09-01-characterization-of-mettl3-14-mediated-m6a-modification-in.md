---
title: "나노포어 dRNA-seq 기반 m6A 검출 모델 검증과 METTL3/14 전사체 조절 분석"
date: 2026-09-01
kind: paper
summary: "Dorado·m6Anet 기반 m6A 분석을 GLORI로 검증하고 METTL3/14 knockdown 시 poly(A) 단축을 포착했다."
sourceName: "PLoS genetics"
sourceUrl: "https://doi.org/10.1371/journal.pgen.1012278"
journal: "PLoS genetics"
doi: "10.1371/journal.pgen.1012278"
authors: ["Kurtyan E", "Stein AJ", "Abdalla KJ", "Yuan Z", "Jain M", "Ibrahim F"]
topics: ["시퀀싱 기술", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

나노포어 direct RNA 시퀀싱(dRNA-seq)은 서브스트레이트 원형을 유지한 채 RNA 변형을 직접 검출할 수 있으나, 분석 모델별 정확도와 재현성에 대한 체계적인 벤치마크가 부족했다. 본 연구는 ONT의 RNA002 및 RNA004 케미스트리와 Dorado, m6Anet 알고리즘을 조합해 인간 전사체 수준에서 m6A 검출 성능을 종합 검증했다. 이어 메틸기전이효소 복합체의 핵심인 METTL3와 METTL14를 각각 넉다운시켜 각 서브유닛이 전사체 변형과 poly(A) 길이에 미치는 특이적 영향을 규명했다.

## 무엇을 했나

- 인간 세포주에서 METTL3와 METTL14를 각각 독립적으로 넉다운한 후 RNA002 및 RNA004 케미스트리로 나노포어 dRNA-seq을 수행했다.
- Dorado 및 m6Anet 알고리즘을 적용하고, in vitro transcription(IVT) 비변형 대조군과 직교 기법인 GLORI, miCLIP 데이터셋으로 m6A 검출 성능을 검증했다.
- Dorado 모델을 통해 m6A 검출 수율을 높임과 동시에 m5C, pseudouridine, inosine 변형을 동시 확인하고, CDS 및 DRACH 모티프 내 m6A 정량 감소를 측정했다.
- METTL3와 METTL14 결손 시 전사체별로 구별되는 m6A 변형 양상과 함께 전반적인 poly(A) 테일 길이 감소가 일어남을 확인하여 두 서브유닛의 비중복적 역할을 입증했다.

## 왜 눈여겨볼 만한가

dRNA-seq을 활용한 에피트랜스크립톰 연구 시 Dorado 모델과 IVT 대조군 필터링의 조합이 고신뢰도 m6A 파이프라인 구축의 실용적 기준이 될 수 있음을 보여준다. 특히 m6A 외에 다양한 변형(m5C, inosine 등)과 poly(A) 테일 길이를 한 번의 dRNA-seq 런에서 통합 분석하려는 연구진에게 RNA004 케미스트리 도입을 검토할 근거를 제공한다. 다만 위양성 변형 시그널을 통제하기 위해 IVT 음성 대조군 샘플 준비와 추가 시퀀싱 비용이 필수적으로 수반된다는 제약이 존재한다.

## 원문

- [PLoS genetics](https://doi.org/10.1371/journal.pgen.1012278) · DOI 10.1371/journal.pgen.1012278
