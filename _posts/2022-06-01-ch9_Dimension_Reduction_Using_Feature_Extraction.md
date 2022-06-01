---
layout: post
title: ch9. Dimension Reduction Using Feature Extraction
date: 2022-06-01 10:47:12 +0900
published: true
categories: [Study, B-ML_with_Python_Cookbook]
tags: [ml,python,study,sklearn,dataframe]
img_path: /assets/img/post/
---

## Summary
***

 Dimension reduction을 위한 feature extraction의 목적은 feature에 내제된 정보는 최대한 유지하면서 feature set $\rho_{original}$을 새로운 set $\rho_{new}$로 변환하는 것입니다. Feature extraction의 한 가지 단점은 새로운 set $\rho_{new}$를 사람이 이해하지 못한다는 것입니다. 해석 가능한 model을 유지하고 싶다면 feature selection 사용이 더 나은 방법입니다. 
 <br><br>


 * PCA 사용 feature 줄이기 (9.1)

```python
# sklearn의 PCA: data의 variance 유지하면서 feature 수를 줄입니다. PCA는 unsupervised learning으로 target vector 정보를 사용하지 않고 feature matrix만 사용합니다.
pca = sklearn.decomposition.PCA(n_components=0.99, wthien=True)

# Data가 선형적으로 구분되면 (즉, 다른 class 사이에 line이나 hyperplane을 그릴 수 있다면) PCA가 잘 동작합니다.
```
<br><br>


 * 선형적으로 구분되지 않는 data dimension reduction (9.2)

```python
# Kernel trick 사용하는 PCA 확장을 사용하여 non-linear dimension reduction을 수행합니다.
kpca = sklearn.decomposition.KernelPCA(kernel='rbf', gamma=15, n_components=1)

# Kernel이란 data를 projection하는 한 가지 방법입니다. Kernel function은 선형적으로 구분되지 않는 data를 고차원으로 projection 시킵니다.
```
<br><br>


 * Class 분리 최대화하여 feature 줄이기 (9.3)

```python
# LDA(Linear Discriminant Analysis) 사용: Classification model에 사용될 feature를 줄입니다. LDA 사용하여 class를 최대한 분리하는 성분 축으로 feature를 projection 합니다.

# LDA는 classification algorithm이지만 dimension reduction에도 자주 사용됩니다.

# PAC와 유사하지만, PCA는 data에서 variance가 최대인 성분 축에만 관심이 있습니다.

# 반면 LDA는 class간 차이를 최대화하는 추가적인 목적에도 관심이 있습니다. 또한 target vector를 사용합니다.
```
<br><br>


 * Matrix 분해를 사용하여 feature 줄이기 (9.4)

```python
# NMF(Non-negative Matrix Factorization) 사용: 음수가 아닌 feature matrix의 dimension reduction을 합니다.
nmf = sklearn.decomposition.NMF(n_components=10, random_state=1)

# NMF는 linear dimension reduction을 위한 unsupervised learning 기법입니다.

# 원하는 feature 개수 r이 주어지면 NMF는 다음과 같이 feature matrix를 분해합니다.
V $\approx$ WH
W는 n*r matrix
H는 r*d matrix

# r값을 조정하여 필요한 dimension reduction 양을 정할 수 있습니다.
```
<br><br>


 * Sparse data의 feature 줄이기 (9.5)

```python
# TSVD(Truncated Singular Value Decomposition) 사용: Sparse feature matrix의 dimension reduction을 합니다.

# TSVD는 PCA와 비슷하지만 sparse feature matrix에 사용할 수 있다는 장점이 있습니다.

# Natural language process에서 TSVD는 LSA(Latent Semantic Analysis)로도 부릅니다.
```
<br><br>


## Practice
***

<script src="https://gist.github.com/hubert-bioinformatics/dc0d3dde0a8a5ed22ba8ed0af9a8aef9.js"></script>