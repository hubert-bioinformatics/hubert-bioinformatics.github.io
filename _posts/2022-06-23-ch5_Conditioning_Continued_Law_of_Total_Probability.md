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

 2. Unconditional probability를 구하기 위해 이를 작은 조각들로 쪼갤 때 conditional probability가 필요합니다. <br>

    예를 들어 Unconditional probability인 P(B)를 구하기 위해서 $P(B \mid A_{1})P(A_{1}) + P(B \mid A_{2})P(A_{2}), ..., + P(B \mid A_{n})P(A_{n})$와 같이 conditional probability인 $P(B \mid A_{n})$이 필요합니다.
    <br><br>
 
 
## Conditional Probability 예제 문제
***

 1. 카드 뽑기: 52장의 카드 중 2장의 카드를 뽑는 경우, 다음 두 가지 case를 생각해 봅니다.
    1. $P(both aces \mid have an ace)$ <br>
    $= \frac{P(both aces)}{P(have ace)}$ <br>
    $= \frac{\binom{4}{2}/\binom{52}{2}}{1 - \binom{48}{2}/\binom{52}{2}}$<br>
    $= \frac{1}{33}$

    2. $P(both aces \mid have an ace of spade)$ <br>
    $= \frac{3}{51}$ <br>
    $= \frac{1}{17}$ <br>
    한 장의 카드는 spade ace로 정해져 있으므로, 나머지 한 장의 카드를 남은 ace 세 장 중 하나를 뽑을 확률입니다.

 2. 환자가 병에 걸렸을 확률: 인구의 1%가 걸리는 병이 있습니다. 이 병을 검사하는 방법 정확도가 95%라고 가정합니다. 검사가 양성으로 나왔을 때 환자가 병에 걸렸을 case를 생각해 봅니다.<br>
 D: 환자가 병을 가지는 경우<br>
 T: 환자의 검사 결과가 양성인 경우<br>
 $P(T \mid D) = 0.95$<br>
 $P(T^{c} \mid D^{c})$<br><br>
 하지만 환자가 알고자 원하는 것은 무엇일까요? 바로 $P(D \mid T)$입니다.<br>
 $P(D \mid T) = \frac{P(T \mid D)P(D)}{P(T)}$<br>
 $\frac{P(T \mid D)P(D)}{P(T \mid D)P(D) + P(T \mid D^{c})P(D^{c})}$<br>
 $\approx 0.16$
 <br><br>
 
 
## Conditional Probability에서 자주 하는 실수들
***

 1. Prosecutor's fallacy: $P(A \mid B)$와 $P(B \mid A)$를 혼동하는 case입니다. 법정 사례를 한 가지 살펴봅니다.<br>
 Sally Clark case: 영국인 Sally Clark의 두 아이가 영아돌연사증후군(SIDS)로 돌연 사망합니다. 검찰측 전문가는 아이가 설명하기 힘든 이유로 사망할 확률은 $\frac{1}{8500}$이라 설명했고 두 명의 아이가 사망했으니 $\frac{1}{8500}\frac{1}{8500} \approx \frac{1}{73*10^6}$의 확률로 그녀가 결백하다고 주장했습니다.<br>
 하지만 우리가 알아야 할 값은 $P(innocence \mid evidence)$이며 위 주장에서는 $P(innocence)$ 항목을 고려치 않고 있습니다. 또한 두 아이의 죽음이 유전적 결함 등으로 연결될 수 있으나 검찰측 전문가는 독립사건으로 가정하고 있습니다. 결국 Sally Clark는 몇 년 후 무죄로 판정되어 출소했으나 얼마 지나지 않아 사망했습니다.

 2. 
    




 사건 A, B가 독립이라면 사건 A의 발생은 B의 발생 여부에 어떤 영향도 끼치지 않습니다.
 
 혼동하기 쉬운 개념으로 서로소(disjoint)가 있습니다. 사건 A, B가 서로소라면 A가 발생했을 때 B는 발생할 수 없는 경우입니다. 독립과 완전히 다른 개념입니다.
 <br><br>





 <br><br>


## IMO
***

 확률론에서 중요한 이론 중 하나로 자주 등장하는 Bayes' theorem(베이즈 정리)의 정의와 의미를 배웠습니다.