---
title: "단일세포-공간전사체 통합 기반 세포 상호작용 예측 도구 SPCC"
date: 2026-08-17
kind: paper
summary: "적대적 자가부호화기로 비쌍 단일세포를 공간 좌표에 매핑하여 정밀한 세포 간 신호 전달을 추론한다"
sourceName: "Genomics, proteomics & bioinformatics"
sourceUrl: "https://doi.org/10.1093/gpbjnl/qzag083"
journal: "Genomics, proteomics & bioinformatics"
doi: "10.1093/gpbjnl/qzag083"
authors: ["Wang T", "Zhou Y", "Liu X", "Wu S", "Huang L", "Huang K", "Zhou X"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

대부분의 공간전사체 기술은 스팟 단위 분석에 머물러 단일세포 해상도의 공간 구조와 세포 간 상호작용을 정밀하게 파악하기 어렵다. 비쌍(unpaired) 단일세포 전사체와 공간전사체 데이터를 결합해 세포 단위 위치 정보를 복원하려는 시도가 이어지고 있으나 노이즈에 취약한 한계가 존재한다. 연구진은 적대적 공동 변분 자가부호화기(A-JVAE)와 랜덤 포레스트를 활용해 개별 세포를 공간 좌표로 매핑하는 딥러닝 프레임워크 SPCC를 개발했다.

## 무엇을 했나

- 적대적 공동 변분 자가부호화기와 랜덤 포레스트 알고리즘을 결합하여, 단일세포 전사체 데이터를 공간 좌표에 배치하는 위치 매핑 행렬 생성 프레임워크를 구축했다.
- 마우스 체감각 피질, 유방암, 흑색종 뇌전이 등 서로 다른 공간 시퀀싱 기술로 생산된 3종의 데이터셋을 활용해 기존 통합 알고리즘들과 성능을 비교 검증했다.
- 기존 도구 대비 시퀀싱 노이즈에 대한 저항성을 확인했으며, 흑색종 모델에서 암세포와 혈관내피세포 간의 PECAM1-SOX4 상호작용 등 미세한 신호 전달 경로를 포착했다.

## 왜 눈여겨볼 만한가

Visium 등 스팟 기반 공간전사체 데이터와 scRNA-seq을 함께 보유한 연구진이 단일세포 해상도의 세포 간 통신(CCC)이나 공간 가변 유전자(SVG)를 분석하고자 할 때 유용한 옵션이다. 특히 노이즈 저항성이 높아 기존 매핑 도구에서 놓치기 쉬운 주요 리간드-수용체 상호작용을 발굴하는 데 강점이 있을 것으로 보인다. 다만 매핑 정확도가 참조 scRNA-seq 데이터의 품질에 의존할 수밖에 없으며, 이미지 기반 단일세포 공간전사체(Xenium, CosMx 등) 데이터에서의 검증 여부는 별도로 확인이 필요하다.

## 원문

- [Genomics, proteomics & bioinformatics](https://doi.org/10.1093/gpbjnl/qzag083) · DOI 10.1093/gpbjnl/qzag083
