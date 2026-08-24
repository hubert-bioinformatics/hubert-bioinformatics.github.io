---
title: "RNA 변이와 RT-stop 신호를 고속 추출하는 도구 Modtector"
date: 2026-08-20
kind: paper
summary: "Count-then-correct 전략으로 대용량 및 단일세포 전사체 데이터에서 최대 50배 이상 신속하게 신호를 추출한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag627"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag627"
authors: ["Zhou T", "Hong Y", "Li P", "Liu X", "Zhang J", "Wang X", "Li A", "Sun L"]
topics: ["생물정보학", "단일세포"]
aiGenerated: true
reviewed: false
draft: false
---

RNA 에피전사체 수식 및 구조 분석 시 돌연변이 신호와 역전사 중단(RT-stop) 신호를 처리하는 기존 도구들은 기능이 파편화되어 있고 단일 신호만 지원하는 한계가 있었다. Modtector는 매핑된 읽기 데이터에서 두 유형의 신호를 동시에 추출하도록 개발된 통합 도구다. Count-then-correct 방식을 도입해 대용량 데이터 처리 시 계산 복잡도를 낮췄다.

## 무엇을 했나

- 매핑이 완료된 시퀀싱 읽기 데이터에서 돌연변이와 역전사 중단 신호를 통합 추출하는 알고리즘을 구현했다.
- 카운팅 후 보정을 거치는 'count-then-correct' 전략을 사용해 다중 신호 분석의 연산 효율을 높였다.
- 22G 규모의 HEK293 데이터 분석을 5분 만에 완료하며 대용량 서열 데이터 처리 성능을 검증했다.
- 단일세포 전사체 데이터셋에 적용했을 때 기존 도구 대비 50배가 넘는 속도 향상을 확인했다.

## 왜 눈여겨볼 만한가

RNA 수식 분석이나 RNA 구조 탐색 파이프라인에서 신호 추출 단계의 연산 병목을 줄이는 데 유용할 것으로 보인다. 특히 대규모 단일세포 전사체 데이터에서 mutation과 RT-stop 신호를 동시에 확보해야 할 때 우선적으로 검토해 볼 만하다. 다만 신호 추출 이후의 최종 변형 콜링 정확도나 통계적 유의성 평가 부분은 기존 분석 도구와의 출력 결과 비교가 추가로 필요해 보인다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag627) · DOI 10.1093/bioinformatics/btag627
