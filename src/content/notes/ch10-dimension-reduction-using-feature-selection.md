---
title: "ch10. Dimension Reduction Using Feature Selection"
date: 2022-06-02
category: ml-data
tags: ["ml", "python", "study", "sklearn", "dataframe"]
series: "ML with Python Cookbook"
seriesOrder: 10
source: manual
---

## Summary
***

 Feature selection은 고품질의 정보가 많은 feature를 선택하고 덜 유용한 feature는 버리는 방식입니다.

  * Filter: 통계적 속성을 조사하여 가장 뛰어난 feature를 선택합니다.

  * Wrapper: 시행착오를 통해 가장 고품질의 예측을 만드는 feature의 부분조합을 찾습니다.

  * Embedded: Learning algorithm의 훈련 단계를 확장하거나 그 일부로 구성하여 가장 좋은 feature의 부분조합을 선택합니다.
 <br /><br />


 * Variance 기준으로 numeric feature 선택하기 (10.1)

```python
# sklearn의 feature_selection.VarianceThreshold 사용: Numeric feature 중 variance가 낮은 feature(즉, 정보가 거의 없는 feature)를 삭제합니다.
```
<br /><br />


 * Variance 기준으로 binary feature 선택하기 (10.2)

```python
# sklearn의 feature_selection.VarianceThreshold 사용: Binary categoric feature 중 variance가 낮은 feature (즉, 정보가 거의 없는 feature)를 삭제합니다. 베르누이 확률 변수의 variance가 threshold 이상인 feature를 선택합니다.
```
<br /><br />


 * Correlation이 큰 feature 다루기 (10.3)

```python
# Correlation matrix 사용하여 correlation이 큰 feature를 확인하고 삭제: 두 가지 feature의 correlation이 크다면 서로 담고 있는 정보가 매우 비슷하므로 중복된 feature를 포함하는 것과 같습니다.
```
<br /><br />


 * Classification에 관련 없는 feature 삭제하기 (10.4)

```python
# Chi-square statistics 사용: Categoric target vector에서 관련 없는 feature를 삭제합니다.

# Chi-square statistics는 두 categoric vector의 독립성을 평가합니다.

# Feature가 numeric인 경우 각 feature와 target vector 사이에서 ANOVA의 F-값을 사용합니다.
```
<br /><br />


## Practice
***

### 10.0 소개   
   
9장에서 새로운 특성을 만드는 식으로 특성 행렬의 차원을 축소하는 방법을 설명했습니다.   
이런 특성은 이상적으로 훨씬 적은 차원으로 좋은 품질의 모델을 동일하게 훈련할 수 있습니다.   
이를 특성 추출<sup>feature extraction</sup>이라고 부릅니다.   
이 장에서 또 다른 접근 방법으로 고품질의 정보가 많은 특성은 선택하고 덜 유용한 특성은 버리는 방식을 다루겠습니다.   
이를 특성 선택<sup>feature selection</sup>이라고 부릅니다.   
   
특성 선택 방식에는 필터<sup>filter</sup>, 래퍼<sup>wrapper</sup>, 임베디드<sup>embedded</sup> 세 가지가 있습니다.   
필터 방식은 통계적인 속성을 조사하여 가장 뛰어난 특성을 선택합니다.   
래퍼 방식은 시행착오를 통해 가장 높은 품질의 예측을 만드는 특성의 부분 조합을 찾습니다.   
임베디드 방식은 학습 알고리즘의 훈련 단계를 확장하거나 일부로 구성하여 가장 좋은 특성의 부분 조합을 선택합니다.   
   
이 장에서 세 가지 방식 모두 소개하는 것이 이상적입니다.   
하지만 임베디드 방식은 특정 학습 알고리즘에 밀접하게 연관되어 있기 때문에 알고리즘 자체를 자세히 이해하기 전에 설명하기 어렵습니다.   
이 장에서는 필터와 래퍼 방식의 특성 선택을 다룹니다. 학습 알고리즘을 자세히 논의하는 장에서 특정 임베디드 방식을 설명하겠습니다.

