---
title: "ch5. Category Data"
date: 2022-06-01
category: ml-data
tags: ["ml", "python", "study", "sklearn", "dataframe"]
series: "ML with Python Cookbook"
seriesOrder: 5
source: manual
---

## Summary
***

 Category data를 machine learning에 알맞은 feature로 변환하는 다양한 전략을 알아봅니다.
 <br /><br />


 * Category Data Encoding

```python
# sklearn의 LabelBinarizer 사용 one-hot encoding: 순서가 없는 category data feature를 encoding 합니다. (5.1)
one_hot = LabelBinarizer()
one_hot.fit_transform(feature)

# dataframe의 replace 사용: 순서가 있는 category data feature를 encoding 합니다. String label을 numeric type으로 변환합니다. (5.2)
scale_mapper = {'Low': 1, 'Medium': 2, 'High':3}
dataframe['Score'].replace(scale_mapper)

# sklearn의 DictVectorizer 사용: Feature dictionary를 encoding 합니다. Sparse matrix를 return 합니다. (5.3)
dictvectorizer.fit_transform(dictionary)
```
<br /><br />


 * Null Value 대체하기 (5.4)

```python
# KNN classifier 사용: ML classification algorithm을 훈련하여 null value를 예측합니다.

# sklearn의 SimpleImputer 사용: null value를 feature에서 가장 자주 등장하는 value로 채웁니다.
```
<br /><br />


 * Class Imvalence 다루기 (5.5)

```python
# 더 많은 data를 수집합니다.

# 불가능하다면 model evaluation 지표를 변경합니다. Accuracy보다 precision, recall, F1-measutr, ROC curve 등이 있습니다.

# 잘 동작하지 않으면 class weight를 사용합니다.

# 혹은 down-sampling or up-sampling을 고려합니다.
```
<br /><br />


## Practice
***

### 5.0 소개   
   
관측 대상을 양이 아닌 질로 측정하는 것이 유용할 때가 많습니다.   
이런 품질 정보를 성별, 색깔, 자동차 브랜드와 같이 이산적인 범주에 대한 샘플의 소속 정보로 표현하곤 합니다.   
그러나 범주형 데이터가 모두 같은 것은 아닙니다.   
순서가 없는 범주를 명목형(nominal) 범주라고 부릅니다.   
* 파랑, 빨강, 초록   
* 남자, 여자   
* 바나나, 딸기, 사과   
   
반대로 일부 범주는 자연적인 순서를 가집니다.   
이를 순서형(ordinal) 범주라고 부릅니다.   
* 낮음, 중간, 높음   
* 청년, 노인   
* 동의, 중립, 반대   
   
또한 범주형 정보는 데이터에서 종종 벡터나 문자열의 열로 표현됩니다.   
하지만 대부분의 머신러닝 알고리즘에는 수치값을 입력해야 하므로 문제가 됩니다.   
   
이 장에서는 범주형 데이터를 다룰 때 종종 마주치는 문제를 극복할 수 있는 기법들을 다루겠습니다.

### 5.1 순서가 없는 범주형 특성 인코딩하기   
   
태생적으로 순서를 가지지 않는 클래스(예를 들면 사과, 배, 바나나)로 이루어진 특성이 있습니다.   
sklearn의 LabelBinarizer를 사용하여 특성을 one-hot encoding 합니다.

```python
import numpy as np
from sklearn.preprocessing import LabelBinarizer, MultiLabelBinarizer

# 특성을 만듭니다.
feature = np.array([["Texas"],
                    ["California"],
                    ["Texas"],
                    ["Delaware"],
                    ["Texas"]])

# one-hot encoder를 만듭니다.
one_hot = LabelBinarizer()

# 특성을 one-hot encoding 합니다.
one_hot.fit_transform(feature)
```

```text
array([[0, 0, 1],
       [1, 0, 0],
       [0, 0, 1],
       [0, 1, 0],
       [0, 0, 1]])
```

