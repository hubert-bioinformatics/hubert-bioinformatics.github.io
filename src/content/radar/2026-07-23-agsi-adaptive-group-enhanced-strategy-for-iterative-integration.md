---
title: "단일세포 멀티오믹스 통합을 위한 적응형 모듈 전략 AGSI"
date: 2026-07-23
kind: paper
summary: "유전자 모듈과 반복적 신뢰도 평가를 결합한 AGSI의 멀티오믹스 통합 성능"
sourceName: "Computer methods and programs in biomedicine"
sourceUrl: "https://doi.org/10.1016/j.cmpb.2026.109556"
journal: "Computer methods and programs in biomedicine"
doi: "10.1016/j.cmpb.2026.109556"
authors: ["Zhang F", "Shang J", "Jiang S", "Zhang X", "Yan S", "Sun Y", "Liu JX"]
topics: ["오믹스", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

기존 단일세포 멀티오믹스 통합 방법들은 모든 유전자를 동일하게 취급하고 고정된 전략을 사용하여 세포 수준의 이질성을 다루는 데 한계가 있었다. 본 연구에서는 이러한 문제를 해결하기 위해 공조절 유전자 모듈과 반복적 신뢰도 평가를 기반으로 하는 적응형 통합 프레임워크 AGSI를 제안한다.

## 무엇을 했나

- Latent Dirichlet Allocation을 활용해 공조절 유전자 모듈을 식별하고 모듈 수준에서 교차 모달 대응 관계를 평가했다.
- Wasserstein 기반 유사도와 이중 신뢰도 모델링을 결합하여 교차 모달 일치도가 높은 세포를 점진적으로 식별하고 통합했다.
- 적응형 임계값 방식을 적용해 반복 정제 과정 전반에 걸쳐 선택 기준을 동적으로 조정했다.
- PBMC, 마우스 뇌(SNARE-seq, 10x), 대규모 사람 심근경색 데이터셋을 포함한 여러 데이터에서 기존 방법들과 성능을 비교했다.

## 왜 눈여겨볼 만한가

AGSI는 유전자 모듈 단위의 접근과 동적 임계값 조정을 통해 복잡한 신경 뇌 조직 데이터나 대규모 임상 샘플에서 기존 방법 대비 향상된 세포 타입 식별 정확도를 보여준다. 특히 높은 데이터 결손 환경에서도 정확도를 유지하며 생물학적 해석 가능성을 보존한다는 점에서, 멀티오믹스 데이터의 노이즈와 이질성 문제를 겪는 현업 분석에서 유용한 대안이 될 수 있다. 다만 실제 대규모 임상 코호트 적용 시 연산 자원 소모량이나 파이프라인 통합의 편의성은 추가로 검토해 볼 필요가 있다.

## 원문

- [Computer methods and programs in biomedicine](https://doi.org/10.1016/j.cmpb.2026.109556) · DOI 10.1016/j.cmpb.2026.109556
