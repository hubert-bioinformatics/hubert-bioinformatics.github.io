---
title: "Nicking Loop 기반 CssDNA 라이브러리 제작 및 NGS 적용"
date: 2026-11-23
kind: paper
summary: "PCR 대비 변이 대립유전자 분율을 안정적으로 유지하며 PacBio Onso와 ONT 시퀀싱에 바로 호환된다."
sourceName: "Nucleic acids research"
sourceUrl: "https://doi.org/10.1093/nar/gkag1284"
journal: "Nucleic acids research"
doi: "10.1093/nar/gkag1284"
authors: ["Adamusová S", "Laine N", "Korkiakoski A", "Hirvonen T", "Musku A", "Rantasalo T", "Kim J", "Blomster J"]
topics: ["NGS", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

기존 원형 단일 가닥 DNA(CssDNA) 라이브러리 제작은 스플린트 반응과 효소 처리가 포함된 복잡한 변환 과정을 거쳐야 하는 한계가 있었다. 본 연구는 ssDNA 및 dsDNA를 CssDNA로 직접 전환하는 Nicking Loop™ 기법을 개발하여 제어된 선형 증폭과 직접 원형 시퀀싱을 가능하게 했다. 이를 통해 별도 변환 단계 없이 PacBio Onso 및 Oxford Nanopore 등 다양한 NGS 플랫폼에 직접 적용할 수 있음을 확인했다.

## 무엇을 했나

- ssDNA와 dsDNA를 CssDNA 형태로 전환하는 Nicking Loop™ 기반 타깃 라이브러리 제작 기술을 수립했다.
- 3세대에 걸친 선형 증폭을 통해 기존 PCR 방식 대비 변이 대립유전자 분율(VAF) 보존력이 우수함을 확인했다.
- PacBio Onso 및 Oxford Nanopore 플랫폼에서 추가 변환 반응 없이 호환됨을 시퀀싱 데이터를 통해 검증했다.
- 실험 초기 단계에 적용 가능한 루프 기반 인덱싱으로 다중 샘플의 병렬 처리 효율을 높였다.

## 왜 눈여겨볼 만한가

저빈도 변이 검출 시 PCR 증폭 바이어스로 인한 VAF 왜곡을 최소화해야 하는 타깃 시퀀싱 실험 계획에 대안으로 검토할 만하다. 특히 PacBio Onso나 ONT 기반 콘센서스 시퀀싱을 운용 중인 랩이라면 라이브러리 전환 공정을 단축하는 효과를 기대할 수 있다. 다만 본 연구는 개념 검증 단계이므로 실제 임상 샘플이나 고복잡도 암 패널 검증 결과는 추가로 확인할 필요가 있다.

## 원문

- [Nucleic acids research](https://doi.org/10.1093/nar/gkag1284) · DOI 10.1093/nar/gkag1284
