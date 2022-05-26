---
layout: post
title: ch3. Data Wrangling
date: 2022-05-26 21:47:51 +0900
published: true
categories: [Study, B-ML_with_Python_Cookbook]
tags: [ml,python,study,sklearn,dataframe]
img_path: /assets/img/post/
---

## Summary
***

 Data wrangling은 original data를 정제하고 사용 가능한 형태로 변환하는 과정을 광범위하게 의미하는 비공식 용어입니다. 가장 일반적인 structure는 dataframe입니다.
 <br><br>


 * Dataframe 만들기 (3.1)

```python
# pandas에 dataframe을 만드는 다양한 방법이 존재합니다.

import pandas as pd

# class 사용
pd.DataFrame()

# numpy array 사용
pd.DataFrame(np.array(data), columns=['a', 'b'])

# dictionary 사용
pd.DataFrame(dict)
```
<br><br>


 * Data 설명 (3.2)

```python
import pandas as pd

# dimension 확인
dataframe.shape

# column count 확인 (3.7)
dataframe.count()

# numeric column statistics 확인
dataframe.describe()

# numeric column correlation 확인 (3.7)
dataframe.corr()

# numeric column covariance 확인 (3.7)
dataframe.cov()
```
<br><br>


* Dataframe 탐색 (3.3)

```python
import pandas as pd

# loc: index가 label(string, etc)일 때 사용
dataframe.loc['hubert']

# iloc: dataframe의 위치 참조
dataframe.iloc[0]
 
# loc, iloc method의 slicing은 python slicing과 달리 마지막 index를 포함합니다.
```
<br><br>
   

* Dataframe 수정

```python
import pandas as pd

# replace: 값 치환. (3.5)
dataframe['column'].replace('hubert', 'ashley')

# rename: column name 변경 (3.6)
dataframe.rename(columns={'Name': 'Nickname'})

# drop + column name: column 삭제 1 (3.10)
dataframe.drop('Name', axis=1)

# drop + column index: column 삭제 2 (3.10)
dataframe.drop(dataframe.columns[0], axis=1)

# boolean: row 삭제 1 (3.11)
dataframe[dataframe['Name'] != False]

# row index (3.11)
dataframe[dataframe.index != 0]

# drop_duplicates: duplicate line 삭제 (3.12)
```
<br><br>
   

* Dataframe Unique 값 처리 (3.8)

```python
import pandas as pd

# unique: column 내부 unique 값 찾기
dataframe['Name'].unique()

# value_counts: column 내부 unique 값 count
dataframe['Name'].value_counts()

# nunique: dataframe 전체 unique 값 count
dataframe.nunique()
```
<br><br>


* Dataframe null 값 (3.9)
  
```python
import pandas as pd

# isnull/notnull: null 값 확인
dataframe['Name'].isnull()
```
<br><br>


* Dataframe grouping

```python
import pandas as pd

# groupby: 값에 따라 row grouping (3.13)
dataframe.groupby(['Name'])['Age'].mean()

# resample: index를 time range(datetime format)로 변경한 뒤 시간에 따라 row grouping (3.14)
dataframe.resample('W').sum()

# groupby로 row grouping한 뒤 각 group에 apply method 연결: group에 function 적용 (3.17)
dataframe.groupbu('Name').apply(lambda x: x.count())
```
<br><br>


* Dataframe 모든 column element에 function 적용 (3.16)

```python
import pandas as pd

# apply: column의 모든 element에 built-in/custom function 적용. argument를 지정할 수 있음
dataframe['Name'].apply(uppercase)
dataframe['Name'].apply(lambda x, age: x < age, age=40)

# map: apply와 비슷하지만 dictionary 사용 가능
dataframe['Name'].map({True: 1, False: 0})
```
<br><br>


* Dataframe 연결 (3.18)

```python
import pandas as pd

# row 방향 연결: concat + axis=0
pd.concat([dataframe_a, dataframe_b], axis=0)

# column 방향 연결: concat + axis=1
pd.concat([dataframe_a, dataframe_b], axis=1)
```
<br><br>


* Dataframe merge (3.19)

```python
import pandas as pd

# inner join: merge + on='column_name'
pd.merge(dataframe_a, dataframe_b, on='Name')

# outer/left/right join: merge + how='outer/left/right'
pd.merge(dataframe_a, dataframe_b, on='Name', how='outer')

# left_on/right_on: 각각 dataframe에서 병합하기 위한 column name 지정
pd.merge(dataframe_a, dataframe_b, left_on='Name', right_on='Age')

# left_index/right_index: column 대신 index 기준으로 병합
pd.merge(dataframe_a, dataframe_b, left_index=True, right_index=True)
```
<br><br>


* Summary in Summary

   * merge 위한 세 가지 사항 결정
   
     1. merge 할 두 개의 dataframe 지정
     
     2. merge 할 column 지정
     
     3. 'how' 매개변수로 merge 종류 지정

        1. inner: 양 쪽 dataframe 동시에 존재하는 row return

        2. outer: 두 dataframe의 모든 row return

        3. left: left dataframe의 모든 row return

        4. right: right dataframe의 모든 row return
        <br><br>


## Practice
***

<script src="https://gist.github.com/hubert-bioinformatics/188cab8d60952c8012d2a0d04eed6be6.js"></script>