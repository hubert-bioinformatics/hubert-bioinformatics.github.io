---
layout: post
title: ch6. Monty Hall, Simpson's Paradox
date: 2022-06-26 11:42:10 +0900
published: true
math: true
categories: [Study, L-Statistics]
tags: [statistics,harbard,monty hall,law of total probability,simpson's paradox]
img_path: /assets/img/post/
---

## Intro
***

 Monty Hall 문제를 이해하고 확장해 볼 수 있으며, 심슨의 역설을 이해합니다.
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
 
 2. 사전확률(prior)과 사후확률(posterior) 혼동: 사전확률(prior)은 $P(A)$, 사후확률(posterior)은 $P(A \mid B)$입니다.

 3. Conditional independent와 Independent 혼동: Conditional independent의 정의는 다음과 같습니다. $P(A \cap B \mid C) = P(A \mid C)P(B \mid C)$<br>
 그렇다면 conditional independent하면 independent 할까요? 정답은 '아니오' 입니다.<br>
 체스 게임을 예로 들어봅시다. 실력을 알 수 없는 만나본 적 없는 상대와 체스 게임을 합니다. 상대방이 얼마나 체스를 잘 하는지 아무런 정보가 없습니다. 이렇게 상대방의 실력을 모르는 상태에서 체스 게임을 한다고 가정할 때 체스 게임들은 conditional independent 합니다. 하지만 이것이 independent를 의미하지 않습니다. 체스 게임을 반복할 수록 상대방의 실력을 가늠할 수 있는 척도가 마련되지 때문입니다.<br>
 반대로 independent하면 conditional independent 할까요? 정답은 '아니오' 입니다.<br>
 화재경보기 예제를 생각해 봅시다. 화재경보기가 울리는 사건을 A, 화재가 난 사건을 F, 팝콘을 튀기는 사건을 C라고 합니다. A는 F 혹은 C에 의해 일어나며 F, C는 independent 하다고 가정합니다. 여기서 $P(F \mid A, C^{c}) = 1$이라고 할 수 있습니다. 화재경보기가 작동한 조건에서 팝콘을 튀기지 않았다면 화재가 났음을 알 수 있습니다. 따라서 A 조건하에서 F, C는 dependent하다고 볼 수 있습니다.
 <br><br>


## IMO
***

 Conditional Probability를 확실하게 체득하지 못했으나 반복해서 강의를 듣고 다른 도서 내용도 참고해봐야 겠습니다.