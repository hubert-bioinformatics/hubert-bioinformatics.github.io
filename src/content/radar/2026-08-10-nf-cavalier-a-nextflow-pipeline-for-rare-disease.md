---
title: "희귀질환 변이 주석·필터링·보고서 생성을 자동화한 Nextflow 파이프라인"
date: 2026-08-10
kind: paper
summary: "VCF와 유전자 패널·임상상 정보로 후보 변이를 추리고 HTML과 PPT 보고서를 만든다."
sourceName: "bioRxiv Bioinformatics"
sourceUrl: "\nhttps://www.biorxiv.org/content/10.64898/2026.08.06.743410v1?rss=1\n"
journal: "bioRxiv Bioinformatics"
doi: "10.64898/2026.08.06.743410"
authors: ["Munro", "J. E.", "Reid", "J.", "Bahlo", "M. E.", "Bennett", "M. F."]
topics: ["생물정보학", "임상유전체"]
aiGenerated: true
reviewed: false
draft: false
---

희귀 멘델 질환 분석에서는 VCF 주석화와 필터링 후 임상 검토용 시각화 보고서를 생성하는 과정에 대량의 수작업이 소요된다. nf-cavalier는 변이 필터링부터 리드 시각화, HTML/PPT 보고서 생성까지 단일 워크플로우로 연결한 Nextflow 파이프라인이다.

## 무엇을 했나

- 단일 검체, 가계, 희귀질환 코호트의 변이 호출 데이터(VCF)와 유전자 패널 또는 타깃 임상상 정보를 입력받도록 구성했다.
- 변이 영향(consequence), 계산 기반 병원성 예측, 인구집단 빈도, 가계 내 분리(segregation) 등 사용자 정의 기준으로 후보 변이를 필터링한다.
- 검토자가 리드 데이터를 직접 확인할 수 있는 시각화 자료와 외부 데이터베이스 링크가 포함된 대화형 HTML 및 PPT 슬라이드를 자동으로 출력한다.

## 왜 눈여겨볼 만한가

VEP나 ANNOVAR 주석화 이후 파편화된 필터링 스크립트와 시각화 툴을 개별적으로 운영하던 임상 유전체 분석 환경에 유용하다. 특히 PPT 슬라이드 형태의 리포트 생성을 지원하므로 증례 검토회나 임상 보고서 준비에 드는 수작업 시간을 줄일 수 있다. 다만 연구소별 주석 DB 및 내부 변이 필터링 기준에 맞춰 파이프라인 파라미터를 초기 설정하는 작업은 필요하다.

## 원문

- [bioRxiv Bioinformatics](
https://www.biorxiv.org/content/10.64898/2026.08.06.743410v1?rss=1
) · DOI 10.64898/2026.08.06.743410
