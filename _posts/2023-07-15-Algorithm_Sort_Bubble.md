---
layout: post
title: Sort Algorithm - Bubble Sort
date: 2023-07-15 17:22:51 +0900
published: true
math: true
categories: [Programming, Algorithm]
tags: [algorithm,sort,python]
img_path: /assets/img/post/
---

## 버블 정렬
***

버블 정렬은 제일 큰 원소를 끝자리로 옮기는 작업을 한다는 점에서 선택 정렬과 유사합니다. 다만 제일 큰 원소를 끝자리로 옮기는 방법이 상이합니다.

배열 A[1, ..., n]에서 $$ A[1] $$ 원소부터 순서대로 이웃한 오른쪽 원소와 비교합니다. 만약 올바르게 정렬되어 있지 않으면 둘의 자리를 바꿉니다. 올바르게 정렬되어 있다면 그대로 놓아둡니다. 다음 원소로 넘어가서 같은 작업을 반복합니다.
<br><br>


```python

 j j+1
[5, 3, 15, 34, 22, 45]

# idx[j] > idx[j+1]
# 따라서 둘 자리를 변경
   
   j+1 j+2
[3, 5, 15, 34, 22, 45]

# idx[j+1] <> idx[j+2]
# 따라서 둘 자리를 변경하지 않고 다음 원소 확인

       j+2 j+3
[3, 5, 15, 34, 22, 45]

# idx[j+2] <> idx[j+3]
# 따라서 둘 자리를 변경하지 않고 다음 원소 확인
# 위 과정 반복
       
[3, 5, 15, 22, 34, 45]
```
<br><br>


## 구현
***

```python

# 정렬 대상 배열
array = [5, 3, 15, 34, 22, 45]
array_len = len(array)

for i in range(array_len-1, 0, -1):
    for j in range(i):
        # 배열의 sorting 여부 확인 변수
        check_sorted = True
        if (array[j] > array[j+1]):
            # j, j+1 값 서로 변경
            array[j], array[j+1] = array[j+1], array[j]
            check_sorted = False
    if check_sorted == True:
        break
    
print(array)
```
<br><br>


## 시간 복잡도
***

버블 정렬의 수행 시간은 일반적으로 $$ \theta(n^{2}) $$ 입니다. 하지만 최적화 여지를 가진 알고리즘이라는 점에서 선택 정렬과 차이가 있습니다. 만약 어느 단계에서 j, j+1 원소간 자리 이동이 단 한 번도 일어나지 않았다면, 배열이 모두 정렬되었음을 의미하며 바로 정렬작업을 종료할 수 있습니다.

우선 첫 번째 for loop에서 모든 index에 접근해야 하므로 (n)번 수행합니다. 가장 오른쪽 제일 큰 원소를 제외한 나머지 (n-1)개 원소와 비교하므로 (n-1)번 수행합니다. 따라서 총 횟수는 $$ (n-1)+(n-2)+...+2+1 = \frac{n(n-1)}{2} $$ 입니다. 시간 복잡도는 $$ \theta(n^{2}) $$ 입니다.

다만 앞서 언급한 내용과 같이, 부분적으로 정렬되어 있는 배열, 즉, 특정 index 이후 정렬되어 있는 배열이 들어온다면 더 이상 loop를 돌지 않고 종료할 수 있습니다. 예를 들어 완벽히 정렬된 배열이 들어온다면, 시간 복잡도는 $$ \theta(n) $$까지 향상시킬 수 있습니다.