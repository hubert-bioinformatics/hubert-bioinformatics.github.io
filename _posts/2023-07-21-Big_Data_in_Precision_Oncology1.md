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
https://www.laidd.org/local/ubonline/view.php?id=141&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPUJJRyZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
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

처음 열 두 자리는 환자의 unique id입니다. 마지막 두 자리는 tumor(01)인지, matched normal(10 or 11)인지 나타내는 id입니다.
<br><br>


![Post-Image](TCGA2.png)
_TCGA Sample Annotation<br>
https://www.laidd.org/local/ubonline/view.php?id=141&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPUJJRyZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
<br><br>


TCGA data는 다음과 같이 네 개 단계의 level로 구분되어 있습니다. 원하는 data를 다운로드 받아 연구에 사용할 수 있습니다.
<br><br>


![Post-Image](TCGA3.png)
_Levels of TCGA Data<br>
https://www.laidd.org/local/ubonline/view.php?id=141&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPUJJRyZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
<br><br>


TCGA project가 종료된 후 2018년 4월 Cell에 논문으로 publish 되었습니다.
<br><br>


![Post-Image](TCGA4.png)
_Pan-Cancer Atlas<br>
https://www.laidd.org/local/ubonline/view.php?id=141&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPUJJRyZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
<br><br>


## TCGA 사용
***

TCGA 데이터는 [NCI GDC](https://portal.gdc.cancer.gov, "NCI GDC")에서 다운로드 받을 수 있습니다. TCGA 사이트에서 BRCA mutation 정보를 찾는 예시입니다.
<br><br>


![Post-Image](TCGA5.png)
_BRCA in TCGA<br>
https://www.laidd.org/local/ubonline/view.php?id=141&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPUJJRyZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
<br><br>


실제 data는 'open'과 'controlled'로 구분되는데, 개인정보가 담긴 data이므로 'controlled'는 TCGA에서 승인된 연구자만 다운로드 받을 수 있습니다.
<br><br>


![Post-Image](TCGA6.png)
_TCGA Data<br>
https://www.laidd.org/local/ubonline/view.php?id=141&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPUJJRyZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
<br><br>


TCGA data는 그 외에도 'Brooad Firehose', 'cBioPorta', 'UCSC Xena browser', 연구논문의 supplementary 등에서 다운로드 받을 수 있습니다.
<br><br>


## ICGC-PCAWG Project
***

TCGA에 이어서 진행된 대규모 project 입니다. ICGC는 처음에 WES와 WGS 두 가지 플랫폼을 모두 모으는 25k Initiative project를 진행 했습니다. 이후 WGS 중 high quality 샘플만 모아서 PCAWG(Pan-Cancer Analysis of Whole Genome)이 진행되었습니다.

ICGC data는 [ICGC Data Portal](https://dcc.icgc.org, "ICGC Data Portal")에서 확인 및 다운로드 받을 수 있습니다.
<br><br>


## Summaries & Other Public Resources
***

| Database | Size | Drugs | Genome Data | Open |
| ----- | ----- | ----- | ----- | ----- |
| GDSC ver1 | 987 cell lines | 320 | SNV(exome), CNV(exome), methylation, gene expression | open(EGA, GEO, ArrayExpress 경유) |
| GDSV ver2 | 809 cell lines | 185 | SNV(exome), CNV(exome), methylation, gene expression | open(EGA, GEO, ArrayExpress 경유) |
| CCLE | 1,500 cell lines | 24 (for 500 cell lines) | SNV(exome), CNV(exome), methylation, gene expression, RPPA | open |
| TCGA | 10,000 cancer patient | 기본 임상 정보 | SNV, CNV, methylation, mRNA/miRNA expression | open |
| ICGC(1st) | 3,000 cancer patient | 기본 임상 정보 | WGS | processed data만 open |
| ICGC(2nd) | over 100,000 cancer patient (예정) | 약물정보 포함한 표준화된 임상정보 | WGS | 예정 |
<br><br>


## Take Home Message
***

* TCGA 및 ICGC 등의 데이터베이스 개요 및 구조에 대해 알아보았습니다.