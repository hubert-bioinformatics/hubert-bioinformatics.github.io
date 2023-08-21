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













환경의 영향 및 다양한 요인에 의해 세포의 운명과 질병 발병이 결정됩니다.
<br><br>


![Post-Image](epigenetics41.png)
_후성유전적 변형과 세포의 운명 결정<br>
https://www.edwith.org/epigenome-2023/lecture/1473437_
<br><br>


분화 단계에서 stem cells의 경우 open chromatin 구조를 보이지만 differentiated cells에서는 dense chromatin 구조를 보입니다. 확연한 차이를 보이는 것을 알 수 있습니다.
<br><br>


![Post-Image](epigenetics42.png)
_분화 단계에서 크로마틴 구조의 변화<br>
https://www.edwith.org/epigenome-2023/lecture/1473437_
<br><br>


후성유전적 변형과 암의 관계를 나타내는 그림입니다. 이와 같은 관계를 연구하면서 암 치료제 개발을 위한 연구가 진행되고 있습니다.
<br><br>


![Post-Image](epigenetics43.png)
_후성유전적 변형과 암의 관계<br>
https://www.edwith.org/epigenome-2023/lecture/1473437_
<br><br>


암에서 흔히 발견되는 methylation, histone modification은 다음과 같습니다. 이러한 양상을 파악하여 암 바이오마커로서 사용하고 있습니다.
<br><br>


![Post-Image](epigenetics44.png)
_암에서 발견되는 후성유전적 변형<br>
https://www.edwith.org/epigenome-2023/lecture/1473437_
<br><br>


![Post-Image](epigenetics45.png)
_암에서 발견되는 후성유전적 변형<br>
https://www.edwith.org/epigenome-2023/lecture/1473437_
<br><br>


동일한 염기서열을 가지고 있더라도 서로 다른 세포로 분화되고 기능할 수 있는 이유는 후성유전학이 있기 때문입니다. 같은 가사라도 어떤 음정을 붙이느냐에 따라 다른 노래가 되는 이치와 같습니다.
<br><br>


![Post-Image](epigenetics46.png)
_후성유전학의 역할<br>
https://www.edwith.org/epigenome-2023/lecture/1473437_
<br><br>


## Take Home Message
***

후성유전적 변화에 따른 세포 운명 결정을 알아봤습니다. 발생과 분화 단계의 후성유전적 변화 및 질환에서 발견되는 후성유전적 이상을 알아봤습니다.