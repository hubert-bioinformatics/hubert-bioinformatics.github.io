---
layout: post
title: Sequencing Techinologies
date: 2022-07-10 11:02:52 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,sanger sequencing,chip sequencing, next generation sequencing]
img_path: /assets/img/post/
---

## Sequencing 개요
***

 [about DNA](https://hubert-bioinformatics.github.io/posts/about_DNA/, "about DNA") post에서 DNA의 화학구조와 특성을 확인 했습니다. Sequencing의 목적은 pentose sugar의 1' carbon에 연결된 nitrogenous base의 순서를 확인하는 것임을 또한 확인 했습니다.
 <br><br>


![Post-Image](SEQUENCING-coseperraw.jpg)
_Sequencing cost per megabases - 2021<br>
https://www.genome.gov/about-genomics/fact-sheets/DNA-Sequencing-Costs-Data_
<br><br>


![Post-Image](SEQUENCING-coseperhuman.jpg)
_Sequencing cost per Human Genome data - 2021<br>
https://www.genome.gov/about-genomics/fact-sheets/DNA-Sequencing-Costs-Data_
<br><br>
 
 
 Technology는 단점을 보완하여 항상 발전합니다. Sequencing tech는 반도체 못지 않게 급격한 발전을 이룬 분야 중 하나입니다. 위 그림은 sequencing tech와 관련된 강의, 세미나의 첫 시간에 자주 언급되는 내용입니다. (마크로젠 PT 면접에서도 위 그림을 포함 했...) "Moore\'s Law"는 인텔의 Gordon Moore가 1965년 발표한 법칙으로, 반도체에 들어가는 transistor의 수가 24개월마다 2배 증가한다는 것입니다. 이와 비교해서 megabase당 sequencing 비용과 Human Genome seqeuncing 비용은 더 급격히 감소하고 있습니다. Y-axis가 log scale임을 감안할 때 가격의 하락폭은 훨씬 더 급격하다는 것을 알 수 있습니다. 대용량 sequencing capability를 가진 Illumina의 Novaseq이 2017년 출시하면서 비로소 1,000 dollars Human Genome era를 맞이하게 되었습니다. 1990년부터 2003년까지 진행된 The Human Genome Project가 13년의 시간, $3 bilion dollars(3조원)이 소요된 것과 비교하면 가히 놀라울 만한 발전을 이뤄냈습니다.
 <br><br>


## &nbsp;&nbsp;1st Generation Sequencing: Sanger Sequencing
***

![Post-Image](DNA-RNA.jpg)
_DNA와 RNA 비교_
<br><br>


 DNA
 
 또한 1st generation seqeuncing인 sanger sequencing부터 시작해서 3rd generation sequencing까지 발전을 거듭해오고 있습니다.

 DNA는 Deoxyribo Nucleic Acid의 약자로 생물의 유전정보를 담고 있는 물질 입니다. DNA는 transcription 과정을 거쳐 RNA(mRNA)로 변환되고, translation 과정을 거쳐 Protein을 생성하는데, 이것은 근육과 결합 조직, 피부 등의 구성요소로 작용할 뿐만 아니라 각종 효소를 생성하여 신체기능을 유지하도록 작용합니다.

 따라서 DNA는 유전정보를 다음 세대로 전달하는 도면으로 볼 수 있습니다. NGS 기술을 사용하여 정확한 DNA 서열을 알아내는 최종 목적은 결국 이 유전물질 정보를 밝혀내기 위함입니다.
 <br><br>


## DNA, RNA의 기본 구조
***

![Post-Image](DNA-RNA.jpg)
_DNA와 RNA 비교_
<br><br>


 DNA와 RNA를 비교한 그림입니다. 가장 먼저 눈에 띄는 차이는 기본 구조입니다. DNA는 double-helix로 불리는 구조를 가지며 두 가닥의 strand가 서로 꼬여 있습니다. 그리고 A-T, C-G가 서로 연결된 상보적인 서열로 구성되어 있습니다. 반면 RNA는 한 가닥의 strand로 이루어진 구조를 가지고, T 대신 U를 사용하여 U, T, C, G로 구성되어 있습니다. DNA, RNA 구조를 좀 더 확대해서 자세히 들여다 볼까요?
 <br><br>


## &nbsp;&nbsp;DNA와 RNA 구조 비교
***

![Post-Image](DNA-structure.jpg)
_DNA와 RNA 기본 구조_
<br><br>

 
 DNA, RNA의 기본 구조입니다. 다섯 개의 탄소로 구성된 pentose sugar에서 1번 탄소에 nitrogenous base, 5번 탄소에 phosphate group이 연결되어 있습니다.
 <br><br>


## &nbsp;&nbsp;Pentose Sugar
***
 
 DNA와 RNA의 차이는 pentose sugar의 2번 탄소에서 기인하는데, -OH가 붙으면 ribose로 불리는 RNA의 구조를 이루고, -H가 붙으면 ***deoxy***ribose로 불리는 DNA의 구조를 이룹니다. 보통 DNA에 비해 RNA가 불안정하다고 알려져 있는데 그 이유는 바로 -OH에 있습니다. 풍부한 전자를 가지고 있으므로 다른 원소와 화학반응을 잘 일으킵니다.
 <br><br>


## &nbsp;&nbsp;Phosphate Group
***

 Phosphate group은 nucleotide와 nucleoside를 구분 짓습니다. Phosphate group은 energy를 가지고 있으며 체내에서 에너지원으로 사용되는 ATP, ADP, AMP의 구조도 phosphate group과 연관 있습니다.
 <br><br>


![Post-Image](DNA-ATP.jpg)
_ATP, ADP, AMP_
<br><br>


## &nbsp;&nbsp;Nitrogenous Base
***
 
![Post-Image](DNA-base.jpg)
_Nitrogenous base_
<br><br>


 1번 탄소와 연결된 nitrogenous base는 질소(nitrogen)을 가진 이중고리 혹은 단일고리로 이루어진 base입니다. NGS 기술을 사용하여 시퀀싱하고 염기서열을 찾을 때 바로 이 base의 서열을 확인하는 것입니다. DNA는 A(adenine), T(thymine), C(cytosine), G(guanine)로 구성되어 있으며, RNA는 T 대신 U(uracil)로 구성되어 있습니다.

 Purine은 이중고리로 구성되어 있으며 A, G가 해당됩니다.

 Pyrimidine은 단일고리로 구성되어 있으며 C, T, U가 해당됩니다.
 <br><br>


## DNA Replication: 5' → 3'
***

![Post-Image](DNA-phosphodiester.jpg)
_DNA Replication_
<br><br>


 DNA replication은 항상 5'에서 3' 방향으로 진행합니다. 여기서 5'과 3'은 앞서 보셨던 DNA 구조에서 pentose sugar를 구성하는 carbon의 위치를 의미합니다. 즉, DNA는 항상 3번 탄소의 말단에서 template을 구성하는 base에 상보적인 nucleotide를 받아들여 새로운 결합을 형성하고 길이를 늘려갑니다.

 DNA polymerase는 DNA replication을 담당하는 enzyme입니다. 전자가 풍부한 3' hydroxyl group(-OH)가 incoming nucleotide의 triphosphate group을 공격합니다. 이 때 새로운 phosphodiester 결합이 형성되고 pyrophosphage group이 떨어져 나갑니다.

 5'에 phosphate group, 3'에 hydroxyl group이 위치하고 있기 때문에 DNA replication은 항상 5' → 3'의 방향성을 가집니다.
 <br><br>


## DNA Weight
***

 DNA basepair의 평균 weight는 650 doltons 입니다. 참고로 1 dolton은 hydrogen 원소 1개의 weight를 의미하며 $1.67 \times 10^{-24}$grams와 같습니다.

 Double-stranded DNA molecule의 weight는 전체 basepairs 숫자에 650 daltons를 곱한 결과입니다. DNA는 약 30억개 basepairs로 구성되므로

 $3.0 \times 10^{9}bp \times 650 Da = 1.95 \times 10^{12} Da$

 이 됩니다. 1 Da은 $1/(6.02 \times 10^{23})$g이므로,
 
 $1.95 \times 10^{12} \times 1/(6.02 \times 10^{23}) = 3.24 \times 10^{-12} grams$

 $= 3.24 pg (10^{-12} grams = a picoaram)$
 
 으로 계산할 수 있습니다.

 하나의 cell 안에 한 쌍의 염색체가 있으므로 total weight는 약 6.5pg입니다.

 그렇다면 1ng(a nanogram = 1,000 picogram)의 DNA에 들어있는 염색체 수는 몇 쌍일까요?

 1개 cell에 들어있는 염색체 weight는 6.5pg이므로,

 $1,000pg / 6.5pg = 153 cells$

 약 153개 cell과 그 안에 153쌍의 염색체가 들어있으므로 총 306개의 염색체가 있음을 역산할 수 있습니다.
 <br><br>


## Take Home Message
***

 DNA와 RNA의 구조는 molecular biology와 organic chemistry 수업 시간에 배운 기억이 있습니다. 당시에는 외워야하는 딱딱한 지식으로 생각했지만 DNA, RNA에서 일어나는 모든 화학반응과 NGS, bioinformatics 목적을 이해하기 위해서는 기본 구조를 잘 알아야 한다는 것을 다시 한 번 느꼈습니다. 또한 DNA replication과 protein 발현까지 진행되는 central dogma 원리를 알아야 중간에 문제가 발생해서 질병으로 이어지는 현상도 이해할 수 있습니다.