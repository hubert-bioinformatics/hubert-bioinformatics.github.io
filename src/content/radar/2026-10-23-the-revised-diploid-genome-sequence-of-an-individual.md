---
title: "ONT 심플렉스 리드만으로 구축한 T2T 수준 인간 서열"
date: 2026-10-23
kind: paper
summary: "울트라 롱리드나 Hi-C 없이 3개 플로우셀 데이터만으로 Q60 이상의 양상체 게놈을 복원했다."
sourceName: "Proceedings of the National Academy of Sciences of the United States of America"
sourceUrl: "https://doi.org/10.1073/pnas.2616836123"
journal: "Proceedings of the National Academy of Sciences of the United States of America"
doi: "10.1073/pnas.2616836123"
authors: ["Lok S", "Lau TNH", "Tong AHY", "Trost B", "Reuter MS", "Thiruvahindrapuram B", "Paton TA", "MacDonald JR"]
topics: ["시퀀싱 기술", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

T2T 수준의 인간 양상체 게놈을 완성하려면 울트라 롱리드, PacBio HiFi, Hi-C 등 다양한 기술을 병용해야 해 비용과 실험 복잡도가 높았다. 이는 개별 연구실이나 임상 샘플 수준에서 고품질 전장 게놈을 구축하는 데 큰 장애물이었다. 연구진은 Oxford Nanopore(ONT)의 심플렉스 리드와 hifiasm만으로 T2T에 근접한 개인 게놈(HuRef2.0)을 복원하는 워크플로우를 제시했다.

## 무엇을 했나

- 신선 혈액에서 추출한 표준 DNA로 ONT 플로우셀 3개를 가동해 약 103x 커버리지의 심플렉스 리드를 확보했다.
- 에러 보정한 ONT 리드를 hifiasm으로 어셈블리하여 23개 염색체가 갭 없이 연결된 26개 컨티그 구조를 얻고, ChrY의 남은 갭 2개를 국소 어셈블리해 T2T 수준을 완성했다.
- 최종 어셈블리는 Q60.34 이상의 염기 정확도와 2.36 Mb의 페이징 NG50을 달성했으며, MHC, 센트로미어, rRNA 클러스터 등 복잡한 난독화 구간도 고정밀로 해독했다.
- 동일 커버리지의 PacBio HiFi 리드 어셈블리와 비교해 ONT 리드의 긴 읽기 길이가 연속성(contiguity) 확보에 더 유리함을 확인했다.

## 왜 눈여겨볼 만한가

Hi-C나 고난도의 울트라 롱리드 추출 과정 없이 일반적인 ONT 플로우셀 3개(35x 수준 단일 플로우셀로도 GRCh38 이상)만으로 Q60급 T2T 게놈을 얻을 수 있음을 보여준다. 단일 시퀀싱 플랫폼 중심의 단순화된 워크플로우 덕분에 개인 맞춤형 참조 게놈 구축 문턱이 크게 낮아질 것으로 보인다. 다만 ChrY 해독 과정에서 일부 국소 수동 어셈블리가 들어간 점을 고려하면, 완전히 자동화된 T2T 생성 파이프라인으로 대규모 코호트에 적용하기 전 추가적인 검증이 필요하다.

## 원문

- [Proceedings of the National Academy of Sciences of the United States of America](https://doi.org/10.1073/pnas.2616836123) · DOI 10.1073/pnas.2616836123