### 10.1 분산을 기준으로 수치 특성 선택하기   
   
수치형 특성 중에서 분산이 낮은 특성(즉 정보가 거의 없는 특성)을 삭제합니다.   
즉, 주어진 기준보다 높은 분산을 가진 특성을 선택합니다.

```python
from sklearn import datasets
from sklearn.feature_selection import VarianceThreshold

# 예제 데이터를 로드합니다.
iris = datasets.load_iris()

# 특성과 타겟을 만듭니다.
features = iris.data
target = iris.target

# 기준값을 만듭니다.
thresholder = VarianceThreshold(threshold=.5)

# 기준값보다 높은 특성을 선택합니다.
features_high_variance = thresholder.fit_transform(features)

# 선택한 특성을 확인합니다.
features_high_variance[0:3]
```

```text
array([[5.1, 1.4, 0.2],
       [4.9, 1.4, 0.2],
       [4.7, 1.3, 0.2]])
```

분산 기준 설정<sup>variance thresholding, VT</sup>은 가장 기본적인 특성 선택 방법 중 하나입니다.   
이 방식은 분산이 높은 특성보다 분산이 낮은 특성이 효과적이거나 유용하지 않다는 아이디어에 기반합니다.   
VT는 먼저 각 특성의 분산을 계산합니다.   
>$
Var(x) = \frac{1}{n} \sum_{i=1}^n (x_{i} - \mu)^2
$   
여기에서 x는 특성 벡터이고 $ x_{i} $는 개별 특성값입니다. $ \mu $는 특성의 평균값입니다.   
   
그 다음 분산이 기준값에 미치지 못하는 모든 특성을 삭제합니다.   
   
VT를 사용할 때 두 가지를 기억해야 합니다.   
1. 분산은 원점에 맞춰진 값이 아닙니다.   
즉, 특성의 제곱 단위입니다. 따라서 특성의 단위가 서로 다르면 VT가 작동하지 않습니다. (예를 들어 한 특성은 년 단위이고 다른 특성은 원 단위인 경우)   
2. 분산의 기준값을 수동으로 선택하기 때문에 어떤 값이 좋은지 판단할 수 있어야 합니다.   
또는 12장에서 소개하는 모델 선택 기법을 사용합니다. variances_ 속성에서 각 특성의 분산을 확인할 수 있습니다.

```python
# 분산을 확인합니다.
thresholder.variances_
```

```text
array([0.68112222, 0.18871289, 3.09550267, 0.57713289])
```

마지막으로 특성이 (평군이 0이고 단위 분산으로) 표준화되어 있으면 당연히 분산 기준 선택 방식은 올바르게 작동하지 않습니다.

```python
from sklearn.preprocessing import StandardScaler

# 특성 행렬을 표준화합니다.
scaler = StandardScaler()
features_std = scaler.fit_transform(features)

# 각 특성의 분산을 계산합니다.
selector = VarianceThreshold()
selector.fit(features_std).variances_
```

```text
array([1., 1., 1., 1.])
```

### 10.2 분산을 기준으로 이진 특성 선택하기   
   
이진 범주형 특성<sup>binary categorical feature</sup>에서 분산이 낮은 특성(즉 적은 정보를 가진 특성)을 삭제합니다.   
베르누이 확률 변수<sup>Bernoulli random variable</sup>의 분산이 기준값 이상인 특성을 선택합니다.

```python
from sklearn.feature_selection import VarianceThreshold

# 예제 특성 행렬을 만듭니다.
# 특성 0: 80%가 클래스 0
# 특성 1: 80%가 클래스 1
# 특성 2: 60%가 클래스 0, 40%는 클래스 1
features = [[0, 1, 0],
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 1],
            [1, 0, 0]]

# 분산을 기준으로 선택합니다.
thresholder = VarianceThreshold(threshold=(.75 * (1 - .75)))
thresholder.fit_transform(features)
```

