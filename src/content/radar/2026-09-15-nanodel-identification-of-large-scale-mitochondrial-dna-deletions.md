---
title: "롱리드 기반 미토콘드리아 DNA 대규모 결손 분석 도구 NanoDel"
date: 2026-09-15
kind: paper
summary: "단일 암플리콘 LR-PCR과 스플라이스 인식 얼라이너를 결합해 mtDNA 결손 위치를 사전 정보 없이 정량 탐지한다."
sourceName: "Bioinformatics (Oxford, England)"
sourceUrl: "https://doi.org/10.1093/bioinformatics/btag684"
journal: "Bioinformatics (Oxford, England)"
doi: "10.1093/bioinformatics/btag684"
authors: ["Fearn C", "Poulton J", "Fratter C", "Oliva C", "Griguer C", "Baldock RA", "Robson SC", "McGeehan RE"]
topics: ["생물정보학", "시퀀싱 기술"]
aiGenerated: true
reviewed: false
draft: false
---

기존 미토콘드리아 DNA의 대규모 결손(LSMD) 검출 방식은 많은 DNA 투입량을 요구하며 사전 정보 없이는 민감도와 정량성이 떨어지는 한계가 있었다. 스플라이스 인식(splice-aware) 정렬 도구가 DNA 얼라이너보다 LSMD 브레이크포인트 탐색 민감도가 높다는 점에 착안해 롱리드 시퀀싱과 결합한 접근이 시도되었다. 연구진은 ONT 롱리드 데이터를 기반으로 세포 내 LSMD를 정밀 분석하는 파이프라인인 NanoDel을 개발했다.

## 무엇을 했나

- 단일 암플리콘 LR-PCR 기반 롱리드 시퀀싱 데이터와 스플라이스 인식 얼라이너를 결합한 NanoDel 파이프라인을 구축했다.
- 인공 데이터셋 평가를 통해 기존 분석 파이프라인 대비 우수한 결손 검출 민감도와 정확도를 확인했다.
- 미토콘드리아 질환 환자 검체 분석에 적용하여 사전 정보 없이 기지의 결손 및 미확인 혼합 형태의 LSMD를 발굴했다.
- 검출된 LSMD 브레이크포인트 주변에서 반복 수열, G-quadruplex 예상 모티프, 접촉 구역(contact zone)과의 연관성을 확인했다.

## 왜 눈여겨볼 만한가

mtDNA 결손 분석 시 숏리드의 한계로 브레이크포인트 검출에 어려움을 겪던 환경에서, 단일 암플리콘 LR-PCR과 ONT 롱리드를 조합해 대형 결손을 스크리닝하는 대안이 될 수 있다. 단일 암플리콘 전증폭 절차가 전제되어야 하므로 검체 손상도나 PCR 증폭 편향에 유의할 필요가 있다. 향후 더 넓은 범위의 임상 시료에서 추가 검증이 이루어진다면 mtDNA 불안정성 연구 및 타깃 분석에 도입을 검토해 볼 만하다.

## 원문

- [Bioinformatics (Oxford, England)](https://doi.org/10.1093/bioinformatics/btag684) · DOI 10.1093/bioinformatics/btag684
