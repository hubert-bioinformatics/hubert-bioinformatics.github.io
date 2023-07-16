---
layout: post
title: Advanced Sort Algorithm - Quick Sort
date: 2023-07-16 13:02:04 +0900
published: true
math: true
categories: [Programming, Algorithm]
tags: [algorithm,sort,python]
img_path: /assets/img/post/
---

## 퀵 정렬
***

퀵 정렬은 병합 정렬과 마찬가지로 분할 정복(Devide and Conquer) 기법과 재귀 알고리즘을 이용한 정렬 알고리즘 입니다.

임의의 값을 한 개 정한 뒤, 그보다 작은 값은 왼쪽으로 위치시키고 큰 값은 오른쪽으로 위치시킵니다. 이후에는 분리된 왼쪽, 오른쪽 배열들 내에서만 위 과정을 반복해서 정렬하면 되는 알고리즘 입니다.

파이썬의 list.sort() 함수도 퀵 정렬을 사용하는데 프로그래밍 언어 내장 정렬 함수는 대부분 퀵 정렬을 기본으로 사용할만큼 많이 사용됩니다.
<br><br>


```python

[5, 3, 7, 1, 4, 2, 6, 8]

# 배열에서 임의의 값을 정합니다.

             s
[5, 3, 7, 1, 4, 2, 6, 8]

# s를 중심으로 그보다 작은 값은 왼쪽
# 큰 값은 오른쪽으로 위치시킵니다.

[3, 1, 2] < [4] < [5, 7, 6, 8]

# 왼쪽 배열에서 다시 임의의 값을 정한 뒤 위 과정을 반복합니다.

    s
[3, 1, 2]
       
       s
[1] < [3, 2]

[2] < [3]

# 오른쪽 배열도 마찬가지로 반복합니다.

       s
[5, 7, 6, 8]

[5] < [6] < [7, 8]

 s
[7] < [8]

# 지금까지 왼쪽, 오른쪽으로 분할했던 값을 모두 합칩니다.

[1, 2, 3, 4, 5, 6, 7, 8]
```
<br><br>


## 구현
***

```python

# 정렬 대상 배열
array = [5, 3, 7, 1, 4, 2, 6, 8]

def quick_sort(array):
    if len(array) <= 1:
        return array

    array_length = len(array)
    middle_num = array[array_length // 2]

    left_array = []
    equal_array = []
    right_array = []
    
    for num in array:
        if num < middle_num:
            left_array.append(num)
        elif num > middle_num:
            right_array.append(num)
        else:
            equal_array.append(num)
    return quick_sort(left_array) + equal_array + quick_sort(right_array)

print(quick_sort(array))
```
<br><br>


## 시간 복잡도
***

퀵 정렬의 시간 복잡도는 어떤 기준값을 잡느냐에 따라 크게 달라질 수 있습니다. 가장 이상적인 경우에는 기준값을 중심으로 left, right 배열이 동일한 개수로 분할되고, 병합 정렬과 마찬가지로 $$ \theta(nlogn) $$ 의 시간 복잡도를 가집니다.

하지만 기준값을 따라 분할했을 때 left나 right 배열 한 쪽으로 모든 값이 몰리면  $$ \theta(n^{2}) $$ 시간 복잡도를 가집니다.