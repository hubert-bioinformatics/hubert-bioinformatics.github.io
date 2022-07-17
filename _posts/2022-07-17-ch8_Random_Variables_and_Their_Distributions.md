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


## 초기하분포(Hypergeometric)
***

 이항분포으로 착각하기 쉬운 초기하분포를 예제 문제를 통해 살펴보겠습니다.

 1. 카드 문제

    5장의 카드를 뽑았을 때 ACE 카드가 나올 확률

    $P(X=k) k \in {0, 1, 2, 3, 4}$

    = $\frac{\binom{4}{k} \binom{48}{5-k}}{\binom{52}{5}}$

    카드 첫 장을 뽑았을 때 ACE라면 비복원추출이므로 다음 카드를 뽑았을 때 ACE가 나올 확률은 감소합니다. 따라서 각 시행이 독립인 이항분포와 다른 분포입니다.

 2. Elk 문제

    산 속에 20마리의 elk가 있습니다. 5마리는 tag, 15마리는 untag 되어있습니다. 4마리를 잡았을 때 2마리가 tag되어 있을 확률은?

    역시 카드 문제와 마찬가지로 초기하분포를 따릅니다.

 3. 구슬 문제

    b개의 검정색 구슬과 w개의 흰색 구슬 중에서, n개의 표본을 무작위로 추출할 때 표본에 있는 흰색 구슬의 수는? 마찬가지로 초기하분포를 따릅니다.

    초기하분포라도 표본공간이 충분히 커서(예를 들어 구슬 10억개 중 10개를 뽑는 시행) 복원/비복원 여부가 큰 차이가 나지 않을 때, 초기하분포는 이항분포에 근사합니다.
    <br><br>


## IMO
***

 이항분포와 초기하분포를 살펴보고 그 차이점을 확인 했습니다.