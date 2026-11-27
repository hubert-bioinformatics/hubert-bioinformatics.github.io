---
title: "단일세포·공간전사체 군집 정렬 프레임워크 ACE-OF-Clust"
date: 2026-11-25
kind: paper
summary: "군집화 조건 차이로 발생하는 불일치 문제를 해결하고 멀티옴 간 조절 가능 유전자를 탐색한다."
sourceName: "PLoS computational biology"
sourceUrl: "https://doi.org/10.1371/journal.pcbi.1014944"
journal: "PLoS computational biology"
doi: "10.1371/journal.pcbi.1014944"
authors: ["Liu X", "Singh R", "Ramachandran S"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

scRNA-seq나 공간전사체 분석 시 군집 수 변경이나 모델 차이로 인해 레이블 불일치가 발생하는 클러스터링 정렬 문제가 자주 관측된다. 연구진은 다중 군집 결과 정렬부터 핵심 특성 추출까지 통합 연계하는 ACE-OF-Clust 프레임워크를 제시했다.

## 무엇을 했나

- 다중 군집화, 군집 정렬, 모델 비교, 특성 선별로 이어지는 4단계 분석 워크플로우를 구축했다.
- PBMC scRNA-seq, 유방암 및 마우스 배아 공간전사체, 단일세포 멀티옴 데이터를 활용해 프레임워크를 검증했다.
- 유전자 수준의 군집 프로파일을 바탕으로 세포 타입을 구분하는 유전자와 유전자 세트의 기여도를 정량화했다.
- 서로 다른 오믹스 층 간의 군집 변이성을 정량화하고 잠재적인 교차 오믹스 조절 연결을 제시했다.

## 왜 눈여겨볼 만한가

해상도(resolution) 설정이나 파이프라인 차이로 세포 타입 주석이 흔들리는 현상을 객관적으로 비교·검증할 때 활용도가 높다. 특히 scRNA-seq와 공간전사체 또는 멀티옴 데이터 간 군집 레이블을 직접 매칭하고 마커 유전자를 탐색하는 과정에 도입해 볼 만하다. 다만 대용량 Single-cell/Spatial 데이터 처리 시 발생하는 연산 비용 및 메모리 부하는 실제 환경에서 추가 검증이 필요해 보인다.

## 원문

- [PLoS computational biology](https://doi.org/10.1371/journal.pcbi.1014944) · DOI 10.1371/journal.pcbi.1014944
