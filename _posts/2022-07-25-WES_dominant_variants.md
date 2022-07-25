---
layout: post
title: WES Dominant Variants
date: 2022-07-25 11:42:19 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,NGS,WES,dominant]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 서울대학교 의과대학 최무림 교수님의 [WES 기초편](https://www.edwith.org/wes-beginner/, "WES 기초편") 강의를 정리한 내용입니다.

## Intro
***

De novo variant에 대해 이해하고 true/false call 여부를 판단할 수 있습니다. Trio-based WES 데이터에서 dominant pattern으로 유전되는 variants를 탐색합니다.
<br><br>


## Trio-based Mendelian Disorder Research
***

![Post-Image](WES-trio.png)
 _Trio-based Mendelian Disorder<br>
 www.edwith.org/wes-beginner_
<br><br>


1번 pedigree는 부모 한 쪽에 dominant variant를 가지고 있어서 자녀에게도 disease가 유전된 경우를 보여주고 있습니다.

2번 pedigree는 부모 모두 하나의 allele에 variant를 가지고 있는 보인자 상태이고 자녀에게 variant를 가진 allele들이 유전되어 disease가 발현된 경우를 보여주고 있습니다.

3번 pedigree는 부모 모두 variant가 없고 정상이지만 자녀에게서 dominant variant가 발생하여 disease가 발현된 경우를 보여주고 있습니다.

1번, 3번 pedigree는 dominant variants 경우를, 2번은 recessive variants 경우를 보여주고 있습니다.
<br><br>


## De novo Variants
***

![Post-Image](WES-denovovariant.png)
 _De novo Variants<br>
 www.edwith.org/wes-beginner_
<br><br>


생식세포에서 variants가 발생하면 그림에서와 같이 세 가지 case 중 하나로 귀결됩니다. 생존에 위협이 되는 등 deleterious case에 해당한다면 negative selection에 의해서 사라지게 됩니다. 반면 advantageous case에 해당한다면 positive selection에 의해서 대대로 유전되게 됩니다. 북유럽 인종에서 lactase(lactose를 분해할 수 있는 효소)를 분비하도록 variants가 발생했는데 오늘날 대부분의 북유럽 사람들이 lactase를 분비하는 것이 하나의 advantageous case 예시입니다.

![Post-Image](WES-denovovariant2.png)
 _De novo Variants<br>
 www.edwith.org/wes-beginner_
<br><br>


앞서 본 그림에서와 같이 de novo variants를 표현한 pedigree 입니다. 1번, 2번 case는 충분히 true de novo variants로 추정할 수 있습니다. 2번의 Mom:AA에서 확인된 1개의 alt allele은 illumina sequencer의 error로 감안할 수 있습니다. 하지만 3번은 Mom, Dad, Offspring 모두에서 소수의 alt allele이 확인되었고 mismapping에 의한 false call로 추정할 수 있습니다. 4번은 low coverage로 인해(최소 10x 이상 권장) false call로 추정할 수 있습니다.
<br><br>


## Call De novo Variants
***

어떤 variants가 de novo variants인지 판단하는 기준은 크게 두 가지로 나타낼 수 있습니다.

1. Inheritance pattern에 따른 filtering

    앞서 본 trio-based de novo variants에서 세 번째 pedigree에 해당하는 경우입니다. 즉, 부모에게서는 disease와 variants가 없는데 자녀에게서 variants가 존재하고 disease로 발병한 case입니다.

2. Variant's annotation information에 따른 filtering

    * Effect of variants: missense, nonsense, frameshift, splicing variant와 같은 effect를 가진 경우 pathogenic variants일 가능성이 높습니다.
    * Amino acid conservarion score: 진화적인 관점에서 서로 다른 종이더라도 비슷한 역할을 하는 protein sequence는 서로 유사성(homology)를 가집니다. 일반적으로 중요한 기능을 수행하는 region의 amino acid는 conserved sequence로 되어 있는 경우가 많습니다. 따라서 amino acid conservation score가 높을수록 해당 variants가 deleterious case일 가능성이 높습니다.
    * Variant's allele frequency in healthy population: 건강한 사람들이 가지고 있는 variants는 disease를 유발할 가능성이 낮습니다. AF < 0.001 기준으로 variants를 filtering 할 수 있습니다. 관련된 database로 '1000 Genome', 'ExAC', 'gnomAD' 등이 존재합니다.
    * OMIM information: Variants가 특정 disease의 원인으로 보고되었는지 확인할 수 있습니다. 관련된 database로 'OMIM'이 있습니다.
<br><br>


## Summary
***

* De novo variants는 Mendelian Disorder의 주요 원인 variants 입니다.
* De novo variants calling 과정 동안 false call을 줄이는 것이 중요합니다.