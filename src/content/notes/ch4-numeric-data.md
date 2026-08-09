---
title: "ch4. Numeric Data"
date: 2022-05-28
category: ml-data
tags: ["ml", "python", "study", "sklearn", "dataframe", "outlier", "standardization", "normalization"]
series: "ML with Python Cookbook"
seriesOrder: 4
source: manual
---

## Summary
***

 Numeric data를 machine learning에 알맞은 feature로 변환하는 다양한 전략을 알아봅니다.
 <br /><br />


 * Scaling (4.1)

```python
# scale 조정: sklearn의 MinMaxScaler method를 사용합니다. 보통 0~1이나 -1~+1 range로 조정합니다.

# fit: feature의 min, max를 계산합니다.

# transform: feature의 scale을 조정합니다.

minmax_scale = sklearn.preprocessing.MinMaxScaler(feature_range=(0, 1))
minmax_scale.fit_transform(feature)


# Training set과 test set의 scale을 따로 조정하면 안됩니다. Scale 조정을 위해 구한 min, max의 동일한 값을 사용해야 합니다.

# Neural network는 min-max scaling을 권장합니다.
```
<br /><br />


 * Standardization

```python
# sklearn의 StandardScaler: feature의 mean 0, std 1이 되도록 변환합니다.

# 변환된 feature는 원본 값이 mean에서 몇 std만큼 떨어져 있는지 z-score로 표현합니다.

# PCA 분석은 standardization 방식이 잘 맞습니다.
scaler = sklearn.preprocessing.StandardScaler()
standardized = scaler.fit_transform(feature)


# Data에 Outlier가 많다면 mean과 std에 영향을 미치므로 standardization에 부정적인 영향을 미칩니다.

# 이 경우 median과 IQR을 사용하여 scale을 변환합니다. sklearn의 RobustScaler method를 사용합니다. Data에서 median을 빼고 IQR로 나누는 방식입니다.
robust_scaler = sklearn.preprocessing.RobustScaler()
robust_standardized = robust_scaler.fit_transform(feature)
```
<br /><br />


 * Normalization (4.3)

```python
# Normalizer + norm 매개변수: feature 전체 길이가 1인 unit norm이 되도록 변환합니다.
normalizer = sklearn.preprocessing.Normalizer(norm='l2')
normalizer.transform(feature)

# 각 단어나 n개의 단어 그룹이 feature인 text classification처럼, 유사한 feature가 많을 때 사용합니다.

# Normalizer는 세 가지 norm 옵션을 제공합니다.

## L2(Euclidean norm): default. 두 지점 사이를 잇는 직선 거리입니다.

## L1(Manhattan norm): taxi norm. 두 지점 사이를 사람이 도보로 걷는 것과 같습니다.

## max: 각 row의 max 값으로 row의 값들을 나눕니다.
```
<br /><br />


 * Polynominal과 Interaction feature (4.4)

```python
# Polynominal: feature와 target 사이 non-linear 관계가 있다는 가정을 추가할 때 사용합니다. Feature에 변동 효과를 주입합니다. 예를 들어 주요 질병에 걸릴 확률에서 나이가 미치는 영향

# Interaction: feature의 효과가 다른 feature에 dependent하는 경우 사용합니다. 예를 들어 커피의 달달함에서 설탕을 넣었는지, 커피를 저었는지 여부

# sklearn의 PolynominalFeatures class를 사용합니다.
```
<br /><br />


 * Feature Transformation (4.5)

```python
# FunctionTransformer: 하나 이상의 features에 사용자 정의 transformation을 적용합니다.
new_transformer = FunctionTransformer(new_function)
new_transformer.transform(features)

# pandas의 apply도 동일한 기능을 합니다.
df.apply(new_function)
```
<br /><br />


 * Outlier (4.6)

```python
# 정의: 1사분위보다 1.5 IQR 이상 작은 값, 3사분위보다 1.5 IQR 이상 큰 값으로 정의합니다.

# 처리하는 방법
## 1. 삭제
houses[houses['kitchen'] <3]

## 2. outlier로 flagging 하고 feature의 하나로 포함시키기
houses['outlier'] = np.where(houses['kitchen'] < 3, 0, 1)

## 3. outlier 영향이 줄어들도록 feature 변환하기
houses['log_of_square_feet'] = [np.log(x) for x in houses['square_feet']]
```
<br /><br />


 * Feature Binarization (4.8)

```python
# Binarizer: threshold에 따라 feature를 두 개로 나눕니다.
binarizer = Binarizer(18)
binarizer.fit_transform(age)

# digitize: numeric feature를 여러 threshold에 따라 나눕니다.
np.digitize(age, bins=[20, 30, 64])
```
<br /><br />


## Practice
***

### 4.0 소개   
   
정량적 데이터를 머신러닝에 알맞은 특성으로 변환하는 다양한 전략을 소개합니다.

### 4.1 특성 스케일 바꾸기   
   
