---
title: "공간전사체 데이터 분석 및 고급 해석을 위한 통합 워크플로"
date: 2026-08-21
kind: paper
summary: "데이터 수집부터 디콘볼루션과 세포 간 상호작용 분석까지 다루는 R 중심 파이프라인이다."
sourceName: "Journal of visualized experiments : JoVE"
sourceUrl: "https://doi.org/10.3791/70188"
journal: "Journal of visualized experiments : JoVE"
doi: "10.3791/70188"
authors: ["Wang H", "Chen W", "Wu Y", "Sun C", "Zhu Z", "Zhang K", "Geng Y", "Zhou Y"]
topics: ["공간전사체", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

공간전사체 데이터는 조직의 위치 정보와 유전자 발현을 동시에 제공하지만, 데이터 수집, QC, 통합, 디콘볼루션, 시각화에 이르는 단계별 툴이 파편화되어 있어 재현성 있는 파이프라인 구축이 어렵다. 본 논문은 공공 공간전사체 데이터를 바탕으로 전처리부터 세포 간 상호작용 분석까지 일관되게 수행할 수 있는 실용적 분석 워크플로를 제시한다.

## 무엇을 했나

- Seurat을 활용해 데이터 로딩, QC, 정규화, 다중 샘플 통합, 클러스터링, 공간 가변 유전자(SVG) 발굴을 수행하는 기본 파이프라인을 구축했다.
- 참조 단일세포 전사체 데이터를 이용하는 SPOTlight 기반 디콘볼루션과 비지도 방식의 STdeconvolve 토픽 모델링을 병행하여 스팟 내부 세포 조성을 추정했다.
- Giotto를 이용해 공간적 세포 간 상호작용(cell-cell communication)을 분석하고, 자체 개발한 Python Dash 애플리케이션으로 관심 영역(ROI)을 대화형으로 선택·추출할 수 있게 했다.
- 각 단계별 파라미터 설정의 근거, 예상 결과물, 문제 해결을 위한 트러블슈팅 체크포인트를 스크립트 형태로 명시했다.

## 왜 눈여겨볼 만한가

Visium과 같은 어레이 기반 공간전사체 데이터를 다루면서 표준화된 분석 스크립트와 재현 가능한 파라미터 기준이 필요한 연구자에게 유용한 참고 템플릿이 된다. 다만 R(Seurat, Giotto)과 Python(Dash) 패키지가 혼용되어 있어 스크립트 실행 환경 통합 및 버전 관리에 주의가 필요하다. 또한 단일세포 해상도의 분자 이미지 기반 공간전사체(Xenium 등) 데이터에 적용할 경우 스팟 기반 전제 조건들을 플랫폼에 맞게 변경해야 하는 제약이 있다.

## 원문

- [Journal of visualized experiments : JoVE](https://doi.org/10.3791/70188) · DOI 10.3791/70188
