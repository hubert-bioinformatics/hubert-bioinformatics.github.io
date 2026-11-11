---
title: "롱리드 시퀀싱 기반 아이소폼 해상도 APA 데이터베이스 IsoAPA"
date: 2026-11-10
kind: paper
summary: "99개 종의 PacBio·ONT 데이터를 분석해 전사체 아이소폼 단위의 폴리아데닐화 부위 지도를 구축했다."
sourceName: "Nucleic acids research"
sourceUrl: "https://doi.org/10.1093/nar/gkag1137"
journal: "Nucleic acids research"
doi: "10.1093/nar/gkag1137"
authors: ["Zhang J", "Yau TK", "Chan TF"]
topics: ["시퀀싱 기술", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

기존 APA 데이터베이스는 폴리아데닐화 부위(PAS)를 게놈 위치 기반으로만 기록하여 개별 아이소폼 맥락을 파악하기 어려웠다. 이 연구는 롱리드 RNA-seq 데이터를 활용하여 PAS와 해당 전사체 아이소폼을 직접 연결한 데이터베이스 IsoAPA를 구축했다. 이를 통해 유전자 단위 집계에서 가려지던 전사체 말단 조절 기전을 아이소폼 해상도로 분석할 수 있게 되었다.

## 무엇을 했나

- PacBio 및 Oxford Nanopore 롱리드 RNA-seq 데이터를 큐레이션하여 IsoAPA 데이터베이스를 구축했다.
- 99개 종 816개 샘플 그룹에서 230만 개 이상의 전사체-PAS 연계 레코드를 정리했다.
- 인간 286개 샘플 분석을 통해 동일 전사체 아이소폼 구조 내에서도 평균 2.52개의 독자적 PAS가 활용됨을 밝혀냈다.
- 유전자 단위 집계 시 가려졌던 아이소폼 특이적 우세 PAS 전환 및 사용 다양성 패턴을 규명했다.

## 왜 눈여겨볼 만한가

기존 short-read 기반 APA 분석은 3' UTR 변화가 정확히 어떤 아이소폼에 기인하는지 규명하는 데 한계가 있었다. IsoAPA는 풀랭스 전사체 구조와 3' 말단을 직접 연결해 mRNA 안정성 및 번역 조절 연구 시 아이소폼 단위 기능 해석에 도움을 줄 것으로 보인다. 다만 공공 롱리드 데이터베이스 특성상 라이브러리 제작 방식과 시퀀싱 깊이에 따른 편향이 존재할 수 있으므로 특정 조직이나 질환 연구 시 유의해서 검토할 필요가 있다.

## 원문

- [Nucleic acids research](https://doi.org/10.1093/nar/gkag1137) · DOI 10.1093/nar/gkag1137
