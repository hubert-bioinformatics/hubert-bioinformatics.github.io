---
title: "ch3. Data Wrangling"
date: 2022-05-26
category: ml-data
tags: ["ml", "python", "study", "sklearn", "dataframe"]
series: "ML with Python Cookbook"
seriesOrder: 3
source: manual
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

### 3.0 소개   
   
데이터 랭글링(data wrangling)은 원본 데이터를 정제하고 사용 가능한 형태로 구성하기 위한   
변환 과정을 광범위하게 의미하는 비공식적인 용어입니다.   
데이터 전처리의 한 단계에 불과하지만 중요한 단계입니다.   
   
데이터 랭글링에 사용하는 가장 일반적인 데이터 구조는 데이터프레임입니다.   
사용하기 쉽고 기능이 매우 많습니다.   
데이터프레임은 표 형식 데이터입니다.

```python
import pandas as pd

# 데이터 url
url = 'https://tinyurl.com/titanic-csv'

# 데이터프레임으로 데이터를 적재합니다.
dataframe = pd.read_csv(url)

# 처음 다섯 개의 행을 출력합니다.
dataframe.head(5)
```

```text
---------------------------------------------------------------------------
ParserError                               Traceback (most recent call last)
<ipython-input-3-59105522bf82> in <module>
      5 
      6 # 데이터프레임으로 데이터를 적재합니다.
----> 7 dataframe = pd.read_csv(url)
      8 
      9 # 처음 다섯 개의 행을 출력합니다.

D:\anaconda\lib\site-packages\pandas\io\parsers.py in read_csv(filepath_or_buffer, sep, delimiter, header, names, index_col, usecols, squeeze, prefix, mangle_dupe_cols, dtype, engine, converters, true_values, false_values, skipinitialspace, skiprows, skipfooter, nrows, na_values, keep_default_na, na_filter, verbose, skip_blank_lines, parse_dates, infer_datetime_format, keep_date_col, date_parser, dayfirst, cache_dates, iterator, chunksize, compression, thousands, decimal, lineterminator, quotechar, quoting, doublequote, escapechar, comment, encoding, dialect, error_bad_lines, warn_bad_lines, delim_whitespace, low_memory, memory_map, float_precision)
    684     )
    685 
--> 686     return _read(filepath_or_buffer, kwds)
    687 
    688 

D:\anaconda\lib\site-packages\pandas\io\parsers.py in _read(filepath_or_buffer, kwds)
    456 
    457     try:
--> 458         data = parser.read(nrows)
    459     finally:
    460         parser.close()

D:\anaconda\lib\site-packages\pandas\io\parsers.py in read(self, nrows)
   1194     def read(self, nrows=None):
   1195         nrows = _validate_integer("nrows", nrows)
-> 1196         ret = self._engine.read(nrows)
   1197 
   1198         # May alter columns / col_dict

D:\anaconda\lib\site-packages\pandas\io\parsers.py in read(self, nrows)
   2153     def read(self, nrows=None):
   2154         try:
-> 2155             data = self._reader.read(nrows)
   2156         except StopIteration:
   2157             if self._first_chunk:

pandas\_libs\parsers.pyx in pandas._libs.parsers.TextReader.read()

pandas\_libs\parsers.pyx in pandas._libs.parsers.TextReader._read_low_memory()

pandas\_libs\parsers.pyx in pandas._libs.parsers.TextReader._read_rows()

pandas\_libs\parsers.pyx in pandas._libs.parsers.TextReader._tokenize_rows()

pandas\_libs\parsers.pyx in pandas._libs.parsers.raise_parser_error()

ParserError: Error tokenizing data. C error: Expected 1 fields in line 22, saw 7
```

### 3.1 데이터프레임 만들기   
   
pandas에는 새로운 데이터프레임 객체를 만들 수 있는 방법이 많습니다.   
간단한 방법은 DataFrame 클래스를 사용해 비어 있는 데이터프레임을 만든 후   
개별적으로 각 열을 정의하는 것입니다.

