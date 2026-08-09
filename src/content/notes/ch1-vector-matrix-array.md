---
title: "ch1. Vector Matrix Array"
date: 2022-05-25
category: ml-data
tags: ["ml", "python", "study", "vector", "matrix", "array"]
series: "ML with Python Cookbook"
seriesOrder: 1
source: manual
---

## Summary
***

 Vector, matrix, array는 machine learning data를 다루기 위한 기본 도구입니다.
 <br /><br />

 
 * Vector: 1d array로 만듭니다. (1.1)
<br /><br />


 * Numpy로 Matrix 다루기

   * empty:  Initial value 대신 크기만 지정하여 임의의 값이 채워진 array를 만듭니다. (1.2)

   * zeros: 0으로 채운 array를 만듭니다. (1.2)

   * ones: 1로 채운 array를 만듭니다. (1.2)
    
   * full: 특정 값으로 채운 array를 만듭니다. (1.2)
    
   * shape, size, ndim: matrix의 크기, 원소 개수, 차원을 알고 싶을 때 사용합니다. (1.5)
   <br /><br />


 * Numpy로 Array 다루기
 
   * vectorize class: vectorized operation을 적용합니다. (1.6)
   
   * broadcasing: 차원이 달라도 array 사이 연산을 수행합니다. (1.6)
   
   * reshape: Array 크기만 변경하고 싶을 때 사용합니다. (1.9)
   <br /><br />

 * Transpose vector or matrix

   * T or transpose method를 사용합니다.
   <br /><br />


* Matrix rank 구하기 (1.12)

   * Matrix rank는 row or column이 만든 vector 공간의 차원입니다. Linear independent row or column의 개수입니다.
   
   * matrix_rank function을 사용합니다.
   
   * linalg module의 svd function으로 eigenvalues를 구한 다음 0이 아닌 값의 수를 헤아리는 방법으로 구할 수 있습니다.
   <br /><br />


* Determinant (1.13)

   * **det**를 사용합니다.
   <br /><br />


* Diagonal elements (1.14)

   * **diagonal**을 사용합니다.
   <br /><br />


* Trace (1.15)

   * **trace**를 사용합니다.
   <br /><br />


* Eigenvalue, Eigenvector (1.16)

   * **eig**를 사용합니다.
   <br /><br />


* Inverse matrix (1.20)

   * **inv**를 사용합니다.
   <br /><br />


## Practice
***

### 1.1 벡터 만들기

```python
import numpy as np

# 행이 하나인 벡터를 만듭니다.
vector_row = np.array([1, 2, 3])

# 열이 하나인 벡터를 만듭니다.
vector_column = np.array([[1],
                          [2],
                          [3]])

# numpy의 핵심 데이터 구조는 다차열 배열입니다.
# 벡터는 1차원 배열로 만듭니다.
```

```python
print(vector_row)
```

```text
[1 2 3]
```

```python
print(vector_column)
```

```text
[[1]
 [2]
 [3]]
```

array 함수는 입력 배열을 복사할지 선택하는 copy 매개변수가 있습니다.   
매개변수의 기본값이 True이기 때문에 배열이 입력되면 복사본을 만듭니다.

```python
# array는 배열이 입력되면 새로운 배열을 만듭니다.
new_row = np.array(vector_row)
new_row is vector_row
```

```text
False
```

### 1.2 행렬 만들기

```python
# 행렬을 만듭니다.
matrix = np.array([[1, 2],
                   [1, 2],
                   [1, 2]])

# empty 함수는 초기값 대신 크기만 지정하여 임의의 값이 채워진 배열을 만듭니다.
empty_matrix = np.empty((3, 2))
print(empty_matrix)
```

```text
[[0. 0.]
 [0. 0.]
 [0. 0.]]
```

```python
# zeros 함수는 0으로 채운 배열을 만듭니다.
zero_matrix = np.zeros((3, 2))
print(zero_matrix)
```

```text
[[0. 0.]
 [0. 0.]
 [0. 0.]]
```

```python
# ones 함수는 1로 채운 배열을 만듭니다.
one_matrix = np.ones((3, 2))
print(one_matrix)
```

```text
[[1. 1.]
 [1. 1.]
 [1. 1.]]
```

```python
# 특정 값으로 채운 배열을 만들려면 full 함수를 사용합니다.
seven_matrix = np.full((3, 2), 7)
print(seven_matrix)
```

```text
[[7 7]
 [7 7]
 [7 7]]
```

### 1.3 희소 행렬 만들기      


