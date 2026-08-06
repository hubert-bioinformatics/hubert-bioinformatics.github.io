---
title: "유전체 시퀀스 딥러닝 모델링 및 해석을 단순화한 DeepGeSeq"
date: 2026-08-04
kind: paper
summary: "최소한의 설정만으로 시퀀스 기반 기능 예측과 scATAC-seq, MPRA 분석 파이프라인을 구축한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag584"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag584"
authors: ["Li J"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

유전체 시퀀스 기반 딥러닝 모델은 조절 영역 해석이나 변이 효과 예측에 유용하지만, 모델 레이어 구축부터 학습 및 사후 해석에 이르는 엔지니어링 장벽이 높다. DeepGeSeq은 최신 신경망 모듈을 패키징하고 간단한 설정 파일만으로 전체 워크플로우를 수행하도록 구현된 전사체·유전체 라이브러리다.

## 무엇을 했나

- 최신 딥러닝 모듈을 통합하여 복잡한 코드 작성 없이 설정 파일 기반으로 유전체 모델을 구축·학습하는 시스템을 구현했다.
- 합성 데이터셋 검증을 거쳐 기존에 공개된 딥러닝 모델의 재현, 파인튜닝, 사후 생물학적 해석 프로세스를 구축했다.
- scATAC-seq 데이터를 입력으로 사용해 오픈 크로마틴 시퀀스 기반의 세포 타입 클러스터링을 수행했다.
- MPRA 데이터에 인실리코 포화 돌연변이 유발(in silico saturation mutagenesis) 기법을 적용하여 cis-조절 엘리먼트를 분석했다.

## 왜 눈여겨볼 만한가

기존에는 PyTorch 등으로 신경망 구조와 인실리코 돌연변이 해석 코드를 직접 작성해야 했던 작업을 표준화된 파이프라인으로 전환할 수 있다. 특히 scATAC-seq 피크 서열 기반의 서열 모티프 탐색이나 MPRA 데이터 해석 시 빠른 프로토타이핑 도구로 검토해 볼 만하다. 다만 가용 모듈 외의 특이적인 모델 구조를 적용하거나 대규모 데이터셋 학습 시에는 자체 프레임워크 수준의 하이퍼파라미터 튜닝이 추가로 필요할 수 있다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag584) · DOI 10.1093/bioinformatics/btag584
