---
layout: post
title: Variants Analysis VI - Cancer Immunotherapy
date: 2022-11-03 08:12:21 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,variant,cancer,immune,immunotherapy]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 연세대학교 의과대학 김상우 교수님의 [NGS 데이터 분석 기초 강의](https://www.edwith.org/ngs-data-variation/joinLectures/356132, "NGS 데이터 분석 기초 강의")를 정리한 내용입니다.


## Intro
***

NGS를 이용하여 cancer immune analysis에 대해 알아봅니다. Cancer immune 및 면역항암의 기초, TMB(tumor mutation burden), HLA 및 HLA 변이, neoantigen 분석 등을 알아봅니다.
<br><br>


## Cancer Immunotherapy
***

기본 개념은 host의 immune system을 cancer 제거하는 방향으로 가이드하는 것입니다.
<br><br>


![Post-Image](Variants-immune1.png)
_Adaptive Immunity and T-cell Activation<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


사람의 몸에 침입한 antigen은 antigen-presenting cell에 의하여 우리 몸이 침입을 감지하고 대응할 수 있도록 알리는 역할을 합니다. Cytotoxic T-cell이 직접 antigen을 공격하는 동시에 helper T-cell이 B-cell로 하여금 antibody를 생성, 배출하도록 리드합니다. 또한 memory T-cell로 하여금 적응면역을 갖도록 합니다.
<br><br>


![Post-Image](Variants-immune2.png)
_Tumor Antigen<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


이러한 immune system을 활용하여 tumor cell을 제거하기 위해서는, normal cell에는  존재하지 않고 tumor cell에만 존재하는 specific antigen을 목표로 삼는 것이 좋습니다. TSA(Tumor Specific Antigen)는 tumor cell에 특이적인 antigen을 의미하며, TAA(Tumor Associated Antigen)는 일부 normal cell에도 존재하지만 대부분 tumor cell에서 나타나는 antigen을 의미합니다.
<br><br>


![Post-Image](Variants-immune3.png)
_Benefits from Cancer Immunotherapy<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


Immunotherapy는 chemotherapy, genomically targeted therapy와 비교해서 환자의 생존률 향상의 효과를 보입니다. 두 가지 함께 사용하면 효과가 증가하므로 궁극적으로는 이러한 치료방법을 함께 사용하여 환자의 생존률을 높이는데 목적이 있습니다.
<br><br>


## TMB (Tumor Mutation Burden)
***
Immunotherapy의 효과를 예측하거나 대상자를 선정할 때, 가장 좋은 방법은 환자가 immunotherapy의 target antigen(neoantigen)을 얼마나 가지고 있는지 확인하는 것입니다. 하지만 neoantigen만 동정하는 것이 쉽지 않으므로 이를 가늠할 수 있는 보조지표로 TMB를 활용할 수 있습니다.
<br><br>


![Post-Image](Variants-immune4.png)
_Who can benefit from checkpoint inhibitor?<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


B figure에서 100개 이상의 mutations를 가진 환자가 100개 미만 mutations를 가진 환자에 비해 치료결과 생존률이 더 높은 것을 확인할 수 있습니다.
<br><br>


![Post-Image](Variants-immune5.png)
_TMB - from Hopes to Doubts<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


TMB는 유용한 지표가 될 수 있지만 TMB를 구할 때, 해석할 때 주의해야 합니다. 어느 정도 score를 기준으로 high/low를 구분해야 하는지, TMB score를 다시 분석해도 재현 가능한지, panel의 target gene region에 대한 depth가 uniform한지 등을 유의해야 합니다.
<br><br>


## HLA Typing in the Antigen Processing
***

![Post-Image](Variants-immune6.png)
_Neoantigen Processing<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


Neoantigen에 의해 어떻게 immune system이 작동하는지 보여주는 그림입니다. Somatic mutation이 AA 변형을 가져와 proteasome에 의해 protein이 degradation 됩니다. 이 때 생성된 neopeptides가 ER로 들어가서 specific하게 MHC와 결합합니다. peptide-MHC는 golgi를 거쳐 cell membrane에 presenting되고 T-cell에 의해 인지되어 immune system이 작동합니다.
<br><br>


![Post-Image](Variants-immune7.png)
_HLA (Human Leukocyte Antigen)<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


HLA gene은 6p21.31 위치에 뭉쳐서 존재하고 있습니다. Class I은 cytotoxic T-cell, CD8 T-cell의 immunogenicity를 제공하는 gene들로 구성되어 있습니다. Class II는 helper T-cell, CD4 T-cell의 immunogenicity를 제공하는 gene들로 구성되어 있습니다.

HLA gene은 다른 gene에 비해 훨씬 더 많은 polymorphism을 가지고 있습니다. 즉, 사람마다 HLA gene의 allele이 다르고 그 종류가 매우 여러가지 이므로 사람에 따라서 immunogenicity를 가질 수도 있고 가지지 않을 수도 있습니다.
<br><br>


![Post-Image](Variants-immune8.png)
_HLA Alleles are Ethnic Specific<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


인종마다, 지역마다 사람의 HLA allele은 매우 다양한 분포를 보입니다. HLA 변이는 약속된 표기법을 따르는데 gene, allele group, specific HLA protein 등의 정보를 담고 있습니다.
<br><br>


![Post-Image](Variants-immune9.png)
_HLA Typing Methods<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


과거에는 실험적 방법이나 sanger sequencing, microarray와 유사한 방식은 sequence-specific oligonucleotide hybridization 등의 방법을 사용했습니다.

NGS 방식으로도 분석이 가능한데 다음과 같은 장단점이 있습니다.

1. Pros

    1. Use of (already) produced NGS-data
    2. No extra-cost
    3. Fast

2. Cons

    1. Short-read
    2. HLA genes are GC-rich: lower-sequencing coverage
    <br><br>


![Post-Image](Variants-immune10.png)
_NGS-based HLA Typing Tools<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


Assembly 방식과 alignment 방식의 analysis tool이 존재합니다.
<br><br>


## MHC Binding and Immunogenicity
***
Neoantigen이 MHC와 결합할지 여부는 경우의 수가 매우 많고 mutation이 존재할 수 있으므로 예측이 매우 어렵습니다.
<br><br>


![Post-Image](Variants-immune11.png)
_Prediction Algorithm<br>
https://www.edwith.org/ngs-data-variation/joinLectures/356132_
<br><br>


따라서 PSSM, SVM, HMM 등 기계학습을 이용하여 이미 알려진 antigen, MHC set data을 통해 학습하고 immunogenicity를 예측하는 알고리즘을 만들기 위한 노력들이 이어지고 있습니다.




1. Tumor Mutation Burden (TMB)
    
    Cacner cell에 존재하는 non-synonymous somatic mutations 수를 의미합니다. Cancer type마다 서로 다른 TMB 경향을 보이는 것을 알 수 있습니다.
    <br><br>
    

    ![Post-Image](Variants-cancer3.png)
    _Tumor Mutation Burden<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


2. Microsatellite Instability (MSI)

    Impaired DNA mismatch repair (MMR)의 결과로 발생하는 genetic hypermutability 현상을 의미합니다. 아래 그림과 같이 repeat 영역에서 replication이 진행될 때 1base 이상 차이가 날 수 있는데 이로 인하여 mutation이 발생하는 case 입니다.
    <br><br>


    ![Post-Image](Variants-cancer4.png)
    _Microsatellite Instability<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


3. Mutational Signature

    Mutation이 발생한 pattern을 의미하며, 환자의 분류, 치료에 사용할 수 있는 지표입니다. 보통 특정 position에서 발생할 수 있는 SNP 경우의 수(6 cases: C>A, C>G, C>T, T>A, T>C, T>G)와 1bp 앞뒤로 발생할 수 있는 각각 4 cases를 종합하여 총 96 cases (=6*4*4)가 존재합니다.
    <br><br>


    ![Post-Image](Variants-cancer5.png)
    _Mutational Signature<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


    이러한 mutational signature의 상대적인 pattern을 연구하고 어떤 mutagen에 의해 발생했는지 연구하여 21가지 pattern을 발표했습니다.
    <br><br>


    ![Post-Image](Variants-cancer6.png)
    _Mutational Signature<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


4. Mutation Landscape

    Mutation의 종류와 어떤 gene에서 발생했는지, 그리고 frequency 등을 한 번에 볼 수 있는 plot 입니다.
    <br><br>


    ![Post-Image](Variants-cancer7.png)
    _Mutational Signature<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


5. Hotspot Positions (lollipop plot)

    Mutations가 모여있는 hotspot position을 확인할 수 있는 lollipop plot 입니다. Mutation이 gene의 어느 곳에 몰려있는지, 혹은 넓게 흝어져 있는지 한 눈에 파악할 수 있습니다.
    <br><br>


    ![Post-Image](Variants-cancer8.png)
    _Mutational Signature<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


6. Mutation Specificity

    각 pathoway와 연관된 gene에서 발생하는 mutation 비율을 정리한 plot 입니다. Red box처럼 다양한 cancer type에서 발견되는 pathway가 있는가하면, blue box처럼 특정 cancer type에서 발견되는 pathway가 있음을 확인할 수 있습니다.
    <br><br>


    ![Post-Image](Variants-cancer9.png)
    _Mutational Signature<br>
    https://www.edwith.org/ngs-data-variation/joinLectures/356132_
    <br><br>


## Take Home Message
***

Cancer genome analysis에 NGS를 적용하면 많은 정보를 알아낼 수 있습니다. Cancer related mutations type, 수, 특성, 발병 원인, subgroup, 중요한 gene의 mutation 등의 정보가 해당합니다. 