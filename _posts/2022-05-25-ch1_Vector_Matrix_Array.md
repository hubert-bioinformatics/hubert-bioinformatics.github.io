---
layout: post
title: ch1. Vector Matrix Array
date: 2022-05-25 19:21:10 +0900
published: true
categories: [Study, B-ML_with_Python_Cookbook]
tags: [ml,python,study,vector,matrix,array]
img_path: /assets/img/post/
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

 <script src="https://gist.github.com/hubert-bioinformatics/2a93657635ea0300b20c8fcbe30e10a4.js"></script>