머신러닝에서 대용량의 데이터를 다루는 경우는 흔합니다.   
이런 데이터의 원소는 대부분 0입니다.   
예를 들어 넷플릭스 사용자와 영화가 행과 열로 표현된 행렬을 생각해 보겠습니다.   
수 백만 행과 수 만 열로 이루어진 데이터입니다.   
대부분 사용자가 보는 영화 수는 적기 때문에 이 행렬의 원소 대부분은 0입니다.   
희소 행렬은 0이 아닌 원소만 저장하므로 계산비용이 크게 절감되니다.

```python
from scipy import sparse

# 행렬을 만듭니다.
matrix = np.array([[0, 0],
                   [0, 1],
                   [3, 0]])

# CSR (Compressed Sparse Row) 행렬을 만듭니다.
matrix_sparse = sparse.csr_matrix(matrix)

print(matrix)
print(matrix_sparse)
```

```text
[[0 0]
 [0 1]
 [3 0]]
  (1, 1)	1
  (2, 0)	3
```

```python
# 희소 행렬을 밀집 배열로 변환하려면 toarray 메서드를 사용합니다.
print(matrix_sparse.toarray())
```

```text
[[0 0]
 [0 1]
 [3 0]]
```

### 1.4 원소 선택하기

```python
vector = np.array([1, 2, 3, 4, 5, 6])

matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# 벡터의 세 번째 원소를 선택합니다.
vector[2]
```

```text
3
```

```python
# 행렬의 두 번째 행, 두 번째 열의 원소를 선택합니다.
matrix[1, 1]
```

```text
5
```

```python
# 벡터의 모든 원소를 선택합니다.
vector[:]
```

```text
array([1, 2, 3, 4, 5, 6])
```

```python
# 벡터의 마지막 원소를 선택합니다.
vector[-1]
```

```text
6
```

```python
# 행렬에서 첫 번째 두 행과 모든 열을 선택합니다.
matrix[:2, :]
```

```text
array([[1, 2, 3],
       [4, 5, 6]])
```

```python
# 행렬에서 모든 행과 두 번째 열을 선택합니다.
matrix[:, 1:2]
```

```text
array([[2],
       [5],
       [8]])
```

```python
# Fancy indexing: 행과 열의 인덱스 리스트를 전달하여 배열의 원소를 선택할 수 있습니다.
# 행렬의 첫 번째 행과 세 번째 행을 선택합니다.

matrix[[0, 2]]
```

```text
array([[1, 2, 3],
       [7, 8, 9]])
```

```python
# (0, 1), (2, 0) 위치의 원소를 선택합니다.
matrix[[0, 1], [2, 0]]
```

```text
array([3, 4])
```

```python
# 불리언 마스크(boolean mask) 배열을 만들어 원소를 선택할 수 있습니다.
mask = matrix > 5
mask
```

```text
array([[False, False, False],
       [False, False,  True],
       [ True,  True,  True]])
```

```python
# 불리언 마스크 배열을 사용하여 원소를 선택합니다.
matrix[mask]
```

```text
array([6, 7, 8, 9])
```

### 1.5 행렬 정보 확인하기   

행렬의 크기, 원소 개수, 차원을 알고 싶을 때 shape, size, ndim 속성을 사용합니다.

```python
matrix = np.array([[1, 2, 3, 4],
                   [5, 6, 7, 8],
                   [9, 10, 11, 12]])

# 행렬의 크기를 확인합니다.
matrix.shape
```

```text
(3, 4)
```

```python
# 행렬의 원소 개수를 확인합니다. (행*열)
matrix.size
```

```text
12
```

```python
# 행렬의 차원 수를 확인합니다.
matrix.ndim
```

```text
2
```

```python
# 이 외에도 원소의 데이터 타입을 확인할 수 있습니다.
matrix.dtype
```

```text
dtype('int32')
```

```python
# 원소 하나가 차지하는 바이트 크기도 알 수 있습니다.
matrix.itemsize
```

```text
4
```

```python
# 행렬 전체가 차지하는 바이트 크기도 알 수 있습니다.
matrix.nbytes
```

```text
48
```

### 1.6 벡터화 연산 적용하기   
   
배열의 여러 원소에 어떤 함수를 적용합니다.   
numpy의 vectorize 클래스는 배열의 일부나 전체에 적용하도록 함수를 변환시킵니다.   
Vectorize는 기본적으로 원소를 순회하는 for loop를 구현한 것으로 성능이 향상되지는 않습니다.   
하지만 numpy 배열은 차원이 달라도 배열 간의 연산을 수행할 수 있습니다.   
이를 broadcasting이라고 합니다.

