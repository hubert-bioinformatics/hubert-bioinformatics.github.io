---
layout: post
title: ch10. Dimension Reduction Using Feature Selection
date: 2022-06-02 22:41:09 +0900
published: true
categories: [Study, B-ML_with_Python_Cookbook]
tags: [ml,python,study,sklearn,dataframe]
img_path: /assets/img/post/
---

## Summary
***

 Feature selection은 고품질의 정보가 많은 feature를 선택하고 덜 유용한 feature는 버리는 방식입니다.

  * Filter: 통계적 속성을 조사하여 가장 뛰어난 feature를 선택합니다.

  * Wrapper: 시행착오를 통해 가장 고품질의 예측을 만드는 feature의 부분조합을 찾습니다.

  * Embedded: Learning algorithm의 훈련 단계를 확장하거나 그 일부로 구성하여 가장 좋은 feature의 부분조합을 선택합니다.
 <br><br>


 * Variance 기준으로 numeric feature 선택하기 (10.1)

```python
# sklearn의 feature_selection.VarianceThreshold 사용: Numeric feature 중 variance가 낮은 feature(즉, 정보가 거의 없는 feature)를 삭제합니다.
```
<br><br>


 * Variance 기준으로 binary feature 선택하기 (10.2)

```python
# sklearn의 feature_selection.VarianceThreshold 사용: Binary categoric feature 중 variance가 낮은 feature (즉, 정보가 거의 없는 feature)를 삭제합니다. 베르누이 확률 변수의 variance가 threshold 이상인 feature를 선택합니다.
```
<br><br>


 * Correlation이 큰 feature 다루기 (10.3)

```python
# Correlation matrix 사용하여 correlation이 큰 feature를 확인하고 삭제: 두 가지 feature의 correlation이 크다면 서로 담고 있는 정보가 매우 비슷하므로 중복된 feature를 포함하는 것과 같습니다.
```
<br><br>


 * Classification에 관련 없는 feature 삭제하기 (10.4)

```python
# Chi-square statistics 사용: Categoric target vector에서 관련 없는 feature를 삭제합니다.

# Chi-square statistics는 두 categoric vector의 독립성을 평가합니다.

# Feature가 numeric인 경우 각 feature와 target vector 사이에서 ANOVA의 F-값을 사용합니다.
```
<br><br>


## Practice
***

<script src="https://gist.github.com/hubert-bioinformatics/e35d90b87d08cef9654240c86b00aa0e.js"></script>