```python
# 데이터프레임을 만듭니다.
dataframe = pd.DataFrame()

# 열을 추가합니다.
dataframe['Name'] = ['Jacky Jackson', 'Steven Stevenson']
dataframe['Age'] = [38, 25]
dataframe['Driver'] = [True, False]

# 데이터프레임을 확인합니다.
dataframe
```

```text
               Name  Age  Driver
0     Jacky Jackson   38    True
1  Steven Stevenson   25   False
```

```python
# 열을 만듭니다.
new_person = pd.Series(['Molly Mooney', 40, True],
                       index=['Name', 'Age', 'Driver'])

# 열을 추가합니다.
dataframe.append(new_person, ignore_index=True)
```

```text
               Name  Age  Driver
0     Jacky Jackson   38    True
1  Steven Stevenson   25   False
2      Molly Mooney   40    True
```

데이터프레임 객체를 만들 때 데이터를 전달하는 방법이 몇 가지 있습니다.   
   
먼저 numpy 배열을 주입하여 만들 수 있습니다. 열 이름은 columns 매개변수에 지정합니다.

```python
import numpy as np

data = [['Jacky Jackson', 38, True], ['Steven Stevenson', 25, False]]

# 1. numpy 배열
matrix = np.array(data)

# 데이터프레임 객체 생성
pd.DataFrame(matrix, columns=['Name', 'Age', 'Driver'])
```

```text
               Name Age Driver
0     Jacky Jackson  38   True
1  Steven Stevenson  25  False
```

원본 리스트를 전달하여 만들 수도 있습니다.

```python
# 원본 리스트로 데이터프레임 객체 생성
pd.DataFrame(data, columns=['Name', 'Age', 'Driver'])
```

```text
               Name  Age  Driver
0     Jacky Jackson   38    True
1  Steven Stevenson   25   False
```

열 이름과 데이터를 매핑한 딕셔너리를 사용해 데이터프레임을 만들 수 있습니다.

```python
# 열 이름과 데이터를 매핑한 딕셔너리
data = {'Name': ['Jacky Jackson', 'Steven Stevenson'],
        'Age': [38, 25],
        'Driver': [True, False]}

# 데이터프레임 객체 생성
pd.DataFrame(data)
```

```text
               Name  Age  Driver
0     Jacky Jackson   38    True
1  Steven Stevenson   25   False
```

샘플마다 열과 값을 매핑한 딕셔너리를 리스트로 전달할 수 있습니다.   
index 매개변수에 인덱스를 따로 지정할 수 있습니다.

```python
# 샘플마다 열과 값을 매핑한 딕셔너리
data = [ {'Name': 'Jacky Jackson', 'Age': 38, 'Driver': True},
         {'Name': 'Steven Stevenson', 'Age': 25, 'Driver': False} ]

# 데이터프레임 객체 생성
pd.DataFrame(data, index=['row1', 'row2'])
```

```text
                  Name  Age  Driver
row1     Jacky Jackson   38    True
row2  Steven Stevenson   25   False
```

### 3.2 데이터 설명하기   
   
데이터를 적재한 후 head 메서드를 사용해 몇 개의 행을 확인할 수 있습니다.

```python
# 데이터 url
#url = 'https://tinyurl.com/titanic-csv'

# 데이터를 적재합니다.
#dataframe = pd.read_csv(url)

# 데이터
data = [['Jacky Jackson', 38, True], ['Steven Stevenson', 25, False]]

# 데이터를 적재합니다.
dataframe = pd.DataFrame(data, columns=['Name', 'Age', 'Driver'])

# 두 개의 행을 확인합니다.
dataframe.head(2)
```

```text
               Name  Age  Driver
0     Jacky Jackson   38    True
1  Steven Stevenson   25   False
```

shape 메서드를 사용하여 열과 행의 수를 확인할 수도 있습니다.

```python
# 차원을 확인합니다.
dataframe.shape
```

```text
(2, 3)
```

describe 메서드를 사용하여 숫자로 된 열의 통계값을 얻을 수 있습니다.

```python
# 통계값을 확인합니다.
dataframe.describe()
```

```text
             Age
count   2.000000
mean   31.500000
std     9.192388
min    25.000000
25%    28.250000
50%    31.500000
75%    34.750000
max    38.000000
```

### 3.3 데이터프레임 탐색하기   
   
