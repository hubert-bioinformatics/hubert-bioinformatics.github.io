---
title: "전사체 정렬 BAM을 유전체 좌표로 정확히 변환하는 T2G"
date: 2026-10-21
kind: paper
summary: "CIGAR와 RNA 수식 태그를 유지하며 위유전자 오매핑을 줄인다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.10.20.760397v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.10.20.760397"
authors: ["Rudler", "D. L.", "Mahmud", "S.", "Cleynen", "A.", "Shirokikh", "N. E."]
topics: ["전사체", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

RNA-seq 리드를 트랜스크립톰에 정렬하면 접합부 리드 손실을 줄일 수 있지만, 결과 좌표가 유전체 기반 분석 도구와 호환되지 않는 문제가 발생한다. 기존 좌표 변환 도구는 특정 정렬 모델이나 특정 어세이에 종속되어 범용성이 떨어졌다. T2G는 BAM 파일의 CIGAR 문자열과 태그를 보존하면서 전사체 좌표를 유전체 좌표로 변환하는 도구다.

## 무엇을 했나

- Python 참조 구현체 및 독립 실행 바이너리(t2gd) 형태의 T2G 파이프라인을 구축했다.
- 일루미나 숏리드, 리보솜 프로파일링, 나노포어 Direct RNA-seq 데이터를 대상으로 유전체 직접 정렬과 T2G 변환 성능을 비교했다.
- 유전체 직접 정렬 대비 스플라이스 접합부 정확도를 높이고 가공 위유전자(processed pseudogene)로의 리드 오매핑을 차단했다.
- RNA 결합 단백질 데이터 재분석에서 위유전자에 매핑되던 리드를 8.5배 줄이고 아이소폼별 RNA 수식 정보가 유지됨을 확인했다.

## 왜 눈여겨볼 만한가

위유전자 오매핑이나 스플라이스 접합부 왜곡이 발생하는 전사체 데이터셋에서 정렬 신뢰도를 높이는 전처리 옵션이 될 수 있다. 염기 단위 RNA 수식 태그를 보존하므로 나노포어 Direct RNA-seq 기반 파이프라인에 적용해 볼 만하다. 다만 참조 전사체 주석(GTF/GFF)의 완전성에 따라 변환 정확도가 결정되므로 표준화된 참조 데이터셋 확보가 선행되어야 한다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.10.20.760397v1?rss=1
) · DOI 10.64898/2026.10.20.760397
