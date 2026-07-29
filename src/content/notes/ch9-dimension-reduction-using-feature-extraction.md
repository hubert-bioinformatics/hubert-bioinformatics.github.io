---
title: "ch9. Dimension Reduction Using Feature Extraction"
date: 2022-06-01
category: ml-data
tags: ["ml", "python", "study", "sklearn", "dataframe"]
series: "ML with Python Cookbook"
seriesOrder: 9
source: manual
---

## Summary
***

 Dimension reduction을 위한 feature extraction의 목적은 feature에 내제된 정보는 최대한 유지하면서 feature set $$\rho_{original}$$을 새로운 set $$\rho_{new}$$로 변환하는 것입니다. Feature extraction의 한 가지 단점은 새로운 set $$\rho_{new}$$를 사람이 이해하지 못한다는 것입니다. 해석 가능한 model을 유지하고 싶다면 feature selection 사용이 더 나은 방법입니다. 
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

```python
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 9.0 소개   \n",
    "   \n",
    "수천에서 수십만 개의 특성이 있는 경우는 흔합니다.   \n",
    "예를 들어 8장에서 256 X 256 픽셀의 컬러 이미지를 196,608개의 특성으로 변환했습니다.   \n",
    "또한 각 픽셀이 가질 수 있는 값은 256개이기 때문에 샘플을 구성할 수 있는 조합은 256<sup>196608</sup>개가 됩니다.   \n",
    "문제는 이런 조합의 작은 부분에 해당하는 샘플을 모으는 것조차 불가능하다는 것입니다.   \n",
    "학습 알고리즘은 충분한 데이터가 주어지지 않으면 올바르게 작동하지 않기 때문입니다. (차원의 저주)   \n",
    "  \n",
    "다행히 모든 특성이 동일하지는 않습니다.   \n",
    "차원 축소를 위한 특성 추출의 목적은   \n",
    "특성에 내재된 정보는 많이 유지하면서 특성 집합 $ \\rho_{original} $을 새로운 집합 $ \\rho_{new} $으로 변환하는 것입니다.   \n",
    "이 때 $ \\rho_{original} $ > $ \\rho_{new} $입니다.   \n",
    "다르게 말하면 고품질 예측을 만들기 위한 데이터의 능력을 조금만 희생하고 특성의 수를 줄입니다.   \n",
    "이 장에서는 이런 작업을 위한 여러 가지 특성 추출 기법을 다루겠습니다.   \n",
    "   \n",
    "특성 추출 기법의 한 가지 단점은 만들어진 새로운 특성을 사람이 이해하지 못한다는 것입니다.   \n",
    "모델을 훈련하기 위해 필요한 특성을 담고 있지만 사람의 눈에는 무작위한 숫자의 모음으로 보일 것입니다.   \n",
    "해석 가능한 모델을 유지하고 싶다면 특성 선택을 통한 차원 축소가 더 나은 방법입니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 9.1 주성분을 사용해 특성 줄이기   \n",
    "   \n",
    "일련의 특성이 주어졌을 때 데이터의 분산을 유지하면서 특성의 수를 줄입니다.   \n",
    "sklearn의 PCA를 사용해 주성분 분석을 수행합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "원본 특성 개수:  64\n",
      "줄어든 특성 개수:  54\n"
     ]
    }
   ],
   "source": [
    "from sklearn.preprocessing import StandardScaler\n",
    "from sklearn.decomposition import PCA\n",
    "from sklearn import datasets\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "digits = datasets.load_digits()\n",
    "\n",
    "# 특성 행렬을 표준화 처리합니다.\n",
    "features = StandardScaler().fit_transform(digits.data)\n",
    "\n",
    "# 99%의 분산을 유지하도록 PCA 클래스 객체를 만듭니다.\n",
    "pca = PCA(n_components=0.99, whiten=True)\n",
    "\n",
    "# PCA를 수행합니다.\n",
    "features_pca = pca.fit_transform(features)\n",
    "\n",
    "# 결과를 확인합니다.\n",
    "print(\"원본 특성 개수: \", features.shape[1])\n",
    "print(\"줄어든 특성 개수: \", features_pca.shape[1])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "주성분 분석(PCA)은 인기가 많은 선형 차원 축소 기법입니다.   \n",
    "PCA는 대부분의 분산을 유지하는 특성 행렬의 (아마도 특성보다 더 적은 수의) 주성분에 샘플을 투영합니다.   \n",
    "PCA는 비지도 학습 기법입니다. 즉, 타겟 벡터의 정보를 사용하지 않고 특성 행렬만 이용합니다.   \n",
    "   \n",
    "간단한 예를 통해 PCA 이면에 있는 원리를 이해할 수 있습니다.   \n",
    "예제 데이터는 두 개의 특성 $ x_{1} $와 $ x_{2} $를 가집니다.   \n",
    "그래프를 보면 샘플들이 길이가 길고 높이는 낮은 타원 모양으로 퍼져 있음을 알 수 있습니다.   \n",
    "조금 더 구체적으로는 '길이' 방향의 분산이 '높이' 방향보다 훨씬 크다고 말할 수 있습니다.   \n",
    "길이와 높이 대신 가장 분산이 많은 방향을 첫 번째 주성분으로 부르고 두 번째로 가장 많은 방향을 두 번째 주성분이라고 부릅니다.   \n",
    "   \n",
    "특성을 줄이는 한 가지 방법은 이 2D 공간의 모든 샘플을 1차원 주성분에 투영하는 것입니다.   \n",
    "두 번째 주성분에 있는 정보는 잃겠지만 때로는 받아들일 만한 상황일 수 있습니다.   \n",
    "이것이 PCA 입니다.   \n",
    "   \n",
    "sklearn은 pca 객체의 메서드에 PCA를 구현했습니다.   \n",
    "n_components의 입력 매개변수에 따라 두 가지 동작을 수행합니다.   \n",
    "만약 매개변수값이 1보다 크면 n_components 개수만큼의 특성이 반환됩니다.   \n",
    "n_components를 0과 1 사이로 지정하면 pca는 해당 비율의 분산을 유지할 수 있는 최소한의 특성 개수를 반환합니다. 0.95와 0.99가 자주 사용되며 원본 특성의 95%와 99%의 분산을 유지한다는 의미입니다.   \n",
    "whiten=True로 지정하면 각 주성분의 값을 평균이 0이고 분산이 1이 되도록 변환합니다.   \n",
    "solver=\"randomized'는 아주 짧은 시간 안에 첫 번째 주성분을 찾아주는 확률적 알고리즘을 사용합니다.   \n",
    "   \n",
    "해결의 출력은 PCA가 10개의 차원을 감소하면서 특성 행렬의 정보(분산)를 99% 유지했다는 것을 보여줍니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "whitening은 주성분에 투영된 특성의 스케일을 맞추는 역할을 합니다.   \n",
    "PCA는 평균을 0으로 맞추기 때문에 화이트닝 옵션 대신 나중에 투영된 특성을 표준화해도 됩니다.   \n",
    "   \n",
    "해결에서 사용한 loda_digit 함수는 8 X 8 크기의 손글씨 숫자 데이터를 로드합니다.   \n",
    "주성분에 투영된 처음 두 개의 특성을 사용해 산점도를 그려보겠습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "<Figure size 640x480 with 1 Axes>"
      ]
     },
     "metadata": {},
     "output_type": "display_data"
    }
   ],
   "source": [
    "import matplotlib.pyplot as plt\n",
    "\n",
    "plt.scatter(features_pca[:, 0], features_pca[:, 1])\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "화이트닝되었기 때문에 두 특성의 스케일이 비슷합니다. PCA 클래스의 whiten 매개변수의 기본값은 False입니다 화이트닝을 적용하지 않으면 평균은 0이지만 스케일은 맞춰지지 않습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "image/png": "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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    }
   ],
   "source": [
    "pca_nowhiten = PCA(n_components=0.99)\n",
    "features_nowhiten = pca_nowhiten.fit_transform(features)\n",
    "plt.scatter(features_nowhiten[:, 0], features_nowhiten[:, 1])\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "PCA로 찾은 주성분은 components_ 속성에 저장되어 있습니다.   \n",
    "해결에서 찾은 주성분은 행을 따라 54개가 놓여 있습니다.   \n",
    "각 주성분은 원본 특성 공간에서 어떤 방향을 나타내므로 이 벡터 크기는 64입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "(54, 64)"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "pca_nowhiten.components_.shape"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "특성 행렬을 주성분에 투영하려면 components_ 배열을 전치하여 점곱하면 됩니다.\n",
    "numpy allclose 함수를 사용하여 앞서 구한 features_nowhiten 배열과 동일한지 확인합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "True"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "import numpy as np\n",
    "\n",
    "np.allclose(features_nowhiten, np.dot(features, pca_nowhiten.components_.T))"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "적절한 분산 비율을 선택하기 위해 전체 주성분의 설명된 분산<sup>explained variance</sup>에서 유지되는 분산의 양이 크게 늘어나지 않는 지점을 찾을 수 있습니다. n_components 매개변수를 지정하지 않으면 특성 개수만큼 주성분이 만들어집니다. 주성분에 의해 설명된 분산은 explained_variance_ratio_ 속성에 저장되어 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "image/png": "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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    }
   ],
   "source": [
    "pca = PCA(whiten=True).fit(features)\n",
    "plt.plot(np.cumsum(pca.explained_variance_ratio_))\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "numpy cumsum 함수를 사용하여 분산을 누적하여 그래프를 그렸습니다.   \n",
    "여기에서는 대략 30개의 주성분으로도 80% 이상의 분산을 유지하고 있습니다.   \n",
    "그 이후부터 증가 추세가 꺾이고 있음을 알 수 있습니다.   \n",
    "   \n",
    "sklearn v0.19에서 샘플의 자유도<sup>degree of freedom</sup>를 계산할 때 샘플 개수에서 1을 빼지 않는 버그가 수정되었습니다.   \n",
    "따라서 해결에서처럼 사전에 (전체 샘플 개수를 자유도로 사용하는) 표준화 전처리를 하면 다른 결과가 만들어집니다.   \n",
    "올바르게 분산으로 계산하기 위해서 원본 데이터를 그대로 PCA로 주입하는 것이 좋습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "image/png": "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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    }
   ],
   "source": [
    "# 표준화하지 않은 원본 데이터를 사용합니다.\n",
    "pca.fit(digits.data)\n",
    "plt.plot(np.cumsum(pca.explained_variance_ratio_))\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 9.2 선형적으로 구분되지 않은 데이터의 차원 축소하기   \n",
    "   \n",
    "선형적으로 구분되지 않은 데이터에서 차원을 축소합니다.   \n",
    "커널 트릭<sup>kernel trick</sup>을 사용하는 주성분 분석의 확장을 사용하여 비선형 차원 축소를 수행합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "원본 특성 개수:  2\n",
      "줄어든 특성 개수:  1\n"
     ]
    }
   ],
   "source": [
    "from sklearn.decomposition import KernelPCA\n",
    "from sklearn.datasets import make_circles\n",
    "\n",
    "# 선형적으로 구분되지 않는 데이터를 만듭니다.\n",
    "features, _ = make_circles(n_samples=1000, random_state=1, noise=0.1, factor=0.1)\n",
    "\n",
    "# 방사 기저 함수(radius basis function, RBF)를 사용하여 커널 PCA를 적용합니다.\n",
    "kpca = KernelPCA(kernel=\"rbf\", gamma=15, n_components=1)\n",
    "features_kpca = kpca.fit_transform(features)\n",
    "\n",
    "print(\"원본 특성 개수: \", features.shape[1])\n",
    "print(\"줄어든 특성 개수: \", features_kpca.shape[1])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "PCA는 특성 행렬의 차원을 축소할 수 있습니다.(예를 들어 특성의 개수)   \n",
    "표준 PCA는 샘플을 선형적으로 투영하여 특성을 축소합니다.   \n",
    "데이터가 선형적으로 구분되면 (즉, 다른 클래스 사이에 직선이나 초평면<sup>hyperplane</sup>을 그릴 수 있다면) PCA가 잘 동작합니다.   \n",
    "그러나 데이터가 선형적으로 구분되지 않으면 (즉, 구부러진 결정 경계를 사용해서만 클래스를 나눌 수 있다면) 선형 변환이 잘 맞지 않습니다.   \n",
    "해결에서 SKLEARN의 MAKE_CIRCLES 함수를 사용해 두 개의 클래스를 가진 타겟 벡터와   \n",
    "두 개의 특성을 가진 모의 데이터셋을 만들었습니다.   \n",
    "make_circles는 선형적으로 구분되지 않는 데이터를 만듭니다.   \n",
    "구체적으로 하나의 클래스가 다른 클래스 안에 둘려싸여 있습니다.   \n",
    "   \n",
    "선형 PCA를 사용하여 데이터의 차원을 축소시킨다면 두 클래스가 첫 번째 주성분에 선형적으로 투영되기 때문에 서로 섞일 것입니다.   \n",
    "이상적으로는 차원을 축소하면서 두 클래스가 선형적으로도 구분되는 변환을 원합니다.   \n",
    "   \n",
    "커널 PCA가 이 두 가지를 수행할 수 있습니다.   \n",
    "커널 함수는 선형적으로 구분되지 않는 데이터를 선형적으로 구분되는 고차원으로 투영시켜 줍니다.   \n",
    "이를 커널 트릭이라 부릅니다. 쉽게 커널은 데이터를 투영하는 다른 방법이라고 생각하면 됩니다.   \n",
    "sklearn의 KernelPCA에 사용할 수 있는 커널이 여러 개가 있습니다. 이 커널 함수는 KERNEL 매개변수를 사용하여 지정합니다.   \n",
    "널리 사용되는 커널은 가우시안 방사 기저 함수 커널인 rbf입니다.   \n",
    "다른 함수로는 다항식 커널(poly), 시그모이드 커널(sigmoid)이 있습니다. 선형 투영(linear)으로 지정하면 표준 PCA와 동일한 결과를 만들 수도 있습니다.   \n",
    "   \n",
    "커널 PCA의 단점은 설정할 매개변수가 많다는 것입니다.   \n",
    "예를 들어 레시피 9.1에서 n_components를 0.99로 설정하여 PCA가 분산의 99%를 유지하는 주성분의 개수를 선택했습니다.   \n",
    "커널 PCA에서는 이 옵션을 사용할 수 없습니다. 대신 주성분의 개수를 지정해야 합니다.   \n",
    "또한 커널 자체적으로 설정해야 할 하이파파라미터를 동반합니다. 예를 들어 방사 기저 함수는 gamma 값을 설정해야 합니다.   \n",
    "어떤 값을 설정해야 할까요? 시행착오를 거칠 수밖에 없습니다.   \n",
    "구체적으로 여러 가지 커널과 매개변수 조합으로 머신러닝 모델을 여러 번 훈련시킬 수 있습니다.   \n",
    "가장 높은 예측 성능을 만드는 값의 조합을 찾습니다. 이런 방법에 대해서는 12장에서 배우겠습니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "커널 트릭은 실제 고차원으로 데이터를 변환하지 않으면서 고차원 데이터를 다루는 듯한 효과를 냅니다.   \n",
    "커널 PCA는 고차원 공간에서 주성분으로 투영된 결과를 반환합니다.   \n",
    "실제 고차원 공간으로 변환하는 것은 아니기 때문에 PCA처럼 주성분을 얻을 수는 없습니다.   \n",
    "즉, components_ 속성이 정의되지 않습니다.   \n",
    "   \n",
    "kernel 매개변수의 기본값은 linear입니다.   \n",
    "gamma 매개변수는 rbf, poly, sigmoid 커널에서 사용하는 계수이고 기본값은 특성 개수의 역수입니다.   \n",
    "degree 매개변수는 poly 커널에 사용하는 거듭제곱 수이고 기본값은 3입니다.   \n",
    "coef0 매개변수는 poly와 sigmoid 커널에 사용되는 상수항으로 기본값은 1입니다.   \n",
    "이외에 cosine 커널이 있습니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 9.3 클래스 분리를 최대화하여 특성 줄이기   \n",
    "   \n",
    "분류 모델에 사용될 특성을 줄입니다.   \n",
    "선형 판별 분석<sup>linear discriminant analysis</sup>(LDA)을 사용하여 클래스를 최대한 분리하는 성분 축으로 특성을 투영합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 9,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "원본 특성 개수:  4\n",
      "줄어든 특성 개수:  1\n"
     ]
    }
   ],
   "source": [
    "from sklearn import datasets\n",
    "from sklearn.discriminant_analysis import LinearDiscriminantAnalysis\n",
    "\n",
    "# 붓꽃 데이터셋을 로드합니다.\n",
    "iris = datasets.load_iris()\n",
    "features = iris.data\n",
    "target = iris.target\n",
    "\n",
    "# LDA 객체를 만들고 실행하여 특성을 변환합니다.\n",
    "lda = LinearDiscriminantAnalysis(n_components=1)\n",
    "features_lda = lda.fit(features, target).transform(features)\n",
    "\n",
    "# 특성 개수를 출력합니다.\n",
    "print(\"원본 특성 개수: \", features.shape[1])\n",
    "print(\"줄어든 특성 개수: \", features_lda.shape[1])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "explained_variance_ratio_를 사용하여 각 성분이 설명하는 분산의 양을 확인할 수 있습니다.   \n",
    "해결에서는 하나의 성분이 분산의 99%를 설명합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([0.9912126])"
      ]
     },
     "execution_count": 10,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "lda.explained_variance_ratio_"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "LDA는 분류 알고리즘이지만 차원 축소에도 자주 사용되는 기법입니다.   \n",
    "LDA는 특성 공간을 저차원 공간으로 투영한다는 점에서 주성분 분석(PCA)와 비슷합니다.   \n",
    "PCA가 데이터에서 분산이 최대인 성분 축에만 관심이 있는 반면   \n",
    "LDA는 클래스 간의 차이를 최대화하는 추가적인 목적을 가집니다.   \n",
    "   \n",
    "예제는 두 개의 타겟 클래스와 두 개의 특성으로 구성되어 있습니다.   \n",
    "이 데이터를 y축에 투영하면 두 클래스는 쉽게 구분되지 않습니다. (즉, 클래스가 겹칩니다)   \n",
    "데이터를 x축에 투영하면 클래스를 잘 구분하는 하나의 특성 벡터를 만들 수 있습니다 (즉, 1차원으로 축소됩니다.)   \n",
    "물론 실전에서는 클래스 간의 관계가 더 복잡하고 고차원이지만 기본적인 개념은 동일합니다.   \n",
    "   "
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "sklearn에서 LDA는 LinearDiscriminantAnalysis 클래스에 구현되어 있습니다.   \n",
    "n_components 매개변수에 원하는 특성의 개수를 지정합니다.   \n",
    "필요한 n_components의 값을 알기 위해서는 (예를 들어 몇 개의 축을 남길지) 만들어진 각 특성이 설명하는 분산을 크기순으로 정렬한 explained_variance_ratio_를 참고할 수 있습니다.   \n",
    "   \n",
    "특히 n_components를 None으로 지정하여 LinearDiscriminantAnalysis를 실행할 수 있습니다.   \n",
    "모든 성분 특성에 의해 설명된 분산의 비율을 반환합니다.   \n",
    "그다음 설명된 분산의 임곗값을 넘기 위해 필요한 성분 개수를 계산합니다. (주로 0.95나 0.99)   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 11,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "1"
      ]
     },
     "execution_count": 11,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# LDA를 만들고 실행합니다.\n",
    "lda = LinearDiscriminantAnalysis(n_components=None)\n",
    "features_lda = lda.fit(features, target)\n",
    "\n",
    "# 설명된 분산의 비율이 담긴 배열을 저장합니다.\n",
    "lda_var_ratios = lda.explained_variance_ratio_\n",
    "\n",
    "# 함수를 만듭니다.\n",
    "def select_n_components(var_ratio, goal_var: float) -> int:\n",
    "    # 설명된 분산의 초기값을 지정합니다.\n",
    "    total_variance = 0.0\n",
    "    \n",
    "    # 특성 개수의 초깃값을 지정합니다.\n",
    "    n_components = 0\n",
    "    \n",
    "    # 각 특성의 설명된 분산을 순회합니다.\n",
    "    for explained_variance in var_ratio:\n",
    "        \n",
    "        # 설명된 분산 값을 누적합니다.\n",
    "        total_variance += explained_variance\n",
    "        \n",
    "        # 성분 개수를 카운트합니다.\n",
    "        n_components += 1\n",
    "        \n",
    "        # 설명된 분산이 목표치에 도달하면\n",
    "        if total_variance >= goal_var:\n",
    "            # 반복을 종료합니다.\n",
    "            break\n",
    "            \n",
    "    # 성분 개수를 반환합니다.\n",
    "    return n_components\n",
    "\n",
    "# 함수를 실행합니다.\n",
    "select_n_components(lda_var_ratios, 0.95)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "LDA는 PCA와 달리 타겟 벡터를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 9.4 행렬 분해를 사용하여 특성 줄이기   \n",
    "   \n",
    "음수가 아닌 특성 행렬이 있을 때 차원을 축소하는 방법입니다.   \n",
    "비음수 행렬 분해<sup>non-negative matrix factorization, NMF</sup>를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "원본 특성 개수:  64\n",
      "줄어든 특성 개수:  10\n"
     ]
    }
   ],
   "source": [
    "from sklearn.decomposition import NMF\n",
    "from sklearn import datasets\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "digits = datasets.load_digits()\n",
    "\n",
    "# 특성 행렬을 로드합니다.\n",
    "features = digits.data\n",
    "\n",
    "# NMF를 만들고 학습하고 적용합니다.\n",
    "nmf = NMF(n_components=10, random_state=1)\n",
    "features_nmf = nmf.fit_transform(features)\n",
    "\n",
    "# 결과를 출력합니다.\n",
    "print(\"원본 특성 개수: \", features.shape[1])\n",
    "print(\"줄어든 특성 개수: \", features_nmf.shape[1])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "NMF 선형 차원 축소를 위한 비지도 학습 기법입니다.   \n",
    "샘플과 특성 사이에 잠재되어 있는 관계를 표현하는 행렬로 특성 행렬을 분해합니다.   \n",
    "즉, 곱해서 거의 원본 행렬이 되는 여러 개의 행렬로 나눕니다.   \n",
    "직관적으로 생각해서 행렬 곱셈에서 곱하는 행렬은 결과 행렬보다 훨씬 적은 차원을 가지기 때문에 NMF가 차원을 축소할 수 있습니다.   \n",
    "이론적으로 원하는 특성 개수 r이 주어지면 NMF는 다음과 같이 특성 행렬을 분해합니다.   \n",
    ">$\n",
    "\\mathbf{V} \\approx \\mathbf{W}\\mathbf{H}\n",
    "$   \n",
    "여기에서 $ \\mathbf{V} $는 nxd 크기의 특성 행렬입니다. 즉, n개의 샘플, d개의 특성을 가집니다.   \n",
    "$ \\mathbf{W} $는 nxr 크기이고   \n",
    "$ \\mathbf{H} $는 rxd 크기 행렬입니다.   \n",
    "r값을 조절하여 필요한 차원 축소의 양을 정할 수 있습니다.   \n",
    "   \n",
    "NMF의 중요한 필수 조건 하나는 이름이 의미하듯이 특성 행렬이 음수를 포함할 수 없습니다.   \n",
    "또한 PCA나 다른 기법과 달리 만들어진 특성의 설명된 분산을 제공하지 않습니다.   \n",
    "그러므로 n_components의 최적값을 찾는 가장 좋은 방법은 최종 모델에서 가장 좋은 결과를 내는 것을 찾아 여러 값을 시도해보는 것입니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "$ \\mathbf{H} $행렬은 components_ 속성에 저장되어 있고   \n",
    "$ \\mathbf{W} $행렬이 변환된 데이터 features_nmf입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 13,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "(10, 64)"
      ]
     },
     "execution_count": 13,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "nmf.components_.shape"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 15,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "True"
      ]
     },
     "execution_count": 15,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "np.all(nmf.components_ >= 0)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "원본 데이터를 복원하려면 변환된 행렬 $ \\mathbf{W} $와 성분 행렬 $ \\mathbf{H} $를 점곱합니다. 완벽하게 복원되지 못하지만 두 행렬의 차이가 크지 않음을 알 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 18,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "-0.20062043744128197"
      ]
     },
     "execution_count": 18,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "np.mean(features - np.dot(features_nmf, nmf.components_))"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 9.5 희소한 데이터의 특성 줄이기   \n",
    "   \n",
    "희소 특성 행렬의 차원을 축소합니다.   \n",
    "TSVD<sup>truncated singular value decomposition</sup>를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 20,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "원본 특성 개수:  64\n",
      "줄어든 특성 개수:  10\n"
     ]
    }
   ],
   "source": [
    "from sklearn.preprocessing import StandardScaler\n",
    "from sklearn.decomposition import TruncatedSVD\n",
    "from scipy.sparse import csr_matrix\n",
    "from sklearn import datasets\n",
    "import numpy as np\n",
    "\n",
    "# 데이터를 로드합니다.\n",
    "digits = datasets.load_digits()\n",
    "\n",
    "# 특성 행렬을 표준화 처리합니다.\n",
    "features = StandardScaler().fit_transform(digits.data)\n",
    "\n",
    "# 희소 행렬을 만듭니다.\n",
    "features_sparse = csr_matrix(features)\n",
    "\n",
    "# TSVD 객체를 만듭니다.\n",
    "tsvd = TruncatedSVD(n_components=10)\n",
    "\n",
    "# 희소 행렬에 TSVD를 적용합니다.\n",
    "features_sparse_tsvd = tsvd.fit(features_sparse).transform(features_sparse)\n",
    "\n",
    "# 결과를 출력합니다.\n",
    "print(\"원본 특성 개수: \", features_sparse.shape[1])\n",
    "print(\"줄어든 특성 개수: \", features_sparse_tsvd.shape[1])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "TSVD는 PCA와 비슷합니다.   \n",
    "사실 PCA의 단계 중 하나에서 종종 기본 SVD 방식을 사용합니다.   \n",
    "기본 SVD에서 d개의 특성이 주어지면 SVD는 dxd 크기의 분해 행렬을 만듭니다.   \n",
    "반면 TSVD는 nxn 크기의 행렬을 만듭니다. n은 사전에 매개변수에서 지정한 값입니다.   \n",
    "TSVD의 이점은 PCA와 달리 희소 특성 행렬에 사용할 수 있다는 것입니다.   \n",
    "   \n",
    "TSVD의 이슈 하나는 난수 생성기를 사용하기 때문에 출력 부호가 훈련하는 사이에 뒤집힐 수 있다는 것입니다.   \n",
    "간단한 해결 방법은 전처리 파이프라인마다 한 번만 fit 메서드를 호출하는 것입니다. 그다음 여러 번 transform 메서드를 사용합니다.   \n",
    "   \n",
    "선형 판별 분석처럼 n_components 매개변수를 사용하여 필요한 특성(성분)의 개수를 지정해야 합니다. 자연스럽게 최적의 성분 개수에 대한 질문이 발생합니다. 한 가지 전략은 n_components를 하이퍼파라미터로 모델 선택 과정에서 최적화하는 것입니다. (즉, 가장 좋은 훈련 모델을 만드는 n_components를 선택합니다.) 또는 TSVD가 성분마다 원본 특성 행렬의 설명된 분산 비율을 제공하기 때문에 필요한 분산의 양을 설명할 수 있는 성분 개수를 선택할 수 있습니다. (보통 95%나 99%) 예를 들어 해결에서 처음 세 개의 성분은 대략 원본 데이터의 30% 분산을 설명합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 22,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.30039385390223233"
      ]
     },
     "execution_count": 22,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 처음 세 개의 성분이 설명하는 분산의 비율 합\n",
    "tsvd.explained_variance_ratio_[:3].sum()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "원본 특성 개수보다 하나 작게 n_components를 지정하고 TSVD를 실행하여 원하는 원본 데이터의 분산에서 설명된 양에 맞는 성분 개수를 계산하는 함수를 만들어 이 과정을 자동화할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 26,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "40"
      ]
     },
     "execution_count": 26,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 특성 개수보다 하나 작은 TSVD를 만들고 실행합니다.\n",
    "tsvd = TruncatedSVD(n_components=features_sparse.shape[1]-1)\n",
    "features_tsvd = tsvd.fit(features)\n",
    "\n",
    "# 설명된 분산을 리스트에 저장합니다.\n",
    "tsvd_var_ratios = tsvd.explained_variance_ratio_\n",
    "\n",
    "# 함수를 만듭니다.\n",
    "def select_n_components(var_ratio, goal_var):\n",
    "    # 설명된 분산을 초기화합니다.\n",
    "    total_variance = 0.0\n",
    "    \n",
    "    # 특성 개수를 초기화합니다.\n",
    "    n_components = 0\n",
    "    \n",
    "    # 특성의 설명된 분산을 순환합니다.\n",
    "    for explained_variance in var_ratio:\n",
    "        \n",
    "        # 설명된 분산을 누적합니다.\n",
    "        total_variance += explained_variance\n",
    "        \n",
    "        # 성분 개수를 카운트합니다.\n",
    "        n_components += 1\n",
    "        \n",
    "        # 설명된 분산의 목표에 도달하면\n",
    "        if total_variance >= goal_var:\n",
    "            #반복을 마칩니다.\n",
    "            break\n",
    "            \n",
    "    # 성분 개수를 반환합니다.\n",
    "    return n_components\n",
    "\n",
    "# 함수를 실행합니다.\n",
    "select_n_components(tsvd_var_ratios, 0.95)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "자연어 처리에서는 TSVD를 잠재 의미 분석<sup>latent semantic analysis, LSA</sup>이라고도 부릅니다.   \n",
    "   \n",
    "PCA는 최대 분산의 방향을 찾기 위해 원점에 맞춘 특성 행렬의 공분산 행렬에서 고유 벡터를 찾습니다.   \n",
    "이는 특성 행렬의 특잇값 분해(svd)하여 얻은 특이 벡터와 같습니다. 따라서 특성 행렬을 원점에 맞추고 TSVD를 적용하면 PCA와 거의 같은 결과가 만들어집니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 27,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.0020109620812160944"
      ]
     },
     "execution_count": 27,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "features = digits.data - np.mean(digits.data, axis=0)\n",
    "\n",
    "pca = PCA(n_components=40, random_state=1)\n",
    "features_pca = pca.fit_transform(features)\n",
    "\n",
    "tsvd = TruncatedSVD(n_components=40, random_state=1)\n",
    "features_tsvd = tsvd.fit_transform(features)\n",
    "\n",
    "np.max(np.abs(features_pca - features_tsvd))"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
```