loc나 iloc 메서드를 사용해서 하나 이상의 행이나 값을 선택할 수 있습니다.

```python
new_person = pd.Series(['Molly Mooney', 40, True],
                       index=['Name', 'Age', 'Driver'])
new_dataframe = dataframe.append(new_person, ignore_index=True)

# 첫 번째 행을 선택합니다.
new_dataframe.iloc[-1]
```

```text
Name      Molly Mooney
Age                 40
Driver            True
Name: 2, dtype: object
```

```python
# 세 개의 행을 선택합니다.
new_dataframe.iloc[:4]
```

```text
               Name  Age  Driver
0     Jacky Jackson   38    True
1  Steven Stevenson   25   False
2      Molly Mooney   40    True
```

데이터프레임은 각 행이 고유한 값을 가진다면 정수가 아닌 어떤 값이라도 인덱스로 설정할 수 있습니다.   
'Name'을 인덱스로 설정하고 이름을 사용하여 행을 선택할 수 있습니다.

```python
# 인덱스를 설정합니다.
new_dataframe = new_dataframe.set_index(new_dataframe['Name'])

# 행을 확인합니다.
new_dataframe.loc['Steven Stevenson']
```

```text
Name      Steven Stevenson
Age                     25
Driver               False
Name: Steven Stevenson, dtype: object
```

loc는 데이터프레임의 인덱스가 레이블(문자열 등)일 때 사용합니다.   
iloc는 데이터프레임의 위치를 참조합니다. 예를 들어 iloc[0]은 첫 번째 행을 반환합니다.   
loc, iloc 메서드의 슬라이싱은 numpy와 달리 마지막 인덱스를 포함합니다.

### 3.4 조건에 따라 행 선택하기   
   
일부 조건에 따라 데이터프레임의 행을 선택해 보겠습니다.

```python
# 'Driver' 열이 True인 행을 출력합니다.
new_dataframe[new_dataframe['Driver'] == True]
```

```text
                        Name  Age  Driver
Name                                     
Jacky Jackson  Jacky Jackson   38    True
Molly Mooney    Molly Mooney   40    True
```

```python
#'Driver' 열이 True인 데이터 중 나이가 40세 이상인 행을 출력합니다.
new_dataframe[(new_dataframe['Driver'] == True) & (new_dataframe['Age'] >= 40)]
```

```text
                      Name  Age  Driver
Name                                   
Molly Mooney  Molly Mooney   40    True
```

### 3.5 값 치환하기   
   
값을 치환할 때 replace 메서드를 사용합니다.

```python
# 'Molly Mooney' 이름을 변경합니다.
new_dataframe['Name'].replace('Molly Mooney', 'Hubert')
```

```text
Name
Jacky Jackson          Jacky Jackson
Steven Stevenson    Steven Stevenson
Molly Mooney                  Hubert
Name: Name, dtype: object
```

### 3.6 열 이름 바꾸기   
   
열 이름을 바꿀 때 rename 메서드를 사용합니다.

```python
# 열 이름을 변경합니다.
new_dataframe.rename(columns={'Name': 'Nickname'})
```

```text
                          Nickname  Age  Driver
Name                                           
Jacky Jackson        Jacky Jackson   38    True
Steven Stevenson  Steven Stevenson   25   False
Molly Mooney          Molly Mooney   40    True
```

### 3.7 최솟값, 최댓값, 합, 평균 계산 및 개수 세기   
   
pandas는 최솟값, 최댓값, 합, 평균, 분산, 표준편차, 중간값, 첨도(kurt), 비대칭도(skew), 평균의 표준오차(SEM), 최빈값(mode)을 포함하여 많은 메서드를 제공합니다.

```python
# 통곗값을 계산합니다.   
print('최솟값:', new_dataframe['Age'].min())
print('최댓값:', new_dataframe['Age'].max())
print('평균:', new_dataframe['Age'].mean())
print('합:', new_dataframe['Age'].sum())
print('카운트:', new_dataframe['Age'].count())
```

```text
최솟값: 25
최댓값: 40
평균: 34.333333333333336
합: 103
카운트: 3
```

```python
# 데이터프레임 전체에 적용할 수도 있습니다.
new_dataframe.count()
```

