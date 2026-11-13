---
title: "다중 뷰 그래프 오토인코더로 공간전사체 데이터를 통합하는 CroSP"
date: 2026-11-12
kind: paper
summary: "형태학 정보와 발현량, 좌표를 조화시켜 다양한 플랫폼의 공간 도메인 분할 정확도를 높인다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag829"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag829"
authors: ["Xu J", "Liao X", "Zhou C", "Jin S", "Meng Y", "Tang X", "Lu C", "Yang J"]
topics: ["공간전사체", "오믹스"]
aiGenerated: true
reviewed: false
draft: false
---

공간전사체 데이터는 유전자 발현과 위치 정보, 조직 이미지를 동시에 제공하지만 데이터 내 노이즈와 이질성으로 인해 정확한 공간 도메인 정의에 한계가 있었다. 연구진은 이러한 멀티모달 데이터를 저차원 잠재 공간으로 통합하는 딥러닝 프레임워크 CroSP를 제안한다. 교차 뷰 대조 학습과 메트릭 학습을 적용해 서로 다른 모달리티 간의 정보 보완 효과를 극대화했다.

## 무엇을 했나

- 유전자 발현 프로파일, 공간 좌표, 조직 형태학 정보를 통합하는 다중 뷰 그래프 오토인코더 기반의 CroSP를 구축했다.
- 교차 뷰 대조 학습과 메트릭 학습 기법을 도입하여 복수의 뷰가 가진 상보적 정보를 잠재 공간상에 조율했다.
- 다양한 플랫폼과 해상도의 공간전사체 데이터셋을 활용해 뇌 및 후각 봉오리 조직의 공간 도메인 식별 성능을 검증했다.
- 인간 유방암 조직 데이터에서 공간 가변 유전자, 면역 미세환경, 세포 간 상호작용 분석을 수행하여 실용성을 확인했다.

## 왜 눈여겨볼 만한가

Visium처럼 조직 이미지와 발현 데이터를 함께 얻는 멀티모달 공간전사체 데이터를 다룰 때 도메인 분할 성능을 개선하는 선택지가 될 수 있다. H&E 이미지 정보를 적극적으로 통합하므로 노이즈가 심한 데이터셋의 구조 파악에 유용할 것으로 보인다. 다만 딥러닝 기반 프레임워크 특성상 computational cost와 모델 파라미터 최적화 과정이 추가로 필요할 수 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag829) · DOI 10.1093/bioinformatics/btag829
