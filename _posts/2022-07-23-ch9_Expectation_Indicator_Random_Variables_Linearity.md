---
layout: post
title: ch9. Expectation, Indicator Random Variables, Linearity
date: 2022-07-23 23:10:32 +0900
published: true
math: true
categories: [Study, L-Statistics]
tags: [statistics,harbard,CDF,expectation,linearity]
img_path: /assets/img/post/
---

## Intro
***

누적분포함수를 이용하여 특정 사건의 확률과 기댓값을 구하는 방법을 알고, 지시확률변수 및 선형성을 이용하여 기댓값을 구할 수 있습니다.
<br><br>


## 누적분포함수 (CDF)
***

누적분포함수는 세 가지 속성을 가지고 있습니다.

1. increasing(증가함수)
2. right continuous (우연속함수)
3. $F(X) \to 0 as X \to -\infin$, $F(X) \to 1 as X \to \infin$
<br><br>


## 독립확률변수
***

모든 x, y에 대해서 $P(X \leq x, Y \leq y) = P(X=x)P(Y=y)$ 가 성립할 때, 확률변수 X, Y가 독립이라고 합니다.
<br><br>


## 평균을 구하는 방법
***

확률변수는 우리가 모르는 값임을 앞서 확인했습니다. 확률변수의 평균을 구하기 앞서 일반적인 수들의 평균 구하는 방법을 알아봅니다.

1. Unweighted average: 모든 숫자를 더해서 개수로 나눠주는 방식입니다.

   예시) 1, 2, 3, 4, 5

   $\frac{1+2+3+4+5}{6}$

2. Weighted average(가중평균): 가중치를 부여하여 평균을 구하는 방식입니다.

   예시) 1, 1, 1, 1, 1, 3, 3, 5

   $\frac{5}{8} \times 1 + \frac{2}{8} \times 3 + \frac{1}{8} \times 5$
   <br><br>


## 이산확률변수의 평균 (기댓값)
***

Weighted average 구하는 방식을 적용하여 이산확률변수의 평균(기댓값)을 구할 수 있습니다.

$E(X) = \Sigma{x} X\times P(X=x)$

$= \Sigma 값 \times 확률질량함수$

이에 대한 예시들을 살펴봅니다.
<br><br>


## 베르누이 확률변수의 기댓값
***

X~Bern(p)

베르누이 확률변수의 기댓값은 다음과 같습니다.

$E(X) = 1 \times P(X=1) + 0 \times P(X=0) = P$

여기에서 X는 사건 A가 발생한 경우 확률이 1, 그 외의 경우 확률이 0입니다.

$E(X) = P(A)$

로 표현할 수 있고, X는 indicator random variable(지시확률변수)로 볼 수 있습니다.
<br><br>


## 이항 확률분포의 기댓값
***

X~Bin(n,p)

이항분포 확률변수의 기댓값은 다음과 같습니다.

$E(X) = \Sigma_{k=1}^{n}k\begin{pmatrix}
n\\
k\\
\end{pmatrix}p^{k}q^{n-k}$

$=\Sigma_{k=1}^{n}n\begin{pmatrix}
n-1\\
k-1\\
\end{pmatrix}p^{k}q^{n-k}$

(j = k-1)

$=np\Sigma_{k=1}^{n}n\begin{pmatrix}
n-1\\
j\\
\end{pmatrix}p^{j}q^{n-1-j}$

이항정리에 의하여

$=np$

꽤 성가신 계산 과정이었습니다. 이보다 간단히 풀어낼 수 있는데 바로 기댓값의 가장 유용한 속성인 linearity를 이용하는 것입니다.
<br><br>


## Linearity (선형성)

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