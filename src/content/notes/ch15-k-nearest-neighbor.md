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

### 15.1 샘플의 최근접 이웃 찾기

k-최근접 이웃(KNN) 분류기는 지도 학습용 머신러닝 모델에서 가장 간단하지만 널리 사용하는 것 중 하나입니다.
KNN은 종종 게으른 학습기로 불립니다.
기술적으로 예측을 만들기 위해 모델을 훈련하지 않기 때문입니다.
대신 가장 가까운 k개의 샘플에서 다수의 클래스를 그 샘플의 클래스로 예측합니다.

```python
from sklearn import datasets
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler

# 데이터를 로드합니다.
iris = datasets.load_iris()
features = iris.data

# 표준화 객체를 만듭니다.
standardizer = StandardScaler()

# 특성을 표준화합니다.
features_standardized = standardizer.fit_transform(features)

# k=2인 최근접 이웃 모델을 만듭니다.
nearest_neighbors = NearestNeighbors(n_neighbors=2).fit(features_standardized)

# 새로운 샘플을 만듭니다.
new_observation = [ 1, 1, 1, 1 ]

# 이 샘플과 가장 가까운 이웃의 인덱스와 거리를 찾습니다.
distances, indices = nearest_neighbors.kneighbors([new_observation])

# 최근접 이웃을 확인합니다.
features_standardized[indices]
```

```text
array([[[1.03800476, 0.55861082, 1.10378283, 1.18556721],
        [0.79566902, 0.32841405, 0.76275827, 1.05393502]]])
```

사이킷런은 유클리드를 포함하여 다양한 거리 측정 방법을 제공합니다.

$
d_{euclidean} = \sqrt{\sum_{i=1}^{n} (x_{i}-y_{i})^2}
$

맨해튼 거리도 있습니다.

$
d_{manhattan} = \sum_{i=1}^{n} |x_{i}-y_{i}|
$

NearestNeighbors의 기본값은 민코프스키 거리입니다.

$
d_{minkowski} = \left(\sum_{i=1}^{n} |x_{i}-y_{i}|^{p}\right)^{\frac{1}{p}}
$

여기에서 $x_{i}$와 $y_{i}$는 거리를 계산하려는 두 개의 샘플입니다.
민코프스키 거리에는 하이퍼파라미터 p가 있습니다.
p=1이면 맨해튼 거리이고 p=2이면 유클리드 거리입니다.
사이킷런의 기본값은 p=2입니다.

### 15.2 k-최근접 이웃 분류기 만들기

타깃 클래스를 모르는 샘플 $x_{\mu}$가 주어지면 KNN 알고리즘은 먼저 어떤 거리 측정 방법(예를 들면 유클리드 거리)을 기반으로 가장 가까운 k개의 샘플($x_{\mu}$의 이웃이라고도 부릅니다.)을 찾습니다.
그 다음 이 k개 샘플의 클래스를 기반으로 투표를 합니다.
가장 많은 표를 얻은 클래스가 $x_{\mu}$의 예측 클래스가 됩니다.
이론적으로 말하면 $x_{\mu}$가 클래스 j일 확률은 다음과 같습니다.

$
\frac{1}{k}\sum_{i \in v}I\left( y_{i}=j \right)
$

여기에서 v는 $x_{\mu}$ 이웃에 있는 k개의 샘플이고, y는 i번째 샘플의 클래스 입니다.
I는 지시 함수(indicator function)으로 1은 참, 0은 그 외 입니다.
사이킷런에서는 predict_proba 메서드를 사용하여 이 확률을 출력할 수 있습니다.

```python
from sklearn import datasets
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler

# 데이터를 로드합니다.
iris = datasets.load_iris()
x = iris.data
y = iris.target

# 표준화 객체를 만듭니다.
standardizer = StandardScaler()

# 특성을 표준화합니다.
x_std = standardizer.fit_transform(x)

# 5개의 이웃을 사용한 KNN 분류기를 훈련합니다.
knn = KNeighborsClassifier(n_neighbors=5, n_jobs=-1).fit(x_std, y)

# 두 개의 샘플을 만듭니다.
new_observations = [
    [0.75, 0.75, 0.75, 0.75],
    [1, 1, 1, 1]
]

# 두 샘플의 클래스를 예측합니다.
knn.predict(new_observations)

# 각 샘플이 세 클래스에 속할 확률을 확인합니다.
knn.predict_proba(new_observations)
```

```text
array([[0. , 0.6, 0.4],
       [0. , 0. , 1. ]])
```

### 15.3 최선의 이웃 개수 결정하기

k값의 크기는 KNN 분류기에 큰 영향을 미칩니다.
편향과 분산 사이에 균형점을 찾아야 하는 머신러닝에서 k값만큼 명확한 경우가 많지 않습니다.
n이 샘플의 개수일 때 k=n이면 편향이 높고 분산이 낮습니다.
k=1이면 편향이 낮고 분산이 높습니다.
이 편향-분산 트레이드오프의 균형을 맞추는 k값을 찾으면 최선의 모델을 만들 수 있습니다.

```python
from sklearn import datasets
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline, FeatureUnion
from sklearn.model_selection import GridSearchCV

# 데이터를 로드합니다.
iris = datasets.load_iris()
features = iris.data
target = iris.target

# 표준화 객체를 만듭니다.
standardizer = StandardScaler()

# KNN 분류기를 만듭니다.
knn = KNeighborsClassifier(n_neighbors=5, n_jobs=-1)

# 파이프라인을 만듭니다.
pipe = Pipeline([("standardizer", standardizer), ("knn", knn)])

# 탐색 영역의 후보를 만듭니다.
search_space = [{"knn__n_neighbors": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}]

# 그리드 서치를 만듭니다.
classifier = GridSearchCV(
    pipe, search_space, cv=5, verbose=0).fit(features, target)
```

```python
# 최선의 이웃 개수 (k)
classifier.best_estimator_.get_params()["knn__n_neighbors"]
```

```text
6
```