```text
array([[0],
       [1],
       [0],
       [1],
       [0]])
```

수치형 특성과 마찬가지로 정보가 많은 범주형 특성을 선택하는 한 가지 전략은 분산을 조사하는 것입니다.   
이진 특성(즉 베르누이 확률 변수)의 분산은 다음과 같이 계산합니다.   
>$
Var(x) = p(1-p)
$   
여기에서 p는 클래스 1의 샘플 비율입니다. 따라서 p 값을 설정하여 샘플의 대다수가 한 개의 클래스에 속한 특성을 삭제할 수 있습니다.

VarianceThreshold 클래스는 수치 특성, 이진 특성에 상관없이 numpy var 함수를 사용하여 분산을 계산합니다.

```python
import numpy as np

np.var(features, axis=0)
```

```text
array([0.16, 0.16, 0.24])
```

이진 특성에 var 함수를 사용하는 것은 이진 특성일 때 베르누이 확률 변수의 분산과 같이 때문입니다.   
분산 공식을 사용해 간단히 유도해볼 수 있습니다.   
먼저 분산 식을 다음과 같이 풀어 쓸 수 있습니다.   
>$   
Var(x) = \frac{1}{n} \sum_{i=1}^n (x_{i} - \mu )^2 =  \frac{1}{n} \left( \sum_{i=1}^n x_{i}^2 - 2\mu\sum_{i=1}^n x_{i} + n\mu^2 \right)
$

0, 1로 이루어진 이진 특성일 경우 $ x_{i}^2 $은 $ x_{i} $와 같으므로 $ \frac{1}{n} $을 곱하면 첫 번째 항은 평균과 같아집니다.   
두 번째 항도 마찬가지로 $ \frac{1}{n} $을 곱하면 평균의 제곱으로 표현할 수 있습니다.   
결국 다음과 같이 정리됩니다.   
>$   
\frac{1}{n} \sum_{i=1}^n x_{i} - 2\mu \frac{1}{n} \sum_{i=1}^n x_{i} + \mu^2 = \mu - 2\mu^2 + \mu^2 = \mu - \mu^2 = \mu(1 - \mu)
$   
이진 특성의 평균 $ \mu $는 클래스 1의 샘플 비율과 같습니다. 따라서 var 함수로 이진 특성의 분산을 계산하면 베르누이 확률 변수의 분산 p(1-p)와 같습니다. threshold 매개변수의 기본값은 0으로 모든 특성을 선택합니다.

이진 특성의 평균 $ \mu $는 클래스 1의 샘플 비율과 같습니다. 따라서 var 함수로 이진 특성의 분산을 계산하면 베르누이 확률 변수의 분산 p(1-p)와 같습니다.   
threshold 매개변수의 기본값은 0으로 모든 특성을 선택합니다.

### 10.3 상관관계가 큰 특성 다루기   
   
특성 행렬에서 일부 특성의 상관관계가 크다고 의심됩니다.   
상관관계 행렬<sup>correlation matrix</sup>을 사용하여 상관관계가 큰 특성을 확인하고 이들 중 하나를 삭제합니다.

```python
import pandas as pd
import numpy as np

# 상관관계가 큰 두 개의 특성을 가진 특성 행렬을 만듭니다.
features = np.array([[1, 1, 1],
                     [2, 2, 0],
                     [3, 3, 1],
                     [4, 4, 0],
                     [5, 5, 1],
                     [6, 6, 0],
                     [7, 7, 1],
                     [8, 7, 0],
                     [9, 7, 1]])

# 특성 행렬을 데이터프레임으로 변환합니다.
dataframe = pd.DataFrame(features)

# 상관관계 행렬을 만듭니다.
corr_matrix = dataframe.corr().abs()

# 상관관계 행렬의 상삼각(upper triangle) 행렬을 선택합니다.
upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(np.bool))

# 상관 계수가 0.95보다 큰 특성 열의 인덱스를 찾습니다.
to_drop = [column for column in upper.columns if any(upper[column] > 0.95)]

# 특성을 삭제합니다.
dataframe.drop(dataframe.columns[to_drop], axis=1).head(3)
```

