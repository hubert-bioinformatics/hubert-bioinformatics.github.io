---
layout: post
title: Long Read Sequencing III - 유전체 크기 추정하기
date: 2023-07-07 11:35:10 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,pacbio,longread]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 서울대학교 박사 후 연구원 김준님의 [유전체 크기 추정하기](https://www.edwith.org/longread-seq-2023/lecture/1475110, "유전체 크기 추정하기")를 정리한 내용입니다.


## Intro
***

* 유전체 크기를 추정하는 다양한 방법에 대해 알아봅니다.

* 시퀀싱 데이터로부터 직접 유전체 크기를 추정해봅니다.

* 앞으로 강의에서 다루는 분석내용은 [STAR Protocols](https://star-protocols.cell.com/protocols/1799, "STAR Protocols")에 상세히 정리되어 있습니다.
<br><br>


## 유전체 크기 추정 - Wet 실험
***

유전체 크기를 추정해야 하는 이유는 다음과 같습니다.

1. 생산해야 할 총 시퀀싱 양 & 시퀀싱 비용 계산에 필요합니다.

2. 몇몇 genome assembler 작동시킬 때 option으로 넣어줘야 합니다.

3. 사람 같이 이미 알려진 종에서는 생략 가능합니다.
<br><br>


유전체 크기 단위는 C-value를 사용합니다.

haploid DNA 질량 1pg은 대략 haploid genome size 1Gb와 유사하다고 볼 수 있습니다.

1pg(haploid DNA 질량) ~= 1Gb(haploid genome size)

실험적인 방법으로 genome size를 추정하는 방법은 다음과 같습니다.

1. [형광 + flow cytometer](https://pubmed.ncbi.nlm.nih.gov/22065429, "형광 + flow cytometer")
    * 알려진 nucleus를 control로 삼고, 모르는 종의 nucleus 등을 뽑아 함께 염색합니다. 이후 형광 세기를 비교하여 genome size를 추정합니다.

2. [Single-copy gene + qPCR](https://WWW.ncbi.nlm.nih.gov/pmc/articles/PMC156059, "Single-copy gene + qPCR")
    * gDNA 추출 후 전체 질량 및 single-copy gene의 copy number를 측정합니다. 두 값을 활용하여 haploid genome size를 추정합니다.
<br><br>


## 유전체 크기 추정 - 알려진 DB
***


<br><br>


![Post-Image](longread6.png)
_유전체 지도 작성 과정<br>
https://www.edwith.org/longread-seq-2023/lecture/1475109_
<br><br>


Genome assembly 관점에서 각 시퀀싱 데이터의 특징과 용도를 알아봅니다.

Arima Hi-C, Bionano optical map은 longread까지는 아니고 long range sequencing으로 분류됩니다.

PacBio HiFi가 가장 정확도가 높고 고품질의 시퀀싱 데이터를 얻을 수 있습니다. Size selection을 거치므로 10kb~20kb의 길이로 데이터를 생산합니다.

ONT ultra-long은 정확도가 떨어지지만 가장 긴 길이의 데이터를 생산합니다.
<br><br>


![Post-Image](longread7.png)
_각 시퀀싱 데이터의 특징과 용도<br>
https://www.edwith.org/longread-seq-2023/lecture/1475109_
<br><br>


유전체 지도를 생산하는 보편적인 과정은 다음과 같습니다.

Longread를 이어붙여 contig를 생산한 뒤, 이러한 contig들을 이어붙여 scaffold를 생성합니다. 이 때, physical map/optical map/genetic map 등을 활용하여 contig의 순서 및 방향을 결정합니다. 이후 RAN-seq을 수행하여 exon 정보 등을 확인합니다.
<br><br>


![Post-Image](longread8.png)
_유전체 지도 생산 과정<br>
https://www.edwith.org/longread-seq-2023/lecture/1475109_
<br><br>


유전체 지도를 작성할 때 assembly가 잘 안되는 지역이 존재합니다.

* 짧은 반복서열이 매우 많은 지역(repeat)

* 엄청 거대한 서열이 2회 이상 반복되는 지역(segmental duplication)

* Heterozygosity가 문제될 정도로 큰 지역

* centromere: 작은 subunit이 수 Mb까지 반복되기도 합니다.

* Telomere & subtelomere: segmental duplication이 흔하게 관찰되는 지역입니다.
<br><br>


## 실제 사례
***

1. CHM13 사용한 human genome

['The complete sequence of a human genome'](https://www.science.org/doi/10.1126/science.abo5367, "The complete sequence of a human genome")는 2022년 publish된, 현재 가장 완성에 가까운 human genome reference입니다. 해당 논문은 CHM13 cell line을 활용하여 유전체 지도의 완성도를 높혔습니다.

CHM은 완전포상기태(Complete Hydatidiform Mole, CHM) 세포주를 의미하며, 효과적으로 haploid cell line을 제작하는데 사용되고 있습니다. DNA가 없는 난자에 DNA가 있는 정자를 투입하면 정자 DNA만 2배로 불어난 세포가 되고 이것이 곧 homozygous cell line을 의미합니다. CHM13 cell line의 경우 세포 안에 존재하는 한 쌍의 염색체가 거의 동일하며, 이와 관련된 내용이 논문 내에 기재되어 있습니다.
<br><br>


![Post-Image](longread9.png)
_CHM13 Cell Line<br>
https://www.edwith.org/longread-seq-2023/lecture/1475109_
<br><br>


해당 논문에서 기본 contig는 PacBio HiFi 리드를 사용하여 생산했습니다. 이를 사용하여 scaffold를 생산할 때 gap 영역은 N base로 채우는 것이 아니라 ONT ultra longread를 사용하여 시퀀스를 확인 했습니다.
<br><br>


![Post-Image](longread10.png)
_고품질 유전체 지도 생산 과정<br>
https://www.edwith.org/longread-seq-2023/lecture/1475109_
<br><br>


2. Human Pangenome Project

CHM cell line을 사용하여 유전체 지도를 만드는 과정에서 보다 scale up을 잘 할 수 있도록, 그리고 phasing을 잘되게 하는 것을 목적으로 하는 project입니다. Phasing은 모계에서 받은 DNA 정보, 부계에서 받은 DNA 정보를 나누는 과정입니다. PacBio HiFi + HiC + Strand-seq 등만 활용해도 diploid 개체의 유전체 정보 두 벌을 정확히 확인 가능합니다.

['The Human Pangenome Project: a global resource to map genomic diversity'](https://www.nature.com/articles/s41586-022-04601-8, "The Human Pangenome Project: a global resource to map genomic diversity")

['A draft human pangenome reference'](https://www.nature.com/articles/s41586-023-05896-x, "A draft human pangenome reference")
<br><br>


## Take Home Message
***

유전체 지도는 가장 고품질의 DNA 정보를 확보하는 과정입니다.

롱리드 사이에서 겹치는 부분을 활용해 contig를 만듭니다.

Physical/optical/henetic map 정보를 활용해 scaffold를 만듭니다.

RNA-seq 정보를 활용해 유전자 정보를 확보합니다.