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
***

선형성을 이용하여 다음과 같이 기댓값을 구할 수 있습니다.

E(X+Y) = E(X) + E(Y)
E(cX) = cE(X)

X, Y가 dependent 하더라도 성립합니다.

이항 확률변수의 기댓값도 선형성을 이용하여 구할 수 있습니다.

$X = X_{1} + ... + X_{n}$

$X_{i}$는 각각 베르누이 시행일 때, 

$E(X) = n \times E{X_{1}} = np$

로 계산할 수 있습니다.
<br><br>


## 기하분포
***

Geom(p): 여러 번의 베르누이 독립 시행에서 첫 번째 성공할 때까지 실패한 횟수

확률질량함수를 구해봅시다.

PMF: $P(X=k) = q^{k}p, k \in \{0,1,2,...\}$

기하분포의 기댓값을 구해봅시다.

1. 정의에 의한 방법

   $E(X) = \Sigma_{k=0}^{\infin}kpq^{k}$

   = $p\Sigma_{k=1}^{\infin}kq^{k}$

   = $\frac{pq}{p^{2}}$

   = $\frac{q}{p}$

2. Storyproof

   c = E(X)

   $c = 0 \times p + (1 + c) \times q$

   = $q + cq$

   = $\frac{q}{1-q} = \frac{q}{p}$
   <br><br>


## IMO
***

기대값을 구하는 과정을 알아보는 시간이었습니다. 선형성이 중요한 개념임을 다시 한 번 확인 했습니다.