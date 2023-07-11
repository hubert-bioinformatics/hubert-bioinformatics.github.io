---
layout: post
title: Long Read Sequencing V - Assembly Quality 확인
date: 2023-07-11 07:52:52 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,pacbio,longread]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 서울대학교 박사 후 연구원 김준님의 [Assembly Quality 확인](https://www.edwith.org/longread-seq-2023/lecture/1475113, "Assembly Quality 확인")를 정리한 내용입니다.


## Intro
***

* Assembly quality 확인하는 기본적인 방법들을 알아봅니다.

* 간단한 visualization 스크립트를 익힙니다.
<br><br>


## Assembly Quality란?
***

유전체 지도의 품질을 반영하는 지표들이 몇 가지 존재합니다.

1. Contiguity: 얼마나 잘 이어졌는지 반영하는 지표입니다.

    1. contig-level: contig가 길면 길수록 좋습니다.

    2. gene-level: known gene이 많이 잡히면 잡힐수록 좋습니다.

    3. chromosome: chromosome 수준으로 잘 조립되었는지 가늠하는 지표입니다.

2. Assembly error: 각 수준에서의 error가 적으면 적을수록 좋습니다.

    1. base-level

    2. contig-level(mis-assembly)

    3. scaffold-level(mis-joining)
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