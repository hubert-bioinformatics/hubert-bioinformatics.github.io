---
layout: post
title: Variants Analysis IV
date: 2022-10-25 08:20:14 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,variant,calling]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 연세대학교 의과대학 김상우 교수님의 [NGS 데이터 분석 기초 강의](https://www.edwith.org/ngs-data-variation/joinLectures/356132, "NGS 데이터 분석 기초 강의")를 정리한 내용입니다.


## Intro
***

NGS 최적 분석 파이프라인에 대해 알아봅니다.
<br><br>


## Artigacts of variant calling
***

![Post-Image](Variants-artifacts.png)
_Artifacts of variant calling<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


Variant calling 과정에 다양한 종류의 artifacts가 나타납니다. Sequencing error, uneven read depth, platform specific errors, misclassification, DNA damage, PCR-induced error, read mapping error, DNA contamination 등이 있습니다.

이 외에도 NGS data analysis 관련 다음과 같은 위험요소들이 있습니다.

1. Artifacts in sample handling

    1. Sample Swap
    
        1. 환자 A, B의 시료가 서로 뒤바뀌는 case로 생각보다 빈번하게 일어납니다.
        2. 해결1) Tumor, matched normal을 함께 가지고 있는 경우, 두 시료로부터 germline variants를 calling한 뒤 matrix를 그려보면 sample swap을 확인할 수 있습니다.
        3. 해결2) HYSYS, NGSCheckMate, BAMixChecker 등의 이미 개발된 tool을 활용하여 sample swap을 확인할 수 있습니다.

    2. Sample Contamination

        1. Human sample이 다른 종과 뒤섞인 case입니다.
        2. 해결) CONTEST 등의 이미 개발된 tool을 활용하여 sample contamination을 확인할 수 있습니다.

    3. DNA damage

        1. DNA는 보통 paraffin block에 보관하는데, 이 때 cytosine이 deamination 과정을 거쳐 uracil로 변하는 damage를 입게 됩니다.
        2. Paraffin block으로 오래 보관한 시료일수록 C>T false positive variant가 많이 나타남을 알 수 있습니다.
        3. 해결) 이미 개발된 tool을 활용하여 DNA damage false positive variant를 제거할 수 있습니다.

2. Artifacts in library preparation

    1. DNA damage by OxoG

        1. DNA capture 과정에서 OxoG(G>T, C>A variant) false positive variant가 발생합니다.
        2. 해결) 이미 개발된 tool을 활용하여 OxoG false positive variant를 제거할 수 있습니다.

    2. PCR-induced error
        
        1. PCR 과정에서 false positive variant가 발생합니다.
<br><br>


![Post-Image](Variants-swap1.png)
_Check Sample Swap by Calling Germline Variants<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


SV 검출은 어려운 과정이므로 아래와 같이 여러 가지 방법(알고리즘)을 사용하여 결과를 도출하는 것이 좋습니다.
<br><br>


![Post-Image](Variants-method.png)
_Methods for SV Detection<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


## Take Home Message
***

NGS를 이용한 SV 검출은 read depth, split reads, assembly 등의 정보를 활용하여 가능함을 알 수 있었습니다.