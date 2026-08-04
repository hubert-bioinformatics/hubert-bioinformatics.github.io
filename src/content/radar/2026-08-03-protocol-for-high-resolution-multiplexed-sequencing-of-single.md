---
title: "조합 바코딩 Tn5 기반 단일세포 전장 전사체 라이브러리 제작법"
date: 2026-08-03
kind: paper
summary: "미세 조직 및 단일 세포 수준에서 고처리량 전장 전사체 라이브러리를 구축하는 단계별 상세 가이드다."
sourceName: "STAR protocols"
sourceUrl: "https://doi.org/10.1016/j.xpro.2026.104765"
journal: "STAR protocols"
doi: "10.1016/j.xpro.2026.104765"
authors: ["He L", "Zhang W", "Qi P", "Jiao Z", "Zhang D", "Zhao X"]
topics: ["단일세포", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

단일세포 전사체 분석(scRNA-seq)에서 높은 세포 처리량을 유지하면서 유전자 전장(full-length) 커버리지를 동시에 확보하는 것은 쉽지 않았다. CBTi-seq(combinational barcoded Tn5 transposon insertion sequencing) 프로토콜은 직교 조합 바코딩 Tn5를 활용해 단일 세포 및 미세 영역 조직에서 전장 전사체 라이브러리를 대량으로 제작하는 표준화된 절차를 제공한다.

## 무엇을 했나

- 조합 바코딩된 Tn5 트랜스포존 태그멘테이션 방식을 도입해 전장 전사체 라이브러리의 확장성을 확보했다.
- 단일 세포 분석뿐만 아니라 미세 영역(micro-region) 조직 샘플까지 적용 범위를 넓혔다.
- 샘플 확보부터 원스텝 RT-PCR cDNA 증폭, Tn5 태그멘테이션, 멀티플렉스 풀링, 이중 옵션 정제, 최종 라이브러리 농축에 이르는 전체 워크플로우를 구체화했다.

## 왜 눈여겨볼 만한가

기존 3' 또는 5' 앤드 카운팅 기반 scRNA-seq에서 벗어나 스플라이싱 이형체나 신규 전사체 등 전장 정보가 필요한 연구에서 스케일을 키울 수 있는 선택지다. 다만 조합 바코딩 Tn5 태그멘테이션과 풀링 절차가 들어가므로, 초기 실험 조건 잡기와 올리고 바코드 설계 검증이 수반되어야 할 것으로 보인다.

## 원문

- [STAR protocols](https://doi.org/10.1016/j.xpro.2026.104765) · DOI 10.1016/j.xpro.2026.104765
