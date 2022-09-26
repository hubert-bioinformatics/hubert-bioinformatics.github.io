---
layout: post
title: Variants Analysis
date: 2022-08-11 07:52:13 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,next generation sequencing,variant,calling]
img_path: /assets/img/post/
---

## Variants Types
***

DNA 서열에서 다양한 종류의 변이가 나타날 수 있으며, 일부 변이는 암, 유전성 질환과 연관되어 있습니다.

| Variants Types | Description |
| :---: | --- |
| Substitution - Missense | Coding region에서 nucleotide의 substitution으로 나타나는 variants. 그 결과 region이 coding하는 amino acid가 다른 amino acid로 바뀜 |
| Substitution - Nonsense | Coding region에서 nucleotide의 substitution으로 나타나는 variants. 그 결과 region이 coding하는 amino acid가 stop codon으로 바뀌고 protein의 기능에 영향을 줌 |
| Insertion | 한 개 이상의 nucleotides가 추가된 variants. 그 결과 protein이 적절한 기능을 하지 못하도록 영향을 줄 수 있음 |
| Deletion | 적어도 한 개 이상의 nucleotides가 삭제된 variants. 그 결과 protein이 적절한 기능을 하지 못하도록 영향을 줄 수 있음 |
| Deletion-Insertion(delins), Insertion-Deletion(indel) | Deletion과 Insertion이 같은 시간 같은 region에서 일어난 variants. 그 결과 protein이 적절한 기능을 하지 못하도록 영향을 줄 수 있음 |
| Duplication | 한 개 이상의 nucleotides가 복제되거나 반복되어 나타나는 variants. 그 결과 protein이 적절한 기능을 하지 못하도록 영향을 줄 수 있음 |
| Inversion | Original sequence 상에서 한 개 이상의 nucelotides가 reverse 방향으로 대체된 variants. |
| Frameshift | 한 개 이상의 nucleotides가 추가되거나 삭제되어 codon 서열을 변경시키는 variants. 그 결과 protein이 적절한 기능을 하지 못하도록 영향을 줄 수 있음 |

![Post-Image](Variants-missense.jpeg)
_Substitution - Missense<br>
https://medlineplus.gov/genetics/understanding/mutationsanddisorders/possiblemutations/_
<br><br>


![Post-Image](Variants-nonsense.jpeg)
_Substitution - Nonsense<br>
https://medlineplus.gov/genetics/understanding/mutationsanddisorders/possiblemutations/_
<br><br>


![Post-Image](Variants-insertion.jpeg)
_Insertion<br>
https://medlineplus.gov/genetics/understanding/mutationsanddisorders/possiblemutations/_
<br><br>


![Post-Image](Variants-deletion.jpeg)
_Deletion<br>
https://medlineplus.gov/genetics/understanding/mutationsanddisorders/possiblemutations/_
<br><br>


![Post-Image](Variants-duplication.jpeg)
_Duplication<br>
https://medlineplus.gov/genetics/understanding/mutationsanddisorders/possiblemutations/_
<br><br>


![Post-Image](Variants-frameshift.jpeg)
_Frameshift<br>
https://medlineplus.gov/genetics/understanding/mutationsanddisorders/possiblemutations/_
<br><br>


## Variants Error
***
![Post-Image](Variants-error.png)
_Variants Error<br>
https://www.edwith.org/ngs-data-variation/lecture/1382349?isDesc=false_
<br><br>


Reference genome과 다른 bases로 확인된 variants의 대부분이 사실 sequencer error입니다. 여기에서 최종 driver somatic mutations로 남는 variants를 선별하는 것은 까다로운 과정입니다. 따라서 처음에 called variants에서 sequencer error를 찾고 제거하는 과정은 매우 중요합니다.

Sequencer error를 제거하기 위해서 특정 region을 여러 번 반복해서 sequencing 합니다. 이를 정량화한 값을 read depth라고 부르는데, 특정 영역을 지나는 read의 수를 count한 값 입니다. 이처럼 특정 region을 반복해서 시퀀싱하면 sequencer error가 발견되더라도 이를 error로 분류할 가능성이 높아집니다.

