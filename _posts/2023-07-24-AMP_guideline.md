---
layout: post
title: AMP Guideline
date: 2023-07-24 07:10:04 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,AMP,cancer]
img_path: /assets/img/post/
---

## Intro
***

* AMP guideline에 대해 알아봅니다.
<br><br>


## AMP guideline
***

[AMP Guideline](https://doi.org/10.1016%2Fj.jmoldx.2016.10.002, "AMP Guideline")은 2017년 [AMP(Association for Molecular Pathology)](https://www.amp.org/, "AMP(Association for Molecular Pathology)")에서 발표한 NGS 변이 해석 가이드라인으로 ['Standards and Guidelines for thr Interpretation and Reporting of Sequence Variants in Cancer'](https://doi.org/10.1016%2Fj.jmoldx.2016.10.002, "'Standards and Guidelines for thr Interpretation and Reporting of Sequence Variants in Cancer'") 논문으로 발표했습니다. 논문의 내용을 살펴보며 AMP 가이드라인이 어떤 원리로 동작하고 어떤 규칙을 가지고 있는지 알아봅니다.
<br><br>


## Abstract
***

AMP 가이드라인은 다양한 그룹의 연구자들이 NGS로 검출된 somatic 변이에 대해 통일된 classification, annotation, interpretation, reporting convention을 정리하고 있습니다. 전문가들의 설문조사와 합의, 문헌 검토를 바탕으로 somatic 변이를 네 단계로 분류하는 4-tiered 시스템이 만들어 졌습니다.

    - tier I: variants with strong clinical significance
    - tier II: variants with potential clinical significance
    - tier III: variants of unknown clinical significance
    - tier IV: variants deemed benign or likely benign

Cancer genomics는 급격하게 발전하는 분야이므로, 치료, 진단, 혹은 예방과 관련된 변이의 임상적 중요도는 매번 재평가되어야 합니다. 유전적 변이는 AMP 가이드라인을 준수하여 리포팅 해야합니다. 임상적 권장사항은 간결해야 하며 조직학적 소견과 임상적 소견과 함께 연관되어야 합니다.

NGS 기술 발전으로 변이 분석에 들어가는 비용과 시간은 대폭 감소했습니다. 분석 가능한 변이도 SNVs(single-nucleotide variants) 뿐만 아니라 indels, CNVs(copy number variants), fusions까지 범위가 넓어졌습니다.

Tumor DNA, RNA에서 얻은 분자생물학적 profile은 암환자의 임상적 관리에 대한 가이드가 될 수 있습니다. 진단이나 예측에 필요한 정보를 제공할 수 있고, 가능한 치료방법이나 타겟 치료를 찾을 수 있도록 도움이 될 수 있습니다.

Tumor tissue 대상 실시하는 NGS 검사에 대한 광범위한 접근을 위해서 4주 동안 NGS technical 설문 조사와 NGS reporting 설문 조사를 실시했습니다. 결과는 아래와 같습니다.
<br><br>


![Post-Image](AMP1.png)
_NGS technical & reporting survey<br>
https://doi.org/10.1016%2Fj.jmoldx.2016.10.002_
<br><br>


본 가이드라인의 목적은 cancer 대상 NGS 검사결과로 검출된 변이의 classification, annotation, interpretation, reporting의 표준방식을 수립하기 위함입니다.
<br><br>


## Databases
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


## Levels of TCGA Data
***

TCGA data는 네 개 단계의 level로 구성되어 있는데, level 구분은 data processing 정도를 의미합니다. Level 1은 CEL 파일과 같은 rawdata이며 level 4는 annotation 정보까지 붙은 분석결과 data입니다. 보통 TCGA data를 활용할 때는 level 3의 data를 받아서 사용합니다.
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