```text
Name      3
Age       3
Driver    3
dtype: int64
```

이 외에도 상관계수를 계산할 때 corr 메서드를 사용합니다.   
공분산을 계산할 때 cov 메서드를 사용합니다.

```python
# 수치형 열의 상관계수를 계산합니다.
new_dataframe.corr()
```

```text
             Age    Driver
Age     1.000000  0.992434
Driver  0.992434  1.000000
```

```python
# 수치형 열의 공분산을 계산합니다.
new_dataframe.cov()
```

```text
              Age    Driver
Age     66.333333  4.666667
Driver   4.666667  0.333333
```

### 3.8 고유한 값 찾기   
   
고유한 값을 찾을 때는 unique 메서드와 value_counts 메서드를 사용합니다.

```python
# 고유한 값을 찾습니다.
new_dataframe['Driver'].unique()
```

```text
array([ True, False])
```

```python
# 고유한 값과 등장 횟수를 출력합니다.
new_dataframe['Driver'].value_counts()
```

```text
True     2
False    1
Name: Driver, dtype: int64
```

nunique 메서드는 고유한 값의 개수만 출력합니다.

```python
# 데이터프레임 전체에 고유한 값의 갯수를 출력합니다.
new_dataframe.nunique()
```

```text
Name      3
Age       3
Driver    2
dtype: int64
```

### 3.9 누락된 값 다루기   
   
isnull과 notnull 메서드는 누락 여부를 나타내는 불리언 값을 반환합니다.

```python
data2 = pd.Series(['Ashley', 32, False], index=['Nickname', 'Age', 'Driver'])
data3 = pd.Series(['Macro', 22, ''], index=['Nickname', 'Age', 'Driver'])
data4 = pd.Series(['Son',47 , ''], index=['Nickname', 'Age', 'Driver'])

new_dataframe2 = new_dataframe.append(data2, ignore_index=True)
new_dataframe3 = new_dataframe2.append(data3, ignore_index=True)
new_dataframe4 = new_dataframe3.append(data4, ignore_index=True)

# 누락된 값을 선택하고 출력합니다.
new_dataframe4[new_dataframe4['Nickname'].isnull()]
```

```text
               Name  Age Driver Nickname
0     Jacky Jackson   38   True      NaN
1  Steven Stevenson   25  False      NaN
2      Molly Mooney   40   True      NaN
```

### 3.10 열 삭제하기   
   
열을 삭제하는 가장 좋은 방법은 drop 메서드에 axis=1 매개변수를 사용하는 것입니다.

```python
new_dataframe4.drop('Nickname', axis=1)
```

```text
               Name  Age Driver
0     Jacky Jackson   38   True
1  Steven Stevenson   25  False
2      Molly Mooney   40   True
3               NaN   32  False
4               NaN   22       
5               NaN   47
```

열 이름이 없다면 dataframe.columns에 열 인덱스를 지정하여 삭제할 수 있습니다.

```python
# 열 인덱스를 지정하여 삭제합니다.
new_dataframe4.drop(new_dataframe4.columns[3], axis=1)
```

```text
               Name  Age Driver
0     Jacky Jackson   38   True
1  Steven Stevenson   25  False
2      Molly Mooney   40   True
3               NaN   32  False
4               NaN   22       
5               NaN   47
```

### 3.11 행 삭제하기   
   
불리언 조건을 사용하면 행 하나 또는 여러 개를 동시에 삭제할 수 있습니다.

```python
# 조건에 맞는 행을 삭제합니다.
new_dataframe4[new_dataframe4['Driver'] != False]
```

```text
            Name  Age Driver Nickname
0  Jacky Jackson   38   True      NaN
2   Molly Mooney   40   True      NaN
4            NaN   22           Macro
5            NaN   47             Son
```

마찬가지로 행 인덱스를 지정하여 삭제할 수 있습니다.

```python
# 행 인덱스를 사용하여 첫 행을 제거하고 출력합니다.
new_dataframe4[new_dataframe4.index != 0]
```

```text
               Name  Age Driver Nickname
1  Steven Stevenson   25  False      NaN
2      Molly Mooney   40   True      NaN
3               NaN   32  False   Ashley
4               NaN   22           Macro
5               NaN   47             Son
```

