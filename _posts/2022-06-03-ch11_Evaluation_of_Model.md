---
layout: post
title: ch11. Evaluation of Model
date: 2022-06-03 22:12:20 +0900
published: true
math: true
categories: [Study, B-ML_with_Python_Cookbook]
tags: [ml,python,study,sklearn,dataframe]
img_path: /assets/img/post/
---

## Summary
***

 Model은 예측성능이 높아야 유용합니다. 근본적인 목적은 고품질의 model을 만드는 것입니다. Algorithm이 만드는 model의 평가 방법을 알아봅니다.
 <br><br>


 * 교차검증 model 만들기 (11.1)

```python
# Model을 훈련하고 어떤 성능지표(정확도, 제곱오차 등)를 사용하여 얼마나 잘 동작하는지 계산합니다.

# Training set에 한정해서 잘 동작하는 model이 아니라 새로운 data에 대해서 잘 동작하길 기대합니다.

# KFCV(K-Fold Cross-Validation)를 사용하여 최종 성능을 산출합니다.
```
<br><br>


 * 기본 regreesion model 만들기 (11.2)

```python
# Regression model 평가는 결정계수(R^2)를 사용합니다.
$ R^2 = 1 - \\frac{\\sum_{i} (y_{i}-\\hat{y}_{i})^2}{\\sum_{i} (y_{i}-\\bar{y}_{i})^2} $
```
<br><br>


 * 기본 classification model 만들기 (11.3)

```python
# Classification model의 성능을 측적하는 일반적인 방법은 random 추측보다 얼마나 더 나은지 비교하는 것입니다.
```
<br><br>


 * 이진 분류기의 예측 평가하기 (11.4)

```python
# sklearn의 cross_val_score 함수 사용: 훈련된 classification model의 품질을 평가합니다. 교차검증을 수행할 때 scoring 매개변수에 성능지표 중 하나를 선택합니다.

# Accuracy(정확도), Precision(정밀도), Recall(재현률), F-1이 있습니다.
```
<br><br>


## Practice
***

<script src="https://gist.github.com/hubert-bioinformatics/b41f2e6324059955a49dd383cdbe9a8d.js"></script>