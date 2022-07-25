---
layout: post
title: WES 데이터 처리와 해석법
date: 2022-07-25 10:10:05 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,NGS,WES]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 서울대학교 의과대학 최무림 교수님의 [WES 기초편](https://www.edwith.org/wes-beginner/, "WES 기초편") 강의를 정리한 내용입니다.

## Intro
***

WES 데이터 처리 단계와 주요 parameter를 소개합니다. WES 데이터의 질적 평가를 할 수 있습니다. WES 데이터 처리를 위한 파이프라인을 소개합니다. WES 데이터 처리의 예시를 수행합니다.
<br><br>


## WES 데이터 처리 단계
***

1. Read alignment

    bwa mem 주로 사용합니다.

2. Removing PCR duplicates

    PCR 과정에서 발생하는 duplicate를 확인하고 제거하는 과정입니다. PCR duplicates는 biological duplicates와 다르며 임의로 중복 생산된 상태이므로 이를 제거하는 과정이 필요합니다.

    picard를 주로 사용합니다.

    ![Post-Image](WES-PCR.png)
 _PCR duplicates<br>
 www.edwith.org/wes-beginner_
<br><br>


3. Variant calling

    gatk Haplotypecaller를 주로 사용합니다.

4. Variant annotation

    SnpEff를 주로 사용합니다.
<br><br>


## WES 데이터의 각종 parameter
***

![Post-Image](WES-parameter.png)
 _Parameters of WES data<br>
 www.edwith.org/wes-beginner_
<br><br>


## WES 데이터 분석 파이프라인
***

![Post-Image](WES-gatkbestpractice.png)
 _GATK Best Practice<br>
 www.edwith.org/wes-beginner_
<br><br>


WES 분석 파이프라인은 [GATK best practice](https://gatk.broadinstitute.org/hc/en-us/articles/360035535932-Germline-short-variant-discovery-SNPs-Indels-, "GATK best practice")가 가장 잘 알려져 있고 손쉽게 따라할 수 있습니다.
<br><br>


## Summary
***

* WES 분석 파이프라인은 GATK best practice가 잘 구축되어 있고 주로 사용합니다.