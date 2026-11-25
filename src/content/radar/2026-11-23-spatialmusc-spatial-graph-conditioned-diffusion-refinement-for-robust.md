---
title: "확산 모델 기반 공간 다중오믹스 통합 프레임워크 SpatialMuSC"
date: 2026-11-23
kind: paper
summary: "노이즈와 결측이 심한 공간 다중오믹스 데이터에서 위상 구조 기반 확산 정제로 도메인 분리능을 높인 알고리즘이다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag851"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag851"
authors: ["Wang Y", "Long Y", "Zeng M", "Wu F", "Chen S", "Zhang N", "Zhang X", "Li M"]
topics: ["공간전사체", "오믹스"]
aiGenerated: true
reviewed: false
draft: false
---

시퀀싱 기반 공간 다중오믹스 데이터는 높은 기술적 노이즈와 결측값으로 인해 기존의 공간 그래프 기반 집계 방식만으로는 공간 도메인이 파편화되거나 노이즈가 전파되는 문제가 있었다. 이 연구에서는 공간 위상 정보를 잠재 확산 정제 과정의 조건으로 결합한 SpatialMuSC 프레임워크를 제안한다. 노이즈 섭동에 강인한 멀티오믹스 융합 일관성을 확보하여 조직의 연속적인 영역 구조를 안정적으로 복원했다.

## 무엇을 했나

- 공간 위상 정보를 잠재 확산 모델의 조건부 인자로 활용해 이웃 집계와 노이즈 제거를 수행하는 SpatialMuSC 알고리즘을 개발했다.
- 10x Visium, Stereo-CITE-seq, SPOTS, 공간 에피유전체-전사체 데이터를 포함한 다양한 플랫폼의 데이터셋으로 성능을 검증했다.
- 10개 기존 통합 기법과의 비교 및 결측 부하 테스트에서 조직의 층상 구조와 블록 단위 평활도를 유지하며 공간 도메인 구획 성능을 입증했다.
- 해마 및 맥락막 총 영역 분석에 적용하여 GCL 관련 신경원 프로그램과 TTR 연관 크로마틴 접근성 특성을 식별했다.

## 왜 눈여겨볼 만한가

기존 그래프 후처리 중심의 오믹스 통합 기법이 가진 노이즈 전파 한계를 확산 정제 기법으로 극복하려는 시도가 실용적이다. RNA-ATAC이나 RNA-단백질 동시 시퀀싱 데이터처럼 기술적 변동성이 큰 공간 오믹스에서 도메인 경계를 세밀하게 확보해야 할 때 검토해 볼 만하다. 다만 확산 프로세스가 들어간 만큼 초대형 노드 데이터셋에서 연산 비용과 실행 시간이 늘어날 수 있다는 점은 염두에 두어야 한다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag851) · DOI 10.1093/bioinformatics/btag851