sklearn의 MinMaxScaler를 사용해 특성 배열의 스케일을 조정합니다.   
스케일 조정은 머신러닝에서 흔한 전처리 작업입니다.   
일반적으로 0\~1이나 -1\~+1 사이입니다.   
스케일 조정 기법은 여러 가지인데, 가장 간단한 방법은 min-max scaling 입니다.   
구체적으로 다음과 같이 계산합니다.   
   
>$x'_i = \frac{x_i - min(x)}{max(x)-min(x)}$   
x는 특성 벡터이고 $x_{i}$는 특성 x의 개별 원소입니다. $x'_{i}$는 스케일이 바뀐 원소입니다.

```python
import numpy as np
from sklearn import preprocessing

# 특성을 만듭니다.
feature = np.array([[-500.5],
                    [-100.1],
                    [0],
                    [100.1],
                    [900.9]])

# 스케일러 객체를 만듭니다.
minmax_scale = preprocessing.MinMaxScaler(feature_range=(0, 1))

# 특성의 스케일을 변환합니다.
scaled_feature = minmax_scale.fit_transform(feature)

# 특성을 출력합니다.
scaled_feature
```

```text
array([[0.        ],
       [0.28571429],
       [0.35714286],
       [0.42857143],
       [1.        ]])
```

sklearn의 MinMaxScaler는 특성 스케일을 위해 두 가지 방법을 제공합니다.   
1. fit 메서드를 사용해 특성의 min, max를 계산한 다음 transform 메서드로 특성의 스케일을 조정합니다.
2. fit_transform 메서드로 두 연산을 한 번에 처리합니다.

훈련 세트와 테스트 세트의 스케일을 따로 조정하면 안됩니다.   
훈련 세트의 스케일을 조정하고자 구한 min, max를 똑같이 사용하여 테스트 세트의 스케일을 조정해야 합니다.   
   
왜 스케일을 따로 조정하면 안되는지 예를 통해 알아보겠습니다.   
위 예시 데이터에서 처음 세 개를 훈련 세트, 나머지 두 개를 테스트 세트라고 가정합니다.

```python
# 훈련 세트를 변환합니다.
preprocessing.MinMaxScaler().fit_transform(feature[:3])
```

```text
array([[0. ],
       [0.8],
       [1. ]])
```

```python
# 테스트 세트를 변환합니다.
preprocessing.MinMaxScaler().fit_transform(feature[3:])
```

```text
array([[0.],
       [1.]])
```

훈련 세트와 테스트 세트를 각각 변환하면 서로 다른 비율로 데이터를 변환합니다.
훈련 세트에 있는 0과 테스트 세트에 있는 900.9가 모두 1로 바뀌었습니다.   
데이터가 다른 스케일로 변환되면 훈련 세트에서 학습한 모델을 테스트 세트에서 사용할 수 없습니다.   
   
이번에는 훈련 세트에서 학습한 변환기로 테스트 세트를 학습해 보겠습니다.

```python
# 훈련 세트로 변환기를 학습합니다.
scaler = preprocessing.MinMaxScaler().fit(feature[:3])
scaler.transform(feature[:3])
```

```text
array([[0. ],
       [0.8],
       [1. ]])
```

```python
# 훈련 세트에서 학습한 변환기로 테스트 세트를 변환합니다.
scaler.transform(feature[3:])
```

```text
array([[1.2],
       [2.8]])
```

훈련 세트를 학습한 변환기 객체(scaler)를 사용하여 원본 데이터셋과 동일한 비율로 테스트 세트를 변환했습니다.

### 4.2 특성을 표준화하기   
   
특성을 평균이 0이고 표준편차가 1이 되도록 변환해야 합니다.   
sklearn의 StandardScaler를 사용하여 두 변환을 모두 수행할 수 있습니다.

```python
from sklearn import preprocessing

# 특성을 만듭니다.
x = np.array([[-1000.1],
              [-200.2],
              [500.5],
              [600.6],
              [9000.9]])

# 변환기 객체를 만듭니다.
scaler = preprocessing.StandardScaler()

# 특성을 변환합니다.
standardized = scaler.fit_transform(x)

# 특성을 출력합니다.
standardized
```

```text
array([[-0.76058269],
       [-0.54177196],
       [-0.35009716],
       [-0.32271504],
       [ 1.97516685]])
```

레시피 4.1에서 설명한 min-max scaling과 함께   
특성을 표준 정규분포로 근사하는 scaling 방식이 자주 쓰입니다.   
이 방식은 표준화를 사용하여 데이터의 평균 $\bar{x}$가 0이고 표준편차 $\sigma$가 1이 되도록 변환됩니다.   
>$x'_{i} = \frac{x_{i}-\bar{x}}{\sigma}$   
$x'_{i}$는 $x_{i}$의 표준화된 형태입니다.   
변환된 특성은 원본 값이 특성 평균에서 몇 표준편차만큼 떨어져 있는지로 표현합니다. (z-score)   
   
표준화는 머신러닝의 일반적인 전처리 단계에서 사용할 수 있는 믿을 만한 scaling 방법입니다.   
학습 알고리즘에 의존적인데, 주성분 분석(PCA)은 표준화가 잘 맞는 반면   
신경망(neural network)에는 min-max scaling을 종종 권장합니다.