classes_ 속성에서 클래스를 확인할 수 있습니다.

```python
# 특성의 클래스를 확인합니다.
one_hot.classes_
```

```text
array(['California', 'Delaware', 'Texas'], dtype='<U10')
```

one-hot encoding을 되돌리려면 inverse_transform 메서드를 사용합니다.

```python
# one-hot encoding을 되돌립니다.
one_hot.inverse_transform(one_hot.transform(feature))
```

```text
array(['Texas', 'California', 'Texas', 'Delaware', 'Texas'], dtype='<U10')
```

pandas를 사용해서 특성을 one-hot encoding 할 수도 있습니다.

```python
import pandas as pd

# 특성으로 더미(dummy) 변수를 만듭니다.
pd.get_dummies(feature[:, 0])
```

```text
   California  Delaware  Texas
0           0         0      1
1           1         0      0
2           0         0      1
3           0         1      0
4           0         0      1
```

sklearn에 있는 한 가지 유용한 기능은 샘플이 여러 개의 클래스를 가지고 있는 경우를 다룰 수 있다는 것입니다.

```python
# 다중 클래스 특성을 만듭니다.
multiclass_feature = [("Texas", "Florida"),
                      ("California", "Alabama"),
                      ("Texas", "Florida"),
                      ("Delware", "Florida"),
                      ("Texas", "Alabama")]

# 다중 클래스 one-hot encoder를 만듭니다.
one_hot_multiclass = MultiLabelBinarizer()

# 다중 클래스 특성을 one-hot encoding 합니다.
one_hot_multiclass.fit_transform(multiclass_feature)
```

```text
array([[0, 0, 0, 1, 1],
       [1, 1, 0, 0, 0],
       [0, 0, 0, 1, 1],
       [0, 0, 1, 1, 0],
       [1, 0, 0, 0, 1]])
```

각 클래스를 하나의 수치값에 할당하는 것이 적절한 방법이라고 생각할 수 있습니다.   
하지만 클래스가 태생적으로 순서를 가지고 있지 않다면 이 수치값은 존재하지 않는 순서를 잘못 만들게 됩니다.   
   
올바른 방법은 원본 특성에 있는 클래스마다 이진 특성을 하나씩 만드는 것입니다.   
이를 one-hot encoding 또는 dummy encoding이라고 부릅니다.   
해결에 있는 특성은 세 개의 클래스를 가진 벡터입니다.   
one-hot encoding을 하면 각 클래스마다 하나의 특성이 만들어집니다.   
샘플의 클래스에 해당하는 특성은 1이 되고 나머지 특성은 0이 됩니다.   
이 예제의 특성은 세 개의 클래스를 가지므로 one-hot encoding은 특성마다 하나씩 총 세 개의 이진 특성을 반환합니다.   
one-hot encoding을 사용하면 클래스에 순서가 없다는 개념을 그대로 유지하면서 샘플의 클래스 소속을 표현할 수 있습니다.   
   
마지막으로 특성을 one-hot encoding 한 후에는 선형 의존성을 피하기 위해 결과 행렬에서 one-hot encoding 된 특성 중 하나를 삭제하는 것이 좋습니다.

### 5.2 순서가 있는 범주형 특성 인코딩하기   
   
순서가 있는 범주형 특성이 있습니다. (예를 들면 high, medium, low)   
pandas dataframe의 replace 메서드를 사용하여 문자열 레이블을 수치값으로 변환합니다.

```python
# 특성을 만듭니다.
dataframe = pd.DataFrame({"Score": ["Low", "Low", "Medium", "Medium", "High"]})

# 매핑 딕셔너리를 만듭니다.
scale_mapper = {"Low": 1,
                "Medium": 2,
                "High": 3}

# 특성을 정수로 변환합니다.
dataframe["Score"].replace(scale_mapper)
```

```text
0    1
1    1
2    2
3    2
4    3
Name: Score, dtype: int64
```

