---
title: "상호정보량 기반 분리 학습으로 다중오믹스를 정합하는 scCMIA"
date: 2026-09-01
kind: paper
summary: "공통 세포 상태와 양식 고유 정보를 분리 추출하고 CrossVQ 코드북으로 세포형별 교차 모달 결합을 해석한다."
sourceName: "IEEE transactions on computational biology and bioinformatics"
sourceUrl: "https://doi.org/10.1109/TCBBIO.2026.3729857"
journal: "IEEE transactions on computational biology and bioinformatics"
doi: "10.1109/TCBBIO.2026.3729857"
authors: ["Lin X", "Hu P", "Chen H", "Liu X", "Bo X", "Li H"]
topics: ["오믹스", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 다중오믹스 데이터 통합 과정에서 모달리티 간 차원을 맞추다 보면 특정 측정 기술 고유의 정보가 손실되는 한계가 있다. 이 연구에서는 공유되는 세포 상태 정보와 각 양식에 특화된 정보를 별도로 분리해 학습하는 프레임워크인 scCMIA를 제안한다. 이를 통해 정합 정확도를 높이면서도 각 모달리티의 데이터 복원력을 유지하도록 했다.

## 무엇을 했나

- 각 오믹스 양식의 잠재 공간을 공유 세포 상태를 담는 의미론적 변수와 복원에 필요한 양식 고유 변수로 분리 설계했다.
- 대조 학습 기반 교차 모달 정합과 상호정보량 안내 분리 기법, 통합 CrossVQ 코드북을 결합한 모델을 구축했다.
- 쌍을 이룬 단일세포 다중오믹스 벤치마크 데이터셋을 활용해 차원 정합 및 데이터 복원 성능을 평가했다.
- 다운스트림 분석에서 세포 유형 분류와 레이블 전이 성능 향상을 확인하고 코드북 단위의 교차 모달 결합 패턴 해석 가능성을 입증했다.

## 왜 눈여겨볼 만한가

다중오믹스 통합 시 공유 차원만 남기고 모달리티 고유 신호를 잃어버리던 기존 통합 방식의 단점을 분리 학습 구조로 완화한 점이 눈에 띈다. 이산 잠재 표현(CrossVQ)을 사용해 세포형에 따른 양식 간 상호작용을 코드 수준에서 직관적으로 추적할 수 있어 모델 해석성이 높다. 다만 공개된 초록 내용상 paired multi-omics 데이터에 대한 검증 위주이므로, unpaired 수집 데이터나 공간전사체와의 이종 매칭에 적용할 때는 추가 검증이 필요할 것으로 보인다.

## 원문

- [IEEE transactions on computational biology and bioinformatics](https://doi.org/10.1109/TCBBIO.2026.3729857) · DOI 10.1109/TCBBIO.2026.3729857
