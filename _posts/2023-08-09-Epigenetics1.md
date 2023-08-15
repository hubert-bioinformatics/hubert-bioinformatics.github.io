---
layout: post
title: Epigenetics I - 후성유전학의 개요
date: 2023-08-09 07:33:05 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,epigenetics]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 포항공과대학교 노태영 교수님의 [후성유전학의 개요](https://www.edwith.org/epigenome-2023/lecture/1473433, "후성유전학의 개요")를 정리한 내용입니다.


## Intro
***

* 후성유전학의 개념 및 전사 조절 기전을 이해합니다.

* 후성유전에 의한 세포 운명 결정 현상을 이해합니다.

* 후성유전체 데이터의 생산 및 기본 분석 방향을 이해합니다.
<br><br>


## 후성유전학(Epigenetics)이란?
***

후성유전학은 DNA 자체에 생기는 mutation이 아니라 DNA 이외에 변화가 생기는 현상입니다. 즉, histone 단백질, Methylation, ncRNA 등에 변화가 생기는 현상입니다.
<br><br>


![Post-Image](epigenetics1.png)
_후성유전학이란?<br>
https://www.edwith.org/epigenome-2023/lecture/1473433_
<br><br>


환경에 의한 개체의 운명이 결정되는 사례는 꿀벌에서 찾아볼 수 있습니다. 여왕벌은 일벌과 동일한 DNA를 가지고 있습니다. 하지만 여왕벌의 수명은 일벌에 비하여 40배나 깁니다. DNA methylaton 과정을 비교해보니 여왕벌은 DNMT3 inhibitor가 activation 되는 차이점을 보였습니다.

후성유전적 메모리는 평생가는 기억입니다. [어린 쥐 양육 방식](https://learn.genetics.utah.edu/content/epigenetics/rats/, "어린 쥐 양육 방식")에 따라 성격이 달라지는 사례를 들 수 있습니다. 어렸을 때부터 어미 쥐에게서 보살핌을 받은 쥐는 차분하고 조용한 성격을 가지는 반면, 보살핌을 받지 못한 쥐는 불안 증세를 보입니다. 이는 어린 쥐가 보살핌을 받을 때 GR(Glucocorticoid Receptor)의 크로마틴 구조가 열릴 가능성이 높아지는데, GT은 스트레스 반응을 차단하는데 도움을 주는 것으로 알려져 있습니다. 즉, 보살핌의 여부는 GR의 후성유전학 변화를 불러일으켜 쥐의 성격을 결정하게 됩니다.

유전적으로 동일하고 나이도 같지만 생김새가 다른 쥐의 사례도 볼 수 있습니다. 임신한 어미 쥐가 어떤 먹이를 먹느냐에 따라 새끼 쥐의 생김새가 달라집니다. BPA를 섭취한 어미 쥐의 새끼는 비만이면서 노란 색의 털이 나고 콜린, 엽산, 비타민B12를 섭취한 어미 쥐의 새끼는 정상 생김새를 보입니다. 이는 agouti 유전자에 methylation이 발생하면 유전자 발현이 저해되어 노란색 털의 발현을 막습니다. 하지만 methylation이 일어나지 않으면 노란색 털이 발현되고 암이나 당뇨의 발병 가능성이 높아집니다.
<br><br>


![Post-Image](epigenetics2.png)
_어미 쥐의 먹이에 따라 달라지는 새끼 쥐의 생김새<br>
https://www.edwith.org/epigenome-2023/lecture/1473433_
<br><br>


후성유전학은 1942년 Conrad Waddington이 처음 사용한 개념입니다. DNA 정보는 변하지 않으면서 DNA 자체 또는 DNA와 결합하고 있는 단백질(히스톤)의 변형에 의하여 유전자의 발현이 조절되는 현상입니다. 세포별, 개체별, 질환별 유전자 발현 차이의 새로운 원인으로 대두되고 있습니다. 동일한 단백질이라 하더라도 어떤 세포, 조직, 개체이느냐에 따라 단백질의 양은 크게 달라질 수 있습니다. 후성 유전 인자는 환경에 영향을 받으며 다음 세대로 유전되는 특징이 있습니다.


후성유전학은 마치 골짜기 상단에 놓인 공의 운명과 같은데, 어디로 흘러가느냐에 따라 공의 운명이 달라지기 때문입니다. 이를 세포 분화상태와 비교하면 아래 그림과 같습니다.
<br><br>


![Post-Image](epigenetics3.png)
_Cellular Potential and Epigenetic Landscape<br>
https://www.edwith.org/epigenome-2023/lecture/1473433_
<br><br>


DNA 구조는 아래 그림과 같은데, 후성유전학을 결정하는 인자들이 모두 DNA 구조에 포함되어 있습니다.
<br><br>


[Post-Image](epigenetics4.png)
_Epigenetics Structure<br>
https://www.edwith.org/epigenome-2023/lecture/1473433_
<br><br>


유전자가 발현하도록 역할을 하는 HATs, HDemethylases와 발현을 억제하는 HDACs, DMTases가 있습니다.
<br><br>


[Post-Image](epigenetics5.png)
_Epigenetics Factors<br>
https://www.edwith.org/epigenome-2023/lecture/1473433_
<br><br>


히스톤 단백질 변형의 종류와 그에 상응하는 구조, 영향을 나타낸 그림입니다.
<br><br>


[Post-Image](epigenetics6.png)
_히스톤 단백질 변형<br>
https://www.edwith.org/epigenome-2023/lecture/1473433_
<br><br>


히스톤 단백질의 methylation, acetylation에 의해 closed/open chromatin 구조를 보입니다.
<br><br>


[Post-Image](epigenetics7.png)
_히스톤 단백질의 methylation, acetylation<br>
https://www.edwith.org/epigenome-2023/lecture/1473433_
<br><br>


히스톤 단백질의 변형이 일어나면 후성유전적 조절 인자의 상호 작용으로 인하여 주변의 히스톤 단백질도 영향을 받아 변형되기 쉽습니다.
<br><br>


## Take Home Message
***

환경과 유전자 발현을 후성유전학과 연계하여 알아봤습니다. 후성유전학의 정의와 후성유전적 인자에 대해 알아봤습니다.