종종 특성 클래스에 태생적으로 어떤 순서가 포함된 경우가 있습니다.   
대표적인 예는 리커트 척도(Likert scale) 입니다.   
* 매우 그렇다   
* 그렇다   
* 보통이다   
* 그렇지 않다   
* 전혀 그렇지 않다   
   
머신러닝에 사용할 특성을 encoding 할 때 순서가 있는 클래스는 순서 개념을 가진 수치값으로 변환해야 합니다.   
가장 자주 사용하는 방법은 클래스 레이블 문자열을 정수로 매핑하는 딕셔너리를 만들고   
이를 필요한 특성에 적용하는 것입니다.   
   
어떤 수치값을 선택하는지는 클래스에 내재된 순서 정보에 기반한다는 사실을 유념하세요.   
해결에서 high는 글자 그대로 low보다 세 배 더 큽니다.   
경우에 따라 이런 설정이 잘 맞을 수 있지만 클래스 사이 간격이 동일하지 않는다면 문제가 됩니다.

```python
# 특성을 만듭니다.
dataframe = pd.DataFrame({"Score": ["Low",
                                    "Low",
                                    "Medium",
                                    "Medium",
                                    "High",
                                    "Barely More Than Medium"]})

# 매핑 딕셔너리를 만듭니다.
scale_mapper = {"Low": 1,
                "Medium": 2,
                "Barely More Than Medium": 3,
                "High": 4}

# 특성을 정수로 변환합니다.
dataframe["Score"].replace(scale_mapper)
```

```text
0    1
1    1
2    2
3    2
4    4
5    3
Name: Score, dtype: int64
```

이 예에서는 Low와 Medium 사이의 거리가 Medium과 Barely More Than Medium 사이의 거리와 같지만 실제로는 그렇지 않습니다.   
가장 좋은 방법은 클래스에 매핑하는 수치값에 주의를 기울이는 것입니다.

```python
# 매핑 딕셔너리를 만듭니다.
scale_mapper = {"Low": 1,
                "Medium": 2,
                "Barely More Than Medium": 2.1,
                "High": 3}

# 특성을 정수로 변환합니다.
dataframe["Score"].replace(scale_mapper)
```

```text
0    1.0
1    1.0
2    2.0
3    2.0
4    3.0
5    2.1
Name: Score, dtype: float64
```

### 5.3 특성 딕셔너리를 인코딩하기   
   
딕셔너리를 행렬로 변환할 때 DictVectorizer를 사용합니다.

```python
from sklearn.feature_extraction import DictVectorizer

# 딕셔너리를 만듭니다.
data_dict = [{"Red": 2, "Blue": 4},
             {"Red": 4, "Blue": 3},
             {"Red": 1, "Yellow": 2},
             {"Red": 2, "Yellow": 2}]

# DictVectorizer 객체를 만듭니다.
dictvectorizer = DictVectorizer(sparse=False)

# 딕셔너리를 특성 행렬로 변환합니다.
features = dictvectorizer.fit_transform(data_dict)

# 특성 행렬을 확인합니다.
features
```

```text
array([[4., 2., 0.],
       [3., 4., 0.],
       [0., 1., 2.],
       [0., 2., 2.]])
```

기본적으로 DictVectorizer는 0이 아닌 값의 원소만 저장하는 희소 행렬을 반환합니다.   
이는 매우 큰 행렬을 다루어야 할 때 도움이 됩니다. 메모리 사용량을 최소화해야 하기 때문입니다.   
DictVectorizer를 sparse=False로 지정하면 밀집 벡터를 출력할 수 있습니다.   
   
자연어 처리 분야에서, 문서 데이터를 가지고 있을 때 각 문서에 등장한 모든 단어의 횟수를 담은 딕셔너리를 만들 수 있습니다.   
dictvectorizer를 사용하면 각 문서에 등장한 단어 횟수를 특성으로 하는 특성 행렬을 만들 수 있습니다.

