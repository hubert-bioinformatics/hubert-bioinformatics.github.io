---
layout: post
title: Epigenetics VI - 후성유전체 데이터 생산과 분석1
date: 2023-08-16 07:42:01 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,epigenetics]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 포항공과대학교 노태영 교수님의 [후성유전체 데이터 생산과 분석1](https://www.edwith.org/epigenome-2023/lecture/1473438, "후성유전체 데이터 생산과 분석1")를 정리한 내용입니다.


## Intro
***

* 시퀀싱의 원리를 이해합니다.

* ChIP-Seq 기술을 이해하고 데이터 생산과 분석 과정을 학습합니다.
<br><br>


## 시퀀싱 기술의 기초
***

Sanger sequencing은 template DNA와 primer, ddNTP, dNTP를 이용하여 서열을 분석하는 방법입니다.
<br><br>


![Post-Image](epigenetics50.png)
_Sanger Sequencing<br>
https://www.edwith.org/epigenome-2023/lecture/1473438_
<br><br>


최근에는 다양한 NGS platform이 개발되어 서열분석에 사용되고 있습니다. DNA methylation, TF binding regions 분석은 ChIP-Seq을 사용하여 분석할 수 있습니다.
<br><br>


## ChIP-Seq
***

Cell lysis를 통해 chromatin을 얻고 MNase digestion/sonication을 통해 뉴클레오좀 단위로 분해합니다. Immumo-precipitation을 통해 뉴클레오좀만 분리한 뒤 히스톤 단백질 가수분해 효소를 처리하여 DNA를 얻습니다. 이후 library를 생성하고 시퀀싱하여 서열을 분석합니다.
<br><br>


![Post-Image](epigenetics51.png)
_ChIP-Seq<br>
https://www.edwith.org/epigenome-2023/lecture/1473438_
<br><br>


ChIP-Seq 데이터 분석 파이프라인은 다음과 같습니다. Rawdata를 얻은 뒤 QC를 거쳐 reference genome에 mapping, peak detection을 합니다. 이후 statistical 분석과 functional 분석을 통해 각종 epigenetic 정보를 확인합니다.
<br><br>


![Post-Image](epigenetics52.png)
_ChIP-Seq Analysis<br>
https://www.edwith.org/epigenome-2023/lecture/1473438_
<br><br>










## Take Home Message
***

후성유전적 변화에 따른 세포 운명 결정을 알아봤습니다. 발생과 분화 단계의 후성유전적 변화 및 질환에서 발견되는 후성유전적 이상을 알아봤습니다.