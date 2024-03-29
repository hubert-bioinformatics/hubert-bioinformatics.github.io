---
layout: post
title: ch1. Basic Mathmatics
date: 2022-06-04 16:02:38 +0900
published: true
math: true
categories: [Study, B-Guide_to_Linear_Algebra]
tags: [linear algebra,study,math]
img_path: /assets/img/post/
---

## 이 책을 시작하며
***

 현대 과학과 엔지니어링 분야에서 실제 현상을 이해하고 실험 결과를 예측하며 유용한 기술을 개발할 수 있는 고급 모델을 고안합니다. 이러한 학문 분야에서는 수학적 모델이 활용되므로 수학 학습이 필요합니다.

 이 책에서 배울 수 있는 선형대수학 기법은 현존하는 수학적 모델링 도구 중 가장 강력합니다. 선형대수학의 핵심은 **선형성(linearity)**이라는 아주 간단한 개념입니다. 어떤 함수 f가 다음 방벚ㅇ식을 만족하면 선형입니다.

 $f(ax_1 + bx_2) = af(x_1) + bf(x_2)$

 각 변수 x에 상수 a, b를 곱하고 그 결과를 더함으로써 변수들의 집합을 구성하는데, 이 표현식을 **선형결합(linear combination)**이라는 용어로 설명합니다.

 선형대수학의 모든 것을 살펴봤습니다. 이 책의 나머지 부분에서는 그저 더 자세하게 설명할 뿐입니다.

 선형모델을 사용하는 몇 가지 특별한 이유가 있습니다.

 1. 선형모델이 실제 현상을 근사하는 데 매우 뛰어납니다.<br>
 비선형 현상이 나타내는 선형모델을 **선형근사법(linear approximation)**이라고 합니다.

 2. 선형모델을 그 모델의 입력 또는 출력의 비선형 변환과 결합하여 비선형 현상을 설명할 수 있습니다.<br>
 머린러닝에서 종종 사용됩니다. 커널 기법은 선형모델의 입력에 대한 임의의 비선형 변환입니다. 시그모이드 활성화 곡선(sifmoid activation curve)은 부드럽게 변화하는 선형모델의 출력을 딱딱한 예/아니오 결정, on/off 명령, 혹은 0/1 값 등으로 변환하는 데 사용됩니다.

 **선형변환**은 '벡터 함수'로 생각하고 익숙한 정규 함수의 성질과 유사하게 이해할 수 잇습니다.
 <br><br>


## 방정식 풀이 (1.1)
***

 * 등호(=)는 좌변과 우변의 값이 같다는 의미입니다. 이 등식이 계속 성립하기 위해서는 방정식의 좌변에 적용하는 모든 변경 사항을 방정식의 우변에도 동일하게 적용해야 합니다.
 <br><br>


## 수 (1.2)
***

 * 수는 물건을 세고, 측정하고, 정량화하고, 계산하는 데 사용하는 기본적인 수단입니다. 수의 범주는 다음과 같습니다.

   * 자연수: N = {0, 1, 2, 3, 4, 5, ...}

   * 정수: Z = {..., -2, -1, 0, 1, 2, ...}

   * 유리수: $\mathbb{Q} = \{5/3, 22/7, 1.5, 0.125, -7, ...\}$

   * 실수: $\mathbb{R} = \{-1, 0, \sqrt{2}, \pi, 4.94, ...\}$

   * 복소수: $\mathbb{C} = \{-1, 0, 1, i, 1+i, 2+3i, ...\}$
   <br><br>


## 이차 방정식 풀이 (1.6)
***

 > **근의 공식**<br><br>
 방정식 $ax^2 + bx + c = 0$의 해는 다음과 같습니다.<br>
 $x_1 = \frac{-b + \sqrt{b^2 - 4ac}}{2a}$, $x_2 = \frac{-b - \sqrt{b^2 - 4ac}}{2a}$<br><br>

