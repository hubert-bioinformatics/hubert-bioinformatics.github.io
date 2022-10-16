---
layout: post
title: Preprocessing of Single Cell Analysis I
date: 2022-10-15 21:05:23 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,single cell analysis]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 아주대학교 의과대학 김규태 교수님의 [단일세포 전사체 데이터 전분석 I](https://www.edwith.org/single-cell/lecture/1417886, "단일세포 전사체 데이터 전분석 I")를 정리한 내용입니다.


## Intro
***

Single cell analysis의 의의, 구조와 형식, 전분석 과정을 이해합니다.
<br><br>


## Single Cell Analysis 의의
***

사람의 몸은 많은 cell이 모여 구성하고 있습니다. 모든 cell은 각각 특성을 지니고 있으며 다른 cell과 구분되는데 이를 cellular heterogeneity(세포 이질성)이라고 합니다.
<br><br>


![Post-Image](SC-pre1.png)
_Waddington's model<br>
https://www.edwith.org/single-cell/lecture/1417886_
<br><br>


Pluripotent cell로부터 다양한 cell state로 differentiation되는 과정을 설명하는 Waddington's model입니다. Pluripotent cell로부터 methylation을 거쳐 다양한 특성을 가진 cell로 분화된다는 이론입니다.
<br><br>


![Post-Image](SC-pre2.png)
_Tumor Micro-Environment<br>
https://www.edwith.org/single-cell/lecture/1417886_
<br><br>


A cell은 B, C cell과 같이 현재 normal cell 상태입니다. 하지만 혈관에 인접해 있으므로 산소 등의 물질을 공급받는데 유리합니다. C cell은 tumor cell과 인접해 있으므로 시간이 지나면 tumor cell 분비물질의 영향을 받아 유사하게 변해갈 것입니다.

이처럼 하나의 pluripotent cell로부터 시간, 공간적으로 다양한 성격을 지닌 cell로 분화되며, 이를 모두 구분하여 분석하는 것은 도전적 과제인 동시에 현재 상태를 정확히 파악할 수 있는 방법입니다.
<br><br>


![Post-Image](SC-pre3.png)
_Bulk RNA-seq 대비 scRNA-seq의 장점<br>
https://www.edwith.org/single-cell/lecture/1417886_
<br><br>


아리스토텔레스는 '전체는 부분의 합보다 크다.'는 이야기를 남겼습니다. 하지만 RNA-seq에서는 부분(single-cell)이 전체(bulk)보다 더 많은 의미를 담고 있습니다.

Bulk RNA-seq은 모든 cell에서 gene expression level이 평균적인 값으로 나타납니다. 반면에 single cell RNA-seq은 cell별로 gene expression level을 구분하여 파악하고 clustering 할 수 있습니다.
<br><br>


![Post-Image](SC-pre4.png)
_History of Single Cell Analysis<br>
https://www.edwith.org/single-cell/lecture/1417886_
<br><br>


## Single Cell Data의 구조와 형식
***

![Post-Image](SC-pre5.png)
_Basic Single Cell Analysis Workflow<br>
https://www.edwith.org/single-cell/lecture/1417886_
<br><br>


기본적인 single cell analysis 과정은 다음과 같습니다. Droplet-based microfludics와 같은 방식으로 single cell을 분리한 다음 sequencing을 통해 amplifying 과정을 진행합니다. 마지막으로 statistical/algorithmical mining을 진행하여 각 cell이 지니는 의미를 파악합니다.
<br><br>


![Post-Image](SC-pre6.png)
_10x Genomics<br>
https://www.edwith.org/single-cell/lecture/1417886_
<br><br>


10x genomics사의 commercial service를 많이 사용하고 있습니다. 하나의 droplet에 single cell 한 개가 들어가도록 조정하고, 10x barcode와 UMI를 사용하여 transcript의 양을 확인하고 분석합니다.
<br><br>


## Single Cell Data의 전분석 과정
***

![Post-Image](SC-pre7.png)
_Seurat R Package<br>
https://www.edwith.org/single-cell/lecture/1417886_
<br><br>


10x genomics에서도 sequencing 결과 분석에 Seurat R package를 사용하도록 권고하고 있습니다. 위와 같은 과정으로 분석을 진행합니다.
<br><br>


## Take Home Message
***

Single cell analysis가 지닌 의의와 전반적인 분석 과정에 대해 알아볼 수 있었습니다.