데이터에 이상치가 많다면 특성의 평균과 표준편차에 영향을 미치기 때문에 표준화에 부정적인 영향을 미칩니다.   
이런 경우에는 중간값과 사분위 범위를 사용하여 특성의 스케일을 조정하는 것이 좋습니다.   
sklearn의 RobustScaler가 이런 방법을 제공합니다.

```python
# 변환기 객체를 만듭니다.
robust_scaler = preprocessing.RobustScaler()

# 특성을 변환합니다.
robust_scaler.fit_transform(x)
```

```text
array([[-1.87387612],
       [-0.875     ],
       [ 0.        ],
       [ 0.125     ],
       [10.61488511]])
```

데이터를 오름차순으로 나열했을 때   
75%에 위치한 값(3사분위수)과 25%에 위치한 값(1사분위수)의 차를   
사분위범위(interquatile range, IQR)라고 부릅니다.   
RobustScaler는 데이터에서 중간값을 빼고 IQR로 나눕니다.

### 4.3 정규화하기   
   
샘플의 특성값을 전체 길이가 1인 단위 norm이 되도록 변환합니다.   
norm 매개변수와 함께 Normalizer 클래스를 사용합니다.

```python
from sklearn.preprocessing import Normalizer

# 특성 행렬을 만듭니다.
features = np.array([[0.5, 0.5],
                     [1.1, 3.4],
                     [1.5, 20.2],
                     [1.63, 34.4],
                     [10.9, 3.3]])

# 변환기 객체를 만듭니다.
normalizer = Normalizer(norm="l2")

# 특성 행렬을 변환합니다.
normalizer.transform(features)
```

```text
array([[0.70710678, 0.70710678],
       [0.30782029, 0.95144452],
       [0.07405353, 0.99725427],
       [0.04733062, 0.99887928],
       [0.95709822, 0.28976368]])
```

min-max scaling이나 표준화와 같이 많은 scaling 방법이 특성별로 적용되지만   
샘플별로 scale을 바꿀 수도 있습니다.   
Normalizer는 단위 노름(길이의 합이 1)이 되도록 개별 샘플의 값을 변환합니다.   
이런 종류의 scaling은 예를 들어 각 단어나 n개의 단어 그룹이 특성인 텍스트 분류와 같이 유사한 특성이 많을 때 종종 사용합니다.   
   
Normalizer는 세 가지 노름 옵션을 제공합니다. 그 중 L2 노름이라고도 부르는 유클리드 노름이 기본값입니다.   
>$\lVert x \rVert_{2} = \sqrt{x_{1}^2 + x_{2}^2 + ... + x_{n}^2}$   
x는 개별샘플이고 $x_{n}$는 샘플의 n번째 특성값입니다.

```python
# 특성 행렬을 변환합니다.
features_l2_norm = Normalizer(norm="l2").transform(features)

# 특성 행렬을 출력합니다.
features_l2_norm
```

```text
array([[0.70710678, 0.70710678],
       [0.30782029, 0.95144452],
       [0.07405353, 0.99725427],
       [0.04733062, 0.99887928],
       [0.95709822, 0.28976368]])
```

맨해튼 노름(L1)을 지정할 수도 있습니다.   
>$\lVert x \rVert _{1} = \sum_{i=1}^n \lvert x_{i} \rvert$

```python
# 특성 행렬을 변환합니다.
features_l1_norm = Normalizer(norm="l1").transform(features)

# 특성 행렬을 출력합니다.
features_l1_norm
```

```text
array([[0.5       , 0.5       ],
       [0.24444444, 0.75555556],
       [0.06912442, 0.93087558],
       [0.04524008, 0.95475992],
       [0.76760563, 0.23239437]])
```

직관적으로 생각했을 때 L2 노름은 뉴욕의 두 지점 사이를 잇는 직선 거리로 볼 수 있습니다.   
L1 노름은 사람이 도보를 따라 걷는 것과 같습니다. 그래서 맨해튼 노름을 택시 노름이라고도 부릅니다.   
   
norm="l1"은 각 샘플 특성값의 합을 1로 만듭니다. 실제 이런 성질이 가끔 필요할 때가 있습니다.

```python
# 합을 출력합니다.
print("첫 번째 샘플값의 합:", features_l1_norm[0, 0] + features_l1_norm[0, 1])
```

```text
첫 번째 샘플값의 합: 1.0
```

Normalizer는 행 단위로 변환되므로 fit 메서드는 아무런 작업을 수행하지 않습니다.   
이런 이유로 해결의 코드처럼 바로 transform 메서드를 사용할 수 있습니다.   
'l1'과 'l2' 옵션의 변환은 각 행의 L1 노름과 L2노름을 구해 나누는 것입니다.

```python
# L1 노름을 사용한 변환.
# 각 행(AXIS=1)을 합한 결과가 2차원 배열로 유지되도록 keepdims를 True로 설정합니다.
features / np.sum(np.abs(features), axis=1, keepdims=True)
```

