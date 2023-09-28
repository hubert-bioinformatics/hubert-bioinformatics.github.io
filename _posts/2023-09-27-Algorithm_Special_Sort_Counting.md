---
layout: post
title: Special Sort Algorithm - Counting Sort
date: 2023-09-27 15:41:02 +0900
published: true
math: true
categories: [Programming, Algorithm]
tags: [algorithm,sort,python]
img_path: /assets/img/post/
---

## 계수 정렬
***

계수 정렬은 원소의 배열을 훑어보고 1부터 k까지의 자연수가 각각 몇 번 나타나는지 헤아립니다. 이 정보를 바탕으로 A[1, ..., n]의 각 원소가 몇 번째 놓이면 되는지 계산하는 알고리즘 입니다.

계수 정렬은 평균 시간 복잡도가 $$ \theta(n) $$으로 소요되는 알고리즘 입니다.
<br><br>


## 구현
***

```python

def countingsort(array):
    size = len(array)
    output = [0] * size

    # Initialize count array
    count = [0] * 10

    # Store the count of each elements in count array
    for i in range(0, size):
        count[array[i]] += 1

    # Store the cummulative count
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Find the index of each element of the original array in count array
    # place the elements in output array
    i = size - 1
    while i >= 0:
        output[count[array[i]] - 1] = array[i]
        count[array[i]] -= 1
        i -= 1

    # Copy the sorted elements into original array
    for i in range(0, size):
        array[i] = output[i]
    return array


test_data = [4, 2, 2, 8, 3, 3, 1]
print(countingsort(test_data))
```
<br><br>


## 시간 복잡도
***

계수 정렬은 평균 시간 복잡도가 $$ \theta(n) $$입니다. 하지만 k가 O(n)을 초과하면 시간 복잡도는 $$ \theta(k)) $$를 초과합니다.