```python
# 네 개의 문서에 대한 단어 카운트 딕셔너리를 만듭니다.
doc_1_word_count = {"Red": 2, "Blue": 4}
doc_2_word_count = {"Red": 4, "Blue": 3}
doc_3_word_count = {"Red": 1, "Yellow": 2}
doc_4_word_count = {"Red": 2, "Yellow": 2}

# 리스트를 만듭니다.
doc_word_counts = [doc_1_word_count,
                   doc_2_word_count,
                   doc_3_word_count,
                   doc_4_word_count]

# 단어 카운트 딕셔너리를 특성 행렬로 변환합니다.
dictvectorizer.fit_transform(doc_word_counts)
```

```text
array([[4., 2., 0.],
       [3., 4., 0.],
       [0., 1., 2.],
       [0., 2., 2.]])
```

### 5.4 누락된 클래스 값 대체하기   
   
범주형 특성에 있는 누락된 값을 예측된 값으로 바꿉니다.   
이상적인 해결은 머신러닝 분류 알고리즘을 훈련하여 누락된 값을 예측하는 것입니다.   
일반적으로 k-최근접 이웃(KNN) 분류기를 사용합니다.

```python
from sklearn.neighbors import KNeighborsClassifier

# 범주형 특성을 가진 특성 행렬을 만듭니다.
X = np.array([[0, 2.10, 1.45],
              [1, 1.10, 1.33],
              [0, 1.22, 1.27],
              [1, -0.21, -1.19]])

# 범주형 특성에 누락된 값이 있는 특성 행렬을 만듭니다.
X_with_nan = np.array([[np.nan, 0.87, 1.31],
                       [np.nan, -0.67, -0.22]])

# KNN 학습기를 훈련합니다.
clf = KNeighborsClassifier(3, weights='distance')
trained_model = clf.fit(X[:, 1:], X[:, 0])

# 누락된 값의 클래스를 예측합니다.
imputed_values = trained_model.predict(X_with_nan[:, 1:])

# 예측된 클래스와 원본 특성을 열로 합칩니다.
X_with_imputed = np.hstack((imputed_values.reshape(-1, 1), X_with_nan[:, 1:]))

# 두 특성 행렬을 연결합니다.
np.vstack((X_with_imputed, X))
```

```text
array([[ 1.  ,  0.87,  1.31],
       [ 1.  , -0.67, -0.22],
       [ 0.  ,  2.1 ,  1.45],
       [ 1.  ,  1.1 ,  1.33],
       [ 0.  ,  1.22,  1.27],
       [ 1.  , -0.21, -1.19]])
```

다른 방법은 누락된 값을 특성에서 가장 자주 등장하는 값으로 채우는 것입니다.

```python
from sklearn.impute import SimpleImputer

# 두 개의 특성 행렬을 합칩니다.
X_complete = np.vstack((X_with_nan, X))

imputer = SimpleImputer(strategy='most_frequent')
imputer.fit_transform(X_complete)
```

```text
array([[ 0.  ,  0.87,  1.31],
       [ 0.  , -0.67, -0.22],
       [ 0.  ,  2.1 ,  1.45],
       [ 1.  ,  1.1 ,  1.33],
       [ 0.  ,  1.22,  1.27],
       [ 1.  , -0.21, -1.19]])
```

범주형 특성에 누락된 값이 있을 때 가장 좋은 방법은 머신러닝 알고리즘으로 누락된 값을 예측하는 것입니다.   
누락된 값이 있는 특성을 타겟으로 하고 다른 특성을 특성 행렬로 사용할 수 있습니다.   
많이 사용하는 알고리즘은 KNN으로 k-nearest neighbors의 다수 클래스를 누락된 값에 할당합니다.   
   
또는 특성에서 가장 자주 등장하는 클래스를 누락된 값으로 예측할 수 있습니다.   
KNN보다 덜 정교하지만 대규모 데이터에 적용하기 훨씬 쉽습니다.   
   
