---
layout: post
title: Sort Algorithm - Selection Sort
date: 2023-07-15 10:40:02 +0900
published: true
math: true
categories: [Programming, Algorithm]
tags: [algorithm,sort,python]
img_path: /assets/img/post/
---

## 선택 정렬
***

선택 정렬은 원리가 간단한 정렬 알고리즘 중 하나입니다.
배열 A[1, ..., n]에서 가장 작은(or 큰) 원소를 찾아 배열의 첫(or 끝)자리에 있는 $$ A[1](or A[n]) $$과 자리를 바꿉니다. $$ A[1](or A[n]) $$ 원소에 대한 배열은 끝났으므로 나머지 원소를 대상으로 같은 작업을 반복합니다.
<br><br>


```python

# 초기 min_idx = i = 0
# 새로운 min_idx = j = 1

 i
[5, 3, 15, 34, 22, 45]
    m

# 따라서 두 개 값 위치를 변경함

[3, 5, 15, 34, 22, 45]

# idx = 0 위치는 정렬되었으므로, 다음 idx부터 위 과정 반복

    i
[3, 5, 15, 34, 22, 45]
    m

       i
[3, 5, 15, 34, 22, 45]
       m

           i
[3, 5, 15, 34, 22, 45]
               m

               i
[3, 5, 15, 22, 34, 45]
               m

                   i
[3, 5, 15, 22, 34, 45]
                   m
```
<br><br>


## 구현
***

```python

# 정렬 대상 배열
array = [5, 3, 15, 34, 22, 45]
array_len = len(array)

# 배열 길이만큼 for loop 실행
for i in range(len(array)):
    # min value index
    min_idx = i
    for j in range(i+1, array_len):
        # 만약 새로운 min value 발견하면
        if (array[min_idx] > array[j]):
            # min value index 변경
            min_idx = j
    # min value 자리 변경
    array[i], array[min_idx] = array[min_idx], array[i]

print(array)
```
<br><br>


## 시간 복잡도
***

선택 정렬의 수행 시간은 모든 경우에 $$ \theta(n^{2}) $$ 입니다.

우선 첫 번째 for loop에서 모든 index에 접근해야 하므로 (n)번 수행합니다. 이제 min_idx를 제외한 나머지 (n-1)개 index를 탐색하므로 (n-1)번 수행합니다. 따라서 min_idx를 비교하는 총 횟수는 $$ (n-1)+(n-2)+...+2+1 = \frac{n(n-1)}{2} $$ 입니다. 시간 복잡도는 $$ \theta(n^{2}) $$ 입니다.