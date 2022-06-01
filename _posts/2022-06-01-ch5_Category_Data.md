---
layout: post
title: ch5. Category Data
date: 2022-06-01 10:15:55 +0900
published: true
categories: [Study, B-ML_with_Python_Cookbook]
tags: [ml,python,study,sklearn,dataframe]
img_path: /assets/img/post/
---

## Summary
***

 Category data를 machine learning에 알맞은 feature로 변환하는 다양한 전략을 알아봅니다.
 <br><br>


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
<br><br>


 * Null Value 대체하기 (5.4)

```python
# KNN classifier 사용: ML classification algorithm을 훈련하여 null value를 예측합니다.

# sklearn의 SimpleImputer 사용: null value를 feature에서 가장 자주 등장하는 value로 채웁니다.
```
<br><br>


 * Class Imvalence 다루기 (5.5)

```python
# 더 많은 data를 수집합니다.

# 불가능하다면 model evaluation 지표를 변경합니다. Accuracy보다 precision, recall, F1-measutr, ROC curve 등이 있습니다.

# 잘 동작하지 않으면 class weight를 사용합니다.

# 혹은 down-sampling or up-sampling을 고려합니다.
```
<br><br>


## Practice
***

<script src="https://gist.github.com/hubert-bioinformatics/96a1fc1d3094f4fce692615780a1cfb8.js"></script>