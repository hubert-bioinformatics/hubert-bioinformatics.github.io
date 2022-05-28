---
layout: post
title: ch4. Numeric Data
date: 2022-05-28 10:31:20 +0900
published: true
categories: [Study, B-ML_with_Python_Cookbook]
tags: [ml,python,study,sklearn,dataframe,outlier,standardization,normalization]
img_path: /assets/img/post/
---

## Summary
***

 Numeric data를 machine learning에 알맞은 feature로 변환하는 다양한 전략을 알아봅니다.
 <br><br>


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
<br><br>


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
<br><br>


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
<br><br>


 * Polynominal과 Interaction feature (4.4)

```python
# Polynominal: feature와 target 사이 non-linear 관계가 있다는 가정을 추가할 때 사용합니다. Feature에 변동 효과를 주입합니다. 예를 들어 주요 질병에 걸릴 확률에서 나이가 미치는 영향

# Interaction: feature의 효과가 다른 feature에 dependent하는 경우 사용합니다. 예를 들어 커피의 달달함에서 설탕을 넣었는지, 커피를 저었는지 여부

# sklearn의 PolynominalFeatures class를 사용합니다.
```
<br><br>


 * Feature Transformation (4.5)

```python
# FunctionTransformer: 하나 이상의 features에 사용자 정의 transformation을 적용합니다.
new_transformer = FunctionTransformer(new_function)
new_transformer.transform(features)

# pandas의 apply도 동일한 기능을 합니다.
df.apply(new_function)
```
<br><br>


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
<br><br>


 * Feature Binarization (4.8)

```python
# Binarizer: threshold에 따라 feature를 두 개로 나눕니다.
binarizer = Binarizer(18)
binarizer.fit_transform(age)

# digitize: numeric feature를 여러 threshold에 따라 나눕니다.
np.digitize(age, bins=[20, 30, 64])
```
<br><br>


## Practice
***

<script src="https://gist.github.com/hubert-bioinformatics/edbc9df489245097a7dd3ede81a754bc.js"></script>