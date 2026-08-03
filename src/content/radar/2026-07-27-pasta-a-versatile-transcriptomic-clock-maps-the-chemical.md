---
title: "플랫폼·조직 제약을 줄인 전사체 기반 연령 예측 모델 Pasta"
date: 2026-07-27
kind: paper
summary: "벌크·단일세포 RNA-seq 전반에 적용해 노화 및 회춘 조절 화합물과 유전자를 선별한다."
sourceName: "Advanced science (Weinheim, Baden-Wurttemberg, Germany)"
sourceUrl: "https://doi.org/10.1002/advs.76740"
journal: "Advanced science (Weinheim, Baden-Wurttemberg, Germany)"
doi: "10.1002/advs.76740"
authors: ["Salignon J", "Tsiokou M", "Marqués P", "Rodríguez-Diaz E", "Ang H", "Pietrocola F", "Riedel CG"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

기존 전사체 기반 생물학적 연령 시계(TAC)는 플랫폼 의존성과 조직 특이성으로 인해 다양한 데이터셋에 범용적으로 적용하기 어려웠다. 연구진은 이러한 제약을 극복하기 위해 'age-shift' 학습 프레임워크를 적용한 인간 TAC 모델 'Pasta'를 개발했다. 이를 통해 벌크 및 단일세포 RNA-seq, 마이크로어레이 데이터를 아우르는 상대적 연령 예측을 구현했다.

## 무엇을 했나

- 벌크 및 단일세포 RNA-seq, 마이크로어레이 데이터에 교차 적용 가능한 age-shift 학습 기반 전사체 연령 시계 Pasta를 구축했다.
- 모델의 예측 계수가 p53 및 DNA 손상 반응 경로에 농축됨을 확인하고, 암 환자의 종양 등급 및 생존율과의 연관성을 검증했다.
- Connectivity Map L1000의 300만 개 이상 전사체에 적용하여 미토콘드리아 번역과 mRNA 스플라이싱이 각각 노화와 회춘의 주요 조절 기전임을 도출했다.
- 인간 세포 실험을 통해 pralatrexate의 세포 노화 유도 작용과 piperlongumine의 회춘 효과를 확인했다.

## 왜 눈여겨볼 만한가

벌크 데이터뿐만 아니라 scRNA-seq에도 적용 가능해 아틀라스 수준의 단일세포 데이터에서 노화 및 줄기세포성 상태를 평가하거나 대규모 섭동(perturbation) 스크리닝에 활용해 볼 만하다. 다만 L1000처럼 랜드마크 유전자 위주의 데이터셋에서 도출된 예측 결과나 발굴된 화합물의 실제 효능은 생체 내(in vivo) 모델에서의 추가 검증이 필요할 것으로 보인다.

## 원문

- [Advanced science (Weinheim, Baden-Wurttemberg, Germany)](https://doi.org/10.1002/advs.76740) · DOI 10.1002/advs.76740
