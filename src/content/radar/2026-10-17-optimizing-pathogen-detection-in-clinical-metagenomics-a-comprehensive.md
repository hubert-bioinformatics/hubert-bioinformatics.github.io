---
title: "50bp 단일말단 mNGS 데이터의 전처리 및 병원체 동정 파이프라인 벤치마크"
date: 2026-10-17
kind: paper
summary: "품질 관리부터 위양성 제거까지 균종별 최적 파이프라인 조합과 필터링 기준을 제시한다."
sourceName: "The Journal of molecular diagnostics : JMD"
sourceUrl: "https://doi.org/10.1016/j.jmoldx.2026.09.003"
journal: "The Journal of molecular diagnostics : JMD"
doi: "10.1016/j.jmoldx.2026.09.003"
authors: ["Ma J", "Hao T", "Bai Y", "Xiao L", "Yang Q", "Dai P", "Wang H"]
topics: ["NGS", "생물정보학"]
aiGenerated: true
reviewed: false
draft: false
---

기존 임상 메타제노믹스(mNGS) 벤치마크 연구는 주로 100bp 이상의 리드를 대상으로 분류(classification) 도구 자체의 성능을 비교하는 데 치중했다. 이로 인해 분석 전·후처리 단계가 최종 병원체 진단 정확도에 미치는 영향은 충분히 평가되지 못했다. 본 연구는 13개 모의 커뮤니티 시료의 50bp 단일말단(single-end) 데이터를 활용해 QC, 숙주 리드 제거, 분류, 위양성 필터링을 아우르는 전체 파이프라인을 다각도로 검증했다.

## 무엇을 했나

- 13개 양성 대조군 모의 커뮤니티 시료에서 확보한 50bp 단일말단 NGS 데이터로 분석 파이프라인 평가 체계를 구축했다.
- 품질 관리(QC), 숙주 리드 제거, 분류학적 분류, 위양성 필터링 각 단계별 도구 조합의 성능을 종합적으로 측정했다.
- QC 및 숙주 제거 단계의 도구 선택이 미생물 리드 추출률과 알파 다양성 산출에 유의미한 차이를 만듦을 확인했다.
- 세균(필터링 미적용), 진균(Bracken), DNA 바이러스(상대 풍도 >0.1%), RNA 바이러스(z-score >3) 등 미생물 유형별 최적 위양성 제거 기준을 도출했다.

## 왜 눈여겨볼 만한가

50bp 수준의 짧은 시퀀싱 리드를 다루는 임상 시퀀싱 환경에서는 분류 알고리즘 못지않게 전처리 및 사후 필터링 조건 설정이 정밀도를 좌우한다는 점을 보여준다. 특히 트림(trimming) 도구 기반 조합은 위양성 필터링 적용 시 재현율(recall) 손실 없이 정밀도(precision)가 개선되었으나, Bowtie2 정렬기 기반 조합에서는 필터링 효과가 제한적이었다. 타깃하는 미생물군마다 적합한 위양성 기준이 다르므로, 기존 임상 파이프라인의 필터링 파라미터를 재검토할 때 유용한 참고 자료가 될 것으로 보인다.

## 원문

- [The Journal of molecular diagnostics : JMD](https://doi.org/10.1016/j.jmoldx.2026.09.003) · DOI 10.1016/j.jmoldx.2026.09.003