```python
# numpy의 vectorize
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# 100을 더하는 함수를 만듭니다.
add_100 = lambda i: i + 100

# 벡터화된 함수를 만듭니다.
vectorized_add_100 = np.vectorize(add_100)

# 행렬의 모든 원소에 함수를 적용합니다.
vectorized_add_100(matrix)
```

```text
array([[101, 102, 103],
       [104, 105, 106],
       [107, 108, 109]])
```

```python
# numpy의 broadcasting
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# 모든 원소에 100을 더합니다.
matrix + 100
```

```text
array([[101, 102, 103],
       [104, 105, 106],
       [107, 108, 109]])
```

### 1.7 최댓값, 최솟값 찾기

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# 가장 큰 원소를 반환합니다.
np.max(matrix)
```

```text
9
```

```python
# 가장 작은 원소를 반환합니다.
np.min(matrix)
```

```text
1
```

```python
# 각 열에서 최댓갑을 찾습니다.
np.max(matrix, axis=0)
```

```text
array([7, 8, 9])
```

```python
# 각 행에서 최댓갑을 찾습니다.
np.max(matrix, axis=1)
```

```text
array([3, 6, 9])
```

keepdims 매개변수를 True로 지정하면   
원본 배열의 차원과 동일한 결과를 만듭니다.

```python
# 행 차원을 유지한 채 각 행의 최댓값을 선별한 열 벡터를 만들어 봅시다.
vector_column = np.max(matrix, axis=1, keepdims=True)
print(vector_column)
```

```text
[[3]
 [6]
 [9]]
```

```python
# 열 벡터이므로 broadcasting을 이용하여 각 행의 원소를 최대값으로 뺄 수 있습니다.
matrix - vector_column
```

```text
array([[-2, -1,  0],
       [-2, -1,  0],
       [-2, -1,  0]])
```

### 1.8 평균, 분산, 표준편차 계산하기   
   
numpy의 mean, var, std 함수를 사용합니다.

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

print(np.mean(matrix))
print(np.var(matrix))
print(np.std(matrix))
```

```text
5.0
6.666666666666667
2.581988897471611
```

max나 min처럼 전체 행렬 또는 한 축을 따라 통곗값을 구할 수 있습니다.

```python
# 각 열의 평균을 계산합니다.
np.mean(matrix, axis=0)
```

```text
array([4., 5., 6.])
```

통계학에서는 종종 모집단에서 추출한 샘플의 자유도 (degree of freedom)를 고려하여   
편향되지 않은 분산과 표준편차를 계산합니다.   
훈련 데이터의 독립적인 샘플 수는 전체 샘플 수에서 1을 빼야 합니다.   
np.std 함수와 np.var 함수에서 ddof 매개변수를 1로 지정하여 편향되지 않은 추정값을 얻을 수 있습니다.   
   
numpy와 다르게 다음 장에서 배울 pandas dataframe의 std 메서드는 ddof 매개변수의 기본값이 1입니다.

```python
np.std(matrix, ddof=1)
```

```text
2.7386127875258306
```

```python
# pandas dataframe의 std 메서드는 ddof 매개변수의 기본값이 1입니다.
import pandas as pd

df = pd.DataFrame(matrix.flatten())
df.std()
```

```text
0    2.738613
dtype: float64
```

### 1.9 배열 크기 바꾸기   
   
원소의 값은 변경시키지 않고 배열 크기(행과 열의 수)를 바꾸려고 합니다.   
numpy의 reshape 함수를 사용합니다.

```python
# 4x3 행렬을 만듭니다.
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9],
                   [10, 11, 12]])

# 2x6 행렬로 크기를 바꿉니다.
matrix.reshape(2, 6)
```

```text
array([[ 1,  2,  3,  4,  5,  6],
       [ 7,  8,  9, 10, 11, 12]])
```

reshape 함수는 데이터를 동일하게 유지하면서 배열의 구조를 변경하여   
행과 열의 수를 다르게 조작할 수 있습니다.   
새로운 행렬은 원래 행렬과 원소 개수가 같아야 합니다.   
   
reshape에 사용할 수 있는 매개변수 -1은 가능한 많이라는 뜻으로 유용하게 사용됩니다.   
reshape(1, -1)은 행 하나에 열은 가능한 많게라는 의미입니다.

```python
matrix.reshape(1, -1)
```

```text
array([[ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12]])
```

reshape에 정수 하나를 입력하면 그 길이의 1차원 배열을 반환합니다.

```python
matrix.reshape(12)
```

```text
array([ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12])
```