```text
array([[0.5       , 0.5       ],
       [0.24444444, 0.75555556],
       [0.06912442, 0.93087558],
       [0.04524008, 0.95475992],
       [0.76760563, 0.23239437]])
```

```python
# L2 노름을 사용한 변환.
features / np.sqrt(np.sum(np.square(features), axis=1, keepdims=True))
```

```text
array([[0.70710678, 0.70710678],
       [0.30782029, 0.95144452],
       [0.07405353, 0.99725427],
       [0.04733062, 0.99887928],
       [0.95709822, 0.28976368]])
```

Normalizer의 norm 매개변수에 지정할 수 있는 다른 한 가지 옵션은 'max'입니다.   
이 옵션은 각 행의 최댓값으로 행의 값을 나눕니다.

```python
# 각 행에서 최댓값으로 나눕니다.
Normalizer(norm="max").transform(features)
```

```text
array([[1.        , 1.        ],
       [0.32352941, 1.        ],
       [0.07425743, 1.        ],
       [0.04738372, 1.        ],
       [1.        , 0.30275229]])
```

### 4.4 다항 특성과 교차항 특성 생성하기   
   
다항(polynominal) 특성과 교차항(interaction) 특성을 만듭니다.   
sklearn의 PolymonialFeatures를 사용합니다.

```python
from sklearn.preprocessing import PolynomialFeatures

# 특성 행렬을 만듭니다.
features = np.array([[2, 3],
                     [2, 3],
                     [2, 3]])

# PolynomialFeatures 객체를 만듭니다.
polynomial_interaction = PolynomialFeatures(degree=2, include_bias=False)

# 다항 특성을 만듭니다.
polynomial_interaction.fit_transform(features)
```

```text
array([[2., 3., 4., 6., 9.],
       [2., 3., 4., 6., 9.],
       [2., 3., 4., 6., 9.]])
```

degree 매개변수가 다항식의 최대 차수를 결정합니다. 예를 들어 degree=2는 2제곱까지 새로운 특성을 만듭니다.   
>$x_{1}, x_{2}, x_{1}^2, x_{2}^2$   
   
degree=3은 2제곱과 3제곱까지 새로운 특성을 만듭니다.   
   
기본적으로 PolynomialFeatures는 교차항을 포함합니다.   
>$x_{1}x_{2}$   
   
interaction_only를 True로 지정하면 교차항 특성만 만들 수 있습니다.

```python
# interaction 객체를 만듭니다.
interaction = PolynomialFeatures(degree=2, interaction_only=True, include_bias=False)

# 교차항 특성을 만듭니다,
interaction.fit_transform(features)
```

```text
array([[2., 3., 6.],
       [2., 3., 6.],
       [2., 3., 6.]])
```

특성과 타깃 사이에 비선형 관계가 있다는 가정을 추가할 때 다항 특성을 종종 만듭니다.   
예를 들면 주요 질병에 걸릴 확률에 나이가 미치는 영향은 일정한 상숫값이 아니고   
나이가 증가함에 따라 같이 증가한다는 의심을 할 수 있습니다.   
특성 x에 변동 효과를 주입하기 위해서 고차항 특성을 만들 수 있습니다.   
   
또한 한 특성의 효과가 다른 특성에 의존하는 경우를 자주 만나게 됩니다.   
예를 들어 커피가 달달한지 예측하는 문제입니다.   
여기에는 두 개의 특성이 있습니다.   
1. 커피를 저었는지 여부
2. 설탕을 넣었는지 여부   
   

각 특성은 독립적으로는 커피의 당도를 예측하지 못하지만 이 둘의 조합은 가능합니다.   
즉, 커피에 설탕을 넣고 저었을 때에만 커피가 달달합니다.   
타겟(달달함)에 대한 각 특성의 영향은 서로에게 종속적입니다.   
개별 특성을 곱한 교차항을 특성에 추가하여 이런 관계를 인코딩할 수 있습니다.

include_bias 매개변수의 기본값은 True입니다. 이 설정은 변환된 특성에 상수항 1을 추가합니다.

```python
# 상수항 1을 추가합니다.
polynomial_bias = PolynomialFeatures(degree=2, include_bias=True).fit(features)

# 다항 특성을 만듭니다.
polynomial_bias.transform(features)
```

```text
array([[1., 2., 3., 4., 6., 9.],
       [1., 2., 3., 4., 6., 9.],
       [1., 2., 3., 4., 6., 9.]])
```

get_feature_names 메서드는 특성 변환 식을 이름으로 반환합니다.

```python
polynomial_bias.get_feature_names()
```

```text
['1', 'x0', 'x1', 'x0^2', 'x0 x1', 'x1^2']
```

### 4.5 특성 변환하기   
   
하나 이상의 특성에 사용자 정의 변환을 적용합니다.   
sklearn의 FunctionTransformer를 사용합니다.

```python
from sklearn.preprocessing import FunctionTransformer

# 특성 행렬을 만듭니다.
features = np.array([[2, 3],
                     [2, 3],
                     [2, 3]])

# 간단한 함수를 정의합니다.
def add_ten(x):
    return x+10

# 변환기 객체를 만듭니다.
ten_transformer = FunctionTransformer(add_ten)

# 특성 행렬을 변환합니다.
ten_transformer.transform(features)
```

