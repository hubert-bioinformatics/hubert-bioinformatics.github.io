---
layout: post
title: ch2. Introduce Linear Algebra
date: 2022-07-23 11:42:13 +0900
published: true
math: true
categories: [Study, B-Guide_to_Linear_Algebra]
tags: [linear algebra,study,vector,linearity]
img_path: /assets/img/post/
---

## 정의 (2.1)
***

 * 행렬-벡터 곱

    행렬 $A \in \mathbb{R}^{m \times n}$와 벡터 $\vec{x} \in \mathbb{R}^{n}$에 대하여, 행렬-벡터 곱 $A\vec{x}$는 계수 $\vec{x}$를 갖는 행렬 $A$의 열들의 **선형결합(linear combination)**을 생성합니다. 예를 들어, $3 \times 2$ 행렬 $A$와 $2 \times 1$ 벡터 $\vec{x}$의 곱은 $3 \times 1$ 벡터가 되고, $\vec{y} = A\vec{x}$로 표현합니다.

    $\begin{bmatrix}
y_{1}\\
y_{2}\\
y_{3}\\
\end{bmatrix}$ = 
$\begin{bmatrix}
a_{11} & a_{12}\\
a_{21} & a_{22}\\
a_{31} & a_{32}\\
\end{bmatrix}$
$\begin{bmatrix}
x_{1}\\
x_{2}\\
\end{bmatrix}$ =
$\begin{bmatrix}
x_{1}a_{11} + x_{2}a_{12}\\
x_{1}a_{21} + x_{2}a_{22}\\
x_{1}a_{31} + x_{2}a_{32}\\
\end{bmatrix}\equiv$
$x_{1}\begin{bmatrix}
a_{11}\\
a_{21}\\
a_{31}\\
\end{bmatrix}$ +
$x_{2}\begin{bmatrix}
a_{12}\\
a_{22}\\
a_{32}\\
\end{bmatrix}$

    위 식에서 관찰해야 할 핵심은 '행 표현'과 '열 표현'에서 행렬-벡터 곱 $A\vec{x}$에 대한 이중 해석입니다. '행 표현'은 행렬 $A$의 각 행과 $\vec{x}$의 내적을 계산하여 $\vec{y}$를 해석합니다. '열 표현'은 행렬 $A$의 첫 번째 열의 $x_{1}$배와 두 번째 열의 $x_{2}$배의 합으로 $\vec{y}$를 해석합니다. 즉, $\vec{y}$는 $A$ 열들의 선형결합입니다. 예를 들어, $A$의 첫 번째 열의 3배와 두 번째 열의 4배로 구성된 선형결합을 얻으려면 행렬 $A$에 $\vec{x}$ = $\begin{bmatrix}
3\\
4\\
\end{bmatrix}$를 곱하면 됩니다.

  * **선형변환 (linear transformation)**
  
    **선형변환 (linear transformation)**은 선형대수학의 핵심 개념입니다. 이 책에서 핵심이고 주요 아이디어입니다.

    행렬-벡터 곱은 선형대수학 학습의 핵심 개념 중 하나인 선형변환의 추상화에 해당합니다. 행렬 $A \in \mathbb{R}^{m \times n}$에 의한 곱셈은 n-벡터를 입력으로 가져와 m-벡터를 출력으로 생성하는 선형변환 $T_{A}$를 계산한 것으로 생각할 수 있습니다.

    $T_{A}: \mathbb{R}^{n} \to \mathbb{R}^{m}$

    행렬 $A$는 m행이므로 행렬-벡터 곱의 결과는 m-벡터입니다. 선형변환 $T_{A}$를 벡터 $\vec{x}$에 적용하는 것은 행렬 $A$와 열벡터 $\vec{x}$의 곱에 해당합니다. $T_{A}$는 행렬 $A$로 **표현된다**고 합니다.

  * 선형대수학의 개요

    함수는 입력공간(정의역)에서 출력공간(치역)으로의 변환입니다. 선현변환 $T_{A}: \mathbb{R}^{n} \to \mathbb{R}^{m}$은 n-벡터를 입력으로 받고 m-벡터를 출력으로 내놓는 함수입니다.
    
    만약 함수 $T$가 선형이면, $\vec{x}$에 적용된 $T$에 의한 출력 $\vec{y} = T(\vec{x})$는 어떤 행렬 $A_{T} \in \mathbb{R}^{m \times n}$에 대해 행렬-벡터 곱인 $A_{T}\vec{x}$로 계산될 수 있습니다. $T$는 행렬 $A_{T}$로 **표현된다**고 합니다. 모든 행렬 $A \in \mathbb{R}^{m \times n}$은 선형변환 $T_{A}: \mathbb{R}^{n} \to \mathbb{R}^{m}$에 대응됩니다.
    
    행렬과 선형변환은 동치이므로, "선형대수학은 벡터와 행렬에 대한 것이다."라는 말은 "선형대수학은 벡터와 선형변환에 관한 것이다."라는 말로 재해석할 수 있습니다.
    <br><br>


## 벡터 연산 (2.2)
***

$\vec{u} = (u_{1},u_{2},u_{3})$, $\vec{v} = (v_{1},v_{2},v_{3})$와 임의의 상수 $\alpha \in \mathbb{R}$에 대하여 벡터 대수는 다음의 연산에 의해 결정됩니다.