배열 길이 전체를 헤아릴 필요없이 reshape 메서드에 -1을 입력하면 1차원 배열로 바꿔줍니다.   
ravel 메서드도 이와 동일한 작업을 수행합니다.

```python
matrix.reshape(-1)
```

```text
array([ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12])
```

```python
matrix.ravel()
```

```text
array([ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12])
```

### 1.10 벡터나 행렬 전치하기   
   
벡터나 행렬을 전치(transpose) 해야할 때 T 메서드나 transpose 메서드를 사용합니다.

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# 행렬을 전치합니다.
matrix.T
```

```text
array([[1, 4, 7],
       [2, 5, 8],
       [3, 6, 9]])
```

```python
matrix.transpose()
```

```text
array([[1, 4, 7],
       [2, 5, 8],
       [3, 6, 9]])
```

transpose 메서드는 튜플로 바꿀 차원을 직접 지정할 수도 있습니다.

```python
# 2x3x2 행렬을 만듭니다.
matrix = np.array([[[1, 2],
                    [3, 4],
                    [5, 6]],
                  
                   [[7, 8],
                    [9, 10],
                    [11, 12]]])

# 두 번째와 세 번째 차원을 바꾸어 2x2x3 행렬로 만듭니다.
matrix.transpose((0, 2, 1))
```

```text
array([[[ 1,  3,  5],
        [ 2,  4,  6]],

       [[ 7,  9, 11],
        [ 8, 10, 12]]])
```

### 1.11 행렬 펼치기   
   
flatten은 행렬을 1차원 배열로 변환하는 간단한 메서드입니다.   
   
reshape 메서드는 numpy 배열의 view를 반환합니다.   
view는 원본 배열을 가리키는 역할을 하며   
원본 배열에서 변경된 내용이 그대로 반영됩니다.   
   
하지만 flatten 메서드는 배열을 복사하여 새로운 배열을 만들기 때문에   
원본 배열에서 변경된 내용이 반영되지 않습니다.

```python
matrix = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# 행렬을 펼칩니다.
matrix.flatten()
```

```text
array([1, 2, 3, 4, 5, 6, 7, 8, 9])
```

```python
# reshape를 사용해서 펼칠 수도 있습니다.
matrix.reshape(1, -1)
```

```text
array([[1, 2, 3, 4, 5, 6, 7, 8, 9]])
```

```python
# flatten과 reshape를 비교해 봅시다.
vector_reshaped = matrix.reshape(-1)
vector_flattened = matrix.flatten()
```

```python
# (0, 0) 위치의 원소를 변경합니다.
matrix[0][0] = -1
```

```python
# 배열의 view는 원본 배열의 변경 사항을 반영합니다.
vector_reshaped
```

```text
array([-1,  2,  3,  4,  5,  6,  7,  8,  9])
```

```python
# 복사된 배열에는 영향이 미치지 않습니다.
vector_flattened
```

```text
array([1, 2, 3, 4, 5, 6, 7, 8, 9])
```

### 1.12 행렬의 랭크 구하기   
   
행렬의 랭크는 행이나 열이 만든 벡터 공간의 차원으로 선형 독립적인 행 또는 열 개수입니다.   
numpy의 선형대수 메서드인 matrix_rank를 사용합니다.   
matrix_rank 함수는 특잇값 분해(singular value decomposition) 방식으로 랭크를 계산합니다.   
linalg 모듈의 svd 함수로 특잇값을 구한 다음 0이 아닌 값 수를 헤아립니다.

```python
matrix = np.array([[1, 1, 1],
                   [1, 1, 10],
                   [1, 1, 15]])

# 행렬의 랭크를 반환합니다.
np.linalg.matrix_rank(matrix)
```

```text
2
```

```python
# svd 함수로 특잇값만 계산합니다.
s = np.linalg.svd(matrix, compute_uv=False)
```

```python
# 오차를 고려하여 0에 가까운 아주 작은 값을 지정합니다.
np.sum(s > 1e-10)
```

```text
2
```

### 1.13 행렬식 계산하기   
   
numpy의 선형대수 메서드인 det를 사용합니다.   
행렬식은 정방행렬에 의한 선형 변환의 특징을 나타내는 스칼라 값입니다.   
(2, 2) 크기의 행렬 A = [[a, b], [c, d]]가 있다면   
행렬식은 det(A) = ad - bc로 계산합니다.

```python
matrix = np.array([[1, 2, 3],
                   [2, 4, 6],
                   [3, 8, 9]])

