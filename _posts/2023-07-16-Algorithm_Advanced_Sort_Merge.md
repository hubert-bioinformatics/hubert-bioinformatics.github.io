---
layout: post
title: Advanced Sort Algorithm - Merge Sort
date: 2023-07-16 09:42:10 +0900
published: true
math: true
categories: [Programming, Algorithm]
tags: [algorithm,sort,python]
img_path: /assets/img/post/
---

## 병합 정렬
***

병합 정렬은 입력 배열을 절반으로 나눈 뒤 각각 독립적으로 정렬합니다. 그리고 마지막에 정렬된 두 배열을 병합하여 최종 정렬된 배열을 얻는 알고리즘 입니다. 즉, 분할 정복(Devide and Conquer) 기법과 재귀 알고리즘을 이용하여 정렬하는 알고리즘 입니다.
<br><br>


```python

[5, 3, 7, 1, 4, 2, 6, 8]

# 배열을 둘로 나눕니다.

[5, 3, 7, 1] [4, 2, 6, 8]

# 다시 배열을 둘로 나눕니다.
# 위 과정을 반복합니다.

[5, 3] [7, 1] [4, 2] [6, 8]

[5] [3] [7] [1] [4] [2] [6] [8]

# 나뉜 배열을 정렬하면서 합칩니다.

[3, 5] [1, 7] [2, 4] [6, 8]

[1, 3, 5, 7] [2, 4, 6, 8]

[1, 2, 3, 4, 5, 6, 7, 8]
```
<br><br>


## 구현
***

```python

# 정렬 대상 배열
array = [5, 3, 7, 1, 4, 2, 6, 8]

def merge_sort(array):
    if len(array) < 2:
        return array

    middle = len(array) // 2
    left_array = merge_sort(array[:middle])
    right_array = merge_sort(array[middle:])

    merged_array = []
    l = r = 0
    while l < len(left_array) and r < len(right_array):
        if left_array[l] < right_array[r]:
            merged_array.append(left_array[l])
            l += 1
        else:
            merged_array.append(right_array[r])
            r += 1
    merged_array += left_array[l:]
    merged_array += right_array[r:]
    return merged_array

print(merge_sort(array))
```
<br><br>


## 시간 복잡도
***

병합 정렬의 시간 복잡도는 $$ \theta(nlogn) $$ 입니다. 예제에서 배열을 절반으로 나누는 것은 8 → 4 → 2 → 1과 같이 반복 수가 줄어들기 때문에 $$ \theta(logn) $$ 시간이 필요합니다. 또한 정렬한 뒤 다시 병합할 때 모든 값을 비교해야 하므로 $$ \theta(n) $$ 시간이 필요합니다. 따라서 총 시간 복잡도는 $$ \theta(nlogn) $$ 입니다.