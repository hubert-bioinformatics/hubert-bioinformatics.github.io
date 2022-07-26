---
layout: post
title: WES Clinical Interpretaion I
date: 2022-07-26 08:13:52 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,NGS,WES,interpretation]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 서울대학교 의과대학 최무림 교수님의 [WES 기초편](https://www.edwith.org/wes-beginner/, "WES 기초편") 강의를 정리한 내용입니다.

## Intro
***

WES 분석 전 환자의 임상 정보를 이해합니다. 환자의 임상 자료에서 WES 분석에 필요한 정보를 획득합니다. Known/Novel/Unknown case로 구분하여 실제 WES 결과와 비교합니다.
<br><br>


## Diagnostic Yield of WES
***

![Post-Image](WES-interpretation1.png)
 _1,000 Mendelian Disorder Patients from Saudi Arabia<br>
 www.edwith.org/wes-beginner_
<br><br>


Saudi Arabia에서 수행된 1,000명의 환자 대상으로 gene panel과 WES 분석을 수행한 결과입니다. Gene panel보다 WES에서 positive가 더 많이 나온 것을 알 수 있습니다. 또한 Positive case에서 recessive variants가 2/3정도를 차지하는데, Saudi Arabia는 중동에 위치하며 근친혼이 많이 일어나고 있으므로 recessive variants가 다수를 차지함을 추정해 볼 수 있습니다.

![Post-Image](WES-interpretation2.png)
 _1,000 Mendelian Disorder Patients from Germany<br>
 www.edwith.org/wes-beginner_
<br><br>


Germany에서 수행된 1,000명의 환자 대상으로 WES 분석을 수행한 결과입니다. HPO는 human phenotype ontology의 약자로 환자의 phenotype들을 모아놓은 term입니다. 그래프에서 환자의 phenotype 숫자가 증가할수록 positive case도 증가함을 볼 수 있습니다. 이유로는 첫째로 다양한 phenotype을 보이면서 더 심각한 증상을 보이는 환자가 유전적으로 disease를 물려받아 나타날 가능성이 크기 때문입니다. 둘째로 하나의 phenotype을 가진 환자보다는 다양한 phenotype을 가진 환자가 상대적으로 연구결과가 많으므로 positive case로 판정할 수 있는 기회도 늘어나기 때문입니다.

따라서 환자에 대한 풍부한 임상자료가 존재할 때, 그리고 더 심각한 증상을 가지고 있을 때 WES의 genotype 결과와 mendelian disorder를 연결짓는데 성공할 가능성이 높다는 것을 알 수 있습니다. 
<br><br>


## 진단률을 향상시키려면?
***

![Post-Image](WES-interpretation3.png)
 _진단률을 향상시키기 위한 방법<br>
 www.edwith.org/wes-beginner_
<br><br>


분석 방법을 확장시킬 수 있습니다. 왼쪽 그래프를 보시면 mitochondrial variants, breakpoint analysis 등 분석 방법을 확장해서 약 4.2% positive case가 증가한 것을 확인할 수 있습니다.

또한 재분석을 할 수 있습니다. 오른쪽 그래프를 보시면 2014년 분석결과와 비교해서 2017년 분석결과의 diagnostic 숫자가 증가한 것을 볼 수 있습니다. 시간이 지나면서 분석 파이프라인과 database가 업그레이드 되어 향상된 결과를 가져올 수 있습니다.

![Post-Image](WES-interpretation4.png)
 _진단률을 향상시키기 위한 방법<br>
 www.edwith.org/wes-beginner_
<br><br>


또한 WGS를 수행할 수 있습니다. 하지만 효율성이 떨어집니다. WES로 진단하지 못한 108명 환자 중 WGS로 진단한 환자는 3명 이었습니다. 이는 WES 재분석을 통해 추가 진단한 4명과 비교해서 효율성이 떨어집니다.

RNA-seq을 통해서 추가로 진단에 성공한 환자가 일부 있습니다. RNA-seq도 진단에 도움을 줄 수 있습니다.
<br><br>


## Known Cases
***

WES 분석을 통해 기존에 알려진 병인 genes 혹은 variants를 발견하여 질병 원인을 명확히 밝힌 경우를 알아봅시다.

![Post-Image](WES-interpretation5.png)
 _Known Case 1: 임상정보<br>
 www.edwith.org/wes-beginner_
<br><br>


32개월 남아입니다. 관찰되는 임상적 symptoms를 이해하는 것이 중요합니다. 이전 테스트 결과들도 이해하는 것이 중요합니다. 이 자료들을 토대로 diagnostic이 어려운 상태이므로 WES를 진행하고 분석합니다.

![Post-Image](WES-interpretation6.png)
 _Known Case 1: WES 분석결과<br>
 www.edwith.org/wes-beginner_
<br><br>


2개의 de novo variants, 1개의 homozygous variants, 2개의 hemizygous variants가 확인됩니다. DHDH gene의 homozygous variants를 보면 mom은 ref homo, dad는 hetero 결과를 보입니다. 두 가지 가설을 생각해 볼 수 있는데, 첫째는 mom에서 alt allele에 deletion이 일어난 경우입니다. 둘째는 mom의 난자에서 de novo variant가 생성되고 mom의 alt allele과 dad의 alt allele이 만나서 자녀의 homozygous variant가 발생한 경우입니다. 확률적으로는 전자의 가능성이 더 높습니다.
다섯 개 vairnats 중 MRAS gene의 de novo variant가 임상적으로 Noonan syndrome과 연관되어 있음이 확인되었습니다. 이는 previous test에서 Noonan gene test 결과와 같고 관련된 symptoms도 확인됩니다. 또한 MRAS gene이 Noonan syndrome과 연관되어 있다는 논문도 추가로 확인됩니다. 따라서 환자는 Noonan syndrome으로 진단할 수 있습니다.
<br><br>


## Novel/Unknown Cases
***

Known case에서 candidate variants 및 genes이 나왔을 때, disease와의 관계나 과거 연구결과가 없다면 novel case가 됩니다. 이 때 GeneMatching을 통해 후속 협력/공동 연구가 진행된다면 novel case, 진행되지 않는다면 unknown case로 분류됩니다.
<br><br>


## Summary
***

* Known case는 환자 특이적 de novo 혹은 recessive variants가 비슷한 증상을 보이는 patients에게서 기존 보고가 되어 있을 경우(OMIM, 논문 등)에 해당합니다.
* 유전학, 다양한 분야의 생물학, 의학적인 시직을 통합하여 병인이 되는 variants를 탐색할 수 있어야 합니다.
* 적극적인 sequencing, 국제 공동연구가 활발히 일어나야 합니다.