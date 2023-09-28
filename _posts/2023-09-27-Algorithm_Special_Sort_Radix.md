---
layout: post
title: Special Sort Algorithm - Radix Sort
date: 2023-09-27 11:50:41 +0900
published: true
math: true
categories: [Programming, Algorithm]
tags: [algorithm,sort,python]
img_path: /assets/img/post/
---

## 기수 정렬
***

기수 정렬은 입력이 모두 k 자릿수 이하의 자연수인 특수한 경우(자연수가 아닌 제한된 종류를 가진 알파벳 등도 해당)에 사용할 수 있는 정렬 방법입니다.

기수 정렬은 평균 시간 복잡도가 $$ \theta(n) $$으로 소요되는 알고리즘 입니다.

우선 가장 낮은 자릿수만 가지고 모든 수를 재배열(정렬) 합니다. 그리고 같은 방법으로 더 이상 자릿수가 남지 않을 때까지 반복합니다. 여기서 '안정성을 유지하면서 정렬한다'는 사실이 매우 중요한데, 값이 같은 원소끼리는 정렬 후에 원래의 순서가 바뀌지 않는 성질임을 뜻합니다. (stable sort)
<br><br>


## 구현
***

```python

# Counting sort 사용

def countingsort(array, place):
    size = len(array)
    output = [0] * size
    count = [0] * 10

    # calculate count of elements
    for i in range(0, size):
        index = array[i] // place
        count[index % 10] += 1
    
    # calculate cumulative count
    for i in range(1, 10):
        count[i] += count[i-1]
    
    # place the elements in sorted order
    i = size - 1
    while i >= 0:
        index = array[i] // place
        output[count[index % 10] - 1] = array[i]
        count[index % 10] -= 1
        i -= 1
    
    for i in range(0, size):
        array[i] = output[i]


# radix sort 

def radixsort(array):

    # get maximum element
    max_element = max(array)

    # apply counting sort to sort elements based on place value
    place = 1
    while max_element // place > 0:
        countingsort(array, place)
        place *= 10
    return array

test_data = [842, 9, 4810, 582, 990, 5592, 42]
print(radixsort(test_data))
```
<br><br>


## 시간 복잡도
***

기수 정렬은 평균 시간 복잡도와 최악 시간 복잡도 모두 $$ \theta(n) $$으로 빠른 정렬 알고리즘입니다.