```text
   0  2
0  1  1
1  2  0
2  3  1
```

머신러닝에서 흔히 부딪히는 한 가지 문제는 상관관계가 큰 특성입니다. 두 가지 특성의 상관관계가 크다면, 담고 있는 정보가 매우 비슷하므로 중복된 특성을 포함하는 것과 같습니다. 이런 특성을 다루는 해결은 간단합니다. 특성 중 하나를 특성 행렬에서 삭제하면 됩니다.   
해결에서 첫째, 모든 특성에 대한 상관관계 행렬을 만들었습니다.

```python
# 상관관계 행렬
dataframe.corr()
```

```text
          0         1         2
0  1.000000  0.976103  0.000000
1  0.976103  1.000000 -0.034503
2  0.000000 -0.034503  1.000000
```

둘째, 상관관계 행렬의 상삼각 행렬<sup>upper triangle matrix</sup>을 살펴서 크게 상관된 특성의 쌍을 확인합니다.

```python
# 상관관계 행렬의 상삼각 행렬
upper
```

```text
    0         1         2
0 NaN  0.976103  0.000000
1 NaN       NaN  0.034503
2 NaN       NaN       NaN
```

셋째, 특성 행렬에서 이런 특성 중 하나를 삭제합니다.

### 10.4 분류 작업에 관련 없는 특성 삭제하기   
   
범주형 타겟 벡터에서 관련 없는 특성을 삭제하기 원합니다.   
범주형 특성이라면 각 특성과 타겟 벡터 사이의 카이제곱<sup>chi-square</sup>($ \chi^2 $)통계를 계산합니다.

```python
from sklearn.datasets import load_iris
from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import chi2, f_classif

# 데이터를 로드합니다.
iris = load_iris()
features = iris.data
target = iris.target

# 범주형 데이터를 정수형으로 변환합니다.
features = features.astype(int)

# 카이제곱 통곗값이 가장 큰 특성 두 개를 선택합니다.
chi2_selector = SelectKBest(chi2, k=2)
features_kbest = chi2_selector.fit_transform(features, target)

# 결과를 확인합니다.
print("원본 특성 개수: ", features.shape[1])
print("줄어든 특성 개수: ", features_kbest.shape[1])
```

```text
원본 특성 개수:  4
줄어든 특성 개수:  2
```

특성이 수치형<sup>quantitative</sup>이면 각 특성과 타겟 벡터 사이에서 분산 분석(ANOVA)의 F-값을 계산합니다.

```python
# F-값이 가장 높은 특성 두 개를 선택합니다.
fvalue_selector = SelectKBest(f_classif, k=2)
features_kbest = fvalue_selector.fit_transform(features, target)

# 결과를 확인합니다.
print("원본 특성 개수: ", features.shape[1])
print("줄어든 특성 개수: ", features_kbest.shape[1])
```

```text
원본 특성 개수:  4
줄어든 특성 개수:  2
```

특정 특성 개수를 선택하는 대신 SelectPercentile를 사용하여 특성의 상위 n 퍼센트를 선택할 수 있습니다.

```python
from sklearn.feature_selection import SelectPercentile

# 가장 큰 F-값의 상위 75% 특성을 선택합니다.
fvalue_selector = SelectPercentile(f_classif, percentile=75)
features_kbest = fvalue_selector.fit_transform(features, target)

# 결과를 확인합니다.
print("원본 특성 개수: ", features.shape[1])
print("줄어든 특성 개수: ", features_kbest.shape[1])
```

```text
원본 특성 개수:  4
줄어든 특성 개수:  3
```

