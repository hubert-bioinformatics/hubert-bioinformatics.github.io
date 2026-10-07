---
title: "제한효소 서클 숏리드 WGS를 이용한 구조변이 타이핑"
date: 2026-10-01
kind: paper
summary: "제한효소 절단과 고리화로 숏리드 WGS의 구조변이 해상도를 높인다."
sourceName: "Human mutation"
sourceUrl: "https://doi.org/10.1155/humu/2169350"
journal: "Human mutation"
doi: "10.1155/humu/2169350"
authors: ["Abelleyro MM", "Yankilevich P", "Ziegler BM", "Luce L", "Cifuentes HM", "Radic CP", "Rossetti LC", "Giliberto F"]
topics: ["생물정보학", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

숏리드 WGS는 임상 유전체에서 스몰 베리언트 검출의 표준이지만, 구조변이(SV) 분석에서는 롱읽기 시퀀싱에 비해 한계가 명확하다. 이 연구는 별도의 고비용 장비 도입 없이 기존 숏리드 시퀀싱 데이터만으로 구조변이 타이핑 정확도를 높일 수 있는 새로운 실험 및 분석 프로토콜을 제시한다.

## 무엇을 했나

- 게놈 DNA를 BclI 제한효소로 절단한 뒤 단말을 연결하여 제한효소 서클(restriction-circles)을 제작하고 숏리드 WGS를 수행했다.
- 절단된 단말 서열을 연결하는 LPER(linking pair-end reads) 패턴을 활용해 장거리 하플로타입과 구조변이를 탐지하는 파이프라인을 구축했다.
- 듀시엔 형광근이영양증(DMD) 환자 검체를 적용하여 기존에 알려진 엑손 결실 및 중복 유전형을 정확히 검증했다.
- Xq28 영역의 1.4 kb 결실과 8.4 kb 역위 반복서열(IR) 유래의 역위 변이를 추가로 검출하고 일반 인구집단 대립유전자 빈도를 확인했다.

## 왜 눈여겨볼 만한가

이 방법은 롱읽기 장비로 전환하기 어려운 임상 현장에서 기존 숏리드 WGS 인프라를 유지하면서 구조변이 검출 능력을 보완할 수 있는 대안이 된다. 다만 제한효소 절단과 고리화라는 추가 실험 단계를 거쳐야 하므로 프렙 과정의 표준화가 선행되어야 한다. 기존 스몰 베리언트 콜링도 함께 수행할 수 있어, WGS 워크플로우에 구조변이 분석을 병행하려는 연구자라면 검토해 볼 만하다.

## 원문

- [Human mutation](https://doi.org/10.1155/humu/2169350) · DOI 10.1155/humu/2169350