```text
array([[12, 13],
       [12, 13],
       [12, 13]])
```

pandas의 apply 메서드를 사용하여 동일한 변환을 수행할 수 있습니다.

```python
import pandas as pd

# 데이터프레임을 만듭니다.
df = pd.DataFrame(features, columns=["feature_1", "feature_2"])

# 함수를 적용합니다.
df.apply(add_ten)
```

```text
   feature_1  feature_2
0         12         13
1         12         13
2         12         13
```

### 4.6 이상치 감지하기   
   
예외적인 샘플을 구별합니다.   
일반적인 방법은 데이터가 정규분포를 따른다고 가정하고 데이터를 둘러싼 타원을 그립니다.   
이 타원 안의 샘플을 정상치(label 1)로 분류하고, 타원 밖의 샘플은 이상치(label -1)로 분류합니다.

```python
from sklearn.covariance import EllipticEnvelope
from sklearn.datasets import make_blobs

# 모의 데이터를 만듭니다.
features, _ = make_blobs(n_samples = 10,
                         n_features = 2,
                         centers = 1,
                         random_state = 1)

# 첫 번째 샘플을 극단적인 값으로 바꿉니다.
features[0, 0] = 10000
features[0, 1] = 10000

# 이상치 감지 객체를 만듭니다.
outlier_detector = EllipticEnvelope(contamination=.1)

# 감지 객체를 훈련합니다.
outlier_detector.fit(features)

# 이상치를 예측합니다.
outlier_detector.predict(features)
```

```text
array([-1,  1,  1,  1,  1,  1,  1,  1,  1,  1])
```

이 방식의 주요 단점은 이상치의 비율을 정하는 contamination 매개변수를 지정해야 한다는 것입니다.   
실제로는 알지 못합니다. contamination은 데이터가 얼마나 깨끗한지 추측하는 것으로 볼 수 있습니다.   
데이터에 이상치가 적다면 contamination을 작게 지정할 수 있습니다.   
데이터에 이상치가 많다고 생각하면 이 값을 크게 설정해야 합니다.   
   
샘플을 전체적으로 보는 것보다 개별 특성에서 IQR을 사용하여 극단적인 값을 구별할 수 있습니다.

```python
# 하나의 특성을 만듭니다.
feature = features[:,0]

# 이상치의 인덱스를 반환하는 함수를 만듭니다.
def indicies_of_outliers(x):
    q1, q3 = np.percentile(x, [25, 75])
    iqr = q3 - q1
    lower_bound = q1 - (iqr * 1.5)
    upper_bound = q3 + (iqr * 1.5)
    return np.where((x > upper_bound) | (x < lower_bound))

# 함수를 실행합니다.
indicies_of_outliers(feature)
```

```text
(array([0], dtype=int64),)
```

IQR은 데이터에 있는 1사분위와 3사분위 사이의 거리입니다.   
IQR은 데이터의 대부분이 퍼져 있는 곳으로 생각할 수 있습니다.   
이상치는 데이터가 집중되어 있는 이 지역에서 멀리 떨어진 샘플입니다.   
보통 이상치는 1사분위보다 1.5 IQR 이상 작은 값이나 3사분위보다 1.5 IQR 큰 값으로 정의합니다.

### 4.7 이상치 다루기   
   
일반적으로 이상치를 다루는 전략은 세 가지입니다.   
1. 이상치 삭제
2. 이상치로 표시하고 이를 특성의 하나로 포함시키기
3. 이상치의 영향이 줄어들도록 특성을 변환하기

```python
# 1. 이상치 삭제
# 데이터프레임을 만듭니다.
houses = pd.DataFrame()
houses['Price'] = [534433, 392333, 293222, 4322032]
houses['Bathrooms'] = [2, 3.5, 2, 116]
houses['Square_Feet'] = [1500, 2500, 1500, 48000]

# 샘플을 필터링합니다.
houses[houses['Bathrooms'] < 20]
```

```text
    Price  Bathrooms  Square_Feet
0  534433        2.0         1500
1  392333        3.5         2500
2  293222        2.0         1500
```

```python
# 2. 이상치로 표시하고 이를 특성의 하나로 포함시키기
# 불리언 조건을 기반으로 특성을 만듭니다.
houses["Outlier"] = np.where(houses["Bathrooms"] < 20, 0, 1)

# 데이터를 확인합니다.
houses
```

```text
     Price  Bathrooms  Square_Feet  Outlier
0   534433        2.0         1500        0
1   392333        3.5         2500        0
2   293222        2.0         1500        0
3  4322032      116.0        48000        1
```

```python
# 3. 이상치의 영향이 줄어들도록 특성을 변환하기
# 로그 특성
houses["Log_Of_Square_Feet"] = [np.log(x) for x in houses["Square_Feet"]]

# 데이터를 확인합니다.
houses
```

