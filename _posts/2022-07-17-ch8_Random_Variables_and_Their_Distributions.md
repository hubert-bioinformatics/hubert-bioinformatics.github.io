---
layout: post
title: ch8. Random Variables and Their Distributions
date: 2022-07-17 14:21:58 +0900
published: true
math: true
categories: [Study, L-Statistics]
tags: [statistics,harbard,PMF,CDF]
img_path: /assets/img/post/
---

## Intro
***

 확률분포를 해석하는 세 가지 접근방식을 이해하고 적용할 수 있습니다. 이항분포, 초기하분포를 이해합니다.
 <br><br>


## 이항분포 복습
***

 Bin(n, p) | 모두 n(양의 정수), p([0, 1] 사이의 값, 확률)에 의해서 분포가 결정됩니다.

 이항분포를 해석하는 세 가지 방법이 있습니다. 이 중 첫 번째 방법은 가장 중요합니다.

 1. Story

    X is #successes in n independent Bern(p)


 2. 지시확률변수(indicator random variables)

    $X = X_{1} + X_{2} + ... + X_{n}$

    $X_{1}, X_{2}, ..., X_{n} ~iid Bern(p)$

    $X_{j}$ = 성공인 경우 1, 실패인 경우 0


 3. 확률질량함수(PMF)

    $P(X=k) = \binom{n}{k} p^{k}(1-p)^{n-k}$
    <br><br>


## Random Variables
***

 조약돌 세계관에서 7번 조약돌은 하나의 사건이자 그 사건을 지칭하는 번호입니다.

 X=7, is an event.
 <br><br>


## 누적분포함수(CDF)
***

 CDF(Cummulative distribution function)

 $X \leqq x$ is an event.

 $F(x) = P(X \leqq x)$

 일 때 F를 CDF of X라고 정의합니다.


## 두 이항분포의 합에 대한 분포
***

 지난 시간 마지막 부분에서 다뤘던 두 이항분포의 합에 대한 분포를 위에서 정의한 세 가지 접근방식에 따라 알아봅니다.

 X~Bin(n,p), Y~Bin(m,p), X와 Y가 independent일 때 X+Y~Bin(n+m, p)를 따릅니다.

 1. Story

    Binomial 분포를 따르는 두 개의 확률변수 X, Y의 성공하는 횟수는 각 확률변수 X, Y에서 성공하는 횟수를 더한 것과 같습니다.

 2. 지시확률변수(indicator random variables)

    $X = X_{1} + X_{2} + ... + X_{n}$

    $Y = Y_{1} + Y_{2} + ... + Y_{n}$

    → $X + Y = \sum_{j=1}^{n}X_{j} + \sum_{j=1}^{m}Y_{j}$

    n+m의 분포는 Bin(n+m, p)를 따릅니다.

 3. PMF

    $P(X+Y=k) = \sum_{j=0}^{k}P(X+Y=k | X=j)P(X=j)$

    = $\sum_{j=0}^{k}P(Y=k-j | X=j) \binom{n}{j}p^{j}q^{n-j}$

    = $\sum_{j=0}^{k} \binom{m}{k-j}p^{k-j}q^{m-k+j} \binom{n}{j}p^{j}q^{n-j}$

    = $p^{k}q^{m+n-k} \sum^{k}_{j=0} \binom{n}{j}$

    = $p^{k}q^{m+n-k} \binom{m+n}{k}$



## Random Walk
***

 위 문제는 유형을 파악하는 것이 중요합니다. 이와 같은 유형의 문제는 random walk로 정의할 수 있습니다.

 ![Post-Image](GamblesRuin-gambler.png)
<br><br>


 p는 오른쪽으로 이동할 확률, q는 왼쪽으로 이동할 확률입니다. 0, N은 absorbing state로 갇힌 상태입니다.
 <br><br>

 Strategy: Condition on first step<br>

 $P_{i} = P(A wins game \mid A starts at i dollar)$<br>

 $P_{i} = pP_{i+1} + qP_{i-1}$, $(1 \leq i \leq N-1)$, $(p_{0}=0, p_{N}=1)$<br>

 문제를 해결하는데 가장 중요한 식입니다. Difference qeuation(계차방정식)이라고 부르며 미분방정식의 이산 형태입니다.

 Guessing을 통한 풀이<br>

 $P_{i} = x^{i}$<br>

 $x^{i} = px^{i+1} + qx^{i-1}$<br>

 $px^{2} - x + q = 0$<br>

 $x = \frac{1 \pm \sqrt{1 - 4pq}}{2p} \in \{1,\frac{q}{p}\}$<br><br>


 1. 두 해가 다른 경우($p \neq q$)<br>
 두 해의 선형결합 식으로 표현할 수 있습니다.<br>
 $p_{i} = A1^{i} + B(\frac{q}{p})^{i}, (p \neq q)$<br>
 조건 $p_{0} = 0, p_{N} = 1$을 대입하면,<br>
 $p_{0} = A + B = 0$$, B = -A$<br>
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
 
## Random Variables (확률변수)
***

 우선 확률변수의 정의를 알아봅시다. 확률변수는 function입니다. 이 function은 표본공간 S로부터 실수 체계 R로 mapping합니다.

![Post-Image](GamblesRuin-randomvariable.png)
<br><br>

 쉽고 중요한 예제들을 살펴봅니다.

 1. Bernoulli (베르누이) 확률분포<br>
 A random variable X is said to have Bernoulli(p) distribution, if X has only 2 possible values, 0 and 1<br>
 P(X=1) = p<br>
 P(X=0) = 1-P<br>

 2. Binomial (이항) 확률분포 (n,p)<br>
 The distribution of #success X in n independent Bernoulli(p) trials is called Binomial(n,p), its distribution is given by <br>
 $P(X=k) = \binom{n}{k} p^{k}(1-p)^{n-k}$<br>
 이 식은 PMF(확률질량변수)라고 합니다.<br>
 X~Bin(n,p), Y~Bin(m,p), X와 Y가 independent일 때 X+Y~Bin(n+m, p)를 따릅니다.
 <br><br>


## IMO
***

 Difference equation(계차방정식)을 다루는 곳이 거의 없는데 중요한 개념으로 보입니다. 베르누이분포, 이항분포를 시작으로 확률변수 분포가 나오는데 잘 정리해야 겠습니다.