### 3.12 중복된 행 삭제하기   
   
매개변수에 주의해서 drop_duplicates를 사용합니다.

```python
# 중복 행을 삭제하고 출력합니다.
new_dataframe4.drop_duplicates()
```

```text
               Name  Age Driver Nickname
0     Jacky Jackson   38   True      NaN
1  Steven Stevenson   25  False      NaN
2      Molly Mooney   40   True      NaN
3               NaN   32  False   Ashley
4               NaN   22           Macro
5               NaN   47             Son
```

어떤 행도 삭제되지 않았습니다.   
drop_duplicates는 기본적으로 모든 열이 완벽히 동일한 행만 삭제하기 때문입니다.   
일부 열만 대상으로 중복된 행을 검사할 때 subset 매개변수를 사용합니다.   
이 때 중복된 행에서 처음 나타난 것을 유지하고 나머지 행을 버립니다.

```python
# 'Driver' 열의 중복된 행을 삭제합니다.
new_dataframe4.drop_duplicates(subset='Driver')
```

```text
               Name  Age Driver Nickname
0     Jacky Jackson   38   True      NaN
1  Steven Stevenson   25  False      NaN
4               NaN   22           Macro
```

### 3.13 값에 따라 행을 그룹핑하기   
   
pandas에서 가장 강력한 기능 중 하나인 groupby를 사용합니다.   
groupby에서 data wrangling이 진짜 시작됩니다.   
어떤 조건에 따라 이들을 그룹핑하고 통계를 계산합니다.

```python
# 행을 그룹핑한 다음 평균을 계산합니다.
new_dataframe4.groupby(['Driver', 'Name'])['Age'].mean()
```

```text
Driver  Name            
False   Steven Stevenson    25
True    Jacky Jackson       38
        Molly Mooney        40
Name: Age, dtype: int64
```

### 3.14 시간에 따라 행을 그룹핑하기   
   
resample 메서드를 사용하여 시간 간격에 따라 행을 그룹핑합니다.

```python
# 날짜 범위를 만듭니다.
time_index = pd.date_range('01/01/1987', periods=100000, freq='30S')

# 데이터프레임을 만듭니다.
date_dataframe = pd.DataFrame(index=time_index)

# 난숫갑으로 열을 만듭니다.
date_dataframe['Sale_Amount'] = np.random.randint(1, 10, 100000)

# 데이터프레임을 출력해 봅니다.
date_dataframe
```

```text
                     Sale_Amount
1987-01-01 00:00:00            8
1987-01-01 00:00:30            6
1987-01-01 00:01:00            7
1987-01-01 00:01:30            4
1987-01-01 00:02:00            5
...                          ...
1987-02-04 17:17:30            5
1987-02-04 17:18:00            9
1987-02-04 17:18:30            6
1987-02-04 17:19:00            9
1987-02-04 17:19:30            4

[100000 rows x 1 columns]
```

```python
# 주 단위로 행을 그룹핑한 다음 합을 계산합니다.
date_dataframe.resample('W').sum()
```

```text
            Sale_Amount
1987-01-04        57603
1987-01-11       101182
1987-01-18       101161
1987-01-25       100500
1987-02-01       100861
1987-02-08        39209
```

```python
# 한 달 단위로 행을 그룹핑한 다음 합을 계산합니다.
date_dataframe.resample('M').sum()
```

```text
            Sale_Amount
1987-01-31       446964
1987-02-28        53552
```

resample 메서드는 datetime 형태의 인덱스를 사용합니다.

### 3.15 열 원소 순회하기   
   
pandas의 열을 파이썬의 시퀀스처럼 다룰 수 있습니다.

```python
# 처음 두 이름을 대문자로 바꾸어 출력합니다.
for name in new_dataframe4['Name'][0:2]:
    print(name.upper())
```

```text
JACKY JACKSON
STEVEN STEVENSON
```

for 반복문보다 pandas의 apply 메서드를 사용하는 것이 좀 더 파이썬다운 방법입니다.

### 3.16 모든 열 원소에 함수 적용하기   
   
