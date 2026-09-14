---
title: "공간전사체로 규명한 아토피 피부염의 TLS 유사 면역 틈새"
date: 2026-09-11
kind: paper
summary: "Visium과 scRNA-seq 통합 분석으로 아토피 병변 진피 상부의 mmDC와 T 세포 상호작용 틈새를 해독했다."
sourceName: "Allergy"
sourceUrl: "https://doi.org/10.1111/all.70513"
journal: "Allergy"
doi: "10.1111/all.70513"
authors: ["Gross L", "Bäriswyl L", "Kupschke E", "Wallimann A", "Hillen H", "Kirchner P", "Kamarashev J", "Wartenberg M"]
topics: ["단일세포", "공간전사체"]
aiGenerated: true
reviewed: false
draft: false
---

아토피 피부염은 Th2 세포 중심의 2형 면역 반응이 주도하지만, 병변 조직 내에서 병태생리적 면역세포가 기질 및 상피 세포와 어떤 공간적 구조로 상호작용하는지는 정밀하게 밝혀지지 않았다. 이 연구에서는 아토피 피부염 환자의 FFPE 피부 샘플에 10x Visium 공간전사체를 적용해 표피-진피 경계부의 세포 미세환경을 분석했다. 단일세포 전사체(scRNA-seq) 데이터 통합 및 단백질 수준의 단일세포 이미징을 병행하여 병변 내 면역 집합체의 공간적 특징을 제시했다.

## 무엇을 했나

- 아토피 피부염(n=6), 건선(n=2), 정상 대조군(n=5)의 FFPE 피부 조직 샘플을 대상으로 10x Visium 공간전사체 분석을 수행했다.
- 아토피 피부염 scRNA-seq 데이터세트와 Visium 데이터를 통합하고, 링 기반 이웃 분석(ring-based neighborhood analysis)을 개발하여 미세환경 조직화를 도식화했다.
- 진피 상부에서 성숙 이동성 수지상세포(mmDC)와 T 세포가 공존하는 TLS 유사(TLS-like) 면역 틈새를 확인하고 주변 염증성 섬유아세포 및 각질형성세포와의 세포 간 신호 전달 네트워크를 예측했다.
- IMC(Imaging Mass Cytometry) 및 다중 면역형광(mIF) 염색을 통해 활성화된 TH2 세포와 mmDC가 조직 내에서 실제로 인접해 있음을 검증했다.

## 왜 눈여겨볼 만한가

Visium의 55µm 스팟 해상도 한계를 scRNA-seq 세포 타입 디콘볼루션과 IMC·mIF 단백질 이미징으로 보완하여 면역 틈새를 다각도로 입증한 구성이 돋보인다. 중심 세포를 기준으로 주변부 층위별 세포 구성을 정량화한 링 기반 이웃 분석법은 피부 외 다른 고형암이나 염증성 질환 조직의 미세환경 분석에도 유용하게 응용할 수 있다. 다만 10x Visium 데이터 기반이므로, 서브셀룰러 수준의 정밀한 리간드-수용체 결합 위치 파악을 위해서는 Xenium이나 CosMx 같은 단일세포 해상도 공간전사체 플랫폼을 통한 추가 확인이 필요할 것으로 보인다.

## 원문

- [Allergy](https://doi.org/10.1111/all.70513) · DOI 10.1111/all.70513
