---
title: "패스웨이 지도 그래프 도메인 적응 기반 단일세포 주석 모델 scGraphTrans"
date: 2026-09-10
kind: paper
summary: "14개 암 관련 패스웨이 정보와 환자 간 적응을 통해 LR DB 없이도 질환 특이적 세포 상호작용을 복원한다"
sourceName: "IEEE transactions on computational biology and bioinformatics"
sourceUrl: "https://doi.org/10.1109/TCBBIO.2026.3733126"
journal: "IEEE transactions on computational biology and bioinformatics"
doi: "10.1109/TCBBIO.2026.3733126"
authors: ["Li YC", "You HR", "Wei MM", "Wang XF", "Li Y", "Huang ZA", "Huang YA", "You ZH"]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

비공간(non-spatial) scRNA-seq 데이터로 세포 간 상호작용을 추정할 때, 불완전한 리간드-수용체 DB와 부정확한 세포 타입 주석이 주요 한계로 지목되어 왔다. 본 연구는 14개 암 관련 패스웨이 활성도를 유사 라벨로 활용해 세포 간 그래프 구조를 재구성하는 scGraphTrans 프레임워크를 제안한다. 여기에 그래프 도메인 적응 기법을 결합하여 환자 간 이질성을 줄이고 세포 주석 성능과 상호작용 추정 정확도를 동시에 높였다.

## 무엇을 했나

- 혈관신생, 아포토시스, 세포주기 등 14개 암 관련 패스웨이 활성도 점수를 유사 라벨로 이용해 발현량 유사성을 넘어선 기능적 유사성 기반의 세포 그래프를 구축했다.
- 환자 간 변이를 보정하고 일반화 성능을 높이기 위해 그래프 도메인 적응(Graph Domain Adaptation) 모듈로 임베딩을 정렬했다.
- 3개 암종, 15명의 환자로부터 얻은 38,667개 단일세포 데이터셋 평가에서 평균 84.28%의 세포 타입 주석 정확도를 달성했다.
- 사전 정의된 리간드-수용체 DB의 지도 없이도 유방암(LGALS1-SUSD2) 및 대장암(BIRC5-CASP6) 특이적 유전자 상호작용 쌍을 성공적으로 복원했다.

## 왜 눈여겨볼 만한가

단순히 유전자 발현량 거리에 의존하던 기존 그래프 생성 방식에서 벗어나 패스웨이 활성도를 그래프 구조 학습에 직접 연결했다는 점에서 유의미하다. 기존 LR DB에 등록되지 않은 신규 상호작용을 발굴하거나 환자 간 배치 효과가 큰 scRNA-seq 데이터셋의 세포 타입을 통합 주석할 때 유용할 것으로 보인다. 다만 14개 암 관련 패스웨이 지표를 축으로 사용하므로, 암 이외의 정상 조직이나 다른 질환 데이터에 적용할 때는 패스웨이 세트를 재구성해야 하는 제약이 있다.

## 원문

- [IEEE transactions on computational biology and bioinformatics](https://doi.org/10.1109/TCBBIO.2026.3733126) · DOI 10.1109/TCBBIO.2026.3733126
