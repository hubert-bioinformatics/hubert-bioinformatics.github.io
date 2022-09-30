---
layout: post
title: Variants Analysis II
date: 2022-09-27 08:15:04 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,next generation sequencing,variant,calling]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 연세대학교 의과대학 김상우 교수님의 [NGS 데이터 분석 기초 강의](https://www.edwith.org/ngs-data-variation/joinLectures/356132, "NGS 데이터 분석 기초 강의")를 정리한 내용입니다.


## Intro
***

NGS를 이용한 somatic mutation 탐지 방법을 알아봅니다. 또한 low allele frequency mutation, mosaic mutation과 같이 검출하기 어려운 mutation에 대해 알아봅니다.
<br><br>


## Germline vs Somatic Mutation
***

![Post-Image](Variants-soma_germ.png)
_Germline vs Somatic Mutation_
<br><br>


Germline mutation은 생식세포에서 발생한 mutation으로 사람이 성장하면서 모든 cell이 mutation을 공유합니다.

반면 Somatic mutation은 체세포에서 발생한 mutation으로 사람의 일부 cell만 mutation을 가지고 있습니다.
<br><br>


## Variant Allele Frequency
***

![Post-Image](Variants-VAF.png)
_Variant Allele Frequency_
<br><br>


Tumour가 발달하면서 여러 개의 subclone으로 나뉠 수 있습니다. 그림에서 subclone1과 subclone2에서 공통적으로 나타나는 노란색 mutation은 common somatic mutation으로 high-allelic frequency를 보입니다. 반면에 subclone2에서만 나타나는 하얀색 mutation은 specific somatic mutation으로 low-allelic frequency를 보입니다.

해당 tumour를 sequencing 했을 때 read의 구성은 오른쪽 그림과 같습니다. Common mutation은 모든 read에서 확인되는 반면, subclone-specific mutation은 일부 read에서만 확인됩니다.
<br><br>


## Somatic Mutation Analysis: JointSNVMix
***

![Post-Image](Variants-joingsnvmix1.png)
_JointSNVMix<br>
https://doi.org/10.1093/bioinformatics/bts053_
<br><br>


University of British Columbia의 Shah Lab에서 제안한 Joint Genotype Prbability로 somatic mutation analysis 방법 중 하나입니다. ([Andrew Roth et al., JointSNVMix : A Probabilistic Model For Accurate Detection Of Somatic Mutations In Normal/Tumour Paired Next Generation Sequencing Data](http://bioinformatics.oxfordjournals.org/content/early/2012/01/27/bioinformatics.bts053.abstract, "Andrew Roth et al., JointSNVMix : A Probabilistic Model For Accurate Detection Of Somatic Mutations In Normal/Tumour Paired Next Generation Sequencing Data"))

동일한 position에서 tumour와 matched normal의 allele을 모두 고려하여 somatic mutation을 찾습니다. 사람은 diploid이며 이론상 하나의 position에서 나올 수 있는 genotype은 A, B만 있다고 가정하면, 가능한 genotype은 AA, AB, BB입니다. Tumour와 normal에서 총 아홉 가지의 genotype 조합이 가능합니다. 그리고 각 조합이 의미하는 바는 아래와 같습니다. Somatic mutation은 (AA,AB), (AA,BB)인 경우입니다.
<br><br>


![Post-Image](Variants-joingsnvmix2.png)
_JointSNVMix<br>
https://doi.org/10.1093/bioinformatics/bts053_
<br><br>


각 position에서 allele을 count한 다음 아래와 같이 두 가지 확률 모델을 사용하여 확률적으로 가능성이 높은 genotype을 결정합니다. 각 node에 대한 설명은 논문([Andrew Roth et al., JointSNVMix : A Probabilistic Model For Accurate Detection Of Somatic Mutations In Normal/Tumour Paired Next Generation Sequencing Data](http://bioinformatics.oxfordjournals.org/content/early/2012/01/27/bioinformatics.bts053.abstract, "Andrew Roth et al., JointSNVMix : A Probabilistic Model For Accurate Detection Of Somatic Mutations In Normal/Tumour Paired Next Generation Sequencing Data"))을 참고해 주세요.
<br><br>


![Post-Image](Variants-joingsnvmix3.jpeg)
_JointSNVMix<br>
https://doi.org/10.1093/bioinformatics/bts053_
<br><br>


마지막으로 JointSNVMix의 성능평가 결과입니다. 그 외 caller들은 성능평가를 위해 변형하거나 사용한 다른 방식의 somatic mutation analysis입니다. JointSNVMix가 F-measure, MCC(Matthews Correlation Coefficient)에서 가장 우수한 결과를 보입니다.
<br><br>


![Post-Image](Variants-joingsnvmix4.png)
_JointSNVMix<br>
https://doi.org/10.1093/bioinformatics/bts053_
<br><br>


## Somatic Mutation Analysis: MuTect
***

![Post-Image](Variants-joingsnvmix1.png)
_JointSNVMix<br>
https://doi.org/10.1093/bioinformatics/bts053_
<br><br>


Un







## Take Home Message
***

NGS DNA variants 종류와 genotyping logic을 이해할 수 있었습니다.