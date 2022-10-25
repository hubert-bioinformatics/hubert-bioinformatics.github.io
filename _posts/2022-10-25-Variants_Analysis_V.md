---
layout: post
title: Variants Analysis V - Cancer Analysis
date: 2022-10-25 08:28:05 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,variant,cancer,calling]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 연세대학교 의과대학 김상우 교수님의 [NGS 데이터 분석 기초 강의](https://www.edwith.org/ngs-data-variation/joinLectures/356132, "NGS 데이터 분석 기초 강의")를 정리한 내용입니다.


## Intro
***

NGS를 이용하여 cancer genome analysis에 대한 내용을 알아봅니다.
<br><br>


## Cancer is a Genetic Disease
***

![Post-Image](Variants-cancer1.png)
_Cancer is a genetic disease<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


Cancer는 hallmark genes에 genetic variations이 축적되면서 발생하는 genetic disease입니다.
<br><br>


![Post-Image](Variants-cancer2.png)
_Cancer Cells have a Higher Rate of Mutation<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


Cancer cell은 replication 중 발생하는 mismatch error를 복구하거나 버리지 않고 variant로 가져감으로써 gene function에 영향을 줍니다. Cell 분열속도가 normal cell에 비해 빠르므로 이러한 mismatch error의 숫자는 급속도로 증가합니다.
<br><br>


## Analysis of Cancer Somatic Mutation Profiles
***
1. Tumor Mutation Burden (TMB)
    
    Cacner cell에 존재하는 non-synonymous somatic mutations 수를 의미합니다. Cancer type마다 서로 다른 TMB 경향을 보이는 것을 알 수 있습니다.
    <br><br>
    

    ![Post-Image](Variants-cancer3.png)
    _Tumor Mutation Burden<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


2. Microsatellite Instability (MSI)

    Impaired DNA mismatch repair (MMR)의 결과로 발생하는 genetic hypermutability 현상을 의미합니다. 아래 그림과 같이 repeat 영역에서 replication이 진행될 때 1base 이상 차이가 날 수 있는데 이로 인하여 mutation이 발생하는 case 입니다.
    <br><br>


    ![Post-Image](Variants-cancer4.png)
    _Microsatellite Instability<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


3. Mutational Signature

    Mutation이 발생한 pattern을 의미하며, 환자의 분류, 치료에 사용할 수 있는 지표입니다. 보통 특정 position에서 발생할 수 있는 SNP 경우의 수(6 cases: C>A, C>G, C>T, T>A, T>C, T>G)와 1bp 앞뒤로 발생할 수 있는 각각 4 cases를 종합하여 총 96 cases (=6*4*4)가 존재합니다.
    <br><br>


    ![Post-Image](Variants-cancer5.png)
    _Mutational Signature<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


    이러한 mutational signature의 상대적인 pattern을 연구하고 어떤 mutagen에 의해 발생했는지 연구하여 21가지 pattern을 발표했습니다.
    <br><br>


    ![Post-Image](Variants-cancer6.png)
    _Mutational Signature<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


4. Mutation Landscape

    Mutation의 종류와 어떤 gene에서 발생했는지, 그리고 frequency 등을 한 번에 볼 수 있는 plot 입니다.
    <br><br>


    ![Post-Image](Variants-cancer7.png)
    _Mutational Signature<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


5. Hotspot Positions (lollipop plot)

    Mutations가 모여있는 hotspot position을 확인할 수 있는 lollipop plot 입니다. Mutation이 gene의 어느 곳에 몰려있는지, 혹은 넓게 흝어져 있는지 한 눈에 파악할 수 있습니다.
    <br><br>


    ![Post-Image](Variants-cancer8.png)
    _Mutational Signature<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


6. Mutation Specificity

    각 pathoway와 연관된 gene에서 발생하는 mutation 비율을 정리한 plot 입니다. Red box처럼 다양한 cancer type에서 발견되는 pathway가 있는가하면, blue box처럼 특정 cancer type에서 발견되는 pathway가 있음을 확인할 수 있습니다.
    <br><br>


    ![Post-Image](Variants-cancer9.png)
    _Mutational Signature<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


## Take Home Message
***

Cancer genome analysis에 NGS를 적용하면 많은 정보를 알아낼 수 있습니다. Cancer related mutations type, 수, 특성, 발병 원인, subgroup, 중요한 gene의 mutation 등의 정보가 해당합니다. 