---
title: "단일세포 및 공간전사체 기반 트랜스크립트 아이소폼 통합 DB scSpAS"
date: 2026-11-05
kind: paper
summary: "단일세포·공간 수준의 ATS, AS, APA 및 전장 아이소폼 조절 정보를 조절 기전과 함께 제공한다."
sourceName: "Nucleic acids research"
sourceUrl: "https://doi.org/10.1093/nar/gkag1107"
journal: "Nucleic acids research"
doi: "10.1093/nar/gkag1107"
authors: ["Chen L", "Liu D", "He Z", "Xu Z", "Li R", "Yang Q", "Gao Z", "Xia R"]
topics: ["시퀀싱 기술", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

대안적 전사 시작(ATS), 스플라이싱(AS), 폴리아데닐화(APA)에 의한 아이소폼 다변성은 세포 수준과 공간 위치별 정보가 여러 데이터베이스에 파편화되어 있었다. 이 연구에서는 사람과 마우스의 123개 단일세포 및 공간전사체 데이터셋을 통일된 파이프라인으로 재분석하여 통합 아이소폼 조절 아틀라스 scSpAS를 구축했다.

## 무엇을 했나

- 5' 및 3' 캡처 scRNA-seq 데이터에서 ATS와 APA 부위를 각각 동정했다.
- Smart-seq2 및 롱리드 시퀀싱 데이터를 활용해 대안적 스플라이싱 이벤트와 전장 아이소폼을 검출했다.
- 13개 암종과 감염·염증성 질환 및 정상 샘플을 아우르는 41만여 개 단일세포와 8만 2천여 개 공간 스팟 데이터를 표준화 처리했다.
- CLIP-seq, ATAC-seq, CAGE-seq 정보와 스플라이싱 모티프 예측 데이터를 결합해 세포 유형 및 공간 위치별 조절 기전 해석을 지원하도록 구현했다.

## 왜 눈여겨볼 만한가

기존 숏리드 3' 단일세포 시퀀싱은 유전자 수준 합산에 치우쳐 아이소폼 수준의 기능 변화를 놓치기 쉬웠으나, scSpAS는 롱리드와 Smart-seq2 및 에피지놈 데이터를 연계해 엑손·단백질 수준의 미세 조절을 다각도로 훑어볼 수 있게 해준다. 조직 미세환경 내 공간적 위치에 따른 아이소폼 전이(isoform switching)나 전사 후 조절을 가하려는 연구에서 타깃 후보 발굴용으로 검토해 볼 만하다. 다만 숏리드 캡처 데이터 기반의 ATS·APA 추정치는 라이브러리 품질과 시퀀싱 깊이에 의존적이므로 실제 실험적 검증 데이터를 함께 확인하는 과정이 필요하다.

## 원문

- [Nucleic acids research](https://doi.org/10.1093/nar/gkag1107) · DOI 10.1093/nar/gkag1107
