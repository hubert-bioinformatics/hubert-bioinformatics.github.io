---
layout: post
title: Long Read Sequencing VI - SV Calling
date: 2023-07-12 07:38:04 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,pacbio,longread]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 서울대학교 박사 후 연구원 김준님의 [SV Calling](https://www.edwith.org/longread-seq-2023/lecture/1475114, "SV Calling")를 정리한 내용입니다.


## Intro
***

* Structural variant에 대해 배웁니다.

* SV calling pipeline을 실습합니다.
<br><br>


## SV(Structural Variant)
***

5V는 50bp 이상의 variant를 의미합니다. Size 기준은 short-read sequencing으로 확인하기 어려운 variant를 SV로 정의했습니다. Translocation과 같이 size 측정이 어려운 variant도 포함합니다.
<br><br>


SV calling은 크게 두 가지 방식이 존재합니다.

1. Read-based SV calling
    1. pros: 적은 read depth로도 가능합니다. 즉, 비용이 저렴합니다.
    2. cons: False positive, false negative가 많습니다. 분석 시간이 좀 더 걸립니다.

2. Assembly-based SV calling
    1. pros: 가장 정확합니다. 그리고 assembly만 되어있으면 분석 시간은 좀 더 짧습니다.
    2. cons: 20x 이상의 read depth가 필요합니다. 즉, 비용이 많이 듭니다.
<br><br>


![Post-Image](longread18.png)
_SV Calling<br>
https://www.edwith.org/longread-seq-2023/lecture/1475114_
<br><br>


## Take Home Message
***

* SV는 50bp 이상의 거대한 variant이며 희귀질환의 원인이 되는 경우가 있습니다.

* SV calling은 read 또는 assembly 수준에서 할 수 있습니다.