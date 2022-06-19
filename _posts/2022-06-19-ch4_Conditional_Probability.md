---
layout: post
title: ch4. Conditional Probability
date: 2022-06-19 12:52:12 +0900
published: true
math: true
categories: [Study, L-Statistics]
tags: [statistics,harbard,probability,independence, newton-pepys problem, conditional probability, bayes' theorem]
img_path: /assets/img/post/
---

## Intro
***

 사건의 독립(independence)과 조건부 확률(conditional probability)의 개념을 이해하고 적용할 수 있습니다.
 <br><br>


## Independence
***

 독립의 정의는 다음과 같습니다.

 > Events A, B are **independnet** if $P(A \cap B) = P(A)P(B)$<br>Note: completely different from disjointness(서로소)

 사건 A, B가 독립이라면 사건 A의 발생은 B의 발생 여부에 어떤 영향도 끼치지 않습니다.
 
 혼동하기 쉬운 개념으로 서로소(disjoint)가 있습니다. 사건 A, B가 서로소라면 A가 발생했을 때 B는 발생할 수 없는 경우입니다. 독립과 완전히 다른 개념입니다.
 <br><br>


## Newton-Pepys Problem (1963)
***

 Samuel Pepys는 유명한 작가입니다. 어느 날 도박에 관한 한 가지 문제에 대한 답을 얻기 위해 Newton에게 편지를 썼습니다.

 여섯 개의 면이 나올 확률이 동일한 정육면체 주사위가 있습니다. 다음 세 가지 경우 중 가장 확률이 높은 것은 무엇일까요?

     A. at least one 6 with 6 dice

     B. at least two 6's with 12 dice

     C. at least three 6's with 18 dice

 'at least'라는 표현이 나오면 합집합을 떠올립니다. 또한 합집합의 여집합은 교집합니다. 모든 사건이 독립이므로 교집합은 각 사건 확률의 곱셈으로 계산할 수 있습니다.

 1. $P(A) = 1 - (\frac{5}{6})^6 \approx 0.665$
 2. $P(B)$ = 1 - (6이 한 번도 안 나올 확률 + 6이 딱 한 번 나올 확률)<br>
  $= 1 - \{(\frac{5}{6})^{12} + \frac{1}{6} * (\frac{5}{6})^{11} * 12} \approx 0.619$
 3. $P(C) = 1 - \Sigma_{k=0}^{2}(\frac{18}{k})(\frac{1}{6})^k(\frac{5}{6})^{18-k} \approx 0.597$

 따라서 A가 발생할 확률이 가장 높습니다.

 4. K > 365: 확률은 1입니다. 365개의 상자가 있고 각각 Jan1, Jan2, ..., Dec31로 labeling 합니다. K가 365보다 클 경우 모든 box에 dot이 1개 이상 들어갑니다. (Pigeon hole principle) 확률은 1입니다.
 5. K ≤ 365: 여사건을 생각해 봅니다. $P(no match) = \frac{365*364*363*...*(365-k+1)}{365^{k}}$<br>

     P(match)를 계산하면,<br>
     50.6%, if k=23<br>
     97%, if k=50<br>
     99.999%, if k=100<br>
     가 나옵니다.<br><br>


     이 문제를 좀 더 직관적으로 살펴볼까요? 여기에서 중요한 것은 k명에서 2명을 뽑는 경우의 수 입니다. 이를 수식으로 표현하면,<br>

     $\binom{k}{2}$ = $\frac{k(k-1)}{2}$<br>
     $\binom{23}{2}$ = $\frac{23*22}{2}$ = 253<br>

     253쌍의 경우의 수가 나옵니다. 충분히 같은 수를 가진 쌍이 나올 수 있습니다.
     <br><br>


## 확률의 특성
***

 [ch2. Story Proofs Axioms of Probability](https://hubert-bioinformatics.github.io/posts/ch2_Story_Proofs_Axioms_of_Probability/, "ch2.Story Proofs Axioms of Probability")에서 확률의 non-naive 정의와 두 가지 정리를 살펴봤습니다.

 1. $P(\emptyset)=0, p(S)=1$

 2. $P(\cup_{n=1}^{\infty}A_{n}) = \sum_{n=1}^{\infty}P(A_{n})$ if $A_{1}, A_{2}$, ... are disjoint (non-overlapping)
 <br><br>

 이 두 가지 정리로 모든 확률 특성을 설명할 수 있습니다.

 1. $P(A^c) = 1 - P(A)$<br>
 증명: $1 = P(S) = P(A\cup A^c) = P(A) + P(A^c)$ since $A \cap A^c = \varnothing$<br>
 2. if $A \subseteq B, then P(A) \subseteq P(B)$<br>
 증명: $B = A \cup (B \cap A^c), disjoint$<br>
 $P(B) = P(A) + P(B \cap A^c) ≥ P(A)$<br>
 확률은 항상 0보다 크거나 같으므로 P(A)보다 크거나 같습니다.
 3. $P(A \cup B) = P(A) + P(B) - P(A \cap B)$<br>
 증명: $P(A \cup B) = P(A \cup (B \cap A^c)) = P(A) + P(B \cap A^c)$
 <br><br>


## Inclusion-Exclusion Principle
***

 $P(A_{1} \cup A_{2} \cup ... \cup A_{n}) = \sum_{j=1}^{n} P(A_{j}) - \sum_{i<j} P(A_{i} \cap A_{j}) + \sum_{i<j<k} P(A_{i} \cap A_{j} \cap A_{k}), ..., (-1)^{n+1} P(A_{1} \cap A_{2}, ..., \cap A_{n})$<br>

 Inclusion-Exclusion Principle을 활용한 문제를 살펴 보겠습니다.  deMontmort's Problem(1713)은 matching problem으로도 부릅니다. 카드를 순서대로 배열한 뒤 카드 번호와 순서가 일치하면 승리하는 게임입니다. 이 확률을 수식으로 표현해 봅니다.<br><br>

 $P(A_{j}) = \frac{1}{n}$<br>랜덤으로 섞인 카드 1, 2, ..., n 중에서 카드 j가 j번째 순서로 놓이는 사건을 A라고 할 때 확률입니다.<br><br>

 $P(A_{1} \cap A_{2}) = \frac{(n-2)!}{n!} = \frac{1}{n(n-1)}$<br>카드1, 카드2가 1번, 2번 위치에 존재하고 나머지 카드들은 임의 배치될 확률입니다.<br><br>

 $P(A_{1} \cap A_{2}, ..., \cap A_{k}) = \frac{(n-k)!}{n!}$<br>모든 카드가 순서대로 배치될 확률입니다. <br><br>

 그러므로 구하고자 하는 확률은,<br>
 $P(A_{1} \cup A_{2}, ..., \cup A_{n})$<br>
 = $n\frac{1}{n} - \frac{n(n-1)}{2!}\frac{1}{n(n-1)} + \frac{n(n-1)(n-2)}{3!}\frac{1}{n(n-1)(n-2)} ...$<br>
 = $1 - \frac{1}{2!} + \frac{1}{3!} ... + (-1)^{n+1}\frac{1}{n!}$ 테일러 급수<br>
 $\approx 1 - \frac{1}{e}$<br>
 에 근사합니다.
 <br><br>


## IMO
***

 Birthday problem을 보며 사람의 직관과 실제 확률의 차이가 커서 놀랐습니다.