* 덧셈: $\vec{u} + \vec{v} \equiv (u_{1}+v_{1},u_{2}+v_{2},u_{3}+v_{3})$
* 뺄셈: $\vec{u} + \vec{v} \equiv (u_{1}-v_{1},u_{2}-v_{2},u_{3}-v_{3})$
* 스케일링: $\alpha\vec{u} \equiv (\alpha u_{1},\alpha u_{2},\alpha u_{3})$
* 내적: $\vec{u} \cdot \vec{v} \equiv u_{1}v_{1} + u_{2}v_{2} + u_{3}v_{3}$
* 외적: $\vec{u} \times \vec{v} \equiv (u_{2}v_{3} - u_{3}v_{2},u_{3}v_{1} - u_{1}v_{3},u_{1}v_{2} - u_{2}v_{1})$
* 길이: $\vert\vert\vec{u}\vert\vert = \sqrt{u_{1}^2+u_{2}^2+u_{3}^2}$
<br><br>


## 행렬 연산 (2.3)
***

* 역행렬

    역변환 가능한 행렬 $A$에 역행렬 $A^{-1}$을 곱하면 항등행렬 $AA^{-1} = I = A^{-1}A$를 만들 수 있습니다. 항등행렬(identity matrix)은 모든 $\vec{v}$에 대해 $I\vec{v} = \vec{v}$를 만족합니다. 역행렬 $A^{-1}$은 $A$가 수행한 모든 작업을 상쇄합니다.

    모든 행렬이 역행렬을 갖는 것은 아닙니다. 가역행렬(invertible matrix)만 역행렬을 갖습니다.

* 대각합 (trace)

    $n \times n$ 행렬의 대각합 (trace)은 대각선에 있는 n 값들의 합계입니다.

    $Tr: \mathbb{R}^{n \times n} \to \mathbb{R}, Tr[A] \equiv \Sigma_{i=1}^{n}a_{ii}$

    대각합의 성질은 다음과 같습니다.

    * Tr[$\alpha$A + $\beta$B] = $\alpha$Tr[A] + $\beta$Tr[B] (선형성)
    * Tr[AB] = Tr[BA]
    * Tr[ABC] = Tr[CAB] = Tr[BCA] (주기성)
    * Tr[$A^{T}$] = Tr[A]
    * Tr[A] = $\Sigma_{i=1}^{n}\lambda_{i}$ (여기서 $\lambda_{i}$는 A의 고윳값=eigenvalue 입니다.)

* 행렬식 (determinant)

    행렬식(determinant)은 행렬의 모든 계수를 포함하고 단일 숫자를 출력하는 계산입니다.

    $det : \mathbb{R}^{n \times n} \to \mathbb{R}$

    행렬식은 행렬의 행 벡터들에 의하여 결정되는 도형의 기하학적 양과 관계가 있습니다. 행렬 A의 행렬식은 A의 행에 의해 주어지는 변으로 이루어진 상자의 **크기**를 알려줍니다.

    예를 들어 아래 행렬의 행렬식은 다음과 같습니다.

    $det(A) = det(\begin{bmatrix}
a & b\\
c & d\\
\end{bmatrix})$ = $\begin{vmatrix}
a & b\\
c & d
\end{vmatrix}$ = $ad - bc$

    ad - bc는 벡터 (a,b)와 (c,d)에 의해 형성된 평생사변형의 면적입니다. (a,b) = $\alpha$(c,d)인 경우, A의 행들이 같은 방향을 가리키면 평행사변형의 면적은 0이 됩니다. 행렬의 행렬식이 0이 아니면, 그 행렬의 행들은 선형독립입니다.
    <br><br>


## 선형성, Linearity (2.4)
***

선형성(linearity)이란 무엇이며 이 책 전체에서 선형성의 학습에 전념하고 있는 이유는 무엇일까요?

$f(x) = \frac{a}{x} + b + mx + qx^{2} + cx^{3}$

mx항은 이 수식의 **선형** 항으로서 x의 1제곱입니다. 다른 모든 항은 **비선형적**입니다. 선형항은 입력 x의 값을 변경하면 mx의 값이 비례하여 변하기 때문에 특별합니다. 비선형항에는 적용되지 않는 특징입니다.

* 정의

    선형 함수는 입력의 선형결합을 동일한 출력의 선형결합으로 대응시킵니다. 함수 f가 임의의 두 입력 $x_{1}$과 $x_{2}$, 그리고 모든 상수 $\alpha$와 $\beta$에 대해 다음의 방정식을 만족하면 **선형(linear)**입니다.

    $f(\alpha x_{1} + \beta x_{2}) = \alpha f(x_{1}) + \beta f(x_{2})$

* 원점을 지나지 않는 직선은 선형 함수가 아니다

    $l(x) = mx + b$
    위 함수는 선형 함수가 아닙니다. 아래 수식을 만족하지 못하기 때문입니다. 이와 같이 선형 부분(mx)에 상수 항을 더한 함수를 아편 변환(affine transformation)이라고 합니다.

    $l(\alpha x_{1} + \beta x_{2}) = m(\alpha x_{1} + \beta x_{2}) + b \neq m(\alpha x_{1}) + b + m(\beta x_{2}) + b = \alpha l(x_{1}) + \beta l(x_{2})$

* 선형방정식

    변수 $x_{1}, x_{2}, x_{3}$의 선형방정식은 다음과 같은 형태를 갖습니다.

    $a_{1}x_{1} + a_{2}x_{2} + a_{3}x_{3} = c$