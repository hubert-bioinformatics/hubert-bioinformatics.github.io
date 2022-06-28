---
layout: post
title: ch7. Gambler's Ruin and Random Variables
date: 2022-06-28 21:25:30 +0900
published: true
math: true
categories: [Study, L-Statistics]
tags: [statistics,harbard,gambler's ruin,differece equation,random variable,bernoulli,binomial]
img_path: /assets/img/post/
---

## Intro
***

 Gambler's Ruin 문제를 계차방정식을 이용해 풀고, 확률변수의 정의를 이해할 수 있습니다.
 <br><br>


## Monty Hall Problem
***

 Monty Hall 문제는 Monty가 사회를 맡은 유명한 퀴즈쇼 프로그램입니다. 1, 2, 3번 3개의 문이 있고 그 뒤에 자동차 한 대, 염소 두 마리가 있습니다. 참가자는 우선 문 1개를 선택합니다. Monty는 나머지 2개 문 중 염소가 들어있는 한 개의 문을 엽니다. 그리고 참가자에게 선택을 변경할 수 있는 기회를 줍니다. 이 때 참가자는 선택을 변경하는 것이 유리할까요, 아니면 처음 선택을 유지하는 것이 유리할까요?
 <br><br>


## Monty Hall 풀이1: 수형도
***

 수형도를 그려서 확률을 계산해 볼 수 있습니다.

 ![Post-Image](Monty_Hall.png)
<br><br>


 참가자가 1번 문을 선택했다고 가정합시다. Monty는 염소가 들어있는 2번 문을 엽니다. 이 때 참가자가 선택을 변경하지 않으면 자동차가 있는 문을 고를 확률은 1/6(표준화하여 1/3)이 됩니다. 반대로 선택을 변경하면 확률은 1/3(표준화하여 2/3)이 됩니다. 선택을 변경하는 것이 자동차를 선택할 확률이 더 높습니다.
 <br><br>
 
 
## Monty Hall 풀이2: LOTP(Law of Total Probability)
***

 마찬가지로 참가자는 어떤 문 뒤에 자동차가 있는지 알기 원합니다. S는 참가자가 자동차가 있는 문을 선택하는 경우를 의미하며 Monty의 물음에 따라 항상 선택한 문을 변경한다고 가정합니다. $D_{j}, j \in 1,2,3$는 자동차가 존재하는 문 번호입니다. $P(S)$는 아래와 같이 계산할 수 있습니다.<br>

 $P(S) = P(S \mid D_{1})\frac{1}{3} + P(S \mid D_{2})\frac{1}{3} + P(S \mid D_{3})\frac{1}{3}$<br>
 
 자동차가 1번 문에 있다고 가정하면,<br>
 $= 0 + 1\frac{1}{3} + 1\frac{1}{3} = \frac{2}{3}$
 <br><br>
 
 
## Simpson's Paradox
***

 일부 부분에서 성립하는 대소관계는 전체로 보았을 때 역전될 수 있다는 역설입니다.

 심슨 가족이 사는 스프링필드에 Dr.Hibbert와 Dr.Nick 두 명의 의사가 있습니다. 이들은 심장수술과 반창고 시술 두 가지 서비스를 제공합니다. 100번을 시도했을 때 성공, 실패 횟수는 아래와 같습니다.

 <Dr.Hibbert>

| Header | Heart | Band aid |
| Success | 70 | 10 |
| Failure | 20 | 0 |


 <Dr.Nick>

| Header | Heart | Band aid |
| Success | 2 | 81 |
| Failure | 8 | 9 |


 Dr.Hibbert는 성공률이 80%이고 Dr.Nick은 83%로 전체 성공률은 더 높습니다. 하지만 난이도가 높은 심장 수술의 성공률을 보면 Dr.Hibbert가 더 높습니다. 
 
 위 상황을 수식으로 표현해 봅니다.

 A: 수술 성공

 B: Dr.Nick이 수술한 경우

 C: 심장 수술

 $P(A \mid B, C) < P(A \mid B^{c}, C)$

 $P(A \mid B, C^{c}) < P(A \mid B, C^{c})$

 $P(A \mid B) > P(A \mid B^{c})$

 수술의 종류(심장 수술($C$), 반찬고 시술($C^{c}$)를 고려했을 때, 모두 Dr.Hibbert가 시행한 경우($B^{c}$) 성공률이 더 높습니다.

 하지만 수술의 종류를 고려하지 않은 경우 Dr.Nick이 시행한 경우 성공률이 더 높습니다.

 여기에서 심장 수술($C$)을 confounder(교란변수)라고 합니다. 적절한 confounder에 의한 conditional probability를 확인하지 않으면 상황에 대한 그릇된 판단을 내릴 수도 있습니다.
 
 Simpson's paradox는 모두 위 식으로 표현할 수 있습니다.
 <br><br>


## IMO
***

 Monty hall 문제는 볼 때마다 헷갈렸는데 수형도를 통해 푸는 방법을 잘 기억해 두어야 겠습니다. Simpson's paradox의 개념도 잘 알아 두어야 겠습니다.