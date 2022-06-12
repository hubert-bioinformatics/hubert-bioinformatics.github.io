---
layout: post
title: ch3. Birthday Problem, Properties of Probability
date: 2022-06-12 13:02:46 +0900
published: true
math: true
categories: [Study, L-Statistics]
tags: [statistics,harbard,probability,birthday problem,Inclusion-Exclusion Principle]
img_path: /assets/img/post/
---

## Intro
***

 확률의 non-naive한 정의의 공리를 이용하여 확률의 특성을 증명할 수 있습니다. 포함-배제의 원리를 이해합니다.
 <br><br>


## Birthday Problem
***

 K명의 사람이 있을 때 2명의 생일이 같을 확률을 생각해 봅니다. 1년은 365일이고 모든 날이 생일일 확률은 같다고 가정합니다. 또한 모든 생일은 독립이라고 가정합니다.

 1. K > 365: 확률은 1입니다. 365개의 상자가 있고 각각 Jan1, Jan2, ..., Dec31로 labeling 합니다. K가 365보다 클 경우 모든 box에 dot이 1개 이상 들어갑니다. (Pigeon hole principle) 확률은 1입니다.
 2. K ≤ 365: 여사건을 생각해 봅니다. $P(no match) = \frac{365*364*363*...*(365-k+1)}{365^k}$<br>
 P(match)를 계산하면,<br>
 50.6%, if k=23<br>
 97%, if k=50<br>
 99.999%, if k=100<br>
 가 나옵니다.<br><br>
 이 문제를 좀 더 직관적으로 살펴볼까요? 여기에서 중요한 것은 k명에서 2명을 뽑는 경우의 수 입니다. 이를 수식으로 표현하면,<br>
 $\binom{k}{2}$ = $\frac{k(k-1)}{2}$<br>
 $\binom{23}{2}$ = $\frac{23*22}{2}$ = 253<br>
 253쌍의 경우의 수가 나옵니다. 충분히 같은 수를 가진 쌍이 나올 수 있지 않을까요?
 <br><br>


## 확률의 특성
***

 [ch2. Story Proofs Axioms of Probability](https://hubert-bioinformatics.github.io/posts/ch2_Story_Proofs_Axioms_of_Probability/, "ch2.Story Proofs Axioms of Probability")에서 확률의 non-naive 정의와 두 가지 정리를 살펴봤습니다.

 1. $P(\emptyset)=0, p(S)=1$

 2. $P(\cup_{n=1}^{\infin}A_{n}) = \sum_{n=1}^{\infin}P(A_{n})$ if $A_{1}, A_{2}$, ... are disjoint (non-overlapping)
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

 그러므로 구하고자 하는 확률은, <br>
 $P(A_{1} \cup A_{2}, ..., \cup A_{n})$<br>
 = $n\frac{1}{n} - \frac{n(n-1)}{2!}\frac{1}{n(n-1)} + \frac{n(n-1)(n-2)}{3!}\frac{1}{n(n-1)(n-2)} ...$<br>
 = $1 - \frac{1}{2!} + \frac{1}{3!} ... + (-1)^{n+1}\frac{1}{n!}$ 테일러 급수<br>
 $\approx 1 - \frac{1}{e}$<br>
 에 근사합니다.
 <br><br>


## IMO
***

 Birthday problem을 보며 사람의 직관과 실제 확률의 차이가 커서 놀랐습니다.