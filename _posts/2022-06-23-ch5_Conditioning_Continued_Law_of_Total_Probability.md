---
layout: post
title: ch5. Conditioning Continued, Law of Total Probability
date: 2022-06-23 12:05:32 +0900
published: true
math: true
categories: [Study, L-Statistics]
tags: [statistics,harbard,law of total probability,conditional probability,prior,posterior,conditional independence]
img_path: /assets/img/post/
---

## Intro
***

 전체 확률의 법칙을 이해하고 문제풀이에 적용할 수 있으며, 조건부 독립의 개념을 이해합니다.
 <br><br>


## How to Solve the Problem
***

 어떤 문제를 풀 때 다음 두 가지 방법을 적용해 볼 수 있습니다.

 1. 간단한 케이스와 극단적인 케이스에 적용해보기
 2. 문제를 작은 문제들로 쪼개서 생각해보기
 <br><br>


## Law of Total Probability (전체 확률의 법칙)
***

 ![Post-Image](Law_of_Total_Probability_fig.png)
 _law of Total Probability_

 $P(B \mid S)$를 구할 때, S를 서로소 관계에 있는 $A_{1}, A_{2}, A_{3}, A_{4}$로 쪼개서 계산하면 쉽게 구할 수 있습니다. 이것을 low of total probability (전체 확률의 법칙) 이라고 합니다.

 $P(B) = P(B \cap A_{1}) + P(B \cap A_{2}) +, ..., + P(B \cap A_{n})$<br><br>$ = P(B \mid A_{1})P(A_{1}) + P(B \mid A_{2})P(A_{2}), ..., + P(B \mid A_{n})P(A_{n})$
 <br><br>
 
 
 ## Conditional Probability가 중요한 이유
***

 1. It's own right!<br>
    조건부 확률은 어떤 단서가 있을 때 이 단서를 기반으로 확률을 업데이트 하는 것입니다. 이 자체가 굉장히 중요한 개념입니다.

 2. Unconditional probability를 구하기 위해 이를 작은 조각들로 쪼갤 때 conditional probability가 필요함
    예를 들어 Unconditional probability인 P(B)를 구하기 위해서 $P(B \mid A_{1})P(A_{1}) + P(B \mid A_{2})P(A_{2}), ..., + P(B \mid A_{n})P(A_{n})$와 같이 conditional probability인 $P(B \mid A_{n})$이 필요합니다.
    <br><br>
 
 
 ## Conditional Probability가 중요한 이유
***

 1. 




 사건 A, B가 독립이라면 사건 A의 발생은 B의 발생 여부에 어떤 영향도 끼치지 않습니다.
 
 혼동하기 쉬운 개념으로 서로소(disjoint)가 있습니다. 사건 A, B가 서로소라면 A가 발생했을 때 B는 발생할 수 없는 경우입니다. 독립과 완전히 다른 개념입니다.
 <br><br>





 <br><br>


## IMO
***

 확률론에서 중요한 이론 중 하나로 자주 등장하는 Bayes' theorem(베이지 정리)의 정의와 의미를 배웠습니다.