또한 basecall error를 정량화한 수치인 [phred score](https://hubert-bioinformatics.github.io/posts/Phred_Score/, "phred score")를 사용하여 sequencer error를 찾아낼 수 있습니다. 이 수치는 basecall이 틀렸을 확률 e에 대해 $-10log_{10}$을 대입한 값을 의미합니다. 10, 20, 30, 40 값이 각각 basecall 틀렸을 확률 10%, 1%, 0.1% 0.01%를 의미합니다.

Mapping error를 정량화한 수치인 MapQ를 사용하여 mapping error를 가늠해 볼 수 있습니다. 마찬가지로 mapping이 틀렸을 확률 e에 대해 $-10log_{10}$을 대입한 값을 의미합니다. 예를 들어 하나의 read가 여러 곳에 mapping 될 수 있다면 e가 증가하는 등 여러가지 근거에 기반하여 MapQ를 계산합니다.
<br><br>


## Variants Calling
***

Variants error를 확인할 수 있는 수치들을 기반으로 sequencing 결과 관찰된 variants가 true positive인지 error인지 판단합니다. 아래와 같이 reference sequence가 T인 position에서 다섯 개의 read가 mapping된 상황을 가정해 봅니다. 네 개 read는 T, 한 개 read는 G이고 각각 basecall quality와 mapping quality가 표기되어 있습니다.
<br><br>


![Post-Image](Variants-genotyping.png)
_Variants Calling<br>
https://www.edwith.org/ngs-data-variation/lecture/1382349?isDesc=false_
<br><br>


사람의 genome은 diplod이므로 하나의 position에서 두 개의 allele이 존재합니다. A, T, C, G 네 개의 base가 있으므로 경우의 수를 따지면 총 16가지 조합이 가능합니다. Reference sequence와 동일할 때 A, 동일하지 않을 때 B라고 지칭하면 경우의 수는 4가지 조합으로 단순화 할 수 있습니다.
<br><br>


![Post-Image](Variants-genotyping2.png)
_Simplify Genotyping<br>
https://www.edwith.org/ngs-data-variation/lecture/1382349?isDesc=false_
<br><br>


다시 처음에 가정한 상황으로 돌아와서 genotyping을 단순화 했습니다. 이제 B가 true positive인지, 혹은 error로 인한 false positive인지 검증하는 단계입니다.
<br><br>


![Post-Image](Variants-genotyping3.png)
_Simplify Genotyping<br>
https://www.edwith.org/ngs-data-variation/lecture/1382349?isDesc=false_
<br><br>


여기부터 확률 개념이 사용됩니다. 사람의 유전체는 diploid이므로 해당 위치의 genotype은 AA or AB or BB 중 하나가 될 수 있습니다. Pr(G=AA) or Pr(G=AB) or Pr(G=BB) 중 가장 확률이 높은 genotype으로 추론하는 것이 바람직 합니다. 이 과정에 sqeuncing data를 활용할 수 있습니다. 즉, data가 주어졌을 때 각 genotype을 얻을 수 있는 확률은 Pr(G=AA|D) or Pr(G=AB|D) or Pr(G=BB|D)로 계산할 수 있습니다. 확률을 바로 계산하기 어려우므로 bayes rule을 활용합니다.
<br><br>


$$ Pr(G|D) = \frac{Pr(G,D)}{Pr(D)} \ \frac{Pr(D|G)Pr(G)}{Pr(D)}$$
<br><br>













## &nbsp;&nbsp;2nd Generation Sequencing: NGS
***

 NGS는 cloning이 필요없고 library fragment의 amplification과 sequencing이 동시다발적으로 진행되기 때문에 비용과 소요시간을 절감할 수 있습니다. 2세대 sequencing이라고도 불리는 NGS는 short DNA 가닥을 만들어 squencing 하는 것이 특징이며, Illumina의 HiSeq, NovaSeq과 Thermo Fisher Scientific의 Ion Torrent가 대표적인 기기입니다. 2010년 이후 비약적인 발전을 이루어 왔습니다.
 <br><br>


![Post-Image](SequencingTechnology-sequencerdevelopment.png)
_2010년 이후 주요 NGS 회사의 플랫폼 변화<br>
'Next Generation Sequencing 기반 유전자 검사의 이해(2019) -식품의약품안전처-_
<br><br>


 NGS는 clonal template 생성 방식에 따라 SBL(sequencing by ligation)과 SBS(sequencing by synthesis)로 나눌 수 있습니다.

 1. SBL(sequencing by ligation)

    Ligase와 Fluorescentyl labeled probe를 사용하여 sequence를 알아내는 방식입니다. 1~2bp 길이의 known base로 구성된 fluorescently labeled probe가 target DNA fragment에 결합한 뒤 인접한 2~10bp 길이의 oligonucleotide가 연결됩니다. 이 결합으로 인해 fluorescently labeled probe가 특정 spectrum의 빛을 방출하는데 이를 분석하여 base를 확인합니다.

    Life Technologies의 SOLiD(Sequencing by Oligonucleotide Ligation and Detection)와 Complete Genomics의 cPAL(combinatorial Probe-Anchor Ligation)이 SBL 방식의 대표적인 사례입니다.
    <br><br>


    ![Post-Image](SEQUENCING-SBL.jpg)
_Sequencing by ligation methods<br>
Goodwin, S., McPherson, J. & McCombie, W. Coming of age: ten years of next-generation sequencing technologies. Nat Rev Genet 17, 333–351 (2016). https://doi.org/10.1038/nrg.2016.49_
<br><br>


 2. SBS(sequencing by synthesis)

    DNA polymerase와 Fluorescentyl labeled base를 사용하여 sequence를 알아내는 방식입니다. SBS는 다시 CRT(cyclic reversible termination)와 SNA(single-nucleotide addition)로 나눌 수 있습니다.

    1. CRT(cyclic reversible termination)

        Sanger sequencing과 마찬가지로 3'-OH group이 막힌 deoxyribose를 사용합니다. DNA template의 adapter region에 primer가 결합한 뒤 polymerase가 달라붙습니다. 네 가지 종류의 dNTPs(deoxynucleotides)가 투입되고 그 중 DNA template에 상보적인 한 개의 dNTP가 결합합니다. 결합하지 못한 나머지 dNTPs는 wash-out 시킵니다. 각각의 cluster에 결합한 한 개의 dNTP에 붙어있던 flurophore가 떨어지면서 빛을 방출하고 이를 분석하여 sequence를 확인합니다.

        Illumina와 Qiagen의 sequencer가 CRT 방식의 대표적인 사례입니다.
        <br><br>


        ![Post-Image](SEQUENCING-SBS_CRT.jpg)
_Sequencing by synthesis: cycliv reversible termination approaches<br>
Goodwin, S., McPherson, J. & McCombie, W. Coming of age: ten years of next-generation sequencing technologies. Nat Rev Genet 17, 333–351 (2016). https://doi.org/10.1038/nrg.2016.49_
<br><br>


    2. SNA(single-nucleotide addition)

        CRT와 달리 한 번에 한 개의 dNTP를 투입하여 a single signal을 확인하는 방식입니다.

        454 Life Sciences의 pyrosequencing과 Thermo Fisher Scientific의 Ion Torrent가 SNA 방식의 대표적인 사례입니다.
        <br><br>


        ![Post-Image](SEQUENCING-SBS_SNA.jpg)
_Sequencing by synthesis: single-nucleotide addition approaches<br>
Goodwin, S., McPherson, J. & McCombie, W. Coming of age: ten years of next-generation sequencing technologies. Nat Rev Genet 17, 333–351 (2016). https://doi.org/10.1038/nrg.2016.49_
<br><br>


## &nbsp;&nbsp;3rd Generation Sequencing: Long-read Sequencing
***

 2nd generation sequencing의 단점인 short-read를 보완한 sequencer로 PCR amplification 없이 DNA strand의 real-time sequencing 방식을 통해 long-read를 한 번에 읽을 수 있습니다. Single base quality가 높지 않아서 한계가 있지만 점차 정확도를 높히면서 임상진단 분야로 확대하고 있습니다.

 크게 두 가지 종류로 나눌 수 있는데, SMRT(single-molecule real-time) sequencing과 synthetic 방식입니다.

 1. SMRT(Single-molecule long-read) sequencing

    현재 SMRT를 널리 사용하는 회사는 Pacific Biosciences입니다. SMRT는 특별한 flow cell을 사용하는데, ZMW(zero-mode waveguides)로 불리는 transparent bottoms를 지닌 picolitre 단위의 수 천 개 well이 존재합니다. Short-read SBS technology는 polymerase가 DNA를 따라서 움직이며 elongation이 진행되는 반면, PacBio는 DNA polymerase가 well 바닥에 고정되어 있고 DNA strand가 ZMW를 통과하며 sequence를 확인하는 방식입니다. Well은 단 한 개의 DNA strand만 통과 가능하며, dNTP가 결합하면서 방출하는 빛을 laser와 camera가 계속 확인합니다. 길이가 3kb 이상인 DNA는 어렵지만 그 이하의 DNA fragment는 여러 차례 반복해서 sequencing 될 수 있으며 CCS(circular consensus seqeunce)로 알려진 consensus read of insert를 생성합니다.

    2014년 Oxford Nanopore Technologies(ONT)에서 MinION을 발표했습니다. 다른 회사의 sequencer들은 빛, 색상, pH와 같은 secondary signal을 사용한 반면, nanopore는 naive ssDNA의 sequence를 직접 읽습니다.
    <br><br>


 2. Synthetic long-reads

    그동안 확인했던 다른 sequencing platforms와 달리 short-read seqeuncer로 생산한 read와 각 fragment에 부여된 barcode에 의존하여 synthetic long-read를 구현하는 방식입니다.

    Illumina의 synthetic long-read sequencing과 10X Genomics의 emulsio-based system이 대표적인 사례입니다.
    <br><br>


    ![Post-Image](SEQUENCING-Longread.jpg)
_Sequencing by synthesis: single-nucleotide addition approaches<br>
Goodwin, S., McPherson, J. & McCombie, W. Coming of age: ten years of next-generation sequencing technologies. Nat Rev Genet 17, 333–351 (2016). https://doi.org/10.1038/nrg.2016.49_
<br><br>


## &nbsp;&nbsp;NGS 장비의 장단점
***

 NGS sequencer마다 원리가 다르기 때문에 서로 다른 장단점을 가지고 있습니다. Illumina, Thermo Fisher Scientific으로 대표되는 2nd generation sequencing은 read length가 짧아서 정확도가 높고 SNP 검출에 유리하지만, structural variants 검출에는 취약합니다. 
 
 반면 PacBio, Oxford Nanopore Technologies로 대표되는 3rd generation sequencing은 long-read의 이점을 살려 de-novo assembly와 structural variants 검출에 유리하지만, 정확도가 낮고 SNV 검출에 취약합니다.
 <br><br>


![Post-Image](SEQUENCING-sequencer.png)
_NGS sequencer의 장단점<br>
'Next Generation Sequencing 기반 유전자 검사의 이해(2019) -식품의약품안전처-_
<br><br>


## Take Home Message
***

 DNA와 RNA의 구조는 molecular biology와 organic chemistry 수업 시간에 배운 기억이 있습니다. 당시에는 외워야하는 딱딱한 지식으로 생각했지만 DNA, RNA에서 일어나는 모든 화학반응과 NGS, bioinformatics 목적을 이해하기 위해서는 기본 구조를 잘 알아야 한다는 것을 다시 한 번 느꼈습니다. 또한 DNA replication과 protein 발현까지 진행되는 central dogma 원리를 알아야 중간에 문제가 발생해서 질병으로 이어지는 현상도 이해할 수 있습니다.

 Sequencing technology는 발전속도가 굉장히 빠른 분야입니다. 머지 않아 ssDNA를 짧은 시간 안에 저렴한 비용으로 sequencing 할 수 있는 시대가 찾아오지 않을까요?