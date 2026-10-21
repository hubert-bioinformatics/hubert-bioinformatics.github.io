---
title: "대규모 단일핵 Multiome 분석용 R 파이프라인 multiomeR"
date: 2026-10-20
kind: paper
summary: "디스크 기반 처리와 모듈화 구조로 대규모 Multiome 데이터의 메모리 사용량과 분석 시간을 단축했다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.10.14.759117v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.10.14.759117"
authors: ["Koefoed", "T. G.", "He", "S.", "Thodberg", "M.", "Pikkupeura", "L. M."]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

10x Epi Multiome 데이터 분석 시 Cell Ranger ARC 이후 파이프라인을 커스텀 스크립트로 개별 구축하는 경우가 많아 재현성이 떨어지고 메모리 소모가 극심했다. 특히 샘플 수가 늘어나면 파라미터 수정 시 전체 과정을 다시 계산해야 하는 번거로움이 존재했다. multiomeR은 텍스트 설정 파일 기반의 디스크 저장 방식과 단계별 파이프라인 추적을 도입해 대규모 다중 샘플 데이터 처리 효율을 높였다.

## 무엇을 했나

- QC, 통합, 세포형 주석, Peak-to-Gene 연계 및 형질 연관성 검정을 지원하는 모듈형 R 파이프라인을 구축했다.
- 텍스트 설정 파일로 파라미터를 관리하고 데이터를 메모리가 아닌 디스크에 유지하며, 변경이 발생한 단계만 선택적으로 재실행되도록 구현했다.
- 31개 공공 샘플(총 375,757개 핵) 데이터를 대상으로 기존 Seurat v5.6/Signac v2 워크플로우와 수행 성능을 비교 검증했다.
- 독립적인 분석 단계를 병렬화하여 동일한 CPU 시간 대비 전체 실행 시간(2.2시간 대 5.6시간)과 메모리 사용량(87 대 114 GB-hours)을 줄였다.

## 왜 눈여겨볼 만한가

Signac 중심의 기존 scRNA+scATAC 통합 분석 워크플로우에서 수십만 개 단위의 핵 데이터를 다룰 때 자주 발생하는 인메모리 고사 문제를 완화한 점이 실용적이다. 파라미터 수정 시 변경된 노드만 다시 계산하므로, 필터링 조건이나 클러스터링 해상도를 자주 바꿔야 하는 탐색적 분석 단계에서 작업 시간을 단축할 수 있을 것으로 보인다. 다만 기존 분석 코드를 R 기반 설정 파이프라인 규격으로 이관하는 초기 공수가 들 수 있으므로, 단일 샘플 분석보다는 대규모 코호트 데이터셋을 다루는 환경에 한해 도입을 검토해 볼 만하다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.10.14.759117v1?rss=1
) · DOI 10.64898/2026.10.14.759117
