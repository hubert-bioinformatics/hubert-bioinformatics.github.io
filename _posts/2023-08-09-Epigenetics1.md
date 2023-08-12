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














<br><br>


## Take Home Message
***

새로운 종의 genome assembly를 해야할 때는 유전체 크기 추정을 해야합니다.

다양한 방법이 있으며 시퀀싱 데이터만 가지고도 유전체 크기 추정이 가능합니다.