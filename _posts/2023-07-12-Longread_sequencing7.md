---
layout: post
title: Long Read Sequencing VII - Visualization
date: 2023-07-12 08:12:50 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,pacbio,longread]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 서울대학교 박사 후 연구원 김준님의 [Visualization](https://www.edwith.org/longread-seq-2023/lecture/1475115, "Visualization")를 정리한 내용입니다.


## Intro
***

* Visualization에 가장 널리 쓰이는 circos plot에 대해 알아봅니다.
<br><br>


## Circos Plot
***

[Circos Plot](http://circos.ca/, "Circos Plot")은 chromosome, alignment, SNP/SV density를 plotting하는데 유용한 tool입니다.
<br><br>


Human chromosome 별로 색상을 구분하여 그린 ideogram입니다.
<br><br>


![Post-Image](longread19.png)
_Human Ideogram<br>
https://www.edwith.org/longread-seq-2023/lecture/1475115_
<br><br>


Human chromosome 별로 gene density를 표현한 plot입니다.
<br><br>


![Post-Image](longread20.png)
_Gene Density<br>
https://www.edwith.org/longread-seq-2023/lecture/1475115_
<br><br>


위 plot에 alignment까지 추가한 plot입니다.
<br><br>


![Post-Image](longread21.png)
_Gene Density with alignments<br>
https://www.edwith.org/longread-seq-2023/lecture/1475115_
<br><br>


## Take Home Message
***

* Circos를 이용하여 plot을 그릴 수 있습니다.

* Gene density 외에도 SNP, SV, read depth 등을 포함할 수 있습니다.

* Alignment를 이용해 다양한 관계를 표현할 수 있습니다.