# 행렬의 행렬식을 반환합니다.
np.linalg.det(matrix)
```

```text
0.0
```

### 1.14 행렬의 대각원소 추출하기   
   
행렬의 대각원소를 구할 때 diagonal 메서드를 사용합니다.

```python
matrix = np.array([[1, 2, 3],
                   [2, 4, 6],
                   [3, 8, 9]])

# 대각원소를 반환합니다.
matrix.diagonal()
```

```text
array([1, 4, 9])
```

```python
# 주 대각선 외 대각원소를 구할 때는 offset 매개변수를 사용합니다.
# 주 대각선 하나 위의 대각원소를 구합니다.
matrix.diagonal(offset=1)
```

```text
array([2, 6])
```

```python
# 주 개각선 하나 아래의 대각원소를 구합니다.
matrix.diagonal(offset=-1)
```

```text
array([2, 8])
```

### 1.15 행렬의 대각합 계산하기   
   
행렬의 대각합은 대각원소의 합으로 머신러닝 알고리즘 내부에서 종종 사용됩니다.   
numpy 다차원 배열의 대각합은 trace 메서드를 사용하여 계산할 수 있습니다.

```python
matrix = np.array([[1, 2, 3],
                   [2, 4, 6],
                   [3, 8, 9]])

# 대각합을 반환합니다.
matrix.trace()
```

```text
14
```

```python
# diagonal 메서드와 마찬가지로 offset 매개변수를 지원합니다.
matrix.trace(offset=1)
```

```text
8
```

### 1.16 고윳값과 고유벡터 찾기   
   
고유벡터는 머신러닝 라이브러리에서 널리 사용됩니다.   
행렬 A로 표시되는 선형 변환을 적용할 때   
고유벡터는 방향은 바뀌지 않고 scale만 바뀌는 벡터입니다.   
공식으로 나타내면 다음과 같습니다.      
Av = λv      
A가 정방행렬일 때 λ는 고윳값, v는 고유벡터 입니다.   
numpy 선형대수 모듈에서 eig 함수는 정방행렬의 고윳값과 고유벡터를 계산할 수 있습니다.

```python
matrix = np.array([[1, -1, 3],
                   [1, 1, 6],
                   [3, 8, 9]])

# 고윳값과 고유벡터를 계산합니다.
eigenvalues, eigenvectors = np.linalg.eig(matrix)
```

```python
# 고윳갑과 고유벡터를 확인합니다.
print(eigenvalues)
print(eigenvectors)
```

```text
[13.55075847  0.74003145 -3.29078992]
[[-0.17622017 -0.96677403 -0.53373322]
 [-0.435951    0.2053623  -0.64324848]
 [-0.88254925  0.15223105  0.54896288]]
```

### 1.17 점곱 계산하기   
   
두 벡터 a와 b의 점곱(dot product)은 다음과 같이 정의합니다.   
   
>$   
\sum_{i=1}^{n} (a_i*b_i)   
$   
   
numpy의 dot 함수를 사용하여 점곱을 계산할 수 있습니다.

```python
# 두 벡터를 만듭니다.
vector_a = np.array([1, 2, 3])
vector_b = np.array([4, 5, 6])

# 점곱을 계산합니다.
np.dot(vector_a, vector_b)
```

```text
32
```

### 1.18 행렬 덧셈과 뺄셈   
   
numpy의 add와 subtract 메서드를 사용합니다.

### 1.19 행렬 곱셈   
   
numpy의 dot 함수를 사용합니다.   
dot 함수는 다차원 배열에도 적용할 수 있습니다.   
이 때는 첫 번째 배열의 마지막 차원과 두 번째 배열의 끝에서 두 번째 차원이 동일해야 합니다.

```python
matrix_a = np.array([[1, 1],
                     [1, 2]])

matrix_b = np.array([[1, 3],
                     [1, 2]])

# 두 행렬을 곱합니다.
np.dot(matrix_a, matrix_b)
```

```text
array([[2, 5],
       [3, 7]])
```

### 1.20 역행렬   
   
정방행렬 A의 역행렬은 다음 식의 두 번째 행렬입니다.   
>$   
AA^{-1} = I   
$   

numpy 선형대수 모듈의 inv 함수를 사용합니다.

```python
matrix = np.array([[1, 4],
                   [2, 5]])

# 역행렬을 계산합니다.
np.linalg.inv(matrix)
```

```text
array([[-1.66666667,  1.33333333],
       [ 0.66666667, -0.33333333]])
```

```python
# 행렬과 역행렬을 곱합니다. 단위행렬을 생성합니다.
np.dot(matrix, np.linalg.inv(matrix))
```

```text
array([[1., 0.],
       [0., 1.]])
```
