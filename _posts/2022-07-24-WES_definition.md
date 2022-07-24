---
layout: post
title: WES - 개념과 유전학적 의의
date: 2022-07-24 21:21:40 +0900
published: true
math: true
categories: [Bioinformatics,NGS]
tags: [bioinformatics,NGS,WES]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 서울대학교 의과대학 최무림 교수님의 ['WES 기초편'](www.edwith.org/wes-beginner, "WES 기초편") 강의를 정리한 내용입니다.

## Intro
***

WES의 개념, 역사, 장단점, 실험적 과정, 의학유전학적 의의를 이해합니다.
<br><br>


## WES의 개념
***

WES는 target sequencing의 한 종류입니다. Protein coding region은 human genome의 약 1% 정도를 차지하고 있습니다. 그에 반면 실제 질병을 유발하는 변이의 약 75%가 coding region에 포함됩니다. 따라서 WES는 경제적, 시간적으로 분석 효율성이 높은 방식이라고 할 수 있습니다.

Human genome에 관련된 몇 가지 유전학 내용을 먼저 알아봅시다.

1. \# of bases in human genome?

   3 billion bases, 약 30억 bases

2. \# of (coding) genes in human genome?

   20,000개

3. \# of bases in (coding) genes?

   30 million bases, 약 3,000만 개

   coding region은 약 1%

4. \# of variants in human genome? (compared to what?)

   3 million, 약 300만 개

   human reference genome과 비교하여 약 1,000 bases 당 1개 variants가 존재하는 것으로 알려져 있습니다.

5. \# of variants in coding genes?

   0.3 million, 약 3만 개

   coding region은 약 1%

6. \# of variants that change proteins?

   15,000개 

7. \# of variants that change proteins and rare?

   200개

   nomad와 같은 MAF database들의 variants 제외하면 rare variants는 약 200개

8. \# of variants that are specific to yourself?

   부모로부터 유전된 variants까지 모두 제거하면 count 가능
<br><br>


## WES의 장단점
***

1. 장점
   1. cost: 비용이 WGS에 비해 저렴합니다.
   2. small data size: 상대적으로 분석하기 용이합니다.

2. 단점
   1. Does not cover non-coding regions
   2. Not all genes are covered
   3. Low sensitivity toward structural variations
   4. Variable coverage pattern
<br><br>


## WES Process
***

![Post-Image](WES-process.png)
 _WES Process<br>
 www.edwith.org/wes-beginner_
<br><br>


WES는 그림과 같은 process를 따라 진행합니다.

1. Shear: DNA를 잘게 자릅니다.
2. Hybridize: Human exon에 선택적으로 결합하는 kit를 사용하여 exon만 선별합니다.
3. Wash/elute: Exon만 남기고 나머지 region은 씻어 버립니다.
4. Sequencing: Exon 영역을 sequencing 합니다.
5. Computational pipeline: WES 분석을 진행한 뒤 disease associated novel variants를 찾아냅니다.
<br><br>


## WES 유전학적 의의
***

![Post-Image](WES-use.png)
 _WES 유전학적 의의<br>
 www.edwith.org/wes-beginner_
<br><br>


2015년 논문에 발표된 내용에 따르면 human genes의 약 52%가 Mendelian phenotypes와 어떻게 연결되는지 알 수 없었습니다.

하지만 2020년 OMIM database 내용에 따르면 그 숫자가 약 30%로 감소 했습니다.

예전보다 human genome과 phenotype 사이 더 많은 사실관계를 확인한 것입니다.
<br><br>


![Post-Image](WES-use2.png)
 _WES 발전과 MC 증가<br>
 www.edwith.org/wes-beginner_
<br><br>


1990년대 sequencing 기술이 발전하면서 human genes-Mendelian condition의 상관관계 뿐만이 아니라 new Mendelian condition 발견도 증가했습니다. 특히 WES 방식이 널리 사용되면서 그 숫자는 폭발적으로 증가했습니다.

뿐만 아니라 과거에는 전통적인 방식으로 human genes를 확인했다면 2010년 이후에는 NGS가 그 방식을 대체하고 있습니다.
<br><br>


![Post-Image](WES-use3.png)
 _WES의 유전학적 의의<br>
 www.edwith.org/wes-beginner_
<br><br>


위 그래프에서 보는 것과 같이 WES의 사용은 new novel gene 확인 속도를 증가시켰습니다. 또한 과거에는 pheotype으로부터 시작하여 syndrome을 확인했다면, 현재는 genotype으로부터 syndrome을 확인하는 방식으로 변화했습니다. 즉, 수 천명의 환자를 대상으로 WES를 시행한 뒤 genotype을 가지고 syndrome과의 관계를 연구하는 것입니다.
<br><br>


## Summary
***

* WES는 protein coding region인 exon의 선택적 시퀀싱 분석을 가능케 하는 기법입니다.
* WES는 낮은 가격과 적은 데이터라는 장점으로 효율적인 질환 유발 변이 발견을 할 수 있게 합니다.
* 최근 10년간 약 천 여건의 질환 유발 유전자 발견을 선도해 왔습니다.