```text
     Price  Bathrooms  Square_Feet  Outlier  Log_Of_Square_Feet
0   534433        2.0         1500        0            7.313220
1   392333        3.5         2500        0            7.824046
2   293222        2.0         1500        0            7.313220
3  4322032      116.0        48000        1           10.778956
```

이상치 감지와 마찬가지로, 이상치를 다룰 때 언제나 적용할 수 있는 좋은 처리 방법이란 없습니다.   
대신 두 가지 측면에서 처리 방법을 고려해야 합니다.   
1. 어떤 것을 이상치로 간주할 것인지 생각해야 합니다.   
고장난 센서나 잘못 인코딩된 값 때문에 데이터에 오류가 있다고 생각되면   
이 값을 신뢰할 수 없으므로 삭제하거나 이상치를 NaN으로 바꿀 수 있습니다.   
극단적인 값을 가진 샘플이라면 이를 이상치로 표시하거나 적절한 값으로 변환합니다.   
   
2. 이상치를 다루는 방법이 머신러닝의 목적에 맞아야 합니다.   
예를 들어 집의 특성값을 기반으로 주택 가격을 예측한다면   
100개의 방을 가진 집의 가격은 일반적인 주택과 다른 방식으로 정해진다고 가정할 수 있습니다.   
또한 온라인 주택 대출 웹 애플리케이션의 일부로 머신러닝 모델을 훈련한다면   
잠재 고객 중에 100개의 방을 가진 집을 구입할 만한 백만장자는 없을 것입니다.   
   
이상치가 평균과 분산에 영향을 끼치기 때문에 이상치가 있다면 표준화가 적절하지 않습니다.   
RobustScaler와 같이 이상치에 민감하지 않은 scaling 방법을 사용해야 합니다.

### 4.8 특성 이산화하기   
   
데이터는 두 가지 방법으로 나눌 수 있습니다.   
1. 임곗값에 따라 특성을 둘로 나누기
2. 수치 특성을 여러 임곗값에 따라 나누기

```python
# 1. 임곗값에 따라 특성을 둘로 나누기
from sklearn.preprocessing import Binarizer

# 특성을 만듭니다.
age = np.array([[6],
                [12],
                [20],
                [36],
                [65]])

# Binarizer 객체를 만듭니다.
binarizer = Binarizer(18)

# 특성을 변환합니다.
binarizer.fit_transform(age)
```

```text
D:\anaconda\lib\site-packages\sklearn\utils\validation.py:67: FutureWarning: Pass threshold=18 as keyword args. From version 0.25 passing these as positional arguments will result in an error
  warnings.warn("Pass {} as keyword args. From version 0.25 "
```

```text
array([[0],
       [0],
       [1],
       [1],
       [1]])
```

```python
# 2. 수치 특성을 여러 임곗값에 따라 나누기

# 특성을 나눕니다.
np.digitize(age, bins=[20, 30, 63])
```

```text
array([[0],
       [0],
       [1],
       [2],
       [3]], dtype=int64)
```

bins 매개변수의 입력값은 각 구간의 왼쪽 경곗값입니다.   
예를 들어 20까지 구간에는 값이 20인 원소가 포함되지 않고 20보다 작은 두 개만 포함됩니다.   
right 매개변수를 True로 설정하면 이 동작을 바꿀 수 있습니다.

```python
# 특성을 나눕니다.
np.digitize(age, bins=[20, 30, 64], right=True)
```

```text
array([[0],
       [0],
       [0],
       [2],
       [3]], dtype=int64)
```

이산화는 수치 특성을 범주형처럼 다루어야 할 때 유용한 전략입니다.   
예를 들어 19세와 20세의 소비 습관은 차이가 매우 작지만   
20세와 21세 사이는 차이가 클 수 있습니다.   
이런 경우엔 술을 마실 수 있는 사람과 그렇게 않은 사람으로 구분하는 것이 좋습니다.   
경우에 따라서는 세 개나 그 이상의 구간으로 나누는 것이 좋을 수도 있습니다.   
   
이번 해결에서는 두 가지 이산화 방법을 살펴보았습니다.   
두 개의 구간으로 나누는 sklearn의 Binarizer와   
세 개 이상의 구간으로 나누는 numpy의 digitize입니다.   digitize에 하나의 임곗값만 지정하면 Binarizer처럼 특성을 두 개의 구간으로 나눌 수 있습니다.

```python
# 특성을 나눕니다.
np.digitize(age, bins=[18])
```

```text
array([[0],
       [0],
       [1],
       [1],
       [1]], dtype=int64)
```

sklearn 0.20 버전에서는 연속적인 특성값을 여러 구간으로 나누어주는 KBinsDiscretizer 클래스가 추가되었습니다.   
이 클래스는 나눌 구간 개수를 지정합니다.

```python
from sklearn.preprocessing import KBinsDiscretizer

# 네 개의 구간으로 나눕니다.
kb = KBinsDiscretizer(4, encode='ordinal', strategy='quantile')
kb.fit_transform(age)
```

```text
array([[0.],
       [1.],
       [2.],
       [3.],
       [3.]])
```