카이제곱 통계는 두 범주형 벡터의 독립성을 평가합니다. 즉, 이 통계는 범주형 특성의 각 클래스별 샘플 빈도와 이 특성이 타겟 벡터와 독립적이라면 (즉 관계가 없다면) 기대할 수 있는 값 사이의 차이입니다.   
>$   
\chi^2 = \sum_{i=1}^n\frac{(\mathbf{O}_{i} - \mathbf{E}_{i})^2}{\mathbf{E}_{i}}   
$   
여기에서 $ \mathbf{O}_{i} $는 클래스 i의 샘플 빈도(관찰 빈도)입니다. $ \mathbf{E}_{i} $는 특성과 타겟 벡터 사이에 관계가 없을 때 기대할 수 있는 클래스 i의 샘플 빈도(기대 빈도)입니다.   
   
카이제곱 특성은 관찰 빈도와 전혀 관계가 없다고 기대하는 빈도 사이에 얼마나 큰 차이가 있는지 알려주는 하나의 숫자입니다.   
특성과 타겟 벡터 사이의 카이제곱 통계를 계산하면 둘 사이의 독립성을 측정할 수 있습니다.   
특성 변수가 타겟에 독립적이면 분류 문제에 사용할 정보가 없기 때문에 목적에 맞지 않습니다.   
다른 한편으로는 두 변수가 크게 의존적이면 모델 훈련에 필요한 정보가 많을 것입니다.   
   
특성 선택에서 카이제곱을 사용하려면 각 특성과 타겟 벡터 사이의 카이제곱 통계를 게산하고 카이제곱 통계가 가장 좋은 특성을 선택해야 합니다. sklearn에서는 SelectKBest를 사용합니다. 매개변수 k는 선택하려는 특성의 개수를 결정합니다.   
카이제곱 통계는 두 범주형 벡터 사이에서만 계산할 수 있다는 점을 유념하세요. 이런 이유 때문에 특성 선택으로 카이제곱을 사용하려면 타겟 벡터와 특성이 범주형이어야 합니다. 수치형 특성이 있다면 범주형 특성으로 변환하여 카이제곱 특성을 사용할 수 있습니다. 마지막으로 카이제곱 방식을 사용하려면 모든 값이 음수가 아니어야 합니다.   
   
또는 수치형 특성이라면 f_classif 사용하여 각 특성과 타겟 벡터 사이에 분산 분석(ANOVA)의 F-값 통계를 게산할 수 있습니다. F-값 점수는 타겟 벡터로 수치형 특성을 그룹핑하여 각 그룹의 평균이 크게 차이나는지 평가합니다. 예를 들어 이진 타겟 벡터인 성별과 수치형 특성인 시험 점수가 있다면, F-값 점수는 남성의 평균 테스트 점수가 여성의 평균 테스트 점수보다 다른지를 설명합니다. 그렇지 않다면 시험 점수는 성별을 예측하는 데 도움이 되지 않기 때문에 이 특성은 관련성이 없습니다.

load_iris 함수에서 제공하는 붓꽃 데이터셋은 수치형 특성입니다.   
해결에서는 카이제곱의 예를 위해 강제로 정수 타입으로 바꾸어 범주형처럼 다루었습니다.   
이 데이터를 사용하여 카이제곱 통계를 계산해 봅시다.   
   
붓꽃 데이터셋은 순서대로 세 개의 꽃 종류(클래스)가 50개씻 150개의 샘플로 이루어져 있습니다.   
타겟 데이터를 출력해보면 세 클래스가 순서대로 50개씩 놓인 것을 확인할 수 있습니다.

```python
target
```

```text
array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
       2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
       2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])
```

관찰 빈도를 구하려면 클래스별로 특성값을 더해야 합니다. 데이터가 클래스 순서대로 50개씩 나열되어 있으므로 특성 행렬의 차원을 (150, 4)에서 (3, 50, 4)로 바꾸어 클래스별 합을 간단히 구할 수 있습니다.