두 경우 모두 대체된 값이 있는 샘플인지 나타내는 이진 특성을 추가하는 것이 좋습니다.

### 5.5 불균형한 클래스 다루기   
   
타겟 벡터가 매우 불균형한 클래스로 이루어져 있는 경우입니다.   
더 많은 데이터를 모으세요.   
불가능하면 모델 평가 지표를 바꾸세요.   
잘 동작하지 않으면 모델에 내장된 클래스 가중치 매개변수를 사용하거나 다운샘플링이나 업샘플링을 고려해보세요.   
이 장에서는 클래스 가중치 매개변수, 다운샘플링, 업샘플링을 알아보겠습니다.   
   
예제를 위해 클래스가 불균형한 데이터를 준비합니다.   
붓꽃 데이터셋은 세 개 클래스(Iris setosa, Iris virginica, Iris versicolor)의 샘플을 50개씩 고르게 가지고 있습니다.   
이 때 불균형한 데이터셋을 만들기 위해서 Iris setosa 샘플 50개 중 40개를 삭제합니다.   
다음 Iris virginica와 Iris versicolor 클래스를 합칩니다.   
결과적으로 Iris setosa 샘플인지 아닌지를 가리키는 이진 타겟 벡터를 얻습니다.   
여기에는 Iris setosa 샘플(클래스0) 10개와 Iris setosa가 아닌 샘플(클래스1) 90개가 있습니다.

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

# 붓꽃 데이터를 적재합니다.
iris = load_iris()

# 특성 행렬을 만듭니다.
features = iris.data

# 타겟 벡터를 만듭니다.
target = iris.target

# 처음 40개 샘플을 삭제합니다.
features = features[40:, :]
target = target[40:]

# 클래스 0을 음성 클래스로 하는 이진 타겟 벡터를 만듭니다.
target = np.where((target == 0), 0, 1)

# 불균형한 타겟 벡터를 확인합니다.
target
```

```text
array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
```

sklearn에 있는 많은 알고리즘은 훈련할 때 불균형한 영향을 줄일 수 있도록 클래스에 가중치를 부여할 수 있는 매개변수를 제공합니다.   
아직 소개하기 전이지만 RandomForestClassifier는 class_weight 매개변수를 가진 인기 높은 분류 알고리즘입니다.   
매개변수값에 원하는 클래스 가중치를 직접 지정할 수 있습니다.

```python
# 가중치를 만듭니다.
weights = {0: .9, 1: 0.1}

# 가중치를 부여한 랜덤 포레스트 분류기를 만듭니다.
RandomForestClassifier(class_weight=weights)
```

```text
RandomForestClassifier(class_weight={0: 0.9, 1: 0.1})
```

또는 balnced로 지정하여 클래스 빈도에 반비례하게 자동으로 가중치를 만들 수 있습니다.

```python
# 균형잡힌 클래스 가중치로 랜덤 포레스트 모델을 훈련합니다.
RandomForestClassifier(class_weight="balanced")
```

```text
RandomForestClassifier(class_weight='balanced')
```

다수 클래스의 샘플을 줄이거나 (다운샘플링) 소수 클래스의 샘플을 늘릴 수도 있습니다. (업샘플링)   
다운샘플링에서는 다수 클래스 (더 많은 샘플을 가진 클래스)에서 중복을 허용하지 않고 랜덤하게 샘플을 선택하여 소수 클래스와 같은 크기의 샘플 부분집합을 만듭니다. 예를 들면, 소수 클래스에 10개의 샘플이 있다면 다수 클래스에서 10개의 샘플을 랜덤하게 선택하여 총 20개의 샘플을 데이터로 사용합니다.

```python
# 각 클래스의 샘플 인덱스를 추출합니다.
i_class0 = np.where(target == 0)[0]
i_class1 = np.where(target == 1)[0]

# 각 클래스의 샘플 개수
n_class0 = len(i_class0)
n_class1 = len(i_class1)

