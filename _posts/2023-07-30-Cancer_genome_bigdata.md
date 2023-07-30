---
layout: post
title: 암 유전체 빅데이터
date: 2023-07-30 10:42:04 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,bigdata,TCGA,cancer]
img_path: /assets/img/post/
---

본 post는 LAIAD에서 제공하는 가톨릭의과대학 홍동완 교수님의 [암 유전체 빅데이터](https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=, "암 유전체 빅데이터")를 정리한 내용입니다.


## Intro
***

* cBioPortal, USCS XenaBrowser, GDC Data Portal 사용법을 학습합니다.

* 암 정밀 의료 실현을 위한 인간 암 유전체 데이터의 특징과 데이터베이스를 이해합니다.

* 국제 암 컨소시움 TCGA 프로젝트에서 생산, 구축한 빅 데이터베이스 사용법을 습득하고 통합 분석법을 이해합니다.
<br><br>


## cBioPortal
***

Central dogma는 DNA → RNA → Protein으로 이어지는 사람의 유전정보 전달 체계입니다. DNA, RNA, Protein 모두 유전정보를 담고 있으며 각 물질에 대한 연구를 오믹스 연구라고 합니다.
<br><br>


![Post-Image](cancerbigdata1.png)
_Central Dogma<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


오믹스 분석에 대한 시초는 NGS 기술에 있습니다. NGS로 사람 유전체에 대한 bigdata를 생산하는데 현재 Illumina사의 NovaSeq6000은 WGS 30x 기준 1년에 약 4,500명의 유전체 정보를 생산할 수 있습니다.
<br><br>


![Post-Image](cancerbigdata2.png)
_NGS Sequencer<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


한 명의 환자에 대한 다양한 시퀀싱 데이터를 생산한다고 가정했을 때 나올 수 있는 데이터 종류와 사이즈 입니다. 암 패널 데이터, WGS, WES, RNA seq 데이터 생산이 가능합니다. 생산된 데이터로부터 암 환자의 유전체 특징을 파악하고 적절한 치료를 시도할 수 있습니다.
<br><br>


![Post-Image](cancerbigdata3.png)
_Sequencing Data Size<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


암 환자에게서 나타날 수 있는 다양한 somatic 변이 종류입니다. SNV, CNV, SV, Gene fusion 등 다양한 somatic 변이가 존재합니다.
<br><br>


![Post-Image](cancerbigdata4.png)
_Types of Somatic Variants in Cancer<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


TCGA(The Cancer Genome Atlas) 프로젝트의 첫 번째 버전 데이터는 20 peta 정도이며 TCGA data portal, cBioPortal, CGHub를 통해 제한적으로 제공하고 있습니다. 이렇게 공개된 데이터는 CEDAR, ClinGen, ClinVar 등의 프로젝트와 연구그룹과 연계되어 연구가 진행되고 있습니다.
<br><br>


![Post-Image](cancerbigdata5.png)
_Toward a Shared Vision for Cancer Genomic Data<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


[cBioPortal](https://www.cbioportal.org/, "cBioPortal")은 데이터의 visualization에 특화되어 있습니다. 20가지 cancer type에 대하여 총 292개 study, 107,299개 샘플 데이터를 포함하고 있습니다.
<br><br>


![Post-Image](cancerbigdata6.png)
_cBioPortal<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


![Post-Image](cancerbigdata7.png)
_cBioPortal<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


Prostate cancer 관련 유전자의 발현량 기반으로 검출된 변이를 살펴보는 예시입니다.
<br><br>


![Post-Image](cancerbigdata8.png)
_Prostate Cancer in cBioPortal<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


![Post-Image](cancerbigdata9.png)
_Prostate Cancer in cBioPortal<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


![Post-Image](cancerbigdata10.png)
_Prostate Cancer in cBioPortal<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


![Post-Image](cancerbigdata11.png)
_Prostate Cancer in cBioPortal<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


![Post-Image](cancerbigdata12.png)
_Prostate Cancer in cBioPortal<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


## Xena Browser
***

[Xena Browser](https://xenabrowser.net, "Xena Browser")는 TCGA 등에서 나온 데이터를 기반으로 비교적 쉽게 분석을 진행할 수 있는 사이트입니다.
<br><br>


![Post-Image](cancerbigdata13.png)
_Xena Browser<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


두 개의 study에서 KRAS 유전자의 발현량을 비교한 그래프입니다.
<br><br>


![Post-Image](cancerbigdata14.png)
_Xena Browser<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


## GDC Data Portal
***

[GDC Data Portal](https://portal.gdc.cancer.gov, "GDC Data Portal")은 TCGA 등의 대형 프로젝트 데이터를 확인, 다운로드, 분석할 수 있는 사이트입니다.
<br><br>

다음과 같이 TCGA, ICGC, PCAWG 등과 같은 국제 project에서 나온 다량의 데이터가 존재합니다.
<br><br>


![Post-Image](cancerbigdata15.png)
_TCGA, ICGC, PCAWG<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


Cancer research와 관련된 genomic databases와 주요 project에 투입된 인력, 비용입니다.
<br><br>


![Post-Image](cancerbigdata16.png)
_Genomic Databases in Cancer Research<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


![Post-Image](cancerbigdata17.png)
_Projects<br>
https://www.laidd.org/local/ubonline/view.php?id=195&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSVFQyU5NSU5NCslRUMlOUMlQTAlRUMlQTAlODQlRUMlQjIlQjQmZW5yb2xfc3RhcnQ9JmVucm9sX2VuZD0mc3R1ZHlfc3RhcnQ9JnN0dWR5X2VuZD0=_
<br><br>


## Take Home Message
***

* cBioPortal, USCS XenaBrowser, GDC Data Portal과 사용법을 알아보았습니다.

* 암 유전체 데이터의 특징과 데이터베이스를 학습했습니다.