encode 매개변수의 기본값은 'onehot'으로 one-hot encoding된 희소 행렬을 반환합니다.   
'onehot-dense'는 밀집 배열을 반환합니다.   
연속된 값을 이산화하여 one-hot encoding으로 만들면 범주형 특성으로 다루기 편합니다.

```python
# one-hot encoding을 반환합니다.
kb = KBinsDiscretizer(4, encode='onehot-dense', strategy='quantile')
kb.fit_transform(age)
```

```text
array([[1., 0., 0., 0.],
       [0., 1., 0., 0.],
       [0., 0., 1., 0.],
       [0., 0., 0., 1.],
       [0., 0., 0., 1.]])
```

strategy 매개변수의 기본값은 'quantile'로 각 구간에 포함된 샘플 개수가 비슷하도록 만듭니다.   
'uniform'은 구간의 폭이 동일하도록 만듭니다.

```python
# 동일한 길이의 구간을 만듭니다.
kb = KBinsDiscretizer(4, encode='onehot-dense', strategy='uniform')
kb.fit_transform(age)
```

```text
array([[1., 0., 0., 0.],
       [1., 0., 0., 0.],
       [1., 0., 0., 0.],
       [0., 0., 1., 0.],
       [0., 0., 0., 1.]])
```

구간은 bin_edges_ 속성에서 확인할 수 있습니다.   
시작과 끝 겨계는 처음과 마지막 구간에 포함됩니다.   
나머지 경곗값은 왼쪽 경계를 나타냅니다.   
즉 첫 번째 구간은 [6.0, 20.75]이고 두 번째 구간은 [20.75, 35.5]가 되는 식입니다.

```python
kb.bin_edges_
```

```text
array([array([ 6.  , 20.75, 35.5 , 50.25, 65.  ])], dtype=object)
```

### 4.9 군집으로 샘플을 그룹으로 묶기   
   
k개의 그룹이 있다는 것을 안다면 k-mean clustering을 사용하여 비슷한 샘플을 그룹으로 모을 수 있습니다.   
각 샘플의 소속 그룹이 새로운 특성이 됩니다.

```python
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

# 모의 특성 행렬을 만듭니다.
features, _ = make_blobs(n_samples = 50,
                         n_features = 2,
                         centers = 3,
                         random_state = 1)

# 데이터프레임을 만듭니다.
dataframe = pd.DataFrame(features, columns=["feature_1", "feature_2"])

# k-means clustering 모델을 만듭니다.
clusterer = KMeans(3, random_state=0)

# 모델을 훈련합니다.
clusterer.fit(features)

# 그룹 소속을 예측합니다.
dataframe["group"] = clusterer.predict(features)

# 처음 몇 개의 샘플을 조회합니다.
dataframe.head(5)
```

```text
   feature_1  feature_2  group
0  -9.877554  -3.336145      2
1  -7.287210  -8.353986      0
2  -6.943061  -7.023744      0
3  -7.440167  -8.791959      0
4  -6.641388  -8.075888      0
```

Clustering 알고리즘은 뒤(19장)에서 자세히 알아보겠습니다.   
여기에서는 clustering이 전처리 단계로 사용할 수 있다는 점이 중요합니다.   
실제로 k-means 같은 비지도 학습 알고리즘을 사용하여 샘플을 그룹으로 모을 수 있습니다.   
최종 목적은 비슷한 샘플이 모인 그룹을 나타내는 범주형 특성입니다.

### 4.10 누락된 값을 가진 샘플을 삭제하기   
   
numpy에서는 한 줄로 간단하게 누락된 값이 있는 샘플을 삭제할 수 있습니다.

```python
features = np.array([[1.1, 11.1],
                     [2.2, 22.2],
                     [3.3, 33.3],
                     [4.4, 44.4],
                     [np.nan, 55]])

# (~ 연산자를 사용하여) 누락된 값이 없는 샘플만 남깁니다.
features[~np.isnan(features).any(axis=1)]
```

```text
array([[ 1.1, 11.1],
       [ 2.2, 22.2],
       [ 3.3, 33.3],
       [ 4.4, 44.4]])
```

또 pandas를 사용하여 누락된 값이 있 샘플을 삭제할 수 있습니다.

```python
# 데이터를 적재합니다.
dataframe = pd.DataFrame(features, columns=["feature_1", "feature_2"])

# 누락된 값이 있는 샘플을 제거합니다.
dataframe.dropna()
```

```text
   feature_1  feature_2
0        1.1       11.1
1        2.2       22.2
2        3.3       33.3
3        4.4       44.4
```

대부분 머신러닝 알고리즘은 타겟과 특성 행렬에 있는 누락된 값을 다룰 수 없습니다.   
따라서 데이터의 누락된 값을 무시할 수 없고 전처리 과정에서 처리해주어야 합니다.   
   
가장 간단한 해결은 하나 이상 누락된 값을 가진 샘플을 삭제하는 것입니다.   
numpy나 pandas를 사용해 빠르고 쉽게 처리할 수 있습니다.   
   