<br>
 
 * 근의 공식에 대한 증명<br>

   1. 이차 방정식 $ax^2 + bx + c - 0$에서 시작합니다. 양변을 a로 나눕니다.<br>
     $x^2 + \frac{b}{a}x + \frac{c}{a} = 0$

   2. 완전제곱 꼴로 만들어서 방정식을 만족하는 h와 k를 찾습니다.<br>
     $(x - h)^2 + k = x^2 + \frac{b}{a}x + \frac{c}{a}$

   3. h와 k를 찾기 위해 좌변의 괄호를 전개해서 다음을 얻습니다.<br>
     $x^2 - 2hx + h^2 + k = x^2 + \frac{b}{a}x + \frac{c}{a}$

   4. 방정식의 양변에 있는 x의 계수를 보면 h를 구할 수 있습니다. $-2h = \frac{b}{a}$이므로 $h = -\frac{b}{2a}$입니다. 위 방정식에 대입합니다.<br>
     $x^2 - \frac{b}{a}x + \frac{b^2}{4a^2} + k = x^2 + \frac{b}{a}x + \frac{c}{a}$

   5. k값을 구하기 위해, 방정식 양변의 같은 항을 소거하고 k를 분리합니다.<br>
     $\frac{b^2}{4a^2} + k = \frac{c}{a}$<br>
     $k = \frac{c}{a} - \frac{b^2}{4a^2}$

   6. h와 k를 찾은 후, 방정식 $ax^2 + bx + c - 0$을 다음과 같이 $(x - h)^2 + k = 0$ 형태의 방정식으로 쓸 수 있습니다.<br>
     $(x + \frac{b}{2a})^2 + \frac{c}{a} - \frac{b^2}{4a^2} = 0$

   7. 모든 상수를 우변으로 이동시킵니다.<br>
     $(x + \frac{b}{2a})^2 = \frac{c}{a} - \frac{b^2}{4a^2}$

   8. 양변에 제곱근을 취합니다. 제곱 함수는 양수와 음수가 같은 결과값이 되기 때문에 두 가지 해를 생성합니다.<br>
     $x + \frac{b}{2a} = \pm\sqrt{-\frac{c}{a} + \frac{b^2}{4a^2}}$

   9. 제곱근 안을 정리한 뒤 해를 구합니다.<br>
     $x + \frac{b}{2a} = \pm\frac{\sqrt{b^2 - 4ac}}{2a}$<br>
     $x = \frac{-b}{2a} \pm\frac{\sqrt{b^2 - 4ac}}{2a}$ = $\frac{-b \pm\sqrt{b^2 - 4ac}}{2a}$
     <br><br>


## 함수 (1.8)
***

 **함수(function)**는 변수들 사이의 관계를 규정하는 규칙으로 이해할 수 있습니다. 특히, 함수는 한 변수에 따라 다른 변수가 어떻게 변화하는지 설명합니다.

 $f : A \to B$

 * 정의역(domain): 허용된 입력값들의 집합입니다.

 * 치역(range), 상(image): 가능한 모든 출력값들의 집합입니다.

 * 공역(codomain): 함수의 치역을 포함하는 집합으로 출력값의 형태를 나타내는 집합입니다.
 <br><br>


 함수는 수에서 수로의 **사상(mapping)**입니다. 임의의 입력값 x에 대해, 그 입력에 대한 f의 출력값은 f(x)로 표시됩니다.

 역함수는 함수 f의 연산을 실행 취소하는 함수입니다. 전단사함수 $f : A \to B$가 주어지면, f의 역사상을 수행하는 역함수 $f^{-1} : B \to A$가 존재합니다. 어떤 x에서 시작하여 f를 적용한 다음 $f^{-1}$를 적용하면 원래 입력 x가 됩니다.<br>

 > $f^{-1}(f(x)) \equiv f^{-1} \circ f(x) = x$
 <br><br>


## 벡터 (1.14)
***

 **벡터**는 다차원 대상을 다루는 방법으로 공간에서의 방향을 나타내는 정확한 방법입니다. 실수의 순서쌍으로 표시하고 각각의 실수를 성분(component)이라고 합니다. 물리량, 컴퓨터 그래픽, 확률론, 머시러닝, 기타 과학과 수학 분야의 연구에서 광범위하게 사용됩니다.

 * 벡터 표기법
   * 성분 표기법: x축, t축에 대한 순서쌍으로 나타냅니다. <br>$\vec{v} = (v_{x}, v_{y})$
   * 단위벡터 표기법: 단위벡터 $\hat{i} = (1,0)$, $\hat{j} = (0,1)$를 사용하여 표현합니다. <br>$\vec{v} = v_{x}\hat{i}, v_{y}\hat{j}$
   * 길이-방향 표기법: 벡터의 길이 $\vert\vert\vec{v}\vert\vert$와 벡터가 x축과 이루는 각 $\theta$로 표현합니다. <br>$\vec{v} = \vert\vert\vec{v}\vert\vert \angle\theta$

 * 기저(basis)
    
    **기저(basis)**는 벡터를 학습할 때 가장 중요한 개념 중 하나입니다. 3차원 벡터공간 $\mathbb{R}^3$의 기저가 $\hat{e}_1, \hat{e}_2, \hat{e}_3$이고 기저에 대한 계수가 $(v_1, v_2, v_3)$라면 벡터를 다음과 같이 표현할 수 있습니다.<br> 
    $\vec{v} = v_1\hat{e}_1 + v_2\hat{e}_2 + v_3\hat{e}_3$
 
    기저에 대한 실사용 예로 RGB code가 있습니다. RGB code는 색상을 만들기 위해 필요한 Red, Green, Blue 색의 양을 나타내는 세 가지 값으로 표현합니다.  예를 들어 노랑색은 (255,255,0)의 RGB code로 표현합니다.