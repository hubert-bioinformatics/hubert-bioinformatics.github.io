---
layout: post
title: Sort Algorithm - Insertion Sort
date: 2023-07-15 20:10:04 +0900
published: true
math: true
categories: [Programming, Algorithm]
tags: [algorithm,sort,python]
img_path: /assets/img/post/
---

## 삽입 정렬
***

삽입 정렬은 이미 정렬되어 있는 i개짜리 배열에 하나의 원소를 더해서 i+1개까지 배열을 만드는 과정을 반복합니다. 선택 정렬, 버블 정렬은 n개까지 배열에서 시작하여 loop 크기를 1씩 줄여나가는 데 반해서, 삽입 정렬은 반대로 1개짜리 배열에서 1씩 늘려나가는 데 차이가 있습니다.
<br><br>


```python
 i i+1
[5, 3, 15, 34, 22, 45]

# idx[i], idx[i+1]만 비교: idx[i] > idx[i+1]
# 따라서 둘 자리를 변경하여 배열 생성
   end
[3, 5]

# idx[i+2]와 idx[end] 비교: idx[i+2] < idx[end]
# 따라서 둘 자리를 변경하지 않고 끝자리에 삽입

[3, 5, 15]

# 위 과정 반복
       
[3, 5, 15, 34]

[3, 5, 15, 22, 34]

[3, 5, 15, 22, 34, 45]
```
<br><br>


## 구현
***

```python

# 정렬 대상 배열
array = [5, 3, 15, 34, 22, 45]
array_len = len(array)

for end in range(1, array_len):
    i = end
    while i > 0 and array[i-1] > array[i]:
        # i, i-1 값 서로 변경
        array[i-1], array[i] = array[i], array[i-1]
        i -= 1
    
print(array)
```
<br><br>


## 시간 복잡도
***

삽입 정렬의 수행 시간은 최대 $$ \theta(n^{2}) $$ 입니다. 하지만 버블 정렬과 같이 최적화 여지를 가진 알고리즘 입니다. 만약 전체 정렬된 배열이 들어온다면 시간 복잡도는 $$ \theta(n) $$까지 향상시킬 수 있습니다.

선택 정렬, 삽입 정렬이 n개짜리 배열에서 시작하여 아직 정렬되지 않은 배열의 크기를 하나씩 줄이는 데 반하여, 삽입 정렬은 1개짜리 배열에서 시작하여 이미 정렬된 배열의 크기를 하나씩 늘리는 알고리즘 입니다.