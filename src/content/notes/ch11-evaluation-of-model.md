---
title: "ch11. Evaluation of Model"
date: 2022-06-03
category: ml-data
tags: ["ml", "python", "study", "sklearn", "dataframe"]
series: "ML with Python Cookbook"
seriesOrder: 11
source: manual
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

```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.0 소개   \n",
    "   \n",
    "이 장에서 학습 알고리즘으로 만든 모델의 성능을 평가하기 위한 전략을 살펴보겠습니다.   \n",
    "모델 만드는 방법을 설명하기 전 평가에 대해 소개하는 이유는 여러 가지가 있습니다.   \n",
    "모델은 예측 성능이 높아야 유용하므로, 우리의 근본적인 목적은 그냥 모델을 만드는 것이 아니라 고품질의 모델을 만드는 것입니다.   \n",
    "따라서 다양한 학습 알고리즘을 탐험하기 전에 먼저 알고리즘이 만들 모델의 평가 방법에 대해 알아야 합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.1 교차검증 모델 만들기   \n",
    "   \n",
    "실전에서 모델이 얼마나 잘 작동할지 평가하고 싶습니다.   \n",
    "데이터 전처리 파이프라인을 만들고 모델을 훈련한 다음 교차검증으로 평가합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.9693916821849783"
      ]
     },
     "execution_count": 1,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn import datasets\n",
    "from sklearn import metrics\n",
    "from sklearn.model_selection import KFold, cross_val_score\n",
    "from sklearn.pipeline import make_pipeline\n",
    "from sklearn.linear_model import LogisticRegression\n",
    "from sklearn.preprocessing import StandardScaler\n",
    "\n",
    "# 숫자 데이터셋을 로드합니다.\n",
    "digits = datasets.load_digits()\n",
    "\n",
    "# 특성 행렬을 만듭니다.\n",
    "features = digits.data\n",
    "\n",
    "# 타겟 벡터를 만듭니다.\n",
    "target = digits.target\n",
    "\n",
    "# 표준화 객체를 만듭니다.\n",
    "standardizer = StandardScaler()\n",
    "\n",
    "# 로지스틱 회귀 객체를 만듭니다.\n",
    "logit = LogisticRegression()\n",
    "\n",
    "# 표준화한 다음 로지스틱 회귀를 실행하는 파이프라인을 만듭니다.\n",
    "pipeline = make_pipeline(standardizer, logit)\n",
    "\n",
    "# k-폴드 교차검증을 만듭니다.\n",
    "kf = KFold(n_splits=10, shuffle=True, random_state=1)\n",
    "\n",
    "# k-폴드 교차검증을 수행합니다.\n",
    "cv_results = cross_val_score(pipeline, # 파이프라인\n",
    "                            features, # 특성 행렬\n",
    "                            target, # 타겟 벡터\n",
    "                            cv=kf, # 교차검증 기법\n",
    "                            scoring=\"accuracy\", # 평가 지표\n",
    "                            n_jobs=-1) # 모든 CPU 코어 사용\n",
    "\n",
    "# 평균을 계산합니다.\n",
    "cv_results.mean()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "처음에는 지도 학습 모델을 평가하는 것이 간단해 보입니다.   \n",
    "모델을 훈련하고 어떤 성능 지표(정확도, 제곱 오차 등)를 사용하여 얼마나 잘 동작하는지 계산합니다.   \n",
    "그러나 이런 방식은 근본적으로 문제가 있습니다. 모델을 훈련한 데이터로 모델이 얼마나 잘 수행되는지 평가한다면 원하는 목표를 달성하지 못합니다. 우리의 목표는 훈련 데이터에서 잘 동작하는 모델이 아니라 이전에 본 적 없는 데이터(예를 들어, 새로운 고객, 새로운 범죄, 새로운 이미지)에서 잘 동작하는 모델입니다. 이런 이유로 평가 방법은 이전에 본 적 없는 데이터에서 모델이 얼마나 좋은 예측을 만드는지 알 수 있어야 합니다.   \n",
    "   \n",
    "한 가지 방법은 데이터의 일부를 테스트용으로 떼어놓는 것입니다. 이를 검증<sup>validation</sup> (또는 홀드아웃<sup>hold-out</sup>)이라고 부릅니다.   \n",
    "검증에서 샘플(특성과 타겟)은 두 개의 세트로 나뉩니다. 전통적으로 이를 훈련 세트<sup>training set</sup>와 테스트 세트<sup>test set</sup>라고 부릅니다.   \n",
    "그다음 훈련 세트의 특성과 타겟 벡터를 사용해 최선의 예측을 만드는 방법을 모델 훈련을 통해 가르칩니다.   \n",
    "마지막으로 훈련 세트에서 훈련한 모델을 이전에 본 적 없는 외부 데이터처럼 가장한 테스트 세트에서 얼마나 잘 동작하는지 평가합니다. 그러나 이 검증 방법은 두 가지 약점이 있습니다.   \n",
    "1. 모델 성능은 테스트 세트로 나뉜 일부 샘플에 의해 결정됩니다.\n",
    "2. 전체 가용 데이터를 사용하여 모델을 훈련하고 테스트하지 못합니다.   \n",
    "   \n",
    "k-폴드 교차검증<sup>k-fold cross-validation, KFCV</sup>은 이런 단점을 극복할 수 있는 좋은 방법입니다.   \n",
    "KFCV에서는 데이터를 폴드<sup>fold</sup>라고 부르는 k개의 부분으로 나눕니다. k-1개 폴드를 하나의 훈련 세트로 합쳐 모델을 훈련하고 남은 폴드를 테스트 세트처럼 사용합니다. 이를 k번 반복합니다. 반복마다 다른 폴드를 테스트 세트로 사용합니다. k번 반복에서 얻은 모델 성능을 평균하여 최종 성능을 산출합니다.   \n",
    "   \n",
    "해결에서 10개의 폴드를 사용하여 k-폴드 교차검증을 수행했습니다. 평가 점수는 cv_results에 저장되어 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0.97777778, 0.98888889, 0.96111111, 0.94444444, 0.97777778,\n",
       "       0.98333333, 0.95555556, 0.98882682, 0.97765363, 0.93854749])"
      ]
     },
     "execution_count": 2,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 10개 폴드의 점수를 모두 확인하기\n",
    "cv_results"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "KFCV를 사용할 때 고려해야 할 중요한 점이 세 가지 있습니다.   \n",
    "1. KFCV는 각 샘플이 다른 샘플과 독립적으로 생성되었다고 가정합니다 (즉 데이터는 독립 동일 분포<sup>independent identically distributed, IID</sup>). 데이터가 IID라면 폴드를 나누기 전에 샘플을 섞는 것이 좋은 생각입니다. sklearn에서는 shuffle=True로 지정하면 섞을 수 있습니다.\n",
    "2. KFCV를 사용하는 분류기<sup>classifier</sup>를 평가할 때, 각 타겟 클래스의 샘플이 거의 같은 비율로 폴드에 담기는 것이 좋습니다 (계층별 k-폴드<sup>stratified k-fold</sup>라고 부릅니다). 예를 들어 성별 타겟 벡터 중에서 80% 샘플이 남성이라면 각 폴드도 80% 남성과 20% 여성 샘플로 이루어져야 합니다. sklearn에서는 KFold 클래스를 StratifiedKFold로 바꾸어 계층별 k-폴드 교차검증을 수행할 수 있습니다.\n",
    "3. 검증 세트나 교차검증을 사용할 때 훈련 세트에서 데이터를 전처리하고 이 변환을 훈련 세트와 테스트 세트에 모두 적용하는 것이 중요합니다. 예를 들면 표준화 객체 standardizer의 fit 메서드를 호출하여 훈련 세트의 평균과 분산을 계산합니다. 그다음 이 변환을 (transform 메서드를 사용해) 훈련 세트와 테스트 세트에 모두 적용합니다.   \n",
    "   \n",
    "   "
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [],
   "source": [
    "from sklearn.model_selection import train_test_split\n",
    "\n",
    "# 훈련 세트와 테스트 세트를 만듭니다.\n",
    "features_train, features_test, target_train, target_test = train_test_split(features, target, test_size=0.1, random_state=1)\n",
    "\n",
    "# 훈련 세트로 standardizer의 fit 메서드를 호출합니다.\n",
    "standardizer.fit(features_train)\n",
    "\n",
    "# 훈련 세트와 테스트 세트에 모두 적용합니다.\n",
    "features_train_std = standardizer.transform(features_train)\n",
    "features_test_std = standardizer.transform(features_test)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "sklearn의 pipeline 패키지는 교차검증 기법을 사용할 때 이 규칙을 손쉽게 구현할 수 있도록 도와줍니다. 먼저 데이터를 전처리 (예를 들면 standardizer)하고 모델(로지스틱 회귀인 logit)을 훈련하는 파이프라인을 만듭니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [],
   "source": [
    "# 파이프라인을 만듭니다.\n",
    "pipeline = make_pipeline(standardizer, logit)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "그다음 이 파이프라인으로 KFCV를 실행하면 sklearn이 모든 작업을 알아서 처리합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0.97777778, 0.98888889, 0.96111111, 0.94444444, 0.97777778,\n",
       "       0.98333333, 0.95555556, 0.98882682, 0.97765363, 0.93854749])"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# k-폴드 교차검증 수행\n",
    "cv_results = cross_val_score(pipeline, #파이프라인\n",
    "                             features, # 특성 행렬\n",
    "                             target, # 타겟 벡터\n",
    "                             cv=kf,  #교차 검증\n",
    "                             scoring=\"accuracy\", # 평가 지표\n",
    "                             n_jobs=-1) # 모든 CPU 코어 사용\n",
    "\n",
    "cv_results"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "cross_val_score에는 아직 이야기하지 않은 중요한 세 개의 매개변수가 있습니다.   \n",
    "cv는 교차검증 기법을 결정합니다. k-폴드를 가장 많이 사용하지만 다른 방식도 있습니다. LOOCV<sup>leave-one-out-cross-validation</sup>는 폴드의 수 k가 샘플의 개수와 같습니다.   \n",
    "scoring 매개변수는 이 장의 다른 여러 레시피에서 설명할 모델 성공의 측정 방법을 결정합니다.   \n",
    "n_jobs=-1은 sklearn에게 가용한 모든 코어를 사용하도록 지시합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.2 기본 회귀 모델 만들기   \n",
    "   \n",
    "sklearn의 DummyRegressor를 사용하여 기본 모델로 사용할 간단한 더미 모델을 만듭니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "-0.001119359203955339"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.datasets import load_boston\n",
    "from sklearn.dummy import DummyRegressor\n",
    "from sklearn.model_selection import train_test_split\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "boston = load_boston()\n",
    "\n",
    "# 특성을 만듭니다.\n",
    "features, target = boston.data, boston.target\n",
    "\n",
    "# 훈련 세트와 테스트 세트를 나눕니다.\n",
    "features_train, features_test, target_train, target_test = train_test_split(features, target, random_state=0)\n",
    "\n",
    "# 더미 회귀 모델을 만듭니다.\n",
    "dummy = DummyRegressor(strategy='mean')\n",
    "\n",
    "# 더미 회귀 모델을 훈련합니다.\n",
    "dummy.fit(features_train, target_train)\n",
    "\n",
    "# R^2 점수를 계산합니다.\n",
    "dummy.score(features_test, target_test)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "다른 모델을 훈련하고 평가하여 성능 점수를 비교합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.6354638433202128"
      ]
     },
     "execution_count": 7,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.linear_model import LinearRegression\n",
    "\n",
    "# 간단한 선형 회귀 모델을 훈련합니다.\n",
    "ols = LinearRegression()\n",
    "ols.fit(features_train, target_train)\n",
    "\n",
    "# R^2 점수를 계산합니다.\n",
    "ols.score(features_test, target_test)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "기본적으로 score 메서드는 결정계수<sup>coefficient of determination, R^2</sup> 값을 반환합니다.   \n",
    ">$\n",
    "R^2 = 1 - \\frac{\\sum_{i} (y_{i}-\\hat{y}_{i})^2}{\\sum_{i} (y_{i}-\\bar{y}_{i})^2}\n",
    "$   \n",
    "여기에서 $ y_{i} $는 샘플의 정답 타겟입니다. $ \\hat{y}_{i} $은 예측한 값이고 $ \\bar{y} $은 타겟 벡터의 평균값입니다.\n",
    "$ R^2 $이 1에 가까울수록 특성이 타겟 벡터의 분산을 잘 설명합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.3 기본 분류 모델 만들기   \n",
    "   \n",
    "sklearn의 DummyClassifier를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.42105263157894735"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.datasets import load_iris\n",
    "from sklearn.dummy import DummyClassifier\n",
    "from sklearn.model_selection import train_test_split\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "iris = load_iris()\n",
    "\n",
    "# 타겟 벡터와 특성 행렬을 만듭니다.\n",
    "features, target = iris.data, iris.target\n",
    "\n",
    "# 훈련 세트와 테스트 세트로 나눕니다.\n",
    "features_train, features_test, target_train, target_test = train_test_split(features, target, random_state=0)\n",
    "\n",
    "# 더미 분류 모델을 만듭니다.\n",
    "dummy = DummyClassifier(strategy='uniform', random_state=1)\n",
    "\n",
    "# 모델을 훈련합니다.\n",
    "dummy.fit(features_train, target_train)\n",
    "\n",
    "# 정확도 점수를 계산합니다.\n",
    "dummy.score(features_test, target_test)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "훈련 다른 모델과 기본 모델을 비교하여 더 나은지 확인할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 9,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.9736842105263158"
      ]
     },
     "execution_count": 9,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.ensemble import RandomForestClassifier\n",
    "\n",
    "# 분류 모델을 만듭니다.\n",
    "classifier = RandomForestClassifier()\n",
    "\n",
    "# 모델을 훈련합니다.\n",
    "classifier.fit(features_train, target_train)\n",
    "\n",
    "# 정확도 점수를 계산합니다.\n",
    "classifier.score(features_test, target_test)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "분류 모델의 성능을 측정하는 일반적인 방법은 랜덤한 추측보다 얼마나 더 나은지 비교하는 것입니다.   \n",
    "sklearn의 DummyClassifier를 사용하면 이런 비교를 쉽게할 수 있습니다.   \n",
    "strategy 매개변수는 예측값을 생성하는 여러 가지 옵션을 제공합니다. 전형적으로 많이 사용하는 두 가지 전략이 있습니다.\n",
    "1. stratified 옵션은 훈련 세트에 있는 타겟 벡터의 클래스 비율에 비례하는 예측을 만듭니다.\n",
    "2. uniform 옵션은 클래스 비중이 균등하도록 랜덤하게 예측합니다.   \n",
    "   "
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "strategy에 자주 사용하는 또 다른 옵션은 most_frequent입니다. 이 옵션은 무조건 훈련 세트에서 가장 많은 타겟 레이블로 예측을 만듭니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,\n",
       "       2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])"
      ]
     },
     "execution_count": 10,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "dummy = DummyClassifier(strategy='most_frequent')\n",
    "dummy.fit(features_train, target_train)\n",
    "\n",
    "# 훈련 세트 타겟에서 가장 많은 값으로 예측합니다.\n",
    "dummy.predict(features_test)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "훈련 세트에 있는 타겟값을 확인해보면 클래스 레이블 2가 가장 많습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 11,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([37, 34, 41], dtype=int64)"
      ]
     },
     "execution_count": 11,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "import numpy as np\n",
    "\n",
    "# 훈련 세트의 타겟 개수를 확인합니다.\n",
    "np.bincount(target_train)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.4 이진 분류기의 예측 평가하기   \n",
    "   \n",
    "훈련된 분류 모델의 품질을 평가합니다.   \n",
    "sklearn의 cross_val_score 함수를 사용하여 교차검증을 수행할 때 scoring 매개변수에 성능 지표 중 하나를 선택할 수 있습니다.   \n",
    "정확도, 정밀도<sup>precision</sup>, 재현율<sup>recall</sup>, F-1 이 있습니다.   \n",
    "   \n",
    "정확도는 널리 사용되는 성능 지표입니다. 단순히 올바르게 예측된 샘플의 비율입니다.\n",
    ">$\n",
    "Accuracy = \\frac{TP + TN}{TP + TN + FP + FN}\n",
    "$   \n",
    "* TP: 진짜 양성 개수입니다. 양성 클래스 중에서 올바르게 예측한 샘플 개수입니다.\n",
    "* TN: 진짜 음성 개수입니다. 음성 클래스 중에서 올바르게 예측한 샘플 계수입니다.\n",
    "* FP: 거짓 양성 개수입니다. type I error라고도 부릅니다. 양성 클래스로 예측한 것 중에서 실제 음성 클래스인 샘플 개수입니다.\n",
    "* FN: 거짓 음성 개수입니다. type II error라고도 부릅니다. 음성 클래스로 예측한 것 중에서 실제 양성 클래스인 샘플 개수입니다.   \n",
    "   \n",
    "scoring=\"accuracy\"로 지정하여 기본값은 3-폴드 교차검증의 정확도를 측정할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0.9555, 0.95  , 0.9585, 0.9555, 0.956 ])"
      ]
     },
     "execution_count": 12,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.model_selection import cross_val_score\n",
    "from sklearn.linear_model import LogisticRegression\n",
    "from sklearn.datasets import make_classification\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 만듭니다.\n",
    "X, y = make_classification(n_samples = 10000,\n",
    "                           n_features = 3,\n",
    "                           n_informative = 3,\n",
    "                           n_redundant = 0,\n",
    "                           n_classes = 2,\n",
    "                           random_state = 1)\n",
    "\n",
    "# 로지스틱 회귀 모델을 만듭니다.\n",
    "logit = LogisticRegression()\n",
    "\n",
    "# 정확도를 사용하여 교차검증을 수행합니다.\n",
    "cross_val_score(logit, X, y, scoring=\"accuracy\")"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "정확도는 직관적이고 쉽게 설명할 수 있다는 것이 장점입니다.   \n",
    "정확도는 단순히 정확히 예측한 샘플의 비율입니다. 그러나 실전에서는 클래스 비율이 불균형한 데이터가 많습니다. (예를 들면 샘플의 99.9%는 클래스 1이고 0.1%만이 클래스 2인 경우) 클래스가 불균형하면 모델의 정확도는 높지만 예측 성능이 나쁜 역설적인 상황이 발생합니다.   \n",
    "예를 들어 전체 인구의 0.1%에서 발생하는 매우 희귀한 암의 발병을 예측한다고 가정해봅니다. 어떤 모델을 훈련한 후 95%의 정확도를 얻었습니다. 하지만 99.9%의 사람들이 암에 걸리지 않으므로 단순히 아무도 암에 걸리지 않았다고 예측하는 모델을 만들면 4.9%만큼 더 정확한 모델을 만들 수 있습니다. 사실 이 모델은 어떤 것도 예측하지 않습니다. 이런 이유 때문에 정밀도, 재현율, $ F_{1} $점수 같은 다른 지표를 사용하게 됩니다.   \n",
    "   \n",
    "정밀도는 양성으로 예측한 샘플 중에서 진짜 양성 클래스의 비율입니다.   \n",
    "이를 예측에 포함된 잡음이라고 생각할 수 있습니다. 즉 어떤 것을 양성 클래스로 예측했을 때 얼마나 올바른지를 나타냅니다. 높은 정밀도의 모델은 양성 클래스라고 확인이 높을 때만 양성 샘플로 예측합니다. 정밀도 공식은 다음과 같습니다.\n",
    ">$\n",
    "정밀도 = \\frac{TP}{TP + FP}\n",
    "$"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 13,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0.95963673, 0.94820717, 0.9635996 , 0.96149949, 0.96060606])"
      ]
     },
     "execution_count": 13,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 정밀도를 사용한 교차검증\n",
    "cross_val_score(logit, X, y, scoring=\"precision\")"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "재현율은 진짜 양성 샘플 중에서 양성으로 예측한 비율입니다.   \n",
    "재현율은 모델이 양성 클래스 샘플을 구분하는 능력을 측정합니다. 높은 재현율의 모델은 샘플을 양성 클래스로 예측하기 위해서 낮은 기준을 가집니다.   \n",
    ">$\n",
    "재현율 = \\frac{TP}{TP + FN}\n",
    "$\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 14,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0.951, 0.952, 0.953, 0.949, 0.951])"
      ]
     },
     "execution_count": 14,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 재현율을 사용한 교차검증\n",
    "cross_val_score(logit, X, y, scoring=\"recall\")"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "정확도와 비교했을 때 정밀도와 재현율은 덜 직관적입니다. 거의 항상 정밀도와 재현율 간의 균형을 맞추어야 합니다. 이를 위해 $ F_{1} $점수가 만들어졌습니다. $ F_{1} $은 정밀도와 재현율의 조화 평균<sup>harmonic mean</sup>입니다 (비율에 대한 평균의 한 종류).\n",
    ">$\n",
    "F_{1} = 2 \\times \\frac{정밀도 x 재현율}{정밀도 + 재현율}\n",
    "$"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "이는 진짜 양성 레이블을 가진 샘플을 양성으로 성공적으로 예측한 정도를 측정합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 15,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0.95529884, 0.9500998 , 0.95827049, 0.95520886, 0.95577889])"
      ]
     },
     "execution_count": 15,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# F1 점수를 사용한 교차검증\n",
    "cross_val_score(logit, X, y, scoring=\"f1\")"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "평가 지표로서 정확도는 유용한 성질을 가지고 있습니다. 특히 이해하기 쉽습니다. 하지만 종종 정밀도와 재현율의 균형을 맞추는 것이 더 좋은 지표가 됩니다. 즉 비관적인 모델과 긍정적인 모델 사이의 트레이드오프입니다. $ F_{1} $은 정밀도와 재현율을 비교적 동등하게 취급하여 이 둘 사이의 균형을 표현합니다.   \n",
    "   \n",
    "CROSS_VAL_SCORE를 사용하는 대신 진짜 y 값과 예측한 y 값이 있으면 직접 정확도와 재현율을 계산할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 16,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.947"
      ]
     },
     "execution_count": 16,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.model_selection import train_test_split\n",
    "from sklearn.metrics import accuracy_score\n",
    "\n",
    "# 훈련 세트와 테스트 세트로 나눕니다.\n",
    "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=1)\n",
    "\n",
    "# 테스트 세트의 예측을 만듭니다.\n",
    "y_hat = logit.fit(X_train, y_train).predict(X_test)\n",
    "\n",
    "# 정확도를 계산합니다.\n",
    "accuracy_score(y_test, y_hat)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "cross_val_score 함수의 cv 매개변수를 지정하지 않으면 회귀일 때는 KFold, 분류일 때는 StratifiedKFold 분할기가 사용됩니다. cv 매개변수에 정수를 입력하여 기본 분할기의 폴드 수를 지정할 수도 있습니다.   \n",
    "   \n",
    "skleran v0.19에서 cross_validate 함수가 추가되었습니다. 이 함수는 cross_val_score와 사용법이 매우 비슷하지만 scoring 매개변수에 여러 개의 평가 지표를 추가할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 17,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "{'fit_time': array([0.01211786, 0.01238918, 0.01191044, 0.01131439, 0.01084232]),\n",
       " 'score_time': array([0.0019803 , 0.00102544, 0.00199318, 0.0010097 , 0.00099707]),\n",
       " 'test_accuracy': array([0.9555, 0.95  , 0.9585, 0.9555, 0.956 ]),\n",
       " 'test_precision': array([0.95963673, 0.94820717, 0.9635996 , 0.96149949, 0.96060606])}"
      ]
     },
     "execution_count": 17,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.model_selection import cross_validate\n",
    "\n",
    "# 정확도와 정밀도를 사용한 교차검증\n",
    "cross_validate(logit, X, y, scoring=[\"accuracy\", \"precision\"])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.5 이진 분류기 임곗값 평가하기   \n",
    "   \n",
    "이진 분류기를 여러 가지 확률 임곗값으로 평가합니다.   \n",
    "ROC<sup>receiving operating characteristic</sup> 곡선은 이진 분류기의 품질을 평가하는 데 널리 사용하는 방법입니다.   \n",
    "ROC는 확률 임곗값(즉 어떤 샘플을 한 클래스로 예측할 확률)마다 진짜 양성과 거짓 양성 개수를 비교합니다. ROC 곡선을 그리면 모델의 성능을 확인할 수 있습니다. 모든 샘플을 올바르게 예측하는 분류기는 다음 그래프의 밝은 회색 실선처럼 바로 수직으로 꼭대기까지 올라갑니다. 랜덤하게 예측하는 분류기는 대각선으로 나타납니다. 좋은 모델일수록 실선에 가깝습니다. sklearn에서는 roc_curve 함수를 사용하여 임곗값마다 진짜 양성과 거짓 양성을 계산하여 그래프를 그릴 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 18,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "image/png": "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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    }
   ],
   "source": [
    "import matplotlib.pyplot as plt\n",
    "from sklearn.datasets import make_classification\n",
    "from sklearn.linear_model import LogisticRegression\n",
    "from sklearn.metrics import roc_curve, roc_auc_score\n",
    "from sklearn.model_selection import train_test_split\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 만듭니다.\n",
    "features, target = make_classification(n_samples=10000,\n",
    "                                       n_features=10,\n",
    "                                       n_classes=2,\n",
    "                                       n_informative=3,\n",
    "                                       random_state=3)\n",
    "\n",
    "# 훈련 세트와 테스트 세트로 나눕니다.\n",
    "features_train, features_test, target_train, target_test = train_test_split(features, target, test_size=0.1, random_state=1)\n",
    "\n",
    "# 분류기를 만듭니다.\n",
    "logit = LogisticRegression()\n",
    "\n",
    "# 모델을 훈련합니다.\n",
    "logit.fit(features_train, target_train)\n",
    "\n",
    "# 예측 확률을 게산합니다.\n",
    "target_probabilities = logit.predict_proba(features_test)[:, 1]\n",
    "\n",
    "# 진짜 양성 비율과 거짓 양성 비율을 계산합니다.\n",
    "false_positive_rate, true_positive_rate, threshold = roc_curve(target_test, target_probabilities)\n",
    "\n",
    "# ROC 곡선을 그립니다.\n",
    "plt.title(\"Receiver Operating Chracteristic\")\n",
    "plt.plot(false_positive_rate, true_positive_rate)\n",
    "plt.plot([0, 1], ls=\"--\")\n",
    "plt.plot([0, 0], [1, 0], c=\".7\"), plt.plot([1, 1], c=\".7\")\n",
    "plt.ylabel(\"True Positive Rate\")\n",
    "plt.xlabel(\"False Positive Rate\")\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "지금까지는 예측값을 기반으로 모델을 평가했습니다. 하지만 많은 머신러닝 알고리즘들은 확률을 기반으로 예측값을 만듭니다. 즉, 모든 샘플은 각 클래스에 속할 명시적인 확률이 주어집니다. predict_proba 메서드를 사용하여 해결에 있는 첫 번째 샘플에 대한 예측 확률을 확인할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 19,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[0.86891533, 0.13108467]])"
      ]
     },
     "execution_count": 19,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 예측 확률을 계산합니다.\n",
    "logit.predict_proba(features_test)[0:1]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "classes_를 사용하여 클래스를 확인할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 20,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0, 1])"
      ]
     },
     "execution_count": 20,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "logit.classes_"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "이 예에서 첫 번째 샘플은 음성 클래스(0)가 될 가능성이 87% 정도이고 양성 클래스(1)가 될 가능성은 13%입니다.   \n",
    "기본적으로 sklearn은 확률이 0.5(임곗값)보다 크면 양성 클래스로 예측합니다. 종종 실제 필요에 의해 중간값보다 다른 임곗값을 사용해 모델을 편향되게 만들어야 할 때가 있습니다. 예를 들면 거짓 양성이 회사에서 매우 큰 비용을 치르게 한다면 확률 임곗값이 높은 모델을 선호합니다. 일부 양성 샘플을 예측하지 못할 수 있지만 양성으로 예측된 샘플은 이 예측이 맞을 것이라고 강하게 확인할 수 있습니다. 이는 진짜 양성 비율(TPR)과 거짓 양성 비율(FPR) 사이의 트레이드오프<sup>trade-off</sup>입니다. 진짜 양성 비율은 올바르게 예측된 양성 샘플 개수를 전체 진짜 양성 샘플의 수로 나눈 것입니다.   \n",
    ">$\n",
    "진짜 양성 비율 (TPR) = \\frac{TP}{TP + FN}\n",
    "$   \n",
    "   \n",
    "거짓 양성 비율은 잘못 예측된 양성 클래스 개수를 모든 진짜 음성 클래스 샘플수로 나눈 것입니다.   \n",
    ">$\n",
    "거짓 양성 비율(FPR) = \\frac{FP}{FP + TN}\n",
    "$   \n",
    "   \n",
    "ROC 곡선은 확률 임곗값마다 TPR과 FPR을 나타냅니다. 예를 들어 해결에서 임곗값이 0.5일 때 TPR은 0.81이고 FPR은 0.15입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 21,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "임곗값:  0.5331715230155316\n",
      "진짜 양상 비율:  0.810204081632653\n",
      "거짓 양성 비율:  0.14901960784313725\n"
     ]
    }
   ],
   "source": [
    "print(\"임곗값: \", threshold[116])\n",
    "print(\"진짜 양상 비율: \", true_positive_rate[116])\n",
    "print(\"거짓 양성 비율: \", false_positive_rate[116])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "임곗값을 80%로 증가시키면(즉, 샘플을 양성으로 예측하기 위해 모델이 확인하는 정도를 증가시키면) TPR과 FPR이 크게 감소합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 22,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "임곗값:  0.8189133876659292\n",
      "진짜 양상 비율:  0.5448979591836735\n",
      "거짓 양성 비율:  0.047058823529411764\n"
     ]
    }
   ],
   "source": [
    "print(\"임곗값: \", threshold[45])\n",
    "print(\"진짜 양상 비율: \", true_positive_rate[45])\n",
    "print(\"거짓 양성 비율: \", false_positive_rate[45])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "양성 클래스로 예측하기 위한 기준을 높였기 때문에 모델이 많은 양성 샘플을 구분하지 못했습니다. (낮은 TPR)   \n",
    "또한 양성 클래스로 예측되는 음성 샘플의 수를 감소시킵니다. (FPR을 낮춤)   \n",
    "   \n",
    "TPR과 FPR 간의 트레이드오프를 시각화하는 것 외에 ROC 곡선은 일반적은 모델 지표로 사용할 수도 있습니다.   \n",
    "좋은 모델일수록 곡선이 위로 올라가므로 곡선 아래 면적이 커집니다.   \n",
    "이런 이유로 ROC 곡선 아래 면적(AUCROC)을 계산하여 모든 가능한 임곗값에서 모델의 전반적인 품질을 평가합니다.   \n",
    "AUCROC가 1에 가까울수록 더 좋은 모델입니다. sklearn에서는 roc_auc_score 함수를 사용하여 AUCROC를 계산할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 23,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.9073389355742297"
      ]
     },
     "execution_count": 23,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# ROC 곡선 아래 면적을 계산합니다.\n",
    "roc_auc_score(target_test, target_probabilities)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "TPR은 재현율의 다른 이름입니다.   \n",
    "ROC 곡선 외에 정밀도와 재현율을 사용한 정밀도-재현율 곡선을 그려 모델을 평가할 수도 있습니다. precision_recall_curve 함수를 사용해 임계점마다 정밀도와 재현율을 계산하여 정밀도-재현율 곡선을 그립니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 24,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "image/png": "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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    }
   ],
   "source": [
    "from sklearn.metrics import precision_recall_curve\n",
    "\n",
    "# 진짜 양성 비율과 거짓 양성 비율과 계산합니다.\n",
    "precision, recall, threshold = precision_recall_curve(target_test, target_probabilities)\n",
    "\n",
    "# ROC 곡선을 그립니다.\n",
    "plt.title(\"Precision-Recall Curve\")\n",
    "plt.plot(precision, recall)\n",
    "plt.plot([0, 1], ls=\"--\")\n",
    "plt.plot([1, 1], c=\".7\"), plt.plot([1, 1], [1, 0], c=\".7\")\n",
    "plt.ylabel(\"Precision\")\n",
    "plt.xlabel(\"Recall\")\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "정밀도-재현율 곡선에서는 오른쪽 맨 위에 가까울수록 좋은 모델입니다. 이 곡선의 아래 면적을 평균 정밀도라고 부르며 average_precision_score 함수를 사용해 계산할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 25,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.8984128719848977"
      ]
     },
     "execution_count": 25,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.metrics import average_precision_score\n",
    "\n",
    "# 평균 정밀도를 계산합니다.\n",
    "average_precision_score(target_test, target_probabilities)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "다음처럼 교차검증 함수의 scoring 매개변수에 ROCAUC와 평균 정밀도를 평가 지표로 지정할 수도 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 26,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "{'fit_time': array([0.01196694, 0.01173186, 0.00997281, 0.01097131, 0.00997376]),\n",
       " 'score_time': array([0.00199461, 0.00199485, 0.00199461, 0.00199437, 0.00199485]),\n",
       " 'test_roc_auc': array([0.9007689, 0.918251 , 0.90882  , 0.915359 , 0.90261  ]),\n",
       " 'test_average_precision': array([0.90028629, 0.90967443, 0.90296471, 0.91135611, 0.88797021])}"
      ]
     },
     "execution_count": 26,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "cross_validate(logit, features, target, scoring=[\"roc_auc\", \"average_precision\"])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.6 다중클래스 분류기 예측 평가하기   \n",
    "   \n",
    "세 개 이상의 클래스를 예측하는 모델의 성능을 평가합니다.   \n",
    "세 개 이상의 클래스를 다룰 수 있는 평가 지표로 교차검증을 수행합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 27,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0.347 , 0.34  , 0.34  , 0.3275, 0.342 ])"
      ]
     },
     "execution_count": 27,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.model_selection import cross_val_score\n",
    "from sklearn.linear_model import LogisticRegression\n",
    "from sklearn.datasets import make_classification\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 만듭니다.\n",
    "featues, target = make_classification(n_samples = 10000,\n",
    "                                      n_features = 3,\n",
    "                                      n_informative = 3,\n",
    "                                      n_redundant = 0,\n",
    "                                      n_classes = 3,\n",
    "                                      random_state = 1)\n",
    "\n",
    "# 로지스틱 회귀 모델을 만듭니다.\n",
    "logit = LogisticRegression()\n",
    "\n",
    "# 정확도를 사용하여 교차검증을 수행합니다.\n",
    "cross_val_score(logit, features, target, scoring='accuracy')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "클래스가 균형 잡혀 있을 때 (예를 들어 타겟 벡터의 클래스에 속한 샘플 개수가 거의 동일할 때) 이진 클래스의 경우와 같이 정확도는 간단하고 해석이 용이한 평가 지표입니다. 정확도는 올바르게 예측한 수를 전체 샘플 수로 나눈 것이고 이진 분류에서처럼 다중 클래스에서도 잘 맞습니다. 그러나 (흔한 경우인) 불균형한 클래스에서는 다른 평가 지표를 사용하는 것이 낫습니다.   \n",
    "   \n",
    "sklearn에 포함된 지표 중 다수는 이진 분류기를 평가하는 용도입니다. 하지만 이런 지표를 클래스가 두 개 이상일 때로 확장할 수 있습니다. 정밀도, 재현율, $ F_{1} $ 점수는 이전 레시피에서 자세히 다루었습니다. 이들은 원래 이진 분류기를 위해 고안되었지만 훈련 데이터를 이진 클래스처럼 취급하는 방식으로 다중 클래스 환경에도 적용할 수 있습니다. 데이터에 하나의 클래스만 있는 것처럼 각 클래스에서 측정한 값을 수집하여 평균함으로써 전체 클래스에 대한 평가 점수를 얻을 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 28,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0.3458269 , 0.33799631, 0.3399761 , 0.32683867, 0.34101643])"
      ]
     },
     "execution_count": 28,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 마크로 평균 F1 점수를 사용하여 교차검증을 수행합니다.\n",
    "cross_val_score(logit, features, target, scoring='f1_macro')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "이 코드에서 _macro는 클래스별 평가 점수를 평균하는 방법을 나타냅니다.   \n",
    "* macro: 각 클래스를 동등한 가중치로 클래스별 측정 점수를 평균합니다.\n",
    "* weighted: 샘플 개수에 비례하여 각 클래스별 측정 점수를 평균합니다.\n",
    "* micro: 클래스별로 TP, TN, FP, FN을 모두 더하여 계산합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.7 분류기 성능 시각화하기   \n",
    "   \n",
    "테스트 데이터의 예측 클래스와 진짜 클래스를 바탕으로 모델의 품질을 시각적으로 비교하고 싶습니다.   \n",
    "오차 행렬<sup>confusion matrix</sup>을 사용해 예측 클래스와 진짜 클래스를 비교합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 29,
   "metadata": {},
   "outputs": [
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:762: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n"
     ]
    },
    {
     "data": {
      "image/png": "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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    }
   ],
   "source": [
    "import matplotlib.pyplot as plt\n",
    "import seaborn as sns\n",
    "from sklearn import datasets\n",
    "from sklearn.linear_model import LogisticRegression\n",
    "from sklearn.model_selection import train_test_split\n",
    "from sklearn.metrics import confusion_matrix\n",
    "import pandas as pd\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "iris = datasets.load_iris()\n",
    "\n",
    "# 특성 행렬을 만듭니다.\n",
    "features = iris.data\n",
    "\n",
    "# 타겟 벡터를 만듭니다.\n",
    "target = iris.target\n",
    "\n",
    "# 클래스 이름의 리스트를 만듭니다.\n",
    "class_names = iris.target_names\n",
    "\n",
    "# 훈련 세트와 테스트 세트를 만듭니다.\n",
    "features_train, features_test, target_train, target_test = train_test_split(features, target, random_state=1)\n",
    "\n",
    "# 로지스틱 회귀 모델을 만듭니다.\n",
    "classifier = LogisticRegression()\n",
    "\n",
    "# 모델을 훈련하고 예측 결과를 게산합니다.\n",
    "target_predicted = classifier.fit(features_train, target_train).predict(features_test)\n",
    "\n",
    "# 오차 행렬을 만듭니다.\n",
    "matrix = confusion_matrix(target_test, target_predicted)\n",
    "\n",
    "# pandas dataframe을 만듭니다.\n",
    "dataframe = pd.DataFrame(matrix, index=class_names, columns=class_names)\n",
    "\n",
    "# heatmap을 만듭니다.\n",
    "sns.heatmap(dataframe, annot=True, cbar=None, cmap=\"Blues\")\n",
    "plt.title(\"Confusion Matrix\"), plt.tight_layout()\n",
    "plt.ylabel(\"True Class\"), plt.xlabel(\"Predicted Class\")\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "오차 행렬은 분류기의 성능을 쉽고 효괒거으로 보여주는 도구입니다. 오차 행렬의 핵심 장점 중 하나는 해석이 용이하다는 것입니다.   \n",
    "이 행렬의 열은 예측 클래스를 나타내고 행은 진짜 클래스를 나타냅니다. 각 셀은 예측과 진짜의 가능한 조합 중 하나가 됩니다.   \n",
    "   \n",
    "오차 행렬에 대해 세 가지 언급할 내용이 있습니다.   \n",
    "1. 완벽한 모델은 대각선에만 값이 있고 나머지는 모두 0입니다.   \n",
    "2. 오차 해렬은 모델이 나쁘다는 것뿐만 아니라 어떻게 나쁜지도 알려줍니다. 즉 잘못 분류된 패턴을 확인할 수 있습니다.   \n",
    "3. 오차 행렬은 다중 클래스 환경에도 잘 동작합니다. (타겟 벡터에 백만 개의 클래스가 있다면 오차 행렬을 그래프로 나타내기는 어렵습니다).   \n",
    "   \n",
    "sklearn의 confusion_matrix 함수를 사용하여 오차 행렬을 계산할 수도 있습니다.   \n",
    "이 행렬의 행과 열은 해결에 나온 오차 행렬 그래프의 행과 열과 같습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 30,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[13,  0,  0],\n",
       "       [ 0, 15,  1],\n",
       "       [ 0,  0,  9]], dtype=int64)"
      ]
     },
     "execution_count": 30,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.metrics import confusion_matrix\n",
    "\n",
    "confusion_matrix(target_test, target_predicted)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.8 회귀 모델 평가하기   \n",
    "   \n",
    "회귀 모델의 성능을 평가합니다.   \n",
    "평균 제곱 오차<sup>mean squared error, MSE</sup>를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 31,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([-1974.65337976, -2004.54137625, -3935.19355723, -1060.04361386,\n",
       "       -1598.74104702])"
      ]
     },
     "execution_count": 31,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.datasets import make_regression\n",
    "from sklearn.model_selection import cross_val_score\n",
    "from sklearn.linear_model import LinearRegression\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 만듭니다.\n",
    "features, target = make_regression(n_samples = 100,\n",
    "                                   n_features = 3,\n",
    "                                   n_informative = 3,\n",
    "                                   n_targets = 1,\n",
    "                                   noise = 50,\n",
    "                                   coef = False,\n",
    "                                   random_state = 1)\n",
    "\n",
    "# 선형 회귀 모델을 만듭니다.\n",
    "ols = LinearRegression()\n",
    "\n",
    "# 음의 MSE를 사용한 교차검증을 수행합니다.\n",
    "cross_val_score(ols, features, target, scoring='neg_mean_squared_error')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "자주 사용하는 또 다른 회귀 지표는 결정계수 R<sup>2</sup>입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 32,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0.8622399 , 0.85838075, 0.74723548, 0.91354743, 0.84469331])"
      ]
     },
     "execution_count": 32,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# R^2를 사용한 교차검증을 수행합니다.\n",
    "cross_val_score(ols, features, target, scoring='r2')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "MSE는 가장 널리 사용하는 회귀 모델 평가 지표입비다.   \n",
    ">$\n",
    "MSE = \\frac{1}{n} \\sum_{i=1}^n (\\hat{y}_{i} - y_{i})^2\n",
    "$   \n",
    "여기에서 n은 샘플 개수이고 $ y_{i} $는 예측하려는 샘플 i의 진짜 타겟값입니다.   \n",
    "$ \\hat{y}_{i} $는 $ y_{i} $에 대한 모델의 예측값입니다.   \n",
    "MSE는 예측값과 진짜 값 사이의 모든 거리를 제곱하여 더한 값입니다. MSE 값이 클수록 전체 제곱 오차가 더 커지므로 더 나쁜 모델입니다.   \n",
    "오차항을 제곱하면 모든 오차를 양수로 만듭니다.   \n",
    "   \n",
    "한 가지 중요한 점은 기본적으로 sklearn의 scoring 매개변수값은 높은 값이 낮은 값보다 좋은 것이어야 합니다.   \n",
    "MSE는 반대로 높은 값이 더 나쁜 모델을 의미합니다.   \n",
    "이런 이유 때문에 sklearn은 neg_mean_squared_error를 사용하여 음의 MSE를 전달해야 합니다.   \n",
    "   \n",
    "널리 사용하는 다른 회귀 평가 지표는 R<sup>2</sup>입니다. 이 지표는 모델이 설명하는 타겟 벡터의 분산을 측정합니다.   \n",
    ">$\n",
    "R^2 = 1 - \\frac{\\sum_{i=1}^n (y_{i} - \\hat{y}_{i})^2}{\\sum_{i=1}^n (y_{i} - \\bar{y})^2}\n",
    "$   \n",
    "$ y_{i} $는 i번째 샘플의 진짜 타겟값이고 $ \\hat{y}_{i} $는 i번째 샘플의 예측값입니다. $ \\bar{y} $는 타겟 벡터의 평균값입니다. 이 값이 1.0에 가까울수록 더 좋은 모델입니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.9 군집 모델 평가하기   \n",
    "   \n",
    "데이터를 cluster로 모으기 위해 비지도 학습 알고리즘을 사용했습니다. 이 모델이 얼마나 잘 동작했는지 알고 싶습니다.   \n",
    "간단히 대답하면 아마도 알 수 없습니다. 적어도 원하는 방식은 아닐 것입니다.   \n",
    "clustering을 평가하는 한 가지 방법은 cluster의 품질을 측정하는 실루엣 계수<sup>silhouette coefficients</sup>입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 35,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.8916265564072142"
      ]
     },
     "execution_count": 35,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "import numpy as np\n",
    "from sklearn.metrics import silhouette_score\n",
    "from sklearn import datasets\n",
    "from sklearn.cluster import KMeans\n",
    "from sklearn.datasets import make_blobs\n",
    "\n",
    "# 특성 행렬을 생성합니다.\n",
    "features, _ = make_blobs(n_samples = 1000,\n",
    "                         n_features = 10,\n",
    "                         centers = 2,\n",
    "                         cluster_std = 0.5,\n",
    "                         shuffle = True,\n",
    "                         random_state = 1)\n",
    "\n",
    "# k-평균을 사용하여 데이터를 clustering하고 클래스를 예측합니다.\n",
    "model = KMeans(n_clusters =2, random_state=1).fit(features)\n",
    "\n",
    "# 예측된 클래스\n",
    "target_predicted = model.labels_\n",
    "\n",
    "# 모델을 평가합니다.\n",
    "silhouette_score(features, target_predicted)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "지도 학습 모델 평가는 타겟 벡터의 정답값과 예측값을 비교합니다.   \n",
    "clustering 방법을 사용하는 대부분의 이유는 타겟 벡터가 없기 때문입니다. 하지만 여러 가지 clustering 지표는 타겟 벡터를 필요로 합니다. 타겟 벡터를 가지고 있을 때 clustering 같은 비지도 학습 방법을 사용하면 불필욯게 스스로를 제약하는 셈입니다.   \n",
    "   \n",
    "타겟 벡터가 없기 때문에 예측과 정답을 평가할 수 없지만 군집 자체의 특성을 평가할 수 있습니다.   \n",
    "cluster 내의 샘플 간의 거리는 가깝고 (즉, 조밀한 cluster) cluster 간 거리는 먼 것(즉, 잘 구분된 cluster)이 좋은 cluster라고 직관적으로 생각할 수 있습니다. 실루엣 계수는 이 두 특성을 측정한 하나의 수치를 제공합니다. i번째 샘플의 실루엣 계수를 구하는 공식은 다음과 같습니다.   \n",
    ">$\n",
    "s_{i} = \\frac{b_{i} - a_{i}}{max(a_{i}, b_{i})}\n",
    "$   \n",
    "여기에서 $ s_{i} $는 샘플 i의 실루엣 계수입니다.   \n",
    "$ a_{i} $는 샘플 i와 같은 클래스 안에 있는 모든 다른 샘플 사이의 평균 거리입니다.   \n",
    "$ b_{i} $는 샘플 i와 가장 가까운 다른 cluster 안에 있는 샘플 사이의 평균 거리입니다.   \n",
    "silhouette_score 함수의 반환값은 모든 샘플의 실루엣 계수를 평균한 값입니다. 실루엣 계수의 범위는 -1과 1 사이입니다. 1은 조밀하고 잘 구분되는 cluster를 의미합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.10 사용자 정의 평가 지표 만들기   \n",
    "   \n",
    "자신만의 지표를 사용하여 모델을 평가하고 싶습니다.   \n",
    "평가 방법을 함수로 만들고 sklearn의 make_scorer 함수를 사용하여 score function으로 변환합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 40,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.9997906102882058"
      ]
     },
     "execution_count": 40,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn.metrics import make_scorer, r2_score\n",
    "from sklearn.model_selection import train_test_split\n",
    "from sklearn.linear_model import Ridge\n",
    "from sklearn.datasets import make_regression\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 만듭니다.\n",
    "features, target = make_regression(n_samples = 100,\n",
    "                                   n_features = 3,\n",
    "                                   random_state = 1)\n",
    "\n",
    "# 훈련 세트와 테스트 세트를 만듭니다.\n",
    "features_train, features_test, target_train, target_test = train_test_split(features, target, test_size=0.10, random_state =1)\n",
    "\n",
    "# 사용자 정의 지표를 만듭니다.\n",
    "def custom_metric(target_test, target_predicted):\n",
    "    # R^2 점수를 계산합니다.\n",
    "    r2 = r2_score(target_test, target_predicted)\n",
    "    # R^2 점수를 반환합니다.\n",
    "    return r2\n",
    "\n",
    "# 높은 점수가 좋은 것을 나타내는 스코어 함수를 만듭니다.\n",
    "score = make_scorer(custom_metric, greater_is_better=True)\n",
    "\n",
    "# ridge 회귀 모델을 만듭니다.\n",
    "classifier = Ridge()\n",
    "\n",
    "# ridge 회귀 모델을 훈련합니다.\n",
    "model = classifier.fit(features_train, target_train)\n",
    "\n",
    "# 사용자 정의 스코어 함수를 적용합니다.\n",
    "score(model, features_test, target_test)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "sklearn이 모델 성능을 평가하는 함수를 많이 제공하지만 종종 자신만의 측정 지표를 정의해야 할 경우가 있습니다.   \n",
    "sklearn의 make_scorer 함수를 사용하면 간단합니다.   \n",
    "먼저 두 개의 매개변수를 가진 함수를 정의합니다. 이 함수는 정답 타겟 벡터와 예측값을 받고 어떤 점수를 출력합니다.   \n",
    "그 다음 make_scorer 함수를 사용해 스코어 객체를 만듭니다. 높은 점수와 낮은 점수 중에 (greater_is_better 매개변수를 사용해) 바람직한 것을 지정합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.11 훈련 세트 크기에 따른 영향을 시각화하기   \n",
    "   \n",
    "어떤 측정 지표(정확도, $ F_{1} $등)로 훈련 세트에 있는 샘플 개수에 따른 영향을 평가하고 싶습니다.   \n",
    "학습 곡선<sup>learning curve</sup>를 그립니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 43,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "image/png": "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jfLycrZt20ZKSgpJSUn7rDorKytj8+bNFBYWUlZWRq9evejduzcJCQktvnZlZSVz587lySefZMuWLRx22GHMmDGDfv360aNHDyIjIxsdc8wxx9RbrqqqoqCgAGOMJynFxsZis/3e3s0Yw7Zt21i7di3r1q1j7dq1LF26lIKCAo4//nimTJlCv379Whx/MGgJSinVLlRUVLB69WpWrVrFqlWryMvLIzU1la5du5KVlUXXrl097x0OB9u2bfNUm7mr0PLy8jwlkKioKFJTU0lLS/O8YmNjKSwspKCggM2bN3tKIg1lZmaSnZ1N37596dOnD927dyctLY309HTS0tKIjo727FtaWsq///1vnnnmGbZv387gwYOZPHkyw4YNa/VnS82pra0lIqL1yySBLEFpglJK1VNXV0dNTQ0Oh6PJfYwxbNq0yXPzX7lyJatXryYiIsJzo3bfrN3vO3fuTNeuXfdZctmzZw95eXmsXbuWtWvXehJSfn6+J7nExsbSrVs3du/eTXFxMXV1dfXOERcXR0VFhWe5S5cu9O3bl759+5KZmUlJSQk7d+70vHbs2MHOnTvZu3cv6enpZGZm0qlTJzIzM8nMzCQjI4PY2Fg2b95Mfn4+GzduJD8/n/z8fMrLyxt9hsTERE/SW716NSUlJRx33HFMnjyZQYMGtfB/JLRpFZ9SqkVKS0v54YcfqKys5PTTTycuLm6fx+zatYsXX3yR2bNns23bNqKioho1OU5MTGTHjh2sXLmS0tJSwPWco3v37mRnZ2OMYceOHSxbtoydO3f6vHnHx8eTlZVFt27d6Nq1K126dKG4uJh169axbt06Nm3a5ElEIkLXrl3Jzs5mxIgR9O3bl+zsbDIzMz3VWrW1tRQXF7N161a2bNnC1q1b2bFjB926dfOUcLwbChyI7Ozsesvuz+u+pnfScye+oUOHMnHiRA499NBWiSGcaAlKqYPA9u3b+e677/j222/57rvvWLlyJU6nE3CVJs4991zGjx/Pscce26j0kp+fz6xZs3j55ZeprKzk2GOPZfDgwfWaHLv/LSsrIyEhgb59+3LIIYfQt29fevfuTUxMjM+49u7dy65duzw3ce8ksmXLFrZs2UJZWRkOh4Pu3bvTvXt3evbsSY8ePejevTvdunVrtiSngk+r+LxoglLtRVVVFRs2bODXX3/l119/Zf369RQX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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    }
   ],
   "source": [
    "import numpy as np\n",
    "import matplotlib.pyplot as plt\n",
    "from sklearn.ensemble import RandomForestClassifier\n",
    "from sklearn.datasets import load_digits\n",
    "from sklearn.model_selection import learning_curve\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "digits = load_digits()\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 만듭니다.\n",
    "features, target = digits.data, digits.target\n",
    "\n",
    "# 다양한 훈련 세트 크기에서 교차검증 훈련 점수와 테스트 점수를 계산합니다.\n",
    "train_sizes, train_scores, test_scores = learning_curve(RandomForestClassifier(), # 분류기\n",
    "                                                        features, # 특성 행렬\n",
    "                                                        target, # 타겟 벡터\n",
    "                                                        cv=10, # 폴드 수\n",
    "                                                        scoring='accuracy', # 성능 지표\n",
    "                                                        n_jobs=-1, # 모든 코어 사용\n",
    "                                                        train_sizes=np.linspace(0.01, 1.0, 50)) # 50개의 훈련 세트 크기\n",
    "\n",
    "# 훈련 세트 점수의 평균과 표준편차를 구합니다.\n",
    "train_mean = np.mean(train_scores, axis=1)\n",
    "train_std = np.std(train_scores, axis=1)\n",
    "\n",
    "# 테스트 세트 점수의 평균과 표준편차를 구합니다.\n",
    "test_mean = np.mean(test_scores, axis=1)\n",
    "test_std = np.std(test_scores, axis=1)\n",
    "\n",
    "# 그래프를 그립니다.\n",
    "plt.plot(train_sizes, train_mean, '--', color=\"#111111\", label=\"Training score\")\n",
    "plt.plot(train_sizes, test_mean, color=\"#111111\", label=\"Cross-validation score\")\n",
    "\n",
    "# 표준편차 영역을 그립니다.\n",
    "plt.fill_between(train_sizes, train_mean - train_std, train_mean + train_std, color=\"#DDDDDD\")\n",
    "plt.fill_between(train_sizes, test_mean - test_std, test_mean + train_std, color=\"#DDDDDD\")\n",
    "\n",
    "# 그래프를 출력합니다.\n",
    "plt.title(\"Learning Curve\")\n",
    "plt.xlabel(\"Training Set Size\"), plt.ylabel(\"Accuracy Score\")\n",
    "plt.legend(loc=\"best\")\n",
    "plt.tight_layout()\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "학습 곡선은 훈련 세트의 샘플 수가 증가함에 따라 훈련 세트와 교차검증의 성능(예를 들면, 정확도나 재현율)을 시각화합니다. 더 많은 훈련 데이터를 모아서 학습 알고리즘에 도움될지 결정하는 데 널리 사용됩니다.   \n",
    "   \n",
    "해결에서 훈련 세트 샘플의 1%에서 100%까지 50개 크기에서 랜덤 포레스트<sup>random forest</sup> 분류기의 정확도를 그래프로 그렸습니다. 모델의 교차검증 정확도가 증가하면 추가적인 샘플이 도움이 된다는 것을 의미합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.12 평가 지표 리포트 만들기   \n",
    "   \n",
    "분류기 성능을 간단하게 요약합니다.   \n",
    "sklearn의 classification_report를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 44,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "              precision    recall  f1-score   support\n",
      "\n",
      "      setosa       1.00      1.00      1.00        13\n",
      "  versicolor       1.00      0.94      0.97        16\n",
      "   virginica       0.90      1.00      0.95         9\n",
      "\n",
      "    accuracy                           0.97        38\n",
      "   macro avg       0.97      0.98      0.97        38\n",
      "weighted avg       0.98      0.97      0.97        38\n",
      "\n"
     ]
    },
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:762: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n"
     ]
    }
   ],
   "source": [
    "from sklearn import datasets\n",
    "from sklearn.linear_model import LogisticRegression\n",
    "from sklearn.model_selection import train_test_split\n",
    "from sklearn.metrics import classification_report\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "iris = datasets.load_iris()\n",
    "\n",
    "# 특성 행렬을 만듭니다.\n",
    "features = iris.data\n",
    "\n",
    "# 타겟 벡터를 만듭니다.\n",
    "target = iris.target\n",
    "\n",
    "# 타겟 클래스 이름의 리스트를 만듭니다.\n",
    "class_names = iris.target_names\n",
    "\n",
    "# 훈련 세트와 테스트 세트를 만듭니다.\n",
    "features_train, features_test, target_train, target_test = train_test_split(features, target, random_state=1)\n",
    "\n",
    "# 로지스틱 회귀 모델을 만듭니다.\n",
    "classifier = LogisticRegression()\n",
    "\n",
    "# 모델을 훈련하고 예측을 만듭니다.\n",
    "model = classifier.fit(features_train, target_train)\n",
    "target_predicted = model.predict(features_test)\n",
    "\n",
    "# 분류 리포트를 만듭니다.\n",
    "print(classification_report(target_test, target_predicted, target_names=class_names))"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "classification_report는 정밀도, 재현율, F1-점수와 같이 자주 사용하는 평가 지표를 요약하여 보여줍니다. support는 각 클래스에 속한 샘플의 개수를 의미합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "classification_report는 첫 번째 블럭에서 각 클래스를 양성 클래스로 가정했을 때 점수를 보여줍니다.   \n",
    "두 번째 블럭은 micro, macro, weighted 평균값을 출력합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 11.13 하이퍼파라미터 값의 영향을 시각화하기   \n",
    "   \n",
    "일부 하이퍼파라미터 값을 변경할 때 모델의 성능 변화를 알고 싶습니다.   \n",
    "검증 곡선<sup>validation curve</sup>를 그립니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 45,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "image/png": "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A3D//feTnp7Ovffea8/v7u4mPj58ljZ//nzmz5/f7z7Wrl07JGkdan0d25Fs5B1xL7SjWKUid/fdd9vBYqjMnTuX3/zmNwNa5+abbyYnJ4ePPvqI448/nqVLl3L33XfT0dFBSkoKjzzyCDNmzOCtt97iV7/6FS+99BL3338/paWllJSUUFpayt13322XrtLT02ltbeWtt97i/vvvJy8vj23btnHCCSfw+OOPIyKsWrWKb33rW+Tl5XH88cdTUlLCSy+9FJSu7du3c8stt9DZ2YnP5+O5555j+vTpLFu2jF/96leICHPmzOGxxx5j37593HrrrdTU1DB69GgeeeQRJkyY0OPYvv71r3PHHXdQU1NDamoqDz30EDNnzhyq0z8saYAK0LGglPp82rVrF2+88QYul4vm5mbeeecd4uPjeeONN/j+97/Pc88912Odjz/+mH/961+0tLQwY8YMvva1r/V4N+ejjz5i+/btFBYWctppp7FmzRrmz5/PV7/6Vd555x0mT57MtddeGzZNDzzwAN/85je5/vrr6ezsxOv1sn37dn72s5+xZs0a8vLyqK/3j8965513cuONN3LTTTfx17/+lW984xu88MILPY7tvPPO44EHHmD69OmsX7+er3/966xevXpoT+YwowEqQEtQSkVuoCWdaFqyZIn93LipqYmbbrqJTz/9FBGhq6sr7DqXXHIJSUlJJCUlMWbMGA4cOMC4ceOCllmwYIE9be7cuezdu5f09HSmTJliv8dz7bXX8uCDD/bY/imnnMLPfvYzysvLueKKK5g+fTqrV6/mqquuIi8vD4CcnBwA1q1bx/PPPw/Al770Jb7zne/0OLbW1lbWrl3LkiVL7Hkej2dQ5+vzRANUgPMZlAYopT4/0tLS7L9/+MMfcs4557BixQr27t3L2WefHXadpKQk+2+Xy0V3d3dEyxhjIkrTddddx0knncTLL7/MwoULefjhhzHGRPR827mMdWw+n4/s7Owhr1Yd7jQnDrAClFbxKfX51dTURFFREQCPPvrokG9/5syZlJSUsHfvXgCefvrpsMuVlJQwZcoUvvGNb7Bo0SK2bNnCeeedx/Lly6mrqwOwq/hOPfVUnnrqKQCeeOIJTj/99B7by8zMZPLkyTzzzDOAv1eGzZs3D/XhDTuaEwecfvrpfOlLXyIuLk4DlFKfU9/5znf43ve+x2mnnYbX6x3y7aekpPDHP/6Riy66iNNPP538/HyysrJ6LPf0009zzDHHMHfuXD7++GNuvPFGZs+ezX/8x39w1llncdxxx/Gtb30LgN/+9rc88sgjdqOJ//u//wu77yeeeIK//OUvHHfcccyePZsXX3xxyI9vuJFIi6yfB/PnzzcbN24c9PplZWV0dnYyefJkDVJKhdi5cyezZs2KdTJirrW1lfT0dIwx3HHHHUyfPp177rkn1sn63Ah3HYnIh8aYHu8BaC4chr4HpZTqzUMPPcTcuXOZPXs2TU1NfPWrX411ko5Y2kgiDA1QSqne3HPPPVpiOky0BBVCq/aUUmp40Nw4hJaelFJqeNAAFUJLUEopNTxENTcWkYtE5BMR2S0i94WZ/20RKQ782yYiXhHJiWTdKKb5cO1KKaVUH6IWoETEBfwB+AJwNHCtiBztXMYY80tjzFxjzFzge8Dbxpj6SNaNFi1BKTV8VVVVcc011zB16lSOPvpoLr74Ynbt2hXrZPXw6KOPcueddwL+fvmWLVvWY5m9e/dyzDHH9LmdvXv38uSTT9qfIx025EgRzVZ8C4DdxpgSABF5Crgc2NHL8tcCfx/kukNGx4JSangyxrB48WJuuukmu+eF4uJiDhw4wFFHHWUv5/V6h9Xv+Pbbbx/0ulaAuu6664DIhw053KJ1zqMZoIqAMsfncuCkcAuKSCpwEXDnINa9DbgNYMKECYeWYrQEpVQknnnmGcrLy4d0m+PGjQvqDDXUv/71LxISEoIy/Llz5wLw1ltv8Z//+Z8UFBRQXFzMpk2b+NrXvsbGjRuJj4/nf/7nfzjnnHPCDoNRWFjI1VdfTXl5OV6vlx/+8IcsXbrU3ofP52PKlCkUFxeTnZ0NwLRp01izZg0ffPAB//Vf/0VnZye5ubk88cQT5OfnB6XbOXbVhx9+yK233kpqampQl0Z79+7lS1/6Em1tbQD8/ve/59RTT+W+++5j586dzJ07l5tuuol58+bZw4bU19dz6623UlJSQmpqKg8++CBz5szpczgRi9fr5ctf/jIbN25ERLj11lu555572L17N7fffjs1NTW4XC6eeeYZpkyZwne+8x1eeeUVRIQf/OAHLF26tMc537p1K/fddx9vvfUWHo+HO+6445DfEYtmgAr3MKe3bisuA9YYY+oHuq4x5kHgQfD3JDHQRIYaTndeSqmDrHGZevPBBx+wbds2Jk+ezK9//WsAtm7dyscff8yFF17Irl27wg6DsWrVKgoLC3n55ZcBf39+TnFxcVx++eWsWLGCW265hfXr1zNp0iTy8/M5/fTTef/99xERHn74YX7xi1/Y+w7nlltu4Xe/+x1nnXUW3/72t+3pY8aM4fXXXyc5OZlPP/2Ua6+9lo0bN/Lzn//cDkjgD8SWH//4x8ybN48XXniB1atXc+ONN9qdyfY3nEhxcTH79+9n27ZtADQ2NgJw/fXXc99997F48WLcbjc+n4/nn3+e4uJiNm/eTG1tLSeeeCJnnnlmj3P+4IMPkpWVxYYNG/B4PJx22mlceOGFds/vgxHNAFUOjHd8HgdU9LLsNRys3hvoukNKS1BK9a+vkk6sLFiwwM4M33vvPe666y7A38HrxIkT2bVrV9hhMI499ljuvfdevvvd73LppZdyxhln9Nj20qVL+clPfsItt9zCU089ZZewysvLWbp0KZWVlXY3ab1pamqisbGRs846C/APrfHKK68A0NXVxZ133klxcTEulyui52rvvfeePdbVueeeS11dnR1c+xtOZMqUKZSUlHDXXXdxySWXcOGFF9LS0sL+/ftZvHgx4B96yNrPtddei8vlIj8/n7POOosNGzaQmZkZdM5fe+01tmzZwrPPPmsf76effnpIASqaufEGYLqITBaRRPxBaGXoQiKSBZwFvDjQdYeaiGiAUmqYmj17Nh9++GGv853DbvTWx+h1113HypUrSUlJYeHChaxevZqjjjqKDz/8kGOPPZbvfe97/OQnP2H9+vXMnTuXuXPnsnLlSk455RR2795NTU0NL7zwAldccQUAd911F3feeSdbt27lz3/+M263u9f09TXcxv/+7/+Sn5/P5s2b2bhxI52dnf2ej3DHaG2/v+FERo0axebNmzn77LP5wx/+wFe+8pVez1lf/bWGnvPf/e53FBcXU1xczJ49e7jwwgv7PY6+RC03NsZ043+m9CqwE1hujNkuIreLiPOp4WLgNWNMW3/rRiutThqglBqezj33XDweDw899JA9bcOGDbz99ts9lj3zzDN54oknAP+otKWlpcyYMSPsMBgVFRWkpqZyww03cO+997Jp0yZOOukkO6NdtGgRIsLixYv51re+xaxZs8jNzQWCh/f429/+1mf6s7OzycrK4r333gOw02dt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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    }
   ],
   "source": [
    "import matplotlib.pyplot as plt\n",
    "import numpy as np\n",
    "from sklearn.datasets import load_digits\n",
    "from sklearn.ensemble import RandomForestClassifier\n",
    "from sklearn.model_selection import validation_curve\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "digits = load_digits()\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 만듭니다.\n",
    "features, target = digits.data, digits.target\n",
    "\n",
    "# 파타미터 값의 범위를 만듭니다.\n",
    "param_range = np.arange(1, 250, 2)\n",
    "\n",
    "# 파타미터 값의 범위를 사용하여 훈련 세트와 테스트 세트의 정확도를 계산합니다.\n",
    "train_scores, test_scores = validation_curve(RandomForestClassifier(), # 분류기\n",
    "                                             features, # 특성 행렬\n",
    "                                             target, # 타겟 벡터\n",
    "                                             param_name=\"n_estimators\", # 조사할 하이퍼파라미터\n",
    "                                             param_range=param_range, # 하이퍼파라미터 값의 범위\n",
    "                                             cv=3, # 폴드 수\n",
    "                                             scoring=\"accuracy\", # 성능 지표\n",
    "                                             n_jobs=-1) # 모든 코어 사용\n",
    "\n",
    "# 훈련 세트 점수 평균과 표준편차를 계산합니다.\n",
    "train_mean = np.mean(train_scores, axis=1)\n",
    "train_std = np.std(train_scores, axis=1)\n",
    "\n",
    "# 테스트 세트 점수 평균과 표준편차를 계산합니다.\n",
    "test_mean = np.mean(test_scores, axis=1)\n",
    "test_std = np.std(test_scores, axis=1)\n",
    "\n",
    "# 훈련 세트와 테스트 세트의 평균 정확도 점수를 그래프로 그립니다.\n",
    "plt.plot(param_range, train_mean, label=\"Training score\", color=\"black\")\n",
    "plt.plot(param_range, test_mean, label=\"Cross-validation score\", color=\"dimgrey\")\n",
    "\n",
    "# 훈련 세트와 테스트 세트의 정확도에 대한 표준편차를 그래프로 그립니다.\n",
    "plt.fill_between(param_range, train_mean - train_std, train_mean + train_std, color=\"grey\")\n",
    "plt.fill_between(param_range, test_mean - test_std, test_mean + test_std, color=\"gainsboro\")\n",
    "\n",
    "# 그래프를 출력합니다.\n",
    "plt.title(\"Validation Curve With Random Forest\")\n",
    "plt.xlabel(\"Number Of Trees\")\n",
    "plt.ylabel(\"Accuracy Score\")\n",
    "plt.tight_layout()\n",
    "plt.legend(loc=\"best\")\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "대부분 훈련 알고리즘에는 훈련 과정을 시작하기 전에 선택해야만 하는 하이퍼파라미터가 있습니다.   \n",
    "예를 들어 랜덤 포레스트 분류기는 결정 트리<sup>decision tree</sup>의 앙상블<sup>ensemble</sup>을 만듭니다. 트리마다 샘플의 클래스를 예측합니다. 랜덤 포레스트 분류기의 하이퍼파라미터는 앙상블을 할 트리의 개수입니다.   \n",
    "많은 경우 하이퍼파라미터 값은 모델 선택(12장) 과정을 통해 선택합니다. 하지만 때로는 하이퍼파라미터 값의 변화에 따라 모델 성능의 변화를 시각화하는 것이 도움이 됩니다.   \n",
    "   \n",
    "sklearn에서 validation_curve 함수로 검증 곡선을 계산할 수 있습니다. 이 함수는 세 개의 중요한 파라미터가 있습니다.   \n",
    "1. param_name: 바꿀 하이퍼파라미터의 이름입니다.\n",
    "2. param_range: 사용할 하이퍼파라미터의 범위입니다.\n",
    "3. scoring: 모델을 평가하는 데 사용할 지표입니다.   \n",
    "   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.8.5"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
```
