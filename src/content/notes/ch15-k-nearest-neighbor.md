---
title: "ch15. K-Nearest Neighbor"
date: 2023-12-30
category: ml-data
tags: ["ml", "python", "study", "KNN", "sklearn", "model"]
series: "ML with Python Cookbook"
seriesOrder: 15
source: manual
---

## Summary
***

KNN 분류기는 지도 학습용 머신러닝 모델에서 가장 간단하지만 널리 사용하는 것 중 하나입니다. KNN은 종종 게으른 학습기로 불립니다. 기술적으로 예측을 만들기 위해 모델을 훈련하지 않기 때문입니다. 대신 가장 가까운 k개의 샘플에서 다수의 클래스를 그 샘플의 클래스로 예측합니다.
<br><br>


* 샘플의 최근접 이웃 찾기 (15.1)
<br><br>


* K-최근접 이웃 분류기 만들기 (15.2)
<br><br>


* 최선의 이웃 개수 결정하기 (15.3)
<br><br>


## Practice
***

```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "id": "aa4eb218-fdca-4115-b1c3-2a9b2b6eb78d",
   "metadata": {},
   "source": [
    "# 15.1 샘플의 최근접 이웃 찾기\n",
    "\n",
    "k-최근접 이웃(KNN) 분류기는 지도 학습용 머신러닝 모델에서 가장 간단하지만 널리 사용하는 것 중 하나입니다.\n",
    "KNN은 종종 게으른 학습기로 불립니다.\n",
    "기술적으로 예측을 만들기 위해 모델을 훈련하지 않기 때문입니다.\n",
    "대신 가장 가까운 k개의 샘플에서 다수의 클래스를 그 샘플의 클래스로 예측합니다."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "id": "c1ba47b9-472d-4487-990d-ce7d26cfe659",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[[1.03800476, 0.55861082, 1.10378283, 1.18556721],\n",
       "        [0.79566902, 0.32841405, 0.76275827, 1.05393502]]])"
      ]
     },
     "execution_count": 2,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn import datasets\n",
    "from sklearn.neighbors import NearestNeighbors\n",
    "from sklearn.preprocessing import StandardScaler\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "iris = datasets.load_iris()\n",
    "features = iris.data\n",
    "\n",
    "# 표준화 객체를 만듭니다.\n",
    "standardizer = StandardScaler()\n",
    "\n",
    "# 특성을 표준화합니다.\n",
    "features_standardized = standardizer.fit_transform(features)\n",
    "\n",
    "# k=2인 최근접 이웃 모델을 만듭니다.\n",
    "nearest_neighbors = NearestNeighbors(n_neighbors=2).fit(features_standardized)\n",
    "\n",
    "# 새로운 샘플을 만듭니다.\n",
    "new_observation = [ 1, 1, 1, 1 ]\n",
    "\n",
    "# 이 샘플과 가장 가까운 이웃의 인덱스와 거리를 찾습니다.\n",
    "distances, indices = nearest_neighbors.kneighbors([new_observation])\n",
    "\n",
    "# 최근접 이웃을 확인합니다.\n",
    "features_standardized[indices]"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "44591964-d8c1-48a2-8c6c-992392f06f0d",
   "metadata": {},
   "source": [
    "사이킷런은 유클리드를 포함하여 다양한 거리 측정 방법을 제공합니다.\n",
    "\n",
    "$\n",
    "d_{euclidean} = \\sqrt{\\sum_{i=1}^{n} (x_{i}-y_{i})^2}\n",
    "$\n",
    "\n",
    "맨해튼 거리도 있습니다.\n",
    "\n",
    "$\n",
    "d_{manhattan} = \\sum_{i=1}^{n} |x_{i}-y_{i}|\n",
    "$\n",
    "\n",
    "NearestNeighbors의 기본값은 민코프스키 거리입니다.\n",
    "\n",
    "$\n",
    "d_{minkowski} = \\left(\\sum_{i=1}^{n} |x_{i}-y_{i}|^{p}\\right)^{\\frac{1}{p}}\n",
    "$\n",
    "\n",
    "여기에서 $x_{i}$와 $y_{i}$는 거리를 계산하려는 두 개의 샘플입니다.\n",
    "민코프스키 거리에는 하이퍼파라미터 p가 있습니다.\n",
    "p=1이면 맨해튼 거리이고 p=2이면 유클리드 거리입니다.\n",
    "사이킷런의 기본값은 p=2입니다."
   ]
  },
  {
   "cell_type": "markdown",
   "id": "fd19b9e3-2bf3-4e1c-b774-2b8e0032c552",
   "metadata": {},
   "source": [
    "# 15.2 k-최근접 이웃 분류기 만들기\n",
    "\n",
    "타깃 클래스를 모르는 샘플 $x_{\\mu}$가 주어지면 KNN 알고리즘은 먼저 어떤 거리 측정 방법(예를 들면 유클리드 거리)을 기반으로 가장 가까운 k개의 샘플($x_{\\mu}$의 이웃이라고도 부릅니다.)을 찾습니다.\n",
    "그 다음 이 k개 샘플의 클래스를 기반으로 투표를 합니다.\n",
    "가장 많은 표를 얻은 클래스가 $x_{\\mu}$의 예측 클래스가 됩니다.\n",
    "이론적으로 말하면 $x_{\\mu}$가 클래스 j일 확률은 다음과 같습니다.\n",
    "\n",
    "$\n",
    "\\frac{1}{k}\\sum_{i \\in v}I\\left( y_{i}=j \\right)\n",
    "$\n",
    "\n",
    "여기에서 v는 $x_{\\mu}$ 이웃에 있는 k개의 샘플이고, y는 i번째 샘플의 클래스 입니다.\n",
    "I는 지시 함수(indicator function)으로 1은 참, 0은 그 외 입니다.\n",
    "사이킷런에서는 predict_proba 메서드를 사용하여 이 확률을 출력할 수 있습니다."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "id": "174e79a2-5c62-494e-bf9d-c3a8a0af0378",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[0. , 0.6, 0.4],\n",
       "       [0. , 0. , 1. ]])"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "from sklearn import datasets\n",
    "from sklearn.neighbors import KNeighborsClassifier\n",
    "from sklearn.preprocessing import StandardScaler\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "iris = datasets.load_iris()\n",
    "x = iris.data\n",
    "y = iris.target\n",
    "\n",
    "# 표준화 객체를 만듭니다.\n",
    "standardizer = StandardScaler()\n",
    "\n",
    "# 특성을 표준화합니다.\n",
    "x_std = standardizer.fit_transform(x)\n",
    "\n",
    "# 5개의 이웃을 사용한 KNN 분류기를 훈련합니다.\n",
    "knn = KNeighborsClassifier(n_neighbors=5, n_jobs=-1).fit(x_std, y)\n",
    "\n",
    "# 두 개의 샘플을 만듭니다.\n",
    "new_observations = [\n",
    "    [0.75, 0.75, 0.75, 0.75],\n",
    "    [1, 1, 1, 1]\n",
    "]\n",
    "\n",
    "# 두 샘플의 클래스를 예측합니다.\n",
    "knn.predict(new_observations)\n",
    "\n",
    "# 각 샘플이 세 클래스에 속할 확률을 확인합니다.\n",
    "knn.predict_proba(new_observations)"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "af378788-d413-4508-97d8-a6e3895c86ce",
   "metadata": {},
   "source": [
    "# 15.3 최선의 이웃 개수 결정하기\n",
    "\n",
    "k값의 크기는 KNN 분류기에 큰 영향을 미칩니다.\n",
    "편향과 분산 사이에 균형점을 찾아야 하는 머신러닝에서 k값만큼 명확한 경우가 많지 않습니다.\n",
    "n이 샘플의 개수일 때 k=n이면 편향이 높고 분산이 낮습니다.\n",
    "k=1이면 편향이 낮고 분산이 높습니다.\n",
    "이 편향-분산 트레이드오프의 균형을 맞추는 k값을 찾으면 최선의 모델을 만들 수 있습니다."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "id": "b1af1137-fee5-4801-ac12-76eecd66c798",
   "metadata": {},
   "outputs": [],
   "source": [
    "from sklearn import datasets\n",
    "from sklearn.neighbors import KNeighborsClassifier\n",
    "from sklearn.preprocessing import StandardScaler\n",
    "from sklearn.pipeline import Pipeline, FeatureUnion\n",
    "from sklearn.model_selection import GridSearchCV\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "iris = datasets.load_iris()\n",
    "features = iris.data\n",
    "target = iris.target\n",
    "\n",
    "# 표준화 객체를 만듭니다.\n",
    "standardizer = StandardScaler()\n",
    "\n",
    "# KNN 분류기를 만듭니다.\n",
    "knn = KNeighborsClassifier(n_neighbors=5, n_jobs=-1)\n",
    "\n",
    "# 파이프라인을 만듭니다.\n",
    "pipe = Pipeline([(\"standardizer\", standardizer), (\"knn\", knn)])\n",
    "\n",
    "# 탐색 영역의 후보를 만듭니다.\n",
    "search_space = [{\"knn__n_neighbors\": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}]\n",
    "\n",
    "# 그리드 서치를 만듭니다.\n",
    "classifier = GridSearchCV(\n",
    "    pipe, search_space, cv=5, verbose=0).fit(features, target)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "id": "912d6f50-2db5-4160-b516-cb469632bd8f",
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "6"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 최선의 이웃 개수 (k)\n",
    "classifier.best_estimator_.get_params()[\"knn__n_neighbors\"]"
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
   "version": "3.8.18"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
```
