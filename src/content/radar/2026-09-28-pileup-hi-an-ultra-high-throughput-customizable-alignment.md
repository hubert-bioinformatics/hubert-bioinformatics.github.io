---
title: "대규모 NGS 데이터를 위한 고속 정렬 파일업 엔진 pileup-hi"
date: 2026-09-28
kind: paper
summary: "수십억 개의 리드를 처리하는 멀티스레드 기반 pileup-hi의 성능과 특징을 정리한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag721"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag721"
authors: ["Piliper E", "Greninger AL"]
topics: ["생물정보학", "NGS"]
aiGenerated: true
reviewed: false
draft: false
---

차세대 시퀀싱 생산량이 급증하면서 대용량 유전체 데이터에서 변이를 검출하기 위한 pileup 생성 과정이 병목으로 작용하고 있다. 기존의 samtools mpileup은 대규모 데이터셋에서 확장성 한계와 단일 출력 형식의 제약을 보여왔다.

## 무엇을 했나

- 수십억 개의 리드를 포함하는 정렬 데이터 처리와 사용자 정의 출력 형식을 지원하는 멀티스레드 엔진 pileup-hi를 개발했다.
- Rust 언어로 구현되었으며 벤치마크 파일과 samtools 회귀 테스트에서 samtools mpileup과 바이너리 수준의 호환성을 확인했다.
- 기본 mpileup 출력 모드에서 samtools mpileup 대비 최대 13배, sambamba mpileup 대비 3.2배 빠른 속도를 보였다.
- 참조 유전체 길이와 고유 indel 수에만 비례하는 깊이 불변(depth-invariant) 데이터 저장 형식을 새롭게 제안했다.

## 왜 눈여겨볼 만한가

대규모 WGS나 고심도 암 패널 분석에서 고질적인 I/O 및 파이프라인 병목을 완화할 대안으로 검토해 볼 만하다. 기존 samtools 결과와 바이너리 호환성을 유지하므로 기존 파이프라인 교체가 비교적 수월할 것으로 보인다. 다만 커스텀 출력 형식을 실무에 도입하려면 별도의 다운스트림 툴과의 연동성을 추가로 확인해야 한다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag721) · DOI 10.1093/bioinformatics/btag721
