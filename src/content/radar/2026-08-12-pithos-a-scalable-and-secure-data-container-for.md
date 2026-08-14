---
title: "대용량 유전체 데이터의 부분 접근과 중복 제거를 지원하는 Pithos 포맷"
date: 2026-08-12
kind: paper
summary: "Content-defined chunking 기반의 append-only 구조로 클라우드 환경 I/O 성능을 개선했다."
sourceName: "Journal of integrative bioinformatics"
sourceUrl: "https://doi.org/10.1515/jib-2025-0051"
journal: "Journal of integrative bioinformatics"
doi: "10.1515/jib-2025-0051"
authors: ["Schlegel J", "Beyvers S", "Hansen M", "Brehm L", "Goesmann A", "Förster F"]
topics: ["생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

대규모 유전체 분석 시 특정 영역에 접근하려면 수십 기가바이트의 압축 파일 전체를 해제해야 해 클라우드 컴퓨팅과 네트워크 병목이 자주 발생한다. 또한 기존 인덱싱 포맷은 민감 데이터 보안이 취약하고, 암호화 포맷은 무작위 부분 접근을 제한하는 한계가 있다. 연구진은 분산 클라우드 환경에서 보안성과 선택적 읽기 성능을 동시에 확보하는 데이터 컨테이너 포맷 Pithos를 제안한다.

## 무엇을 했나

- Content-defined chunking 기법을 이용해 분산 저장소 간 중복 데이터를 제거하고 전송 대역폭을 줄였다.
- Append-only 구조를 도입해 원본 데이터의 불변성을 보장하면서 증분 업데이트가 가능하도록 설계했다.
- 대용량 데이터 환경에서 기존 파일 솔루션과 읽기·쓰기 성능 및 저장 효율성을 비교 벤치마크했다.
- 벤치마크 결과 기존 방식을 상회하는 입출력(I/O) 성능과 동등 이상의 저장 효율을 확인했다.

## 왜 눈여겨볼 만한가

BAM이나 CRAM 파일처럼 특정 genomic region 단위의 접근이 필요하면서도 암호화와 메타데이터 통합 관리가 중요한 클라우드 파이프라인에서 검토해 볼 만하다. 다만 htslib 기반 생태계나 기존 유전체 분석 도구와의 직접 호환 여부, 별도 컨버팅 및 SDK 도입에 필요한 공수는 실제 적용 전 확인이 필요해 보인다.

## 원문

- [Journal of integrative bioinformatics](https://doi.org/10.1515/jib-2025-0051) · DOI 10.1515/jib-2025-0051
