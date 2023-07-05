---
layout: post
title: Long Read Sequencing I - Introduction
date: 2023-07-06 07:23:33 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,pacbio,longread]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 서울대학교 박사 후 연구원 김준님의 [롱리드 시퀀싱 개요](https://www.edwith.org/longread-seq-2023/lecture/1475107, "롱리드 시퀀싱 개요")를 정리한 내용입니다.


## Intro
***

* 시권싱 기법과 이를 활용한 생물학 연구 방법론에 대해 알아봅니다.

* 롱리드 시퀀싱과 기존 숏리드 시퀀싱 기법의 차이를 알아봅니다.

* 롱리드 시퀀싱 기법을 활용한 생물학 연구 방법론 개요를 이해합니다.
<br><br>


## 시퀀싱 기법
***

생물학은 그 어떤 과학 분야보다 많은 양의 데이터를 생산하는 거대 과학으로 자리 잡고 있습니다. 시퀀싱을 통해서 매년 다른 분야를 능가하는 양의 데이터를 생산하고 있습니다.
<br><br>


![Post-Image](longread1.png)
_Data Size of Genomics<br>
https://www.edwith.org/longread-seq-2023/lecture/1475107_
<br><br>


시퀀싱을 하는 궁극적인 목적은 변이(variation)를 찾아내기 위함입니다. 변이는 특정 개체의 DNA를 시퀀싱하여 서열정보를 확인한 뒤 해당 개체의 reference 대비 변화된 서열정보 입니다.

생체 내 분자들 중 DNA와 RNA는 다량으로 복제하여 시퀀싱하고 서열정보를 알아낼 수 잇는 방법론이 잘 갖춰져 있기때문에 오늘날 시퀀싱이 보편화 되었습니다.
<br><br>


## 시퀀싱 데이터 살펴보기
***

시퀀싱은 DNA 등의 생체 분자 정보를 사람이 읽을 수 있는 형태로 변환하는 과정입니다. 환자 집단과 비환자 집단 등을 비교함으로써 변이를 확보할 수 있습니다.

시퀀싱 데이터는 문자로 표현한 FASTA/Q 포맷으로 나타냅니다.

* FASTA
    * '>': read/contig/chromosome 등의 정보
    * 그 외: A/T/C/G로 이루어진 실제 시퀀스 정보

* FASTQ
    * line1('@'): read/contig/chromosome 등의 정보
    * line2: A/T/C/G로 이루어진 실제 시퀀스 정보
    * line3('+'): 추가 정보
    * line4: 각 base의 quality 정보(Q-score0)
<br><br>


![Post-Image](longread2.png)
_FASTA, FASTQ<br>
https://www.edwith.org/longread-seq-2023/lecture/1475107_
<br><br>


시퀀싱 방법에 따라, DNA/RNA 분자의 한쪽 끝(Single-end) 또는 양쪽 끝(Paired-end)에서 진행할 수 있습니다.

* Single-end: DNA/RNA 분자의 시퀀싱 정보가 한 개의 파일에 저장됩니다.

* Paired-end: DNA/RNA 분자의 시퀀싱 정보가 두 개의 파일에 저장됩니다.
<br><br>


그 외 다양한 생물학 데이터 포맷이 존재합니다.

* SAM/BAM: read alignment 정보를 담은 파일

* VCF: variant 정보를 담은 파일

* BED: 특정 구간의 정보를 담은 파일

* GTF/GFF: genome annotation 정보를 담은 파일 (repeat, gene, variant, etc)

* GFA: 여러 fragment의 sequence와 overlap 정보 등을 담은 파일. genome assembly 등에 많이 사용됨
<br><br>


## 시퀀싱 데이터 사용
***

* 변이 확인(variant calling)
    * 기존에 확보되어 있는 유전체 지도(genome assembly)에 유전체 정보를 담고 잇는 짧은 리드를 검색하는 방식으로 변이를 확인할 수 있습니다.
<br><br>


![Post-Image](longread3.png)
_Variant Calling<br>
https://www.edwith.org/longread-seq-2023/lecture/1475107_
<br><br>


## 롱리드 시퀀싱
***

롱리드 시퀀싱을 사용하는 이유 중 하나는, 리드 길이가 짧으면 복잡한 구조 변이(SV)를 찾아내는 것이 매우 어렵기 때문입니다.

롱리드 시퀀싱은 한 번에 더 긴 길이의 리드를 생산하며, 이들을 이어붙임(assembly)으로써 보다 정교한 SV 분석이 가능해집니다.
<br><br>


![Post-Image](longread4.png)
_Longread Sequencing for SV analysis<br>
https://www.edwith.org/longread-seq-2023/lecture/1475107_
<br><br>


롱리드 시퀀싱을 활용하면 full-length transcript 정보를 확보할 수 있고 기존에 밝혀지지 않은 유전자 동형 분석은 물론 정량적 비교도 가능합니다.
<br><br>


![Post-Image](longread5.png)
_Longread Sequencing for isoform analysis<br>
https://www.edwith.org/longread-seq-2023/lecture/1475107_
<br><br>


롱리드 시퀀싱은 PCR 없이 가능하기 때문에 분자에 존재하는 화학적 변형(DNA/RNA modification)도 분석할 수 있습니다.
<br><br>


## Take Home Message
***

시퀀싱 기법을 활용한 데이터 생산 덕분에 생물학은 가장 거대한 데이터 과학 중 하나로 자리매김 하고 있습니다.

DNA/RNA에 담긴 변이 정보는 물론 해당 분자의 정량적 정보를 확보할 수 있게 되면서 다양한 생물학 연구가 가능해졌습니다.

롱리드 시퀀싱은 PCR 없이도 단분자에서 한 번에 더 긴 DNA/RNA 정보를 확보할 수 있게 해줍니다.

이는 high-quality genome assembly, novel isoform detection, DNA/RNA modification 정보 등을 확보할 수 있게 합니다.