---
title: "ch12. Model Selection"
date: 2023-12-30
category: ml-data
tags: ["ml", "python", "study", "sklearn", "model"]
series: "ML with Python Cookbook"
seriesOrder: 12
legacyPath: "/posts/ch12-Model-Selection/"
source: manual
---

## Summary
***

최선의 학습 알고리즘을 선택하는 것와 최선의 하이퍼파라미터를 선택하는 것을 모델 선택이라고 정의합니다.
<br><br>


* 완전 탐색을 사용해 최선의 모델 선택하기 (12.1)
<br><br>


* 랜덤 탐색을 사용해 최선의 모델 선택하기 (12.2)
<br><br>


* 여러 학습 알고리즘에서 최선의 모델 선택하기 (12.3)
<br><br>


* 전처리와 함께 최선의 모델 선택하기 (12.4)
<br><br>


* 병렬화로 모델 선택 속도 높이기 (12.5)
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
    "# 12.0 소개   \n",
    "   \n",
    "머신러닝에서는 알고리즘을 훈련하여 손실 함수를 최소화시킴으로써 모델의 파라미터를 학습합니다.   \n",
    "그러나 많은 학습 알고리즘(예를 들면, SVM과 랜덤 포레스트)은 학습 과정 밖에서 정의되어야 하는 하이퍼파라미터도 가집니다.   \n",
    "예를 들어 랜덤 포레스트는 결정 트리의 앙상블입니다. 결정 트리 개수는 알고리즘에 의해 학습되지 않고 학습하기 전에 저장되어야 합니다. 이를 하이퍼파라미터 튜닝, 하이퍼파라미터 최적화, 또는 모델 선택이라고 부릅니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 12.1 완전 탐색을 사용해 최선의 모델 선택하기   \n",
    "   \n",
    "하이퍼파라미터 범위를 검사하여 최선의 모델을 선택합니다.   \n",
    "sklearn의 GridSearchCV를 사용합니다.   \n",
    "   \n",
    "   "
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
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
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
      "STOP: TOTAL NO. of ITERATIONS REACHED LIMIT.\n",
      "\n",
      "Increase the number of iterations (max_iter) or scale the data as shown in:\n",
      "    https://scikit-learn.org/stable/modules/preprocessing.html\n",
      "Please also refer to the documentation for alternative solver options:\n",
      "    https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression\n",
      "  n_iter_i = _check_optimize_result(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\model_selection\\_validation.py:425: FitFailedWarning: \n",
      "50 fits failed out of a total of 100.\n",
      "The score on these train-test partitions for these parameters will be set to nan.\n",
      "If these failures are not expected, you can try to debug them by setting error_score='raise'.\n",
      "\n",
      "Below are more details about the failures:\n",
      "--------------------------------------------------------------------------------\n",
      "50 fits failed with the following error:\n",
      "Traceback (most recent call last):\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\model_selection\\_validation.py\", line 732, in _fit_and_score\n",
      "    estimator.fit(X_train, y_train, **fit_params)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\base.py\", line 1151, in wrapper\n",
      "    return fit_method(estimator, *args, **kwargs)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py\", line 1168, in fit\n",
      "    solver = _check_solver(self.solver, self.penalty, self.dual)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py\", line 56, in _check_solver\n",
      "    raise ValueError(\n",
      "ValueError: Solver lbfgs supports only 'l2' or 'none' penalties, got l1 penalty.\n",
      "\n",
      "  warnings.warn(some_fits_failed_message, FitFailedWarning)\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\model_selection\\_search.py:976: UserWarning: One or more of the test scores are non-finite: [       nan 0.97333333        nan 0.97333333        nan 0.98\n",
      "        nan 0.98              nan 0.98              nan 0.97333333\n",
      "        nan 0.97333333        nan 0.97333333        nan 0.97333333\n",
      "        nan 0.97333333]\n",
      "  warnings.warn(\n"
     ]
    },
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
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
    "import numpy as np\n",
    "from sklearn import linear_model, datasets\n",
    "from sklearn.model_selection import GridSearchCV\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "iris = datasets.load_iris()\n",
    "features = iris.data\n",
    "target = iris.target\n",
    "\n",
    "# 로지스틱 회귀모델을 만듭니다.\n",
    "logistic = linear_model.LogisticRegression()\n",
    "\n",
    "# penalty 하이퍼파라미터 값의 후보를 만듭니다.\n",
    "penalty = ['l1', 'l2']\n",
    "\n",
    "# 규제 하이퍼파라미터 값의 후보 범위를 만듭니다.\n",
    "C = np.logspace(0, 4, 10)\n",
    "\n",
    "# 하이퍼파라미터 후보 딕셔너리를 만듭니다.\n",
    "hyperparameters = dict(C=C, penalty=penalty)\n",
    "\n",
    "# 그리드 서치 객체를 만듭니다.\n",
    "gridsearch = GridSearchCV(logistic, hyperparameters, cv=5, verbose=0)\n",
    "\n",
    "# 그리드 서치를 수행합니다.\n",
    "best_model = gridsearch.fit(features, target)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "GridSearchCV는 교차검증을 사용하여 모델을 선택하는 브루트포스<sub>brute-force</sub>한 방법입니다.   \n",
    "사용자가 하나 이상의 하이퍼파라미터를 정의하면 모든 값의 조합에 대해 모델을 훈련합니다.   \n",
    "최고 성능 점수를 내는 모델이 최선의 모델로 선택됩니다.   \n",
    "해결에서는 C의 값이 10개이고 규제 페널티는 2개, 폴드 수는 5입니다. 따라서 총 100개(10 x 2 x 5)의 모델 후보 중에서 가장 좋은 것을 선택합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "best penalty:  l2\n",
      "best C:  7.742636826811269\n"
     ]
    }
   ],
   "source": [
    "# 최선의 하이퍼파라미터를 확인합니다.\n",
    "print('best penalty: ', best_model.best_estimator_.get_params()['penalty'])\n",
    "print('best C: ', best_model.best_estimator_.get_params()['C'])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "기본적으로 GridSearchCV는 best hyperparameter를 확인한 후 전체 데이터셋에서 이를 사용하여 모델을 다시 훈련합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n",
       "       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n",
       "       0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,\n",
       "       1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1,\n",
       "       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,\n",
       "       2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,\n",
       "       2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])"
      ]
     },
     "execution_count": 3,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# target 벡터를 예측합니다.\n",
    "best_model.predict(features)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 12.2 랜덤 탐색을 사용해 최선의 모델 선택하기   \n",
    "   \n",
    "완전 탐색보다 계산 비용이 적게 드는 방법입니다.   \n",
    "sklearn의 RandomizedSearchCV를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "D:\\anaconda\\lib\\site-packages\\sklearn\\model_selection\\_validation.py:425: FitFailedWarning: \n",
      "230 fits failed out of a total of 500.\n",
      "The score on these train-test partitions for these parameters will be set to nan.\n",
      "If these failures are not expected, you can try to debug them by setting error_score='raise'.\n",
      "\n",
      "Below are more details about the failures:\n",
      "--------------------------------------------------------------------------------\n",
      "230 fits failed with the following error:\n",
      "Traceback (most recent call last):\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\model_selection\\_validation.py\", line 732, in _fit_and_score\n",
      "    estimator.fit(X_train, y_train, **fit_params)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\base.py\", line 1151, in wrapper\n",
      "    return fit_method(estimator, *args, **kwargs)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py\", line 1168, in fit\n",
      "    solver = _check_solver(self.solver, self.penalty, self.dual)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py\", line 56, in _check_solver\n",
      "    raise ValueError(\n",
      "ValueError: Solver lbfgs supports only 'l2' or 'none' penalties, got l1 penalty.\n",
      "\n",
      "  warnings.warn(some_fits_failed_message, FitFailedWarning)\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\model_selection\\_search.py:976: UserWarning: One or more of the test scores are non-finite: [       nan 0.97333333 0.97333333 0.96666667 0.96666667 0.97333333\n",
      "        nan        nan        nan        nan 0.97333333 0.97333333\n",
      "        nan 0.97333333 0.97333333 0.96              nan        nan\n",
      " 0.94666667        nan 0.96       0.97333333        nan 0.97333333\n",
      "        nan 0.97333333 0.97333333 0.97333333 0.97333333 0.96666667\n",
      " 0.97333333        nan        nan 0.97333333        nan        nan\n",
      " 0.97333333 0.97333333        nan        nan 0.96       0.97333333\n",
      "        nan        nan        nan 0.97333333 0.97333333 0.97333333\n",
      "        nan 0.97333333        nan        nan 0.97333333        nan\n",
      " 0.97333333        nan        nan        nan        nan        nan\n",
      " 0.96666667        nan        nan        nan        nan 0.97333333\n",
      "        nan        nan 0.97333333 0.97333333        nan        nan\n",
      " 0.97333333 0.96              nan        nan 0.96       0.97333333\n",
      " 0.97333333 0.97333333 0.94666667        nan 0.97333333 0.97333333\n",
      " 0.97333333        nan 0.97333333        nan 0.97333333 0.97333333\n",
      " 0.96666667 0.97333333        nan 0.97333333        nan        nan\n",
      "        nan 0.97333333 0.97333333 0.97333333]\n",
      "  warnings.warn(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
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
    "from scipy.stats import uniform\n",
    "from sklearn import linear_model, datasets\n",
    "from sklearn.model_selection import RandomizedSearchCV\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "iris = datasets.load_iris()\n",
    "features = iris.data\n",
    "target = iris.target\n",
    "\n",
    "# 로지스틱 회귀 모델을 만듭니다.\n",
    "logistic = linear_model.LogisticRegression()\n",
    "\n",
    "# penalty hyperparameter 후보를 만듭니다.\n",
    "penalty = ['l1', 'l2']\n",
    "\n",
    "# 규제 하이퍼파라미터 값의 후보를 위한 분포를 만듭니다.\n",
    "C = uniform(loc=0, scale=4)\n",
    "\n",
    "# 하이퍼파라미터 옵션을 만듭니다.\n",
    "hyperparameters = dict(C=C, penalty=penalty)\n",
    "\n",
    "# 랜덤 탐색 객체를 만듭니다.\n",
    "randomizedsearch = RandomizedSearchCV(logistic,\n",
    "                                      hyperparameters,\n",
    "                                      random_state=1,\n",
    "                                      n_iter=100,\n",
    "                                      cv=5,\n",
    "                                      verbose=0,\n",
    "                                      n_jobs=-1)\n",
    "\n",
    "# 랜덤 탐색을 수행합니다.\n",
    "best_model = randomizedsearch.fit(features, target)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "GrisSearchCV의 brute-force보다 더 효율적인 방법은 사용자가 제공한 분포(정규분포나 균등 분포)에서 랜덤한 하이퍼파라미터 조합을 지정된 횟수만큼 추출하여 조사하는 것입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "best penalty:  l2\n",
      "best C:  3.730229437354635\n"
     ]
    }
   ],
   "source": [
    "# 최선의 하이퍼파라미터를 확인합니다.\n",
    "print('best penalty: ', best_model.best_estimator_.get_params()['penalty'])\n",
    "print('best C: ', best_model.best_estimator_.get_params()['C'])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "마찬가지로 탐색이 완료된 후 RandomizedSearchCV는 전체 데이터셋에서 최선의 하이퍼파라미터를 사용해 새로운 모델을 훈련합니다.   \n"
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
       "array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n",
       "       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n",
       "       0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,\n",
       "       1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1,\n",
       "       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,\n",
       "       2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,\n",
       "       2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# target 벡터를 예측합니다.\n",
    "best_model.predict(features)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 12.3 여러 학습 알고리즘에서 최선의 모델 선택하기   \n",
    "   \n",
    "다양한 학습 알고리즘과 하이퍼파라미터를 탐색하여 최선의 모델을 선택합니다.   \n",
    "후보 학습 알고리즘과 이에 해당하는 하이퍼파라미터의 딕셔너리를 만듭니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "metadata": {},
   "outputs": [
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "D:\\anaconda\\lib\\site-packages\\sklearn\\model_selection\\_validation.py:548: FitFailedWarning: Estimator fit failed. The score on this train-test partition for these parameters will be set to nan. Details: \n",
      "Traceback (most recent call last):\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\model_selection\\_validation.py\", line 531, in _fit_and_score\n",
      "    estimator.fit(X_train, y_train, **fit_params)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\pipeline.py\", line 335, in fit\n",
      "    self._final_estimator.fit(Xt, y, **fit_params_last_step)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py\", line 1304, in fit\n",
      "    solver = _check_solver(self.solver, self.penalty, self.dual)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py\", line 438, in _check_solver\n",
      "    raise ValueError(\"Logistic Regression supports only penalties in %s,\"\n",
      "ValueError: Logistic Regression supports only penalties in ['l1', 'l2', 'elasticnet', 'none'], got l1l2.\n",
      "\n",
      "  warnings.warn(\"Estimator fit failed. The score on this train-test\"\n"
     ]
    }
   ],
   "source": [
    "import numpy as np\n",
    "from sklearn import datasets\n",
    "from sklearn.linear_model import LogisticRegression\n",
    "from sklearn.ensemble import RandomForestClassifier\n",
    "from sklearn.model_selection import GridSearchCV\n",
    "from sklearn.pipeline import Pipeline\n",
    "\n",
    "# 랜덤 시드를 설정합니다.\n",
    "np.random.seed(0)\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "iris = datasets.load_iris()\n",
    "features = iris.data\n",
    "target = iris.target\n",
    "\n",
    "# 파이프라인을 만듭니다.\n",
    "pipe = Pipeline([(\"classifier\", RandomForestClassifier())])\n",
    "\n",
    "# 후보 학습 알고리즘과 하이퍼파라미터로 딕셔너리를 만듭니다.\n",
    "search_space = [{\"classifier\": [LogisticRegression()],\n",
    "                 \"classifier__penalty\": ['l1' 'l2'],\n",
    "                 \"classifier__C\": np.logspace(0, 4, 10)},\n",
    "                {\"classifier\": [RandomForestClassifier()],\n",
    "                 \"classifier__n_estimators\": [10, 100, 1000],\n",
    "                 \"classifier__max_features\": [1, 2, 3]}]\n",
    "\n",
    "# 그리드 서치 객체를 만듭니다.\n",
    "gridsearch = GridSearchCV(pipe, search_space, cv=5, verbose=0)\n",
    "\n",
    "# 그리드 서치를 수행합니다.\n",
    "best_model = gridsearch.fit(features, target)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "탐색이 완료되면 best_estimator_를 사용해 최선의 학습 모델과 하이퍼파라미터를 확인할 수 있습니다.   \n"
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
       "RandomForestClassifier(max_features=2)"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 최선의 모델을 확인합니다.\n",
    "best_model.best_estimator_.get_params()[\"classifier\"]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "마찬가지로 모델 선택 탐색이 완료되면 best_model 객체를 사용할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 9,
   "metadata": {
    "scrolled": true
   },
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n",
       "       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\n",
       "       0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,\n",
       "       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,\n",
       "       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,\n",
       "       2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,\n",
       "       2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])"
      ]
     },
     "execution_count": 9,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# target 벡터를 예측합니다.\n",
    "best_model.predict(features)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 12.4 전처리와 함께 최선의 모델 선택하기   \n",
    "   \n",
    "모델 선택 과정에 전처리 단계를 포함합니다.   \n",
    "전처리 단계와 필요한 매개변수를 포함한 파이프라인을 만듭니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {},
   "outputs": [],
   "source": [
    "import numpy as np\n",
    "from sklearn import datasets\n",
    "from sklearn.linear_model import LogisticRegression\n",
    "from sklearn.ensemble import RandomForestClassifier\n",
    "from sklearn.model_selection import GridSearchCV\n",
    "from sklearn.pipeline import Pipeline, FeatureUnion\n",
    "from sklearn.decomposition import PCA\n",
    "from sklearn.preprocessing import StandardScaler\n",
    "\n",
    "# 랜덤 시드를 설정합니다.\n",
    "np.random.seed(0)\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "iris = datasets.load_iris()\n",
    "features = iris.data\n",
    "target = iris.target\n",
    "\n",
    "# StandardScaler와 PCA를 포함한 전처리 객체를 만듭니다.\n",
    "preprocess = FeatureUnion([(\"std\", StandardScaler()), (\"pca\", PCA())])\n",
    "\n",
    "# 파이프라인을 만듭니다.\n",
    "pipe = Pipeline([(\"preprocess\", preprocess),\n",
    "                 (\"classifier\", LogisticRegression())])\n",
    "\n",
    "# 후보 값을 정의합니다.\n",
    "search_space = [{\"preprocess__pca__n_components\": [1, 2, 3],\n",
    "                 \"classifier__penalty\": [\"l1\", \"l2\"],\n",
    "                 \"classifier__C\": np.logspace(0, 4, 10)}]\n",
    "\n",
    "# 그리드 서치 객체를 만듭니다.\n",
    "clf = GridSearchCV(pipe, search_space, cv=5, verbose=0, n_jobs=-1)\n",
    "\n",
    "# 그리드 서치를 수행합니다.\n",
    "best_model = clf.fit(features, target)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "모델 선택을 수행할 때 전처리 단계를 적절히 다루도록 주의해야 합니다.   \n",
    "1. GridSearchCV\n",
    "교차검증을 사용하여 가장 높은 성능을 내는 모델을 고릅니다. 교차검증에서 제외된 폴드는 전처리 단계에도 포함되면 안됩니다.\n",
    "2. 일부 전처리 방법은 종종 사용자가 지정해야 하는 자신만의 매개변수가 있습니다. 예를 들어 PCA를 사용한 차원 축소에서는 사용자가 변환된 특성을 만들기 위해 사용할 주성분 개수를 정의해야 합니다."
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "# 12.5 병렬화로 모델 선택 속도 높이기   \n",
    "\n",
    "이 장의 레시피에서는 예제 코드 실행 속도를 빠르게 하려고 후보 모델의 개수를 작게 유지했습니다.\n",
    "실전에서는 수천, 수만 개의 모델을 훈련하는 경우가 많습니다.\n",
    "결국 최선의 모델을 찾으려면 많은 시간이 걸립니다.\n",
    "탐색 과정의 속도를 높이기 위해 sklearn은 여러 모델을 동시에 훈련할 수 있습니다.\n",
    "\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Fitting 5 folds for each of 2000 candidates, totalling 10000 fits\n"
     ]
    },
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "D:\\anaconda\\lib\\site-packages\\sklearn\\model_selection\\_validation.py:425: FitFailedWarning: \n",
      "5000 fits failed out of a total of 10000.\n",
      "The score on these train-test partitions for these parameters will be set to nan.\n",
      "If these failures are not expected, you can try to debug them by setting error_score='raise'.\n",
      "\n",
      "Below are more details about the failures:\n",
      "--------------------------------------------------------------------------------\n",
      "5000 fits failed with the following error:\n",
      "Traceback (most recent call last):\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\model_selection\\_validation.py\", line 732, in _fit_and_score\n",
      "    estimator.fit(X_train, y_train, **fit_params)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\base.py\", line 1151, in wrapper\n",
      "    return fit_method(estimator, *args, **kwargs)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py\", line 1168, in fit\n",
      "    solver = _check_solver(self.solver, self.penalty, self.dual)\n",
      "  File \"D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py\", line 56, in _check_solver\n",
      "    raise ValueError(\n",
      "ValueError: Solver lbfgs supports only 'l2' or 'none' penalties, got l1 penalty.\n",
      "\n",
      "  warnings.warn(some_fits_failed_message, FitFailedWarning)\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\model_selection\\_search.py:976: UserWarning: One or more of the test scores are non-finite: [       nan 0.97333333        nan ... 0.97333333        nan 0.97333333]\n",
      "  warnings.warn(\n",
      "D:\\anaconda\\lib\\site-packages\\sklearn\\linear_model\\_logistic.py:460: ConvergenceWarning: lbfgs failed to converge (status=1):\n",
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
    "import numpy as np\n",
    "from sklearn import linear_model, datasets\n",
    "from sklearn.model_selection import GridSearchCV\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "iris = datasets.load_iris()\n",
    "features = iris.data\n",
    "target = iris.target\n",
    "\n",
    "# 로지스틱 회귀 모델을 만듭니다.\n",
    "logistic = linear_model.LogisticRegression()\n",
    "\n",
    "# 규제 페널티의 후보를 만듭니다.\n",
    "penalty = [\"l1\", \"l2\"]\n",
    "\n",
    "# C 값의 후보 범위를 만듭니다.\n",
    "C = np.logspace(0, 4, 1000)\n",
    "\n",
    "# 하이퍼파라미터 옵션을 만듭니다.\n",
    "hyperparameters = dict(C=C, penalty=penalty)\n",
    "\n",
    "# 그리드 서치 객체를 만듭니다.\n",
    "gridsearch = GridSearchCV(logistic, hyperparameters, cv=5, n_jobs=-1, verbose=1)\n",
    "\n",
    "# 그리드 서치를 수행합니다.\n",
    "best_model = gridsearch.fit(features, target)"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3 (ipykernel)",
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
