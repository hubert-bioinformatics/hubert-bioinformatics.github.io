---
layout: post
title: Big Data in Precision Oncology - TCGA 및 암유전체 빅데이터 개요
date: 2023-07-21 07:34:10 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,bigdata,TCGA,cancer]
img_path: /assets/img/post/
---

본 post는 LAIAD에서 제공하는 가톨릭의과대학 김태민 교수님의 [Big Data in Precision Oncology](https://www.laidd.org/local/ubonline/view.php?id=141&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPUJJRyZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==, "Big Data in Precision Oncology")를 정리한 내용입니다.


## Intro
***

* TCGA 및 ICGC 등의 데이터베이스 개요 및 구조를 학습합니다.
<br><br>


## TCGA (The Cancer Genome Atlas Program)
***

[TCGA](https://www.cancer.gov/ccg/research/genome-sequencing/tcga, "TCGA")는 NIH에서 2005년부터 2015년까지 진행된 프로젝트 입니다. 20,000개 이상의 primary cancer에 대한 분자생물학적 특징과 33개 이상의 cancer type에 대해 확인했습니다. Pan-America 프로젝트로 NHGRI(The National Human Genome Research Institute), NCI(The National Cancer Institute), NIH(The National Institute of Health)에서 funding을 받았으며 미국 주도로 진행되었습니다. Human genome project의 계보를 이어 TCGA 프로젝트가 진행되었고 그 결과 오바마 행정부의 Precision medicine initiatives로 이어졌습니다.
<br><br>


![Post-Image](TCGA1.png)
_before and after TCGA<br>
ttps://www.laidd.org/local/ubonline/view.php?id=141&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPUJJRyZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
<br><br>


## TCGA Pilot Phase(2008~2012)
***

TCGA Pilot 프로젝트는 GBM(Glioblastoma multiforme)과 OV(Srous ovarian cacners)에 대해 진행됐습니다.

The first project에서는 GBM과 연관된 gene과 핵심 pathways를 확인했습니다. Gene sequencing, DNA copy number, DNA methylation, Transcrpitome, MicroRNA 등 다섯 가지 목적에 각각 알맞은 플랫폼을 사용하여 분석을 진행했습니다. 당시에는 NGS 기술이 출시되기 이전이므로 microarray, sanger sequencing 기반 플랫폼이 사용되었습니다.

The second project에서는 OV와 연관된 분석이 진행됐습니다.
<br><br>


## TCGA Sample Annotation
***

TCGA 샘플은 아래와 같은 annotation 체계를 따릅니다.

처음 열 두 자리는 환자의 unique id입니다.

이 때 마지막 두 자리는 tumor(01)인지, matched normal(10 or 11)인지 나타내는 id입니다.
<br><br>


![Post-Image](TCGA2.png)
_TCGA Sample Annotation<br>
ttps://www.laidd.org/local/ubonline/view.php?id=141&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPUJJRyZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
<br><br>




Standard quality metric을 제시한 논문 중 하나로, [Earth BioGenome Project](https://www.pnas.org/doi/10.1073/pnas.2115639118, "Earth BioGenome Project")의 Supplementary Figure S1에 자세히 기술되어 있습니다.

* x score: $$ 10^{x} $$ = N50 contig length in kb. 만약 x가 3이라면 contig의 N50이 1,000kb임을 의미합니다.

* y score: $$ 10^{y} $$ = N50 scaffold length in kb. 만약 y가 1이라면 scaffold의 N50이 10kb임을 의미합니다.

* z score: contig, scaffold 제작 과정에 문제가 없었는지 얼마나 자세히 확인했는가 나타내는 지표입니다. 3단계(0, 1, 2)로 표현합니다.


해당 논문에서 high-quality reference assembly standard를 '2.3.2.QV40'으로 제시하고 있습니다. 이는,

* contig N50 100kb 이상

* scaffold N50 1,000kb 이상

* 길이로 따졌을 때 90% 이상의 contig가 scaffold에 포함되고 fusion/fission/translocation 등이 다른 실험 방법으로 확인됐는지 검증한 것

을 의미합니다.
<br><br>


## Contig Length
***

[N50](https://en.wikipedia.org/wiki/N50,_L50,_and_related_statistics, "N50")은 quality metric 중 하나로 read/contig/scaffold에 모두 적용됩니다.

우선 read/contig/scaffold를 길이가 긴 것부터 정렬합니다. 그 길이를 순차적으로 하나씩 더했을 때, 전체 길이의 절반이 넘는 순간 그에 해당하는 read/contig/scaffold의 길이를 N50으로 정의합니다. 그림에서 전체 길이는 135bp이며 50%는 약 68bp입니다. 길이가 긴 것부터 정렬한 뒤 68bp를 넘는 시점의 read/contig/scaffold는 30bp입니다. 즉, N50은 30bp입니다.
<br><br>


![Post-Image](longread15.png)
_N50<br>
https://www.edwith.org/longread-seq-2023/lecture/1475113_
<br><br>


NGx plot은 각 contig의 길이(=y축: contig나 scaffold length)와 누적 합을 전체 genome length로 나눈 비율(=x측: cumulative coverage)로 표현한 plot입니다.)
<br><br>


![Post-Image](longread16.png)
_NGx Plot<br>
https://www.edwith.org/longread-seq-2023/lecture/1475113_
<br><br>


## BUSCO
***

BUSCO(Benchmarking Universal Single-Copy Orthologs)는 기존에 알려진 lineage-specific single-copy ortholog 유전자들이 제대로 assembly 됐는지 확인하는 tool입니다. 
<br><br>


![Post-Image](longread17.png)
_BUSCO Plot<br>
https://www.edwith.org/longread-seq-2023/lecture/1475113_
<br><br>


## Take Home Message
***

* Contig length 기반으로 assembly quality를 비교할 수 있습니다.

* BUSCO를 활용할 수 있습니다.