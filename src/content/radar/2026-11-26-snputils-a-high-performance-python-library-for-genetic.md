---
title: "바이오뱅크 규모 유전체 데이터 분석을 위한 Python 라이브러리 snputils"
date: 2026-11-26
kind: paper
summary: "CLI 커맨드를 이어 붙이지 않고 단일 Python 환경에서 QC부터 IBD·GWAS까지 통합 처리한다."
sourceName: "Molecular biology and evolution"
sourceUrl: "https://doi.org/10.1093/molbev/msag291"
journal: "Molecular biology and evolution"
doi: "10.1093/molbev/msag291"
authors: ["Bonet D", "Comajoan Cara M", "Barrabés M", "Smeriglio R", "Geleta M", "Dominguez Mantes A", "Thomassin C", "Agrawal D"]
topics: ["생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

기존 대규모 유전체 분석은 도구 간 포맷 불일치와 연산 효율 문제로 여러 CLI 커맨드와 임시 스크립트를 체인으로 연결해야 해 재현성 확보가 어려웠다. snputils는 유전자형, 혈통, 형질 및 IBD 데이터를 단일 Python 프레임워크에서 고성능으로 다룰 수 있게 만든 라이브러리다. 바이오뱅크 규모 연구에서 분석 파이프라인의 오버헤드를 줄이고 연산 속도를 높이는 데 집중했다.

## 무엇을 했나

- 표준 포맷 기반의 인간 및 비인간 이배체 유전자형 데이터셋을 통합 다루는 단일 데이터 컨테이너 구조를 설계했다.
- 유전자형 QC, 필터링, IBD 세그먼트 정제, admixture mapping, GWAS 및 데이터 시각화 알고리즘을 모듈화하여 구현했다.
- 기존 참조 분석 도구들과 비교 벤치마크를 진행하여 동일한 수준의 PCA 및 통계 결과를 유지하면서 I/O 속도와 실행 시간을 크게 단축했음을 입증했다.

## 왜 눈여겨볼 만한가

기존에 PLINK나 ad-hoc 스크립트를 조합해 복잡하게 이어나가던 인구유전학 및 연관분석 파이프라인을 Python 데이터 생태계 안으로 직접 끌어올 수 있다. 특히 혈통 특이적 마스킹(ancestry masking)이나 IBD 트림처럼 커스텀 파이프라인 작성이 까다로운 분석을 독립 모듈로 제공한다는 점에서 작업 효율을 높여준다. 다만 단일 서버 환경 중심의 오프라인 분석에 최적화된 라이브러리로 보이므로, 대용량 분산 처리 프레임워크와의 메모리 효율 비교는 실제 도입 전 검증이 필요하다.

## 원문

- [Molecular biology and evolution](https://doi.org/10.1093/molbev/msag291) · DOI 10.1093/molbev/msag291