apply 메서드를 사용하여 열의 모든 원소에 내장 함수나 사용자 정의 함수를 적용합니다.

```python
# 함수를 만듭니다.
def uppercase(x):
    return x.upper()

# 함수를 적용하고 출력합니다.
new_dataframe4['Name'][:2].apply(uppercase)
```

```text
0       JACKY JACKSON
1    STEVEN STEVENSON
Name: Name, dtype: object
```

apply 메서드와 유사한 map 메서드가 있습니다.   
두 함수는 거의 비슷하지만 map 메서드는 dictionary를 input으로 넣을 수 있고   
apply 메서드는 매개변수를 지정할 수 있다는 것이 큰 차이입니다.

```python
# Driver 열의 True를 1로, False를 0으로 바꿉니다.
new_dataframe4['Driver'].map({True: 1, False: 0})
```

```text
0    1.0
1    0.0
2    1.0
3    0.0
4    NaN
5    NaN
Name: Driver, dtype: float64
```

```python
# 함수의 매개변수(age)를 apply 메서드를 호출할 때 전달할 수 있습니다.
new_dataframe4['Age'].apply(lambda x, age: x < age, age=40)
```

```text
0     True
1     True
2    False
3     True
4     True
5    False
Name: Age, dtype: bool
```

### 3.17 그룹에 함수 적용하기   
   
groupby로 행을 그룹핑하고 각 그룹에 apply 메서드를 연결하여 사용합니다.

```python
# 행을 그룹핑한 다음 함수를 적용합니다.
new_dataframe4.groupby('Driver').apply(lambda x: x.count())
```

```text
        Name  Age  Driver  Nickname
Driver                             
False      1    2       2         1
True       2    2       2         0
           0    2       2         2
```

### 3.18 데이터프레임 연결하기   
   
두 개의 데이터프레임을 연결합니다.   
concat 함수에 axis=0 매개변수를 설정하여 행의 축을 따라 연결합니다.

```python
# 데이터프레임a를 만듭니다.
data_a = {'id': ['1', '2', '3'],
          'first': ['Alex', 'Amy', 'Allen'],
          'last': ['Anderson', 'Ackerman', 'Ali']}
dataframe_a = pd.DataFrame(data_a, columns = ['id', 'first', 'last'])

# 데이터프레임b를 만듭니다.
data_b = {'id': ['4', '5', '6'],
          'first': ['Billy', 'Brian', 'Bran'],
          'last': ['Bonder', 'Black', 'Balwner']}
dataframe_b = pd.DataFrame(data_b, columns=['id', 'first', 'last'])

# 행 방향으로 데이터프레임을 연결합니다.
pd.concat([dataframe_a, dataframe_b], axis=0)
```

```text
  id  first      last
0  1   Alex  Anderson
1  2    Amy  Ackerman
2  3  Allen       Ali
0  4  Billy    Bonder
1  5  Brian     Black
2  6   Bran   Balwner
```

```python
# 열 방향으로 데이터프레임을 연결합니다.
pd.concat([dataframe_a, dataframe_b], axis=1)
```

```text
  id  first      last id  first     last
0  1   Alex  Anderson  4  Billy   Bonder
1  2    Amy  Ackerman  5  Brian    Black
2  3  Allen       Ali  6   Bran  Balwner
```

또한 append 메서드를 사용하여 데이터프레임에 새로운 행을 추가할 수 있습니다.

```python
# 행을 만듭니다.
row = pd.Series([10, 'Chris', 'Chillon'], index=['id', 'first', 'last'])

# 행을 추가합니다.
dataframe_a.append(row, ignore_index=True)
```

```text
   id  first      last
0   1   Alex  Anderson
1   2    Amy  Ackerman
2   3  Allen       Ali
3  10  Chris   Chillon
```

### 3.19 데이터프레임 병합하기   
   
Inner join을 하려면 on 매개변수에 병합 열을 지정하여 merge 메서드를 사용합니다.

