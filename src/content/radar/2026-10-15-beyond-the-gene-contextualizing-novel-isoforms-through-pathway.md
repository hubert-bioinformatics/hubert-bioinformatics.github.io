---
title: "롱리드 scRNA-seq 신규 Isoform 기능 추론 프레임워크"
date: 2026-10-15
kind: paper
summary: "발견된 수많은 신규 isoform의 기능적 맥락을 유전자 발현 패턴 기반 이웃 군집화로 분석한다."
sourceName: "bioRxiv Genomics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.10.14.758627v1?rss=1\n"
journal: "bioRxiv Genomics"
doi: "10.64898/2026.10.14.758627"
authors: ["Doyle", "P. H.", "Page", "M. L.", "Ebbert", "M. T. W."]
topics: ["단일세포", "전사체"]
aiGenerated: true
reviewed: false
draft: false
---

숏리드 기반 분석의 한계를 극복하는 롱리드 단일세포 RNA 시퀀싱으로 수많은 신규 isoform과 유전자가 발굴되고 있으나, 이들이 생물학적으로 어떤 기능을 하는지 파악하기는 여전히 어렵다. 기존의 숙주 유전자 주석이나 단백질 도메인 유사성만으로는 새로 찾아낸 isoform의 우선순위를 정하거나 기능을 예측하기가 마땅치 않기 때문이다.

## 무엇을 했나

- 유사한 세포 타입별 발현 패턴을 보이는 참조 유전자를 기준으로 신규 유전자와 isoform의 맥락을 파악하는 계산 프레임워크인 CIPI(Centroid-based Isoform Pathway Inference)를 개발했다.
- 호스트 유전자 주석이나 단백질 도메인 비교에만 의존하지 않고 발현 기반의 이웃 군집을 구축했다.
- 구축된 이웃 군집에 GO, KEGG, Reactome 같은 패스웨이 분석을 결합하여 개별 isoform의 생물학적 기능을 유추했다.

## 왜 눈여겨볼 만한가

롱리드 scRNA-seq 데이터에서 쏟아지는 수많은 신규 isoform 중 어떤 것을 먼저 파악해야 할지 고민인 연구자라면 눈여겨볼 만하다. 숙주 유전자 정보가 부족하거나 반복 서열이 있는 복잡한 영역의 isoform을 패스웨이 수준에서 해석하는 가설 생성용 도구로 쓸 수 있다. 다만, 발현 패턴 기반의 유추 방식인 만큼 실제 단백질 수준에서의 기능 검증은 별도의 실험적 뒷받침이 필요할 것으로 보인다.

## 원문

- [bioRxiv Genomics](
https://www.biorxiv.org/content/10.64898/2026.10.14.758627v1?rss=1
) · DOI 10.64898/2026.10.14.758627
