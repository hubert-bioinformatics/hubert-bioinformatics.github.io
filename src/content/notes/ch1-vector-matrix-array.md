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
 <br><br>

 
 * Vector: 1d array로 만듭니다. (1.1)
<br><br>


 * Numpy로 Matrix 다루기

   * empty:  Initial value 대신 크기만 지정하여 임의의 값이 채워진 array를 만듭니다. (1.2)

   * zeros: 0으로 채운 array를 만듭니다. (1.2)

   * ones: 1로 채운 array를 만듭니다. (1.2)
    
   * full: 특정 값으로 채운 array를 만듭니다. (1.2)
    
   * shape, size, ndim: matrix의 크기, 원소 개수, 차원을 알고 싶을 때 사용합니다. (1.5)
   <br><br>


 * Numpy로 Array 다루기
 
   * vectorize class: vectorized operation을 적용합니다. (1.6)
   
   * broadcasing: 차원이 달라도 array 사이 연산을 수행합니다. (1.6)
   
   * reshape: Array 크기만 변경하고 싶을 때 사용합니다. (1.9)
   <br><br>

 * Transpose vector or matrix

   * T or transpose method를 사용합니다.
   <br><br>


* Matrix rank 구하기 (1.12)

   * Matrix rank는 row or column이 만든 vector 공간의 차원입니다. Linear independent row or column의 개수입니다.
   
   * matrix_rank function을 사용합니다.
   
   * linalg module의 svd function으로 eigenvalues를 구한 다음 0이 아닌 값의 수를 헤아리는 방법으로 구할 수 있습니다.
   <br><br>


* Determinant (1.13)

   * **det**를 사용합니다.
   <br><br>


* Diagonal elements (1.14)

   * **diagonal**을 사용합니다.
   <br><br>


* Trace (1.15)

   * **trace**를 사용합니다.
   <br><br>


* Eigenvalue, Eigenvector (1.16)

   * **eig**를 사용합니다.
   <br><br>