누락된 값이 있는 샘플을 삭제할 때는 매우 조심해야 합니다.   
샘플 삭제는 최후의 수단입니다.   
일단 삭제하면 알고리즘은 그 샘플에 있는 다른 정보를 얻을 수 없습니다.   
   
누락된 값의 원인에 따라 샘플 삭제는 데이터의 bias를 늘린다는 사실도 중요합니다.   
누락된 데이터에는 세 가지 종류가 있습니다.   
1. 완전히 랜덤하게 누락(MCAR)   
값이 누락될 확률이 모든 것에 독립적입니다.   
예를 들어 설문 참여자가 질문에 대답하기 전에 주사위를 굴려 6이 나오면 그 질문을 건너뀝니다.   
2. 랜덤하게 누락(MAR)   
값이 누락될 확률이 완전히 랜덤하지 않고 다른 특성에서 얻은 정보에 의존합니다.   
예를 들어 결혼 여부와 자녀 유무에 관해 질문한다고 가정할 때,   
미혼자는 자녀 유무 항목을 건너뛸 가능성이 높습니다.   
이 때 자녀 유무 항목의 응답 여부는 결혼 여부 특성에서 얻은 정보에 의존합니다.   
3. 랜덤하지 않게 누락(MNAR)   
값이 누락될 확률이 랜덤하지 않고 특성에서 잡지 못한 정보에 의존합니다.   
예를 들어 설문에는 결혼 여부에 관한 질문이 있고   
미혼자는 자녀 유무 항목을 건너 뛸 가능성이 높지만,   
데이터에 결혼 여부에 관한 특성이 포함되지 않은 경우입니다.   
   
MCAR이나 MAR이면 이따금 샘플을 삭제해도 괜찮습니다.   
MNAR이면 값이 누락되는 사실 자체가 정보입니다. MNAR인 샘플을 삭제하면 데이터에 bias를 추가하게 됩니다. 관측하지 못한 구조적인 영향으로 샘플을 삭제하기 때문입니다.

### 4.11 누락된 값 채우기   
   
데이터의 양이 작으면 k-nearest neighbors(KNN) 알고리즘을 사용해 누락된 값을 예측할 수 있습니다.

```python
#from fancyimpute import KNN
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_blobs

# 모의 특성 행렬을 만듭니다.
features, _ = make_blobs(n_samples = 1000,
                         n_features = 2,
                         random_state = 1)

# 특성을 표준화합니다.
scaler = StandardScaler()
standardized_features = scaler.fit_transform(features)

# 첫 번째 샘플의 첫 번째 특성을 삭제합니다.
true_value = standardized_features[0, 0]
standardized_features[0, 0] = np.nan

# 특성 행렬에 있는 누락된 값을 예측합니다.
#features_knn_umputed = KNN(k=5, verbose=0).fit_transform(standardized_features)

# 실제 값과 대체된 값을 비교합니다.
print("실제 값: ", true_value)
#print("대체된 값: ", features_knn_imputed[0, 0])
```

```text
실제 값:  0.8730186113995938
```

또는 sklearn의 Imputer 모듈을 사용하면 특성의 평균, 중간값, 최빈값으로 누락된 값을 채울 수 있습니다.   
다만 일반적으로 KNN보다는 결과가 좋지 않습니다.   
   
Imputer 클래스는 sklearn v0.22에서 삭제되었습니다.   
대신 v0.20에 추가된 SimpleImputer 클래스를 사용하세요.   
strategy 매개변수는 평균값으로 채우는 'mean'   
중간값으로 채우는 'median'   
최빈값으로 채우는 'most_frequent'   
고정값으로 채우는 'constant'가 있습니다.

```python
from sklearn.impute import SimpleImputer

# Imputer 객체를 만듭니다.
simple_imputer = SimpleImputer()

# 누락된 값을 채웁니다.
features_simple_imputed = simple_imputer.fit_transform(features)

# 실제 값과 대체된 값을 비교합니다.
print("실제 값 True Value: ", true_value)
print("대체된 값 Imputed Value: ", features_simple_imputed[0, 0])
```

```text
실제 값 True Value:  0.8730186113995938
대체된 값 Imputed Value:  -3.058372724614996
```

누락된 데이터를 다른 값으로 대체하는 두 전략은 각기 장단점이 있습니다.   
1. 머신러닝을 사용하여 누락된 값을 예측   
이렇게 하려면 누락된 값이 있는 특성을 타겟으로 하고   
남은 특성으로 누락된 값을 예측합니다.   
값을 대체할 때 사용할 수 있는 머신러닝 알고리즘은 많지만 KNN이 즐겨 사용됩니다.   
(여러 거리 측정 방식을 기반으로) 가장 가까이 있는 K개의 샘플들을 사용해 누락된 값을 예측합니다.   
KNN의 단점은 누락된 값에 가장 가까운 샘플을 구하기 위해   
누락된 값과 모든 샘플 사이의 거리를 계산해야 한다는 것입니다.   
2. 대용량 데이터셋에 사용할 수 있는 다른 대안으로 누락된 값을 모두 어떤 평균값으로 채우는 것   
수백만 개의 샘플이 있는 데이터에 적용할 수 있습니다.
