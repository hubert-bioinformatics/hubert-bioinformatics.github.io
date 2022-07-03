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


## Gambler's Ruin
***

 A, B 두 명의 gambler가 내기를 합니다. 매 round에서 \$ 1를 걸고 내기에서 이긴 사람이 가져갑니다. A는 \$ i, B는 \$ (N-i)를 가지고 시작합니다.

 p = A가 이길 확률

 q = B가 이길 확률 = 1-p
 <br><br>


## Random Walk
***

 위 문제는 유형을 파악하는 것이 중요합니다. 이와 같은 유형의 문제는 random walk로 정의할 수 있습니다.

 ![Post-Image](GamblesRuin-gambler.png)
<br><br>


 p는 오른쪽으로 이동할 확률, q는 왼쪽으로 이동할 확률입니다. 0, N은 absorbing state로 갇힌 상태입니다.
 <br><br>

 Strategy: Condition on first step<br>

 $P_{i} = P(A wins game \bar A starts at \$ i)$<br>

 $P_{i} = p*P_{i+1} + q*P_{i-1}, (1 < \leq i \leq N-1), (p_{0}=0, p_{N}=1)$<br>

 문제를 해결하는데 가장 중요한 식입니다. Difference qeuation(계차방정식)이라고 부르며 미분방정식의 이산 형태입니다.

 Guessing을 통한 풀이<br>

 $P_{i} = x^{i}$<br>

 $x^{i} = px^{i+1} + qx^{i-1}$<br>

 $px^{2} - x + q = 0$<br>

 $x = \frac{1 \pm \sqrt{1 - 4pq}}{2p} \in \{1,\frac{q}{p}\}$<br><br>


 1. 두 해가 다른 경우($p \neq q$)<br>
 두 해의 선형결합 식으로 표현할 수 있습니다.<br>
 $p_{i} = A*1^{i} + B*(\frac{q}{p})^{i}, (p \neq q)$<br>
 조건 $p_{0}=0, p_{N}=1$을 대입하면,<br>
 $p_{0} = A + B = 0, B = -A$<br>
 $p_{N} = A + B(\frac{q}{p})^{N} = A(1 - (\frac{q}{p})^{N}) = 1$<br>
 $A = \frac{1}{1 - (\frac{q}{p})^{N}}$<br>
 $p_{i} = \frac{1 - (\frac{q}{p})^{i}}{1 - (\frac{q}{p})^{N-1}}, (p \neq q)$<br><br>

 2. 두 해가 같은 경우($p = q$)<br>
 $x = \frac{q}{p}$로 치환하고 $x \to 1$의 극한을 살펴봅니다.<br>
 $\lim_{x \to 1} \frac{1-x^{i}}{1-x^{N}} = \lim_{x \to 1} \frac{i(x^{i-1})}{N(x^{N-1})} = \frac{i}{N}$<br><br>

 카지노(A)와 gambler(B)가 같은 돈을 가지고 시작했을 때 카지노에게 1%라도 유리한 게임인 경우 gambler가 이길 확률은 매우 작아집니다.

 $i = N-i, p=0.49$<br>
 $N=20 \to 0.40$<br>
 $N=100 \to 0.12$<br>
 $N=200 \to 0.02$<br>
 
## Random Variable(확률변수)
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