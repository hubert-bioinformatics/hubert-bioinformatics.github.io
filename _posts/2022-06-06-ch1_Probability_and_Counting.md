---
layout: post
title: ch1. Probability and Counting
date: 2022-06-06 21:03:21 +0900
published: true
math: true
categories: [Study, L-Statistics]
tags: [statistics,harbard,sample space,event,probability,counting,binomial coefficient]
img_path: /assets/img/post/
---

## Intro
***

 확률의 기초 용어(표본공간과 사건, 셈 원리)를 이해하고 적용할 수 있습니다.
 <br><br>


## Statistics (통계학)
***

 Statistics is the logic of uncertainty.

 확률은 불확실성을 계량화하는 것을 가능하게 해줍니다.
 <br><br>


## Sample Space (S, 표본공간)
***

 **A sample space** is the set of all possible outcomes of an experiment.

 표본공간은 어떤 실험에서 가능한 모든 경우의 집합을 의미합니다.
 <br><br>


## Event (A, 사건)
***

 **An event** is a subset of the sample space.
 <br><br>


## Probability (P, 확률)
***

 확률의 간단한 정의는 아래와 같습니다.

 $P(A) = \frac{count of favorable outcomes}{count of possible outcomes}$

 여기서 내포하고 있는 두 가지 가정이 있습니다. 항상 이 가정이 만족되는 것은 아니므로 적용 불가한 경우가 있습니다.<br>
   1. 모든 evenet가 발생할 probability는 같습니다.
   2. Sample space는 유한합니다.
   
 여기서 possible outcomes를 매번 일일히 counting 하는 것은 불가능합니다. 어떻게 counting 해야할까요?
 <br><br>


## Counting
***

 * Multiplication Rule<br>
 만약 첫 번째 experiment가 $n_{1}$개의 possible outcomes를 가지고 두 번째 experiment가 $n_{2}$개를 가지고, ..., r 번째 experiment가 $n_{r}$개를 가진다면,<br>
 overall possible outcomes = $n_{1} * n_{2} *, ... *, n_{r}$<br><br>

 * Binomial coefficient(이항계수)<br>
 $\binom{n}{k} = \frac{n!}{(n-k)!k!}$ (if k>n)<br><br>
 multiplication rule을 적용할 수 있습니다. n명 중 한 명을 뽑는 경우의 수는 n, 다음 한 명을 뽑는 경우의 수는 (n-1), ..., k번째 한 명을 뽑는 경우의 수는 (n-k+1)입니다. 뽑는 순서는 상관 없으므로 k!로 나눠줍니다. 좌변의 분모와 분자를 소거하면 우변과 같습니다.<br>
 $\frac{n(n-1)(n-2)...(n-k+1)}{k!} = \frac{n!}{(n-k)!k!}$
 <br><br>


## Sampling Table
***

 전체 n개의 sample 중 k개의 sample을 선택할 때 고려해야 할 사항과 그 결과값에 관한 table 입니다.

| (header) | **order matter**  | **order doesn't matter** |
| **replace** | $n^{k}$ | $\binom{n+k-1}{k}$ |
| **doesn't replace** | n(n-1)(n-2)...(n-k+1) | $\binom{n}{k}$ |
