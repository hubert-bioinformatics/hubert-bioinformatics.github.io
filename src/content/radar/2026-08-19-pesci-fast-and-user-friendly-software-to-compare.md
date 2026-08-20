---
title: "ICC 알고리즘 기반 종 간 단일세포 비교 도구 Pesci"
date: 2026-08-19
kind: paper
summary: "구현체가 없던 ICC 알고리즘을 파이썬 패키지로 구축해 단일세포 파이프라인 연동성을 확보했다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag623"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag623"
authors: ["Parey E", "Piovani L", "Marlétaz F"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

서로 다른 종의 단일세포 데이터셋을 비교해 상동 세포 유형을 정량적으로 정의하는 작업은 여전히 까다로운 과제다. 이를 해결하기 위해 ICC(Iterative Correlation of Coexpression) 알고리즘이 제안되었으나, 연구 현장에서 바로 적용할 수 있는 구현체가 없었다. 연구진은 ICC 알고리즘을 효율적으로 실행할 수 있는 파이썬 패키지인 Pesci를 개발해 공개했다.

## 무엇을 했나

- 종 간 유전자 공발현 구조를 반복적으로 계산하는 ICC 알고리즘을 백엔드로 활용했다.
- 서로 다른 종의 단일세포 유전자 발현 아틀라스 쌍을 비교하여 세포 간 발현 유사도를 산출하도록 설계했다.
- Linux, macOS, Windows 환경에서 pip 및 conda로 간편하게 설치할 수 있는 파이썬 3 패키지로 구현했다.

## 왜 눈여겨볼 만한가

단순 오소로그 기반 발현량 비교는 종 특이적 유전자 네트워크 변화를 반영하기 어려웠으나, ICC 알고리즘은 공발현 구조를 반영하므로 종 간 상동 세포형 추정에 이점이 있다. Pesci는 이를 파이썬 환경으로 제공하여 기존 Scanpy 중심의 단일세포 분석 파이프라인에 이식하기 용이할 것으로 보인다. 다만 초록상으로는 대규모 아틀라스 수준에서의 연산 시간과 메모리 사용량에 대한 정량적 수치가 확인되지 않아, 실전 대용량 데이터 처리 시 성능 검증이 먼저 필요할 것으로 판단된다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag623) · DOI 10.1093/bioinformatics/btag623
