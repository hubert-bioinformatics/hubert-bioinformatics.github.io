---
layout: post
title: WES Clinical Interpretaion II
date: 2022-07-26 11:32:23 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,NGS,WES,interpretation]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 서울대학교 의과대학 최무림 교수님의 [WES 기초편](https://www.edwith.org/wes-beginner/, "WES 기초편") 강의를 정리한 내용입니다.

## Intro
***

WES 분석을 통한 환자의 진단, 후속 단계에 대한 이해를 통하여 WES 분석의 효용성을 극대화 할 수 있음을 이해합니다. WES에 의한 진단률을 최대화 할 수 있는 방법을 제시합니다.
<br><br>


## Undiagnosed Disease by WES - US
***

![Post-Image](WES-UDN.png)
 _Undiagnosed Disease Network in US<br>
 www.edwith.org/wes-beginner_
<br><br>


UDN(Undiagnosed Disease Network)는 미국에서 진단이 어려운 환자들 대상으로 다양한 방법을 통해 진단하기 위해 노력하는 단체입니다. 601명의 환자들이 UDN을 통해 진단되었고 그 중 382명은 WES를 시행한 case입니다.

![Post-Image](WES-IDN2.png)
 _Undiagnosed Disease Network in US<br>
 www.edwith.org/wes-beginner_
<br><br>


382명 중 약 35% 환자가 진단받았는데, 그 중 8%는 WES 재분석을 통해 진단되었습니다. 참고로 환자 1명 당 UDN을 통한 진단 비용은 평균 18,903 USD 입니다.
<br><br>


## Practical Databases
***

WES 결과를 해석하는데 유용한 database들이 있습니다.

GeneMatcher는 앞서 다른 강의에서 본 것 처럼 협력/공동연구로 확장하는데 도움이 됩니다.

ClinVar는 submitted/published variants나 diseases를 검색할 수 있는 database입니다.

OMIM(Online Mendelian Inheritance in Man)은 gene과 disease의 관계를 확인할 수 있는 database입니다.
<br><br>


## WES 효율 최적화하기
***

WES를 통해 phenotype과 disease 사이 관계를 밝혀내는 것은 유용하지만 아직 문제가 되는 것은 진단률이 떨어진다는 사실입니다. 아래와 같은 내용이 원인입니다.

![Post-Image](WES-diagnosis.png)
 _진단률을 떨어뜨리는 원인<br>
 www.edwith.org/wes-beginner_
<br><br>


Sequencing, analysis와 관련된 technical issue가 있습니다.

기본적으로 symptom은 genetic origin이 아니며, 환자의 나이가 증가하면서 symptom이 변화하는 등 clinical issue가 있습니다.

마지막으로 variant의 존재는 확인했으나 어떤 function을 하는지 완전히 알지 못하는 genetic issue가 있습니다.

이런 issue를 극복하기 위해 WES re-analysis, WGS, RNA-seq 등을 시도할 수 있습니다. 이 때 각 방법의 장단점을 이해하고 얼마나 효율적인 결과를 가져올 수 있을지 충분히 예상한 뒤 시도하는 것이 좋습니다.
<br><br>


## Summary
***

* WES 발견은 환자들에게 다양한 범위의 혜택을 부여할 수 있습니다.
* 이후 GeneMatching, ClinVar, OMIM 등의 database 도움을 받을 수 있습니다.
* 적극적인 유전자 조절 약물 시도를 해볼 수 있습니다.
* WGS/RNA-seq 등의 방법도 적절하게 사용 가능합니다.