---
layout: post
title: Advanced Sort Algorithm - Heap Sort
date: 2023-09-23 14:41:02 +0900
published: true
math: true
categories: [Programming, Algorithm]
tags: [algorithm,sort,python]
img_path: /assets/img/post/
---

## 힙 정렬
***

힙 정렬은 힙 자료구조를 기반으로 동작하는 알고리즘 입니다.

힙 정렬은 평균 시간 복잡도와 최악 시간 복잡도 모두 $$ \theta(nlogn) $$으로 빠른 정렬 알고리즘입니다.
<br><br>


## 구현
***

```python

# 힙 구성

def heapify(array, n, i):
    largest = i # root node
    left = 2 * i + 1
    right = 2 * i + 2

    # left > root
    if left < n and array[i] < array[left]:
        largest = left
    
    # right > root or largest child
    if right < n and array[largest] < array[right]:
        largest = right
    
    if largest != i:
        array[i], array[largest] = array[largest], array[i]
        heapify(array, n, largest)

# 힙 정렬

array = [5, 3, 7, 1, 4, 2, 6, 8]

def heap_sort(array):

    n = len(array)

    for i in range(n // 2 - 1, -1, -1):
        heapify(array, n, i)
    
    for i in range(n - 1, 0, -1):
        array[i], array[0] = array[0], array[i]
        heapify(array, i, 0)

    return array


print(heap_sort(array))
```
<br><br>


## 시간 복잡도
***

힙 정렬은 평균 시간 복잡도와 최악 시간 복잡도 모두 $$ \theta(nlogn) $$으로 빠른 정렬 알고리즘입니다.