---
title: "단일세포 eQTL과 공간전사체로 풀어낸 갑상선 질환의 면역 유전 인자"
date: 2026-09-14
kind: paper
summary: "OneK1K sc-eQTL과 GWAS를 결합한 MR 분석과 공간전사체 검증으로 갑상선 질환 세부 면역세포별 원인 유전자를 규명했다."
sourceName: "International journal of immunogenetics"
sourceUrl: "https://doi.org/10.1111/iji.70066"
journal: "International journal of immunogenetics"
doi: "10.1111/iji.70066"
authors: ["Zhang C", "Zhang J"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

기존 갑상선 질환 GWAS와 eQTL 연구는 벌크 조직 데이터에 의존해 면역세포 아형별 유전자 조절 기전을 구체적으로 밝혀내지 못했다. 본 연구는 OneK1K 단일세포 eQTL과 갑상선 질환 GWAS 요약통계를 결합한 멘델 무작위화(MR) 분석을 수행하고, 공간전사체 및 scRNA-seq 데이터로 인과성을 검증했다. 이를 통해 자가면역성 갑상선 질환과 갑상선암에서 작동하는 세포 아형 특이적 유전적 요인을 제시한다.

## 무엇을 했나

- OneK1K 코호트의 14개 면역세포 아형 cis-eQTL을 도구 변수로 사용하여 4가지 갑상선 질환 GWAS 요약통계에 대한 2표본 멘델 무작위화 분석을 진행했다.
- 자가면역성 갑상선 기능항진증에서 ABHD16A(B세포), HIST1H3H(CD8 T세포) 등 6개 유전자-세포 조합의 인과성을 확인하고 공존이상(colocalization) 분석으로 검증했다.
- 자가면역성 갑상선염의 FAM134B/RETREG1, 갑상선암의 HLA-G(단구) 등 질환별 면역세포 특이적 후보 유전자를 발굴했다.
- 갑상선 질환 조직 공간전사체(GSE248205) 및 암 scRNA-seq 데이터셋과 연계하여 후보 유전자 발현과 세포 침윤 간의 공간적 연관성을 검증했다.

## 왜 눈여겨볼 만한가

벌크 eQTL에서 포착하기 힘든 면역 아형 특이적 원인 유전자를 sc-eQTL과 MR 조합으로 선별하고, 이를 실제 조직 공간전사체 데이터로 재검증하는 프레임워크를 보여준다. 다만 도구 변수로 사용된 OneK1K가 말초혈액(PBMC) 기반 데이터이므로 조직 상주 면역세포(tissue-resident immune cells)의 고유한 eQTL 상태를 완전히 반영하지 못했을 가능성을 고려해야 한다. 공간전사체를 활용한 검증 절차가 포함되어 있어 타 장기의 자가면역 질환이나 종양 미세환경 분석 시 연계해 볼 만하다.

## 원문

- [International journal of immunogenetics](https://doi.org/10.1111/iji.70066) · DOI 10.1111/iji.70066
