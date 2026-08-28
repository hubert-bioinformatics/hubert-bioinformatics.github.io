---
title: "PacBio HiFi 데이터 전용 체세포 변이 파이프라인 nf-core/pacsomatic"
date: 2026-08-27
kind: paper
summary: "PacBio 롱리드 데이터를 활용해 변이 검출부터 5mC 메틸화, HRD 분석까지 앤드투앤드로 처리한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag647"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag647"
authors: ["Zhang W", "Yi H", "Niu B", "Wu G", "Chang TC"]
topics: ["생물정보학", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

숏리드 시퀀싱만으로는 암 유전체 분석 시 복잡한 구조변이(SV)나 반복 영역, 엑솜 외 메틸화 정보를 통합해서 다루기 어려웠다. PacBio HiFi 롱리드를 적용하려는 시도는 늘었으나 이를 안정적으로 처리할 표준화된 종양 체세포 분석 파이프라인이 부족했다. 이 연구에서는 종양-정상 쌍 데이터를 위해 자동화된 Nextflow DSL2 기반 분석 워크플로우인 nf-core/pacsomatic을 구축했다.

## 무엇을 했나

- PacBio HiFi 롱리드 렌더링에 맞춰 Nextflow DSL2와 컨테이너 기술 기반의 종양-정상 쌍 분석 파이프라인을 설계했다.
- 참조 유전체 정렬을 거쳐 체세포 SNV/indel, SV, CNV 검출과 함께 CpG 메틸화 프로파일링 및 차등 메틸화 지역(DMR) 분석을 한 번에 수행하게 했다.
- 변이의 기능적 주석 달기, 뮤테이션 시그니처 추출, 종양 순도 및 다배체(ploidy) 추정, HRD 결함 평가 등 후속 해석 모듈을 제공하도록 구성했다.

## 왜 눈여겨볼 만한가

단신 리드 중심 암 유전체 파이프라인에서는 별도로 돌려야 했던 변이 검출과 epigenetics(5mC 메틸화) 분석을 PacBio HiFi 롱리드 파이프라인 하나로 통합할 수 있다. nf-core 표준 방식을 따르고 있어 재현성과 컴퓨팅 환경 호환성이 확보되어 있으므로, 롱리드 기반 암 전장유전체(WGS) 데이터셋 분석에 즉시 적용을 검토해 볼 만하다. 다만 롱리드 특성상 높은 시퀀싱 비용과 데이터 처리량이 요구되므로 기존 숏리드 변이 분석 체계를 대체하기보다는 롱리드 데이터를 이미 보유했거나 SV/메틸화 중심 분석이 필요한 파이프라인에 제한적으로 도입하는 방식이 현실적이다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag647) · DOI 10.1093/bioinformatics/btag647