* Inverse matrix (1.20)

   * **inv**를 사용합니다.
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
    "# 1.1 벡터 만들기   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [],
   "source": [
    "import numpy as np\n",
    "\n",
    "# 행이 하나인 벡터를 만듭니다.\n",
    "vector_row = np.array([1, 2, 3])\n",
    "\n",
    "# 열이 하나인 벡터를 만듭니다.\n",
    "vector_column = np.array([[1],\n",
    "                          [2],\n",
    "                          [3]])\n",
    "\n",
    "# numpy의 핵심 데이터 구조는 다차열 배열입니다.\n",
    "# 벡터는 1차원 배열로 만듭니다."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[1 2 3]\n"
     ]
    }
   ],
   "source": [
    "print(vector_row)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[[1]\n",
      " [2]\n",
      " [3]]\n"
     ]
    }
   ],
   "source": [
    "print(vector_column)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "array 함수는 입력 배열을 복사할지 선택하는 copy 매개변수가 있습니다.   \n",
    "매개변수의 기본값이 True이기 때문에 배열이 입력되면 복사본을 만듭니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "False"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# array는 배열이 입력되면 새로운 배열을 만듭니다.\n",
    "new_row = np.array(vector_row)\n",
    "new_row is vector_row"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# 1.2 행렬 만들기   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[[0. 0.]\n",
      " [0. 0.]\n",
      " [0. 0.]]\n"
     ]
    }
   ],
   "source": [
    "# 행렬을 만듭니다.\n",
    "matrix = np.array([[1, 2],\n",
    "                   [1, 2],\n",
    "                   [1, 2]])\n",
    "\n",
    "# empty 함수는 초기값 대신 크기만 지정하여 임의의 값이 채워진 배열을 만듭니다.\n",
    "empty_matrix = np.empty((3, 2))\n",
    "print(empty_matrix)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 11,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[[0. 0.]\n",
      " [0. 0.]\n",
      " [0. 0.]]\n"
     ]
    }
   ],
   "source": [
    "# zeros 함수는 0으로 채운 배열을 만듭니다.\n",
    "zero_matrix = np.zeros((3, 2))\n",
    "print(zero_matrix)"
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
      "[[1. 1.]\n",
      " [1. 1.]\n",
      " [1. 1.]]\n"
     ]
    }
   ],
   "source": [
    "# ones 함수는 1로 채운 배열을 만듭니다.\n",
    "one_matrix = np.ones((3, 2))\n",
    "print(one_matrix)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 13,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[[7 7]\n",
      " [7 7]\n",
      " [7 7]]\n"
     ]
    }
   ],
   "source": [
    "# 특정 값으로 채운 배열을 만들려면 full 함수를 사용합니다.\n",
    "seven_matrix = np.full((3, 2), 7)\n",
    "print(seven_matrix)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# 1.3 희소 행렬 만들기      \n",
    "\n",
    "\n",
    "머신러닝에서 대용량의 데이터를 다루는 경우는 흔합니다.   \n",
    "이런 데이터의 원소는 대부분 0입니다.   \n",
    "예를 들어 넷플릭스 사용자와 영화가 행과 열로 표현된 행렬을 생각해 보겠습니다.   \n",
    "수 백만 행과 수 만 열로 이루어진 데이터입니다.   \n",
    "대부분 사용자가 보는 영화 수는 적기 때문에 이 행렬의 원소 대부분은 0입니다.   \n",
    "희소 행렬은 0이 아닌 원소만 저장하므로 계산비용이 크게 절감되니다."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 14,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[[0 0]\n",
      " [0 1]\n",
      " [3 0]]\n",
      "  (1, 1)\t1\n",
      "  (2, 0)\t3\n"
     ]
    }
   ],
   "source": [
    "from scipy import sparse\n",
    "\n",
    "# 행렬을 만듭니다.\n",
    "matrix = np.array([[0, 0],\n",
    "                   [0, 1],\n",
    "                   [3, 0]])\n",
    "\n",
    "# CSR (Compressed Sparse Row) 행렬을 만듭니다.\n",
    "matrix_sparse = sparse.csr_matrix(matrix)\n",
    "\n",
    "print(matrix)\n",
    "print(matrix_sparse)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 15,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[[0 0]\n",
      " [0 1]\n",
      " [3 0]]\n"
     ]
    }
   ],
   "source": [
    "# 희소 행렬을 밀집 배열로 변환하려면 toarray 메서드를 사용합니다.\n",
    "print(matrix_sparse.toarray())"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# 1.4 원소 선택하기   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 20,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "3"
      ]
     },
     "execution_count": 20,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "vector = np.array([1, 2, 3, 4, 5, 6])\n",
    "\n",
    "matrix = np.array([[1, 2, 3],\n",
    "                   [4, 5, 6],\n",
    "                   [7, 8, 9]])\n",
    "\n",
    "# 벡터의 세 번째 원소를 선택합니다.\n",
    "vector[2]"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 21,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "5"
      ]
     },
     "execution_count": 21,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 행렬의 두 번째 행, 두 번째 열의 원소를 선택합니다.\n",
    "matrix[1, 1]"
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
       "array([1, 2, 3, 4, 5, 6])"
      ]
     },
     "execution_count": 22,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 벡터의 모든 원소를 선택합니다.\n",
    "vector[:]"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 23,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "6"
      ]
     },
     "execution_count": 23,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 벡터의 마지막 원소를 선택합니다.\n",
    "vector[-1]"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 24,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[1, 2, 3],\n",
       "       [4, 5, 6]])"
      ]
     },
     "execution_count": 24,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 행렬에서 첫 번째 두 행과 모든 열을 선택합니다.\n",
    "matrix[:2, :]"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 25,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[2],\n",
       "       [5],\n",
       "       [8]])"
      ]
     },
     "execution_count": 25,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 행렬에서 모든 행과 두 번째 열을 선택합니다.\n",
    "matrix[:, 1:2]"
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
       "array([[1, 2, 3],\n",
       "       [7, 8, 9]])"
      ]
     },
     "execution_count": 26,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# Fancy indexing: 행과 열의 인덱스 리스트를 전달하여 배열의 원소를 선택할 수 있습니다.\n",
    "# 행렬의 첫 번째 행과 세 번째 행을 선택합니다.\n",
    "\n",
    "matrix[[0, 2]]"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 28,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([3, 4])"
      ]
     },
     "execution_count": 28,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# (0, 1), (2, 0) 위치의 원소를 선택합니다.\n",
    "matrix[[0, 1], [2, 0]]"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 29,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[False, False, False],\n",
       "       [False, False,  True],\n",
       "       [ True,  True,  True]])"
      ]
     },
     "execution_count": 29,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 불리언 마스크(boolean mask) 배열을 만들어 원소를 선택할 수 있습니다.\n",
    "mask = matrix > 5\n",
    "mask"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 30,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([6, 7, 8, 9])"
      ]
     },
     "execution_count": 30,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 불리언 마스크 배열을 사용하여 원소를 선택합니다.\n",
    "matrix[mask]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# 1.5 행렬 정보 확인하기   \n",
    "\n",
    "행렬의 크기, 원소 개수, 차원을 알고 싶을 때 shape, size, ndim 속성을 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 31,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "(3, 4)"
      ]
     },
     "execution_count": 31,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix = np.array([[1, 2, 3, 4],\n",
    "                   [5, 6, 7, 8],\n",
    "                   [9, 10, 11, 12]])\n",
    "\n",
    "# 행렬의 크기를 확인합니다.\n",
    "matrix.shape"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 32,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "12"
      ]
     },
     "execution_count": 32,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 행렬의 원소 개수를 확인합니다. (행*열)\n",
    "matrix.size"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 33,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2"
      ]
     },
     "execution_count": 33,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 행렬의 차원 수를 확인합니다.\n",
    "matrix.ndim"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 34,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "dtype('int32')"
      ]
     },
     "execution_count": 34,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 이 외에도 원소의 데이터 타입을 확인할 수 있습니다.\n",
    "matrix.dtype"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 35,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "4"
      ]
     },
     "execution_count": 35,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 원소 하나가 차지하는 바이트 크기도 알 수 있습니다.\n",
    "matrix.itemsize"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 36,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "48"
      ]
     },
     "execution_count": 36,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 행렬 전체가 차지하는 바이트 크기도 알 수 있습니다.\n",
    "matrix.nbytes"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# 1.6 벡터화 연산 적용하기   \n",
    "   \n",
    "배열의 여러 원소에 어떤 함수를 적용합니다.   \n",
    "numpy의 vectorize 클래스는 배열의 일부나 전체에 적용하도록 함수를 변환시킵니다.   \n",
    "Vectorize는 기본적으로 원소를 순회하는 for loop를 구현한 것으로 성능이 향상되지는 않습니다.   \n",
    "하지만 numpy 배열은 차원이 달라도 배열 간의 연산을 수행할 수 있습니다.   \n",
    "이를 broadcasting이라고 합니다."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 37,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[101, 102, 103],\n",
       "       [104, 105, 106],\n",
       "       [107, 108, 109]])"
      ]
     },
     "execution_count": 37,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# numpy의 vectorize\n",
    "matrix = np.array([[1, 2, 3],\n",
    "                   [4, 5, 6],\n",
    "                   [7, 8, 9]])\n",
    "\n",
    "# 100을 더하는 함수를 만듭니다.\n",
    "add_100 = lambda i: i + 100\n",
    "\n",
    "# 벡터화된 함수를 만듭니다.\n",
    "vectorized_add_100 = np.vectorize(add_100)\n",
    "\n",
    "# 행렬의 모든 원소에 함수를 적용합니다.\n",
    "vectorized_add_100(matrix)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 38,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[101, 102, 103],\n",
       "       [104, 105, 106],\n",
       "       [107, 108, 109]])"
      ]
     },
     "execution_count": 38,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# numpy의 broadcasting\n",
    "matrix = np.array([[1, 2, 3],\n",
    "                   [4, 5, 6],\n",
    "                   [7, 8, 9]])\n",
    "\n",
    "# 모든 원소에 100을 더합니다.\n",
    "matrix + 100"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# 1.7 최댓값, 최솟값 찾기   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 39,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "9"
      ]
     },
     "execution_count": 39,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix = np.array([[1, 2, 3],\n",
    "                   [4, 5, 6],\n",
    "                   [7, 8, 9]])\n",
    "\n",
    "# 가장 큰 원소를 반환합니다.\n",
    "np.max(matrix)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 40,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "1"
      ]
     },
     "execution_count": 40,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 가장 작은 원소를 반환합니다.\n",
    "np.min(matrix)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 41,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([7, 8, 9])"
      ]
     },
     "execution_count": 41,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 각 열에서 최댓갑을 찾습니다.\n",
    "np.max(matrix, axis=0)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 42,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([3, 6, 9])"
      ]
     },
     "execution_count": 42,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 각 행에서 최댓갑을 찾습니다.\n",
    "np.max(matrix, axis=1)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "keepdims 매개변수를 True로 지정하면   \n",
    "원본 배열의 차원과 동일한 결과를 만듭니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 44,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[[3]\n",
      " [6]\n",
      " [9]]\n"
     ]
    }
   ],
   "source": [
    "# 행 차원을 유지한 채 각 행의 최댓값을 선별한 열 벡터를 만들어 봅시다.\n",
    "vector_column = np.max(matrix, axis=1, keepdims=True)\n",
    "print(vector_column)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 45,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[-2, -1,  0],\n",
       "       [-2, -1,  0],\n",
       "       [-2, -1,  0]])"
      ]
     },
     "execution_count": 45,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 열 벡터이므로 broadcasting을 이용하여 각 행의 원소를 최대값으로 뺄 수 있습니다.\n",
    "matrix - vector_column"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# 1.8 평균, 분산, 표준편차 계산하기   \n",
    "   \n",
    "numpy의 mean, var, std 함수를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 47,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "5.0\n",
      "6.666666666666667\n",
      "2.581988897471611\n"
     ]
    }
   ],
   "source": [
    "matrix = np.array([[1, 2, 3],\n",
    "                   [4, 5, 6],\n",
    "                   [7, 8, 9]])\n",
    "\n",
    "print(np.mean(matrix))\n",
    "print(np.var(matrix))\n",
    "print(np.std(matrix))"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "max나 min처럼 전체 행렬 또는 한 축을 따라 통곗값을 구할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 49,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([4., 5., 6.])"
      ]
     },
     "execution_count": 49,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 각 열의 평균을 계산합니다.\n",
    "np.mean(matrix, axis=0)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "통계학에서는 종종 모집단에서 추출한 샘플의 자유도 (degree of freedom)를 고려하여   \n",
    "편향되지 않은 분산과 표준편차를 계산합니다.   \n",
    "훈련 데이터의 독립적인 샘플 수는 전체 샘플 수에서 1을 빼야 합니다.   \n",
    "np.std 함수와 np.var 함수에서 ddof 매개변수를 1로 지정하여 편향되지 않은 추정값을 얻을 수 있습니다.   \n",
    "   \n",
    "numpy와 다르게 다음 장에서 배울 pandas dataframe의 std 메서드는 ddof 매개변수의 기본값이 1입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 50,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2.7386127875258306"
      ]
     },
     "execution_count": 50,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "np.std(matrix, ddof=1)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 53,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0    2.738613\n",
       "dtype: float64"
      ]
     },
     "execution_count": 53,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# pandas dataframe의 std 메서드는 ddof 매개변수의 기본값이 1입니다.\n",
    "import pandas as pd\n",
    "\n",
    "df = pd.DataFrame(matrix.flatten())\n",
    "df.std()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# 1.9 배열 크기 바꾸기   \n",
    "   \n",
    "원소의 값은 변경시키지 않고 배열 크기(행과 열의 수)를 바꾸려고 합니다.   \n",
    "numpy의 reshape 함수를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 54,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[ 1,  2,  3,  4,  5,  6],\n",
       "       [ 7,  8,  9, 10, 11, 12]])"
      ]
     },
     "execution_count": 54,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 4x3 행렬을 만듭니다.\n",
    "matrix = np.array([[1, 2, 3],\n",
    "                   [4, 5, 6],\n",
    "                   [7, 8, 9],\n",
    "                   [10, 11, 12]])\n",
    "\n",
    "# 2x6 행렬로 크기를 바꿉니다.\n",
    "matrix.reshape(2, 6)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "reshape 함수는 데이터를 동일하게 유지하면서 배열의 구조를 변경하여   \n",
    "행과 열의 수를 다르게 조작할 수 있습니다.   \n",
    "새로운 행렬은 원래 행렬과 원소 개수가 같아야 합니다.   \n",
    "   \n",
    "reshape에 사용할 수 있는 매개변수 -1은 가능한 많이라는 뜻으로 유용하게 사용됩니다.   \n",
    "reshape(1, -1)은 행 하나에 열은 가능한 많게라는 의미입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 55,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12]])"
      ]
     },
     "execution_count": 55,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix.reshape(1, -1)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "reshape에 정수 하나를 입력하면 그 길이의 1차원 배열을 반환합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 56,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12])"
      ]
     },
     "execution_count": 56,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix.reshape(12)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "배열 길이 전체를 헤아릴 필요없이 reshape 메서드에 -1을 입력하면 1차원 배열로 바꿔줍니다.   \n",
    "ravel 메서드도 이와 동일한 작업을 수행합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 57,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12])"
      ]
     },
     "execution_count": 57,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix.reshape(-1)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 59,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12])"
      ]
     },
     "execution_count": 59,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix.ravel()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# 1.10 벡터나 행렬 전치하기   \n",
    "   \n",
    "벡터나 행렬을 전치(transpose) 해야할 때 T 메서드나 transpose 메서드를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 60,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[1, 4, 7],\n",
       "       [2, 5, 8],\n",
       "       [3, 6, 9]])"
      ]
     },
     "execution_count": 60,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix = np.array([[1, 2, 3],\n",
    "                   [4, 5, 6],\n",
    "                   [7, 8, 9]])\n",
    "\n",
    "# 행렬을 전치합니다.\n",
    "matrix.T"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 63,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[1, 4, 7],\n",
       "       [2, 5, 8],\n",
       "       [3, 6, 9]])"
      ]
     },
     "execution_count": 63,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix.transpose()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "transpose 메서드는 튜플로 바꿀 차원을 직접 지정할 수도 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 64,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[[ 1,  3,  5],\n",
       "        [ 2,  4,  6]],\n",
       "\n",
       "       [[ 7,  9, 11],\n",
       "        [ 8, 10, 12]]])"
      ]
     },
     "execution_count": 64,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 2x3x2 행렬을 만듭니다.\n",
    "matrix = np.array([[[1, 2],\n",
    "                    [3, 4],\n",
    "                    [5, 6]],\n",
    "                  \n",
    "                   [[7, 8],\n",
    "                    [9, 10],\n",
    "                    [11, 12]]])\n",
    "\n",
    "# 두 번째와 세 번째 차원을 바꾸어 2x2x3 행렬로 만듭니다.\n",
    "matrix.transpose((0, 2, 1))"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# 1.11 행렬 펼치기   \n",
    "   \n",
    "flatten은 행렬을 1차원 배열로 변환하는 간단한 메서드입니다.   \n",
    "   \n",
    "reshape 메서드는 numpy 배열의 view를 반환합니다.   \n",
    "view는 원본 배열을 가리키는 역할을 하며   \n",
    "원본 배열에서 변경된 내용이 그대로 반영됩니다.   \n",
    "   \n",
    "하지만 flatten 메서드는 배열을 복사하여 새로운 배열을 만들기 때문에   \n",
    "원본 배열에서 변경된 내용이 반영되지 않습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 65,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([1, 2, 3, 4, 5, 6, 7, 8, 9])"
      ]
     },
     "execution_count": 65,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix = np.array([[1, 2, 3],\n",
    "                   [4, 5, 6],\n",
    "                   [7, 8, 9]])\n",
    "\n",
    "# 행렬을 펼칩니다.\n",
    "matrix.flatten()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 66,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[1, 2, 3, 4, 5, 6, 7, 8, 9]])"
      ]
     },
     "execution_count": 66,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# reshape를 사용해서 펼칠 수도 있습니다.\n",
    "matrix.reshape(1, -1)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 67,
   "metadata": {},
   "outputs": [],
   "source": [
    "# flatten과 reshape를 비교해 봅시다.\n",
    "vector_reshaped = matrix.reshape(-1)\n",
    "vector_flattened = matrix.flatten()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 68,
   "metadata": {},
   "outputs": [],
   "source": [
    "# (0, 0) 위치의 원소를 변경합니다.\n",
    "matrix[0][0] = -1"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 69,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([-1,  2,  3,  4,  5,  6,  7,  8,  9])"
      ]
     },
     "execution_count": 69,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 배열의 view는 원본 배열의 변경 사항을 반영합니다.\n",
    "vector_reshaped"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 70,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([1, 2, 3, 4, 5, 6, 7, 8, 9])"
      ]
     },
     "execution_count": 70,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 복사된 배열에는 영향이 미치지 않습니다.\n",
    "vector_flattened"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 1.12 행렬의 랭크 구하기   \n",
    "   \n",
    "행렬의 랭크는 행이나 열이 만든 벡터 공간의 차원으로 선형 독립적인 행 또는 열 개수입니다.   \n",
    "numpy의 선형대수 메서드인 matrix_rank를 사용합니다.   \n",
    "matrix_rank 함수는 특잇값 분해(singular value decomposition) 방식으로 랭크를 계산합니다.   \n",
    "linalg 모듈의 svd 함수로 특잇값을 구한 다음 0이 아닌 값 수를 헤아립니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 71,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2"
      ]
     },
     "execution_count": 71,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix = np.array([[1, 1, 1],\n",
    "                   [1, 1, 10],\n",
    "                   [1, 1, 15]])\n",
    "\n",
    "# 행렬의 랭크를 반환합니다.\n",
    "np.linalg.matrix_rank(matrix)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 73,
   "metadata": {},
   "outputs": [],
   "source": [
    "# svd 함수로 특잇값만 계산합니다.\n",
    "s = np.linalg.svd(matrix, compute_uv=False)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 74,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2"
      ]
     },
     "execution_count": 74,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 오차를 고려하여 0에 가까운 아주 작은 값을 지정합니다.\n",
    "np.sum(s > 1e-10)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# 1.13 행렬식 계산하기   \n",
    "   \n",
    "numpy의 선형대수 메서드인 det를 사용합니다.   \n",
    "행렬식은 정방행렬에 의한 선형 변환의 특징을 나타내는 스칼라 값입니다.   \n",
    "(2, 2) 크기의 행렬 A = [[a, b], [c, d]]가 있다면   \n",
    "행렬식은 det(A) = ad - bc로 계산합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 76,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.0"
      ]
     },
     "execution_count": 76,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix = np.array([[1, 2, 3],\n",
    "                   [2, 4, 6],\n",
    "                   [3, 8, 9]])\n",
    "\n",
    "# 행렬의 행렬식을 반환합니다.\n",
    "np.linalg.det(matrix)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 1.14 행렬의 대각원소 추출하기   \n",
    "   \n",
    "행렬의 대각원소를 구할 때 diagonal 메서드를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 77,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([1, 4, 9])"
      ]
     },
     "execution_count": 77,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix = np.array([[1, 2, 3],\n",
    "                   [2, 4, 6],\n",
    "                   [3, 8, 9]])\n",
    "\n",
    "# 대각원소를 반환합니다.\n",
    "matrix.diagonal()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 79,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([2, 6])"
      ]
     },
     "execution_count": 79,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 주 대각선 외 대각원소를 구할 때는 offset 매개변수를 사용합니다.\n",
    "# 주 대각선 하나 위의 대각원소를 구합니다.\n",
    "matrix.diagonal(offset=1)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 80,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([2, 8])"
      ]
     },
     "execution_count": 80,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 주 개각선 하나 아래의 대각원소를 구합니다.\n",
    "matrix.diagonal(offset=-1)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 1.15 행렬의 대각합 계산하기   \n",
    "   \n",
    "행렬의 대각합은 대각원소의 합으로 머신러닝 알고리즘 내부에서 종종 사용됩니다.   \n",
    "numpy 다차원 배열의 대각합은 trace 메서드를 사용하여 계산할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 81,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "14"
      ]
     },
     "execution_count": 81,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix = np.array([[1, 2, 3],\n",
    "                   [2, 4, 6],\n",
    "                   [3, 8, 9]])\n",
    "\n",
    "# 대각합을 반환합니다.\n",
    "matrix.trace()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 82,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "8"
      ]
     },
     "execution_count": 82,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# diagonal 메서드와 마찬가지로 offset 매개변수를 지원합니다.\n",
    "matrix.trace(offset=1)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 1.16 고윳값과 고유벡터 찾기   \n",
    "   \n",
    "고유벡터는 머신러닝 라이브러리에서 널리 사용됩니다.   \n",
    "행렬 A로 표시되는 선형 변환을 적용할 때   \n",
    "고유벡터는 방향은 바뀌지 않고 scale만 바뀌는 벡터입니다.   \n",
    "공식으로 나타내면 다음과 같습니다.      \n",
    "Av = λv      \n",
    "A가 정방행렬일 때 λ는 고윳값, v는 고유벡터 입니다.   \n",
    "numpy 선형대수 모듈에서 eig 함수는 정방행렬의 고윳값과 고유벡터를 계산할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 83,
   "metadata": {},
   "outputs": [],
   "source": [
    "matrix = np.array([[1, -1, 3],\n",
    "                   [1, 1, 6],\n",
    "                   [3, 8, 9]])\n",
    "\n",
    "# 고윳값과 고유벡터를 계산합니다.\n",
    "eigenvalues, eigenvectors = np.linalg.eig(matrix)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 84,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "[13.55075847  0.74003145 -3.29078992]\n",
      "[[-0.17622017 -0.96677403 -0.53373322]\n",
      " [-0.435951    0.2053623  -0.64324848]\n",
      " [-0.88254925  0.15223105  0.54896288]]\n"
     ]
    }
   ],
   "source": [
    "# 고윳갑과 고유벡터를 확인합니다.\n",
    "print(eigenvalues)\n",
    "print(eigenvectors)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 1.17 점곱 계산하기   \n",
    "   \n",
    "두 벡터 a와 b의 점곱(dot product)은 다음과 같이 정의합니다.   \n",
    "   \n",
    ">$   \n",
    "\\sum_{i=1}^{n} (a_i*b_i)   \n",
    "$   \n",
    "   \n",
    "numpy의 dot 함수를 사용하여 점곱을 계산할 수 있습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 85,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "32"
      ]
     },
     "execution_count": 85,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 두 벡터를 만듭니다.\n",
    "vector_a = np.array([1, 2, 3])\n",
    "vector_b = np.array([4, 5, 6])\n",
    "\n",
    "# 점곱을 계산합니다.\n",
    "np.dot(vector_a, vector_b)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 1.18 행렬 덧셈과 뺄셈   \n",
    "   \n",
    "numpy의 add와 subtract 메서드를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 1.19 행렬 곱셈   \n",
    "   \n",
    "numpy의 dot 함수를 사용합니다.   \n",
    "dot 함수는 다차원 배열에도 적용할 수 있습니다.   \n",
    "이 때는 첫 번째 배열의 마지막 차원과 두 번째 배열의 끝에서 두 번째 차원이 동일해야 합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 86,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[2, 5],\n",
       "       [3, 7]])"
      ]
     },
     "execution_count": 86,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix_a = np.array([[1, 1],\n",
    "                     [1, 2]])\n",
    "\n",
    "matrix_b = np.array([[1, 3],\n",
    "                     [1, 2]])\n",
    "\n",
    "# 두 행렬을 곱합니다.\n",
    "np.dot(matrix_a, matrix_b)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 1.20 역행렬   \n",
    "   \n",
    "정방행렬 A의 역행렬은 다음 식의 두 번째 행렬입니다.   \n",
    ">$   \n",
    "AA^{-1} = I   \n",
    "$   \n",
    "\n",
    "numpy 선형대수 모듈의 inv 함수를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 87,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[-1.66666667,  1.33333333],\n",
       "       [ 0.66666667, -0.33333333]])"
      ]
     },
     "execution_count": 87,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "matrix = np.array([[1, 4],\n",
    "                   [2, 5]])\n",
    "\n",
    "# 역행렬을 계산합니다.\n",
    "np.linalg.inv(matrix)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 88,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([[1., 0.],\n",
       "       [0., 1.]])"
      ]
     },
     "execution_count": 88,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 행렬과 역행렬을 곱합니다. 단위행렬을 생성합니다.\n",
    "np.dot(matrix, np.linalg.inv(matrix))"
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
   "version": "3.8.5"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
```
