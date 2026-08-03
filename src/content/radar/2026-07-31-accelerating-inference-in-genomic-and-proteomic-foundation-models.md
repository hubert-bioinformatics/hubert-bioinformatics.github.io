---
title: "추측 디코딩을 통한 유전체 및 단백질 파운데이션 모델 추론 가속화"
date: 2026-07-31
kind: paper
summary: "소형 초안 모델과 대형 검증 모델의 병렬 처리로 출력 품질 저하 없이 추론 속도를 최대 2배 향상했다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag579"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag579"
authors: ["Provatas K", "Karatzikos A", "Koilakos C", "Patsakis M", "Tzanakakis A", "Nayak A", "Pavlopoulos GA", "Mouratidis I"]
topics: ["생물정보학", "오믹스"]
aiGenerated: true
reviewed: false
draft: false
---

DNA 및 단백질 파운데이션 모델은 토큰을 하나씩 생성할 때마다 거대한 트랜스포머의 순전파를 거쳐야 하므로 서열이 길어질수록 추론 지연이 심해진다. 기존 Key-Value 캐싱 디코딩 방식만으로는 대규모 서열 생성 작업의 계산 비용을 줄이는 데 한계가 있었다. 본 연구에서는 경량 초안 모델이 제안한 토큰 스팬을 대형 타겟 모델이 병렬로 검증하는 추측 디코딩을 오믹스 생성 모델에 적용해 이 문제를 해결한다.

## 무엇을 했나

- 경량 draft 모델이 짧은 서열 스팬을 제안하고 대형 target 모델이 이를 병렬 검증하는 확률적 추측 디코딩 알고리즘을 구축했다.
- 대표적 DNA 파운데이션 모델인 DNAGPT와 단백질 생성 모델인 ProGen2, ProtGPT2를 대상으로 윈도우 길이, 온도, 프롬프트 길이에 따른 추론 성능을 계측했다.
- 기존 KV 캐시 디코딩 대비 평균 20~40%(1.2x~1.4x), 최대 100%까지 추론 속도가 향상됨을 확인했다.
- 추측 디코딩 적용 후에도 타겟 모델 본래의 샘플링 확률 분포와 생성 서열의 품질은 동일하게 유지되었다.

## 왜 눈여겨볼 만한가

서열 생성 기반의 파운데이션 모델을 직접 서빙하거나 대규모 인실리코(in silico) 라이브러리를 생성하는 환경에서, 타겟 모델의 수정이나 재학습 없이 추론 비용을 즉시 줄일 수 있는 유용한 기법이다. 다만 실제 가속 성능은 draft 모델의 예측 정확도와 추측 윈도우 크기에 크게 좌우되므로, 적용하려는 서열 생성 타깃에 맞춰 draft 모델 선정 및 하이퍼파라미터 최적화 작업이 병행되어야 할 것으로 보인다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag579) · DOI 10.1093/bioinformatics/btag579