# 클래스 0의 샘플만큼 클래스 1에서 중복을 허용하지 않고 랜덤하게 뽑습니다.
i_class1_downsampled = np.random.choice(i_class1, size=n_class0, replace=False)

# 클래스 0의 타겟 벡터와 다운샘플링된 클래스 1의 타겟 벡터를 합칩니다.
np.hstack((target[i_class0], target[i_class1_downsampled]))
```

```text
array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
```

```python
# 클래스 0의 특성 행렬과 다운샘플링된 클래스 1의 특성 행렬을 합칩니다.
np.vstack((features[i_class0, :], features[i_class1_downsampled, :]))[0:5]
```

```text
array([[5. , 3.5, 1.3, 0.3],
       [4.5, 2.3, 1.3, 0.3],
       [4.4, 3.2, 1.3, 0.2],
       [5. , 3.5, 1.6, 0.6],
       [5.1, 3.8, 1.9, 0.4]])
```

또 다른 방법은 소수 클래스를 업샘플링 하는 것입니다.   
업샘플링에서는 다수 클래스의 샘플만큼 소수 클래스에서 중복을 허용하여 랜덤하게 샘플을 선택합니다.

```python
# 클래스 1의 샘플 개수만큼 클래스 0에서 중복을 허용하여 랜덤하게 선택합니다.
i_class0_upsampled = np.random.choice(i_class0, size=n_class1, replace=True)

# 클래스 9의 업샘플링된 타겟 벡터와 클래스 1의 타겟 벡터를 합칩니다.
np.concatenate((target[i_class0_upsampled], target[i_class1]))
```

```text
array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1])
```

```python
# 클래스 0의 업샘플링된 특성 행렬과 클래스 1의 특성 행렬을 합칩니다.
np.vstack((features[i_class0_upsampled, :], features[i_class1, :]))[0:5]
```

```text
array([[4.8, 3. , 1.4, 0.3],
       [4.6, 3.2, 1.4, 0.2],
       [5. , 3.5, 1.6, 0.6],
       [5.1, 3.8, 1.9, 0.4],
       [4.4, 3.2, 1.3, 0.2]])
```

실전에는 불균형한 클래스가 아주 많습니다.   
대부분의 웹사이트 방문자는 구매 버튼을 클릭하지 않으며   
암의 종류가 다양하지만 상당수가 매우 희귀합니다.   
이런 이유 때문에 불균형한 클래스를 다루는 일은 머신러닝에서 자주 발생합니다.   
   
가장 좋은 방법은 소수 클래스의 샘플을 더 많이 모으는 것입니다.   
하지만 불가능한 경우가 많기 때문에 다른 선택 사항을 고려해야 합니다.   
   
두 번째 전략은 불균형한 클래스에 잘 맞는 모델 평가 지표를 사용하는 것입니다.   
정확도는 모델 성능을 평가하는 데 자주 사용되는 지표입니다.   
하지만 클래스가 불균형할 때 정확도는 잘 맞지 않습니다.   
예를 들어 희귀한 암을 가진 샘플이 0.5%라면 아무도 암에 걸리지 않았다고 예측하는 단순한 모델도 99.5%의 정확도를 얻을 것입니다.   
이후 장에서 소개할 더 나은 지표로는 오차 행렬, 정밀도, 재현율, F1 점수, ROC 곡선이 있습니다.   
   
세 번째 전략은 일부 모델에서 제공하는 클래스 가중치 매개변수를 사용하는 것입니다.   
sklearn에 있는 많은 분류기들은 이에 적합한 class_weight 매개변수를 가지고 있습니다.   
   
네 번째와 다섯 번째 전략은 다운샘플링과 업샘플링은 서로 관련되어 있습니다.   
어떤 것을 사용할지 여부는 문제에 따라 다르며, 일반적으로 두 전략을 모두 시도해보고 더 나은 결과를 내는 것을 선택합니다.
