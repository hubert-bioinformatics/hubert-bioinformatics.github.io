---
title: "HiChIP 데이터 분석을 위한 Nextflow 기반 전주기 파이프라인 dcHiChIP"
date: 2026-09-12
kind: paper
summary: "원천 시퀀싱 데이터부터 3D 게놈 구조 복원, 모티프 농축 분석까지 단일 워크플로우로 처리한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag636"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag636"
authors: ["Agarwal A", "Al Bkhetan Z", "Plewczynski D"]
topics: ["생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

HiChIP 데이터 분석 도구는 루프 콜링이나 매트릭스 생성 등 일부 단계별로 파편화되어 있어 전주기 통합 파이프라인이 부재했다. 연구진은 원천 데이터 처리부터 다중 스케일 3D 게놈 구조 및 기능 분석을 연결한 Nextflow 기반 파이프라인 dcHiChIP을 개발했다. 이를 통해 단일 워크플로우 안에서 루프, 도메인, 3D 모델을 유기적으로 분석할 수 있다.

## 무엇을 했나

- FASTQ 포맷의 원천 시퀀싱 데이터를 입력받아 루프 콜링과 크로마틴 구조 분석을 수행하는 Nextflow 워크플로우를 구축했다.
- CTCF HiChIP 벤치마크 데이터셋에 적용해 TAD/CCD, A/B 컴파트먼트, 크로마틴 스트라이프 등 주요 다중 스케일 구조를 검출했다.
- 검출된 크로마틴 상호작용 영역에 대한 모티프 농축 분석, 기능 어노테이션, 3D 게놈 공간 모델링을 연계하여 수행했다.
- Nextflow 구조를 활용해 대용량 데이터의 배치 처리와 중간 작업 재개(resumability) 기능을 제공하도록 설계했다.

## 왜 눈여겨볼 만한가

그동안 파편화된 스크립트와 개별 툴을 조합해 처리하던 HiChIP 분석 흐름을 규격화된 파이프라인으로 일원화했다는 점에서 재현성 확보에 도움을 준다. 에피제놈 단백질 연관 3D 구조 분석을 시작하려는 연구실이나 표준화된 파이프라인 구축이 필요한 환경에서 검토할 만하다. 다만 초록상으로는 CTCF 외에 다양한 에피제네틱 마커나 단일세포 단위 확장성에 대한 구체적 성능이 제시되지 않았으므로 실무 적용 전 보유 데이터셋 기반의 전처리 및 루프 콜링 성능 검증이 필요하다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag636) · DOI 10.1093/bioinformatics/btag636
