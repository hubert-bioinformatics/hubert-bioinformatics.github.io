---
layout: post
title: PRS(Polygenic Risk Score)
date: 2023-07-17 07:10:20 +0900
published: true
math: true
categories: [Bioinformatics, Biology]
tags: [BI,bioinformatics,PRS]
img_path: /assets/img/post/
---

본 post는 BROAD INSTITUTE의 [Polygenic Scores](http://polygenicscores.org/explained/, "Polygenic Scores") 사이트를 정리한 내용입니다.


## PRS(Polygenic Risk Score)
***

PRS는 한 사람의 유전정보에 근거하여 특정 질환의 위험도를 예측하는데 사용하는 score 입니다.

특정 질환 발병위험에 대한 유전적 배경지식을 아는 것은 당신의 건강과 관련된 중요한 결정을 하는데 도움을 줄 수 있습니다.
<br><br>


## Genetic Variation
***

모든 사람은 부모에게서 유전된 유전정보를 가지고 있습니다. 유전정보는 units of information으로 구성되어 있는데, 신체가 기능하는데 필요한 정보를 담고 있습니다.
<br><br>


![Post-Image](PRS1.png)
_Unit of information<br>
http://polygenicscores.org/explained/_
<br><br>


개인 간 비교했을 때 대부분 유전정보는 동일하고 일부에서만 차이가 나는데, 이를 genetic variants라고 일컫습니다.
<br><br>


![Post-Image](PRS2.png)
_Genetic variants<br>
http://polygenicscores.org/explained/_
<br><br>


Genetic variants는 eye color, height, taste preferences와 같이 개인을 unique하게 만드는 trait 형성에 기여합니다.
<br><br>


![Post-Image](PRS3.png)
_Genetic variants<br>
http://polygenicscores.org/explained/_
<br><br>


Genetic variants는 또한 특정 질병의 발병 위험도에 영향을 줄 수도 있는데, 이를 risk variants라고 일컫습니다.
<br><br>


![Post-Image](PRS4.png)
_Risk variants<br>
http://polygenicscores.org/explained/_
<br><br>


## Risk Variants
***

특정 질병의 위험도를 높히는 risk variants를 찾기 위해서, 연구자들은 해당 질병을 가진 사람들과 정상 사람들의 유전정보를 비교합니다.
<br><br>


![Post-Image](PRS5.png)
_Discovering risk variants<br>
http://polygenicscores.org/explained/_
<br><br>


만약 해당 질병을 가진 사람들에게서 더 빈번하게 나타나는 genetic variants는 해당 질병의 발병 위험도 증가와 연관되어 있다고 추정할 수 있습니다.
<br><br>


![Post-Image](PRS6.png)
_Discovering risk variants<br>
http://polygenicscores.org/explained/_
<br><br>


만약 해당 질병을 가지지 않은 정상 사람들에게서 더 빈번하게 나타나는 genetic variants는 해당 질병의 발병 위험도 감소와 연관되어 있다고 추정할 수 있습니다.
<br><br>


![Post-Image](PRS7.png)
_Discovering risk variants<br>
http://polygenicscores.org/explained/_
<br><br>


이처럼 risk variants는 한 사람에게서 특정 질병의 발병 위험도를 증가시키거나 감소시킬 수 있습니다.

그리고 각각 risk variant는 서로 다른 크기의 영향력을 가지고 있습니다. 일부는 위험도에 큰 영향력을 가지고, 일부는 작은 영향력을 가집니다.

또한 하나의 risk variant는 상대적으로 작은 영향력을 가지지만, 그 숫자가 늘어날수록 상대적으로 더 큰 영향력을 가집니다.
<br><br>


![Post-Image](PRS8.png)
_Different Impact of Risk Variants<br>
http://polygenicscores.org/explained/_
<br><br>


Polygenic score는 모든 risk variants가 지니는 영향력을 한 번에 계산하고 특정 질병에 대한 개인의 발병 위험도를 예측하는데 사용하는 지표입니다.
<br><br>


## Polygenic Score Calculation
***

특정 질병에 대한 개인의 polygenic score를 계산하기 위해서 연구자들은 risk-increasing variants와 risk-decresing variants의 전체 숫자와 영향력 정도를 합산합니다.
<br><br>


![Post-Image](PRS9.png)
_Polygenic Score Calculation<br>
http://polygenicscores.org/explained/_
<br><br>


Polygenic score는 특정 질병에 대해 다른 사람들과 비교해서 대상자의 위험도가 어느 정도인지 알려줍니다.
<br><br>


![Post-Image](PRS10.png)
_Polygenic Score Calculation<br>
http://polygenicscores.org/explained/_
<br><br>


연구자들은 전체 population에 대해서 polygenic score를 확인할 수 있습니다.
<br><br>


![Post-Image](PRS11.png)
_Polygenic Score Calculation<br>
http://polygenicscores.org/explained/_
<br><br>


개인이 가지고 있는 risk-increasing variants와 risk-decreasing variants의 숫자, 그리고 각 varinat가 지니는 영향력에 따라 상대적으로 높거나 혹은 낮은 polygenic score를 나타냅니다.
<br><br>


![Post-Image](PRS12.png)
_Polygenic Score Calculation<br>
http://polygenicscores.org/explained/_
<br><br>


거의 같은 개수의 risk-increasing variants와 risk-decreasing variants를 가지는 사람은 해당 질병의 발병 위험도가 평균 수준이라고 볼 수 있습니다.
<br><br>


![Post-Image](PRS13.png)
_Polygenic Score Calculation<br>
http://polygenicscores.org/explained/_
<br><br>


더 많은 개수의 risk-increasing variants를 가지는 사람은 해당 질병의 발병 위험도가 상대적으로 더 높은 수준이라고 볼 수 있습니다.
<br><br>


![Post-Image](PRS14.png)
_Polygenic Score Calculation<br>
http://polygenicscores.org/explained/_
<br><br>


더 많은 개수의 risk-decreasing variants를 가지는 사람은 해당 질병의 발병 위험도가 상대적으로 더 낮은 수준이라고 볼 수 있습니다.
<br><br>


![Post-Image](PRS15.png)
_Polygenic Score Calculation<br>
http://polygenicscores.org/explained/_
<br><br>


## Polygenic Score Interpretation
***

대부분 사람들은 질병의 발병 위험도가 평균 수준입니다.
<br><br>


![Post-Image](PRS16.png)
_Polygenic Score Interpretation<br>
http://polygenicscores.org/explained/_
<br><br>


Polygenic score가 평균보다 높다는 것은 대부분 사람들과 비교해서 해당 질병의 발병 위험도가 증가 되었음을 의미합니다.

만약 polygenic score가 95th percentile이라면, 질병의 발병 위험도가 95%라는 의미가 아닙니다.

100명 중 95명보다 더 높은 polygenic score라는 의미인 동시에 5명과 같거나 더 낮은 polygenic score라는 의미입니다.
<br><br>


![Post-Image](PRS17.png)
_Polygenic Score Interpretation<br>
http://polygenicscores.org/explained/_
<br><br>


Polygenic score가 평균보다 낮다는 것은 대부분 사람들과 비교해서 해당 질병의 발병 위험도가 감소 되었음을 의미합니다.

만약 polygenic score가 5th percentile이라면, 질병의 발병 위험도가 5%라는 의미가 아닙니다.

100명 중 5명보다 더 높은 polygenic score라는 의미인 동시에 95명과 같거나 더 낮은 polygenic score라는 의미입니다.
<br><br>


![Post-Image](PRS18.png)
_Polygenic Score Interpretation<br>
http://polygenicscores.org/explained/_
<br><br>


## DNA is not destinu - additional factors influence your risk
***

Polygenic score는 개인이 가지고 태어난 유전정보만을 바탕으로 계산된 지표입니다.

아무리 열심히 노력해도 polygenic score를 바꿀 수 없지만, 건강한 식습관과 생활습관, 금연 등의 노력으로 발병 위험도를 줄일 수는 있습니다.
<br><br>