```python
observed = np.sum(features.reshape(3, 50, 4), axis=1)
observed
```

```text
array([[230, 152,  50,   0],
       [274, 116, 191,  50],
       [304, 129, 255,  79]])
```

특성이 타겟과 전혀 관계없다면 기대 빈도는 전체 합을 클래스 개수 3으로 나눈 값이 됩니다.

```python
expected = features.sum(axis=0) / 3
expected
```

```text
array([269.33333333, 132.33333333, 165.33333333,  43.        ])
```

이제 카이제곱 공식에 위에서 구한 observed와 expected를 대입합니다.

```python
np.sum((observed - expected)**2 / expected, axis=0)
```

```text
array([ 10.28712871,   5.02267003, 133.06854839,  74.27906977])
```

카이제곱 값이 큰 세 번째, 네 번째 특성이 선택됩니다. 이 카이제곱 점수는 chi2_selector 객체의 scores_ 속성에 저장되어 있습니다.

```python
chi2_selector.scores_
```

```text
array([ 10.28712871,   5.02267003, 133.06854839,  74.27906977])
```

F-값의 공식은 다음과 같습니다.   
>$   
F = \frac{SS_{between}  /  (k - 1)}{(SS_{tot} - SS_{between})  /  (n - k)}   
$   
여기서 k는 클래스 개수이고 n은 샘플 개수입니다. $ SS_{between} $과 $ SS_{tot} $는 각각 다음과 같습니다.   
>$   
SS_{between} = \sum_{j=1}^k n_{j}(\bar{x}_{j} - \bar{x})^2, 
SS_{tot} = \sum_{i=1}^n(x_{i} - \bar{x})^2
$   
$ \bar{x} $는 전체 평균이고 $ \bar{x}_{j} $는 클래스별 평균을 나타냅니다.   
   
먼저 numpy mean 함수를 사용해 전체 평균과 클래스 평균을 계산합니다.

```python
total_mean = np.mean(features, axis=0)
total_mean
```

```text
array([5.38666667, 2.64666667, 3.30666667, 0.86      ])
```

```python
class_mean = np.mean(features.reshape(3, 50, 4), axis=1)
class_mean
```

```text
array([[4.6 , 3.04, 1.  , 0.  ],
       [5.48, 2.32, 3.82, 1.  ],
       [6.08, 2.58, 5.1 , 1.58]])
```

클래스 평균은 앞에서와 마찬가지로 특성 행렬을 (3, 50, 4) 크기로 바꾸어 계산했습니다.   
전체 평균과 클래스별 평균을 구하고 나면 나머지는 간단합니다.   
ss_between 값부터 계산합니다.

```python
ss_between = np.sum(50 * (class_mean - total_mean)**2, axis=0)
ss_between
```

```text
array([ 55.41333333,  13.29333333, 440.01333333,  63.88      ])
```

붓꽃 데이터셋은 클래스별로 50개의 샘플이 있다는 것을 알고 있으므로 따로 개수를 세지 않았습니다.   
다음은 ss_total을 계산합니다.

```python
ss_total = np.sum((features - total_mean)**2, axis=0)
ss_total
```

```text
array([105.57333333,  42.27333333, 467.89333333,  76.06      ])
```

계산된 ss_between과 ss_total을 F-값 공식에 대입합니다.

```python
f = (ss_between/(3-1)) / ((ss_total-ss_between)/(150-3))
f
```

```text
array([  81.19776715,   33.71497585, 1160.00645624,  385.48275862])
```

F-값도 scores_ 속성에서 확인할 수 있습니다.

```python
fvalue_selector.scores_
```

```text
array([  81.19715 ,   33.715004, 1160.0116  ,  385.483   ], dtype=float32)
```

ANOVA는 각 특성이 독립적으로 평가되기 때문에 일변량 분석이라고도 부릅니다. 회귀일 때는 f_classif 대신 f_regression 함수를 사용합니다.