```python
# 데이터프레임을 만듭니다.
employee_data = {'employee_id': ['1', '2', '3', '4'],
                 'name': ['Amy Jones', 'Allen Keys', 'Alice Bees', 'Tim Horton']}
dataframe_employees = pd.DataFrame(employee_data, columns = ['employee_id', 'name'])

# 데이터프레임을 만듭니다.
sales_data = {'employee_id': ['3', '4', '5', '6'],
              'total_sales': [23456, 2512, 2345, 1455]}
dataframe_sales = pd.DataFrame(sales_data, columns = ['employee_id', 'total_sales'])

# 데이터프레임을 병합합니다.
pd.merge(dataframe_employees, dataframe_sales, on='employee_id')
```

```text
  employee_id        name  total_sales
0           3  Alice Bees        23456
1           4  Tim Horton         2512
```

merge는 기본적으로 inner join을 수행합니다.   
Outer join이 필요하다면 how 매개변수로 지정할 수 있습니다.

```python
# 데이터프레임을 병합합니다.
pd.merge(dataframe_employees, dataframe_sales, on='employee_id', how='outer')
```

```text
  employee_id        name  total_sales
0           1   Amy Jones          NaN
1           2  Allen Keys          NaN
2           3  Alice Bees      23456.0
3           4  Tim Horton       2512.0
4           5         NaN       2345.0
5           6         NaN       1455.0
```

같은 매개변수로 left join과 right join을 지정할 수 있습니다.

```python
# 데이터프레임을 병합합니다.
pd.merge(dataframe_employees, dataframe_sales, on='employee_id', how='left')
```

```text
  employee_id        name  total_sales
0           1   Amy Jones          NaN
1           2  Allen Keys          NaN
2           3  Alice Bees      23456.0
3           4  Tim Horton       2512.0
```

```python
# 데이터프레임을 병합합니다.
pd.merge(dataframe_employees, dataframe_sales, on='employee_id', how='right')
```

```text
  employee_id        name  total_sales
0           3  Alice Bees        23456
1           4  Tim Horton         2512
2           5         NaN         2345
3           6         NaN         1455
```

각 데이터프레임에서 병합하기 위한 열 이름을 지정할 수도 있습니다.

```python
# 데이터프레임을 병합합니다.
pd.merge(dataframe_employees, dataframe_sales, left_on='employee_id', right_on='employee_id')
```

```text
  employee_id        name  total_sales
0           3  Alice Bees        23456
1           4  Tim Horton         2512
```

두 열을 기준으로 병합하는 대신 각 데이터프레임의 인덱스를 기준으로 병합하려면   
left_index=True와 right_index=True를 사용합니다.

```python
# 데이터프레임을 병합합니다.
pd.merge(dataframe_employees, dataframe_sales, left_index=True, right_index=True)
```

```text
  employee_id_x        name employee_id_y  total_sales
0             1   Amy Jones             3        23456
1             2  Allen Keys             4         2512
2             3  Alice Bees             5         2345
3             4  Tim Horton             6         1455
```

복잡한 데이터를 사용해야 할 경우가 많습니다.   
데이터가 언제나 한 덩어리로 제공되는 것은 아닙니다.   
여러 쿼리나 파일로부터 온 다양한 데이터셋을 다루게 됩니다.   
모든 데이터를 하나로 모으려면 각 데이터 쿼리나 파일을   
pandas의 개별 데이터프레임으로 만든 다음 병합하여 하나의 데이터프레임으로 합칩니다.   
   
merge 연산을 위해 세 가지 사항을 지정해야 합니다.   
1. 병합할 두 개의 데이터프레임을 지정해야 합니다.   
2. 병합하기 위한 열 이름을 지정해야 합니다.   
3. 수행하려는 병합 연산의 종류를 지정해야 합니다. 이는 how 매개변수로 지정합니다. merge는 네 개의 join type을 지원합니다.
 1. inner - 두 데이터프레임에 모두 존재하는 행만 반환됩니다.
 2. outer - 두 데이터프레임의 모든 행이 반환됩니다. 한 쪽 데이터프레임에만 존재하는 행의 누락된 값은 NaN으로 채워집니다.
 3. left - 왼쪽 데이터프레임의 모든 행이 반환됩니다. 누락된 값은 NaN으로 채워집니다.
 4. right - 오른쪽 데이터프레임의 모든 행이 반환됩니다. 누락된 값은 NaN으로 채워집니다.
