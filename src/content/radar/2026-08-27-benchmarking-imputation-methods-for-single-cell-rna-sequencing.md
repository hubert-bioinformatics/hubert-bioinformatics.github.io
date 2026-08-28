---
title: "급성 심근경색 PBMC scRNA-seq 대상 6개 Imputation 알고리즘 벤치마크"
date: 2026-08-27
kind: paper
summary: "MCAR 드롭아웃 환경에서 전역 발현 복원과 세포 타입 신호 보존 등 분석 목적별 최적 알고리즘을 제시한다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.08.23.746230v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.08.23.746230"
authors: ["Ramesh", "P.", "Fyta", "M."]
topics: ["단일세포", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

scRNA-seq 데이터는 드롭아웃 현상으로 인한 높은 희소성과 노이즈 때문에 하류 분석의 정확도가 떨어지는 문제가 있다. 이를 해결하기 위해 다양한 Imputation 기법이 쓰이지만, 분석 목적에 따른 알고리즘별 성능 특성을 종합적으로 비교한 연구는 부족했다. 본 연구는 급성 심근경색 환자 PBMC 데이터에 드롭아웃을 인위적으로 부여하여 6가지 Imputation 알고리즘의 성능을 검증했다.

## 무엇을 했나

- 급성 심근경색 환자의 PBMC scRNA-seq 데이터에 MCAR 방식으로 10%, 20%, 30% 수준의 드롭아웃을 인위적으로 생성했다.
- 평가 대상으로 MAGIC, IterativeImputer, KNNImputer, Mean Imputation, SoftImpute, GAN 기반 모델 등 6종의 알고리즘을 설정했다.
- 마커 유전자 보존, ARI 기준 클러스터링 일치도, ground truth와의 유전자별 상관관계, 실루엣 스코어를 평가지표로 비교했다.
- Mean과 KNN은 전반적인 복원 능력이 저조했던 반면, GAN은 전역 전사체 복원에, SoftImpute는 세포 타입 특이적 신호 보존에 우수한 성능을 보였다.

## 왜 눈여겨볼 만한가

scRNA-seq 파이프라인 전처리에서 Imputation 알고리즘을 무조건 적용하기보다 하류 분석 목적에 맞춰 선택해야 함을 보여준다. 전반적인 전사체 발현 패러다임 복원이 목적이라면 GAN 기반 기법을, 세포군 분류 및 마커 식별이 주목적이라면 SoftImpute를 우선 검토해 볼 만하다. 다만 이 결과는 완전 무작위 결측(MCAR) 프레임워크 기반의 시뮬레이션이므로, 발현량에 의존적인 실제 드롭아웃 환경에서도 동일하게 적용될지는 보수적으로 접근할 필요가 있다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.08.23.746230v1?rss=1
) · DOI 10.64898/2026.08.23.746230
