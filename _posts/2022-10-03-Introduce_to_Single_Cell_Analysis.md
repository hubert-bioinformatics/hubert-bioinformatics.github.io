---
layout: post
title: Introduce to Single Cell Analysis
date: 2022-10-03 21:10:40 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,single cell analysis]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 광주과학기술원(GIST) 박지환 교수님의 [단일세포 분석 기술 소개](https://www.edwith.org/single-cell/joinLectures/361836, "단일세포 분석 기술 소개")를 정리한 내용입니다.


## Intro
***

Single cell analysis의 다양한 기술을 자세히 알아봅니다.
<br><br>


![Post-Image](SC-int1.png)
_RNA in Mammalian Cell<br>
https://www.edwith.org/single-cell/joinLectures/361836_
<br><br>


Mammalian cell에 존재하는 10~30pg의 RNA 중 protein coding mRNA는 0.25~0.9pg밖에 존재하지 않습니다. 이를 분자수로 환산하면 약 36만 개 정도입니다.
<br><br>


![Post-Image](SC-int2.png)
_Evolution of scRNAseq Techniques<br>
https://www.edwith.org/single-cell/joinLectures/361836_
<br><br>


2009년 경 수작업으로 single cell analysis 시도가 시작되었습니다. 이후 Fluidigm, drop-seq 등의 기술 발전을 거쳐 최근에는 SPLiT, sci-seq 방법들을 사용하여 동시에 수 십 만개의 single cell을 분석할 수 있는 방법이 개발되었습니다.
<br><br>


![Post-Image](SC-int3.png)
_Single Cell Isolation Techniques<br>
https://www.edwith.org/single-cell/joinLectures/361836_
<br><br>


Pipette로 dialution하며 isolation 하던 방법부터 LCM까지 발전을 거듭해 왔습니다. 현재는 Microfluidics를 이용한 isolation과 CTC(Circulate Tumor Cell)와 같이 미량의 cell을 분리하기 위해 antibody와 magnetic particle을 사용하는 방법을 사용합니다.
<br><br>


![Post-Image](SC-int4.png)
_Full Length vs 3' end cDNA seq<br>
https://www.edwith.org/single-cell/joinLectures/361836_
<br><br>


3' end cDNA seq의 경우 gene exporession quantification만 가능한 반면 full length cDNA seq은 alternative splicing, somatic mutation, 그리고 eQTL analysis까지 가능한 장점을 가지고 있습니다.
<br><br>


## Droplet Technique - 10x Genomics
***

Droplet single cell analysis 방식으로 대표되는 10x Genomics사의 원리에 대해 알아봅니다.
<br><br>


![Post-Image](SC-int5.png)
_10x Genomics Technique<br>
https://www.edwith.org/single-cell/joinLectures/361836_
<br><br>


Lane당 약 10,000개의 cell을 분석할 수 있으며, 총 8개 lane이 있으므로 한 번에 80,000개까지 가능합니다. 하나의 oil droplet 안에는 한 개의 gel bead와 한 개의 cell이 들어있으며 cDNA 합성 과정을 거쳐 single cell analysis에 사용됩니다.
<br><br>


![Post-Image](SC-int6.png)
_10x Genomics Technique<br>
https://www.edwith.org/single-cell/joinLectures/361836_
<br><br>


Cell membrane이 lysis된 후 bead에 붙은 약 70만 개의 oligo와 함께 cDNA 합성이 진행됩니다. 이 때 Poly-A 부분이 poly(dT)에 binding하고 이후 UMI, 10x barcode가 차례로 상보적 sequence가 합성됩니다.
<br><br>



<br><br>


## Take Home Message
***

Single cell analysis의 원리와 활용 가능성에 대해 알아볼 수 있었습니다. 현재 업무에서 사용중인 genomics data와 disease, treatment와 연관된 database들이 scRNAseq 결과와 결합한다면 personalized medicine에 활용될 수 있음을 엿볼 수 있었습니다.