---
title: "ch3. Data Wrangling"
date: 2022-05-26
category: ml-data
tags: ["ml", "python", "study", "sklearn", "dataframe"]
series: "ML with Python Cookbook"
seriesOrder: 3
legacyPath: "/posts/ch3-Data-Wrangling/"
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

```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.0 소개   \n",
    "   \n",
    "데이터 랭글링(data wrangling)은 원본 데이터를 정제하고 사용 가능한 형태로 구성하기 위한   \n",
    "변환 과정을 광범위하게 의미하는 비공식적인 용어입니다.   \n",
    "데이터 전처리의 한 단계에 불과하지만 중요한 단계입니다.   \n",
    "   \n",
    "데이터 랭글링에 사용하는 가장 일반적인 데이터 구조는 데이터프레임입니다.   \n",
    "사용하기 쉽고 기능이 매우 많습니다.   \n",
    "데이터프레임은 표 형식 데이터입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [
    {
     "ename": "ParserError",
     "evalue": "Error tokenizing data. C error: Expected 1 fields in line 22, saw 7\n",
     "output_type": "error",
     "traceback": [
      "\u001b[1;31m---------------------------------------------------------------------------\u001b[0m",
      "\u001b[1;31mParserError\u001b[0m                               Traceback (most recent call last)",
      "\u001b[1;32m<ipython-input-3-59105522bf82>\u001b[0m in \u001b[0;36m<module>\u001b[1;34m\u001b[0m\n\u001b[0;32m      5\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m      6\u001b[0m \u001b[1;31m# 데이터프레임으로 데이터를 적재합니다.\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m----> 7\u001b[1;33m \u001b[0mdataframe\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0mpd\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mread_csv\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0murl\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m      8\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m      9\u001b[0m \u001b[1;31m# 처음 다섯 개의 행을 출력합니다.\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\pandas\\io\\parsers.py\u001b[0m in \u001b[0;36mread_csv\u001b[1;34m(filepath_or_buffer, sep, delimiter, header, names, index_col, usecols, squeeze, prefix, mangle_dupe_cols, dtype, engine, converters, true_values, false_values, skipinitialspace, skiprows, skipfooter, nrows, na_values, keep_default_na, na_filter, verbose, skip_blank_lines, parse_dates, infer_datetime_format, keep_date_col, date_parser, dayfirst, cache_dates, iterator, chunksize, compression, thousands, decimal, lineterminator, quotechar, quoting, doublequote, escapechar, comment, encoding, dialect, error_bad_lines, warn_bad_lines, delim_whitespace, low_memory, memory_map, float_precision)\u001b[0m\n\u001b[0;32m    684\u001b[0m     )\n\u001b[0;32m    685\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m--> 686\u001b[1;33m     \u001b[1;32mreturn\u001b[0m \u001b[0m_read\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mfilepath_or_buffer\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mkwds\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m    687\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m    688\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\pandas\\io\\parsers.py\u001b[0m in \u001b[0;36m_read\u001b[1;34m(filepath_or_buffer, kwds)\u001b[0m\n\u001b[0;32m    456\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m    457\u001b[0m     \u001b[1;32mtry\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m--> 458\u001b[1;33m         \u001b[0mdata\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0mparser\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mread\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mnrows\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m    459\u001b[0m     \u001b[1;32mfinally\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m    460\u001b[0m         \u001b[0mparser\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mclose\u001b[0m\u001b[1;33m(\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\pandas\\io\\parsers.py\u001b[0m in \u001b[0;36mread\u001b[1;34m(self, nrows)\u001b[0m\n\u001b[0;32m   1194\u001b[0m     \u001b[1;32mdef\u001b[0m \u001b[0mread\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mself\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mnrows\u001b[0m\u001b[1;33m=\u001b[0m\u001b[1;32mNone\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1195\u001b[0m         \u001b[0mnrows\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0m_validate_integer\u001b[0m\u001b[1;33m(\u001b[0m\u001b[1;34m\"nrows\"\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mnrows\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m-> 1196\u001b[1;33m         \u001b[0mret\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0mself\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0m_engine\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mread\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mnrows\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m   1197\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1198\u001b[0m         \u001b[1;31m# May alter columns / col_dict\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\pandas\\io\\parsers.py\u001b[0m in \u001b[0;36mread\u001b[1;34m(self, nrows)\u001b[0m\n\u001b[0;32m   2153\u001b[0m     \u001b[1;32mdef\u001b[0m \u001b[0mread\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mself\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mnrows\u001b[0m\u001b[1;33m=\u001b[0m\u001b[1;32mNone\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   2154\u001b[0m         \u001b[1;32mtry\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m-> 2155\u001b[1;33m             \u001b[0mdata\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0mself\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0m_reader\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mread\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mnrows\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m   2156\u001b[0m         \u001b[1;32mexcept\u001b[0m \u001b[0mStopIteration\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   2157\u001b[0m             \u001b[1;32mif\u001b[0m \u001b[0mself\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0m_first_chunk\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mpandas\\_libs\\parsers.pyx\u001b[0m in \u001b[0;36mpandas._libs.parsers.TextReader.read\u001b[1;34m()\u001b[0m\n",
      "\u001b[1;32mpandas\\_libs\\parsers.pyx\u001b[0m in \u001b[0;36mpandas._libs.parsers.TextReader._read_low_memory\u001b[1;34m()\u001b[0m\n",
      "\u001b[1;32mpandas\\_libs\\parsers.pyx\u001b[0m in \u001b[0;36mpandas._libs.parsers.TextReader._read_rows\u001b[1;34m()\u001b[0m\n",
      "\u001b[1;32mpandas\\_libs\\parsers.pyx\u001b[0m in \u001b[0;36mpandas._libs.parsers.TextReader._tokenize_rows\u001b[1;34m()\u001b[0m\n",
      "\u001b[1;32mpandas\\_libs\\parsers.pyx\u001b[0m in \u001b[0;36mpandas._libs.parsers.raise_parser_error\u001b[1;34m()\u001b[0m\n",
      "\u001b[1;31mParserError\u001b[0m: Error tokenizing data. C error: Expected 1 fields in line 22, saw 7\n"
     ]
    }
   ],
   "source": [
    "import pandas as pd\n",
    "\n",
    "# 데이터 url\n",
    "url = 'https://tinyurl.com/titanic-csv'\n",
    "\n",
    "# 데이터프레임으로 데이터를 적재합니다.\n",
    "dataframe = pd.read_csv(url)\n",
    "\n",
    "# 처음 다섯 개의 행을 출력합니다.\n",
    "dataframe.head(5)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.1 데이터프레임 만들기   \n",
    "   \n",
    "pandas에는 새로운 데이터프레임 객체를 만들 수 있는 방법이 많습니다.   \n",
    "간단한 방법은 DataFrame 클래스를 사용해 비어 있는 데이터프레임을 만든 후   \n",
    "개별적으로 각 열을 정의하는 것입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age  Driver\n",
       "0     Jacky Jackson   38    True\n",
       "1  Steven Stevenson   25   False"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터프레임을 만듭니다.\n",
    "dataframe = pd.DataFrame()\n",
    "\n",
    "# 열을 추가합니다.\n",
    "dataframe['Name'] = ['Jacky Jackson', 'Steven Stevenson']\n",
    "dataframe['Age'] = [38, 25]\n",
    "dataframe['Driver'] = [True, False]\n",
    "\n",
    "# 데이터프레임을 확인합니다.\n",
    "dataframe"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>Molly Mooney</td>\n",
       "      <td>40</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age  Driver\n",
       "0     Jacky Jackson   38    True\n",
       "1  Steven Stevenson   25   False\n",
       "2      Molly Mooney   40    True"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 열을 만듭니다.\n",
    "new_person = pd.Series(['Molly Mooney', 40, True],\n",
    "                       index=['Name', 'Age', 'Driver'])\n",
    "\n",
    "# 열을 추가합니다.\n",
    "dataframe.append(new_person, ignore_index=True)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "데이터프레임 객체를 만들 때 데이터를 전달하는 방법이 몇 가지 있습니다.   \n",
    "   \n",
    "먼저 numpy 배열을 주입하여 만들 수 있습니다. 열 이름은 columns 매개변수에 지정합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name Age Driver\n",
       "0     Jacky Jackson  38   True\n",
       "1  Steven Stevenson  25  False"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "import numpy as np\n",
    "\n",
    "data = [['Jacky Jackson', 38, True], ['Steven Stevenson', 25, False]]\n",
    "\n",
    "# 1. numpy 배열\n",
    "matrix = np.array(data)\n",
    "\n",
    "# 데이터프레임 객체 생성\n",
    "pd.DataFrame(matrix, columns=['Name', 'Age', 'Driver'])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "원본 리스트를 전달하여 만들 수도 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age  Driver\n",
       "0     Jacky Jackson   38    True\n",
       "1  Steven Stevenson   25   False"
      ]
     },
     "execution_count": 7,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 원본 리스트로 데이터프레임 객체 생성\n",
    "pd.DataFrame(data, columns=['Name', 'Age', 'Driver'])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "열 이름과 데이터를 매핑한 딕셔너리를 사용해 데이터프레임을 만들 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age  Driver\n",
       "0     Jacky Jackson   38    True\n",
       "1  Steven Stevenson   25   False"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 열 이름과 데이터를 매핑한 딕셔너리\n",
    "data = {'Name': ['Jacky Jackson', 'Steven Stevenson'],\n",
    "        'Age': [38, 25],\n",
    "        'Driver': [True, False]}\n",
    "\n",
    "# 데이터프레임 객체 생성\n",
    "pd.DataFrame(data)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "샘플마다 열과 값을 매핑한 딕셔너리를 리스트로 전달할 수 있습니다.   \n",
    "index 매개변수에 인덱스를 따로 지정할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 9,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>row1</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>row2</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                  Name  Age  Driver\n",
       "row1     Jacky Jackson   38    True\n",
       "row2  Steven Stevenson   25   False"
      ]
     },
     "execution_count": 9,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 샘플마다 열과 값을 매핑한 딕셔너리\n",
    "data = [ {'Name': 'Jacky Jackson', 'Age': 38, 'Driver': True},\n",
    "         {'Name': 'Steven Stevenson', 'Age': 25, 'Driver': False} ]\n",
    "\n",
    "# 데이터프레임 객체 생성\n",
    "pd.DataFrame(data, index=['row1', 'row2'])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.2 데이터 설명하기   \n",
    "   \n",
    "데이터를 적재한 후 head 메서드를 사용해 몇 개의 행을 확인할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age  Driver\n",
       "0     Jacky Jackson   38    True\n",
       "1  Steven Stevenson   25   False"
      ]
     },
     "execution_count": 10,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터 url\n",
    "#url = 'https://tinyurl.com/titanic-csv'\n",
    "\n",
    "# 데이터를 적재합니다.\n",
    "#dataframe = pd.read_csv(url)\n",
    "\n",
    "# 데이터\n",
    "data = [['Jacky Jackson', 38, True], ['Steven Stevenson', 25, False]]\n",
    "\n",
    "# 데이터를 적재합니다.\n",
    "dataframe = pd.DataFrame(data, columns=['Name', 'Age', 'Driver'])\n",
    "\n",
    "# 두 개의 행을 확인합니다.\n",
    "dataframe.head(2)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "shape 메서드를 사용하여 열과 행의 수를 확인할 수도 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 11,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "(2, 3)"
      ]
     },
     "execution_count": 11,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 차원을 확인합니다.\n",
    "dataframe.shape"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "describe 메서드를 사용하여 숫자로 된 열의 통계값을 얻을 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Age</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>count</th>\n",
       "      <td>2.000000</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>mean</th>\n",
       "      <td>31.500000</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>std</th>\n",
       "      <td>9.192388</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>min</th>\n",
       "      <td>25.000000</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>25%</th>\n",
       "      <td>28.250000</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>50%</th>\n",
       "      <td>31.500000</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>75%</th>\n",
       "      <td>34.750000</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>max</th>\n",
       "      <td>38.000000</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "             Age\n",
       "count   2.000000\n",
       "mean   31.500000\n",
       "std     9.192388\n",
       "min    25.000000\n",
       "25%    28.250000\n",
       "50%    31.500000\n",
       "75%    34.750000\n",
       "max    38.000000"
      ]
     },
     "execution_count": 12,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 통계값을 확인합니다.\n",
    "dataframe.describe()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.3 데이터프레임 탐색하기   \n",
    "   \n",
    "loc나 iloc 메서드를 사용해서 하나 이상의 행이나 값을 선택할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 13,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "Name      Molly Mooney\n",
       "Age                 40\n",
       "Driver            True\n",
       "Name: 2, dtype: object"
      ]
     },
     "execution_count": 13,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "new_person = pd.Series(['Molly Mooney', 40, True],\n",
    "                       index=['Name', 'Age', 'Driver'])\n",
    "new_dataframe = dataframe.append(new_person, ignore_index=True)\n",
    "\n",
    "# 첫 번째 행을 선택합니다.\n",
    "new_dataframe.iloc[-1]"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 14,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>Molly Mooney</td>\n",
       "      <td>40</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age  Driver\n",
       "0     Jacky Jackson   38    True\n",
       "1  Steven Stevenson   25   False\n",
       "2      Molly Mooney   40    True"
      ]
     },
     "execution_count": 14,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 세 개의 행을 선택합니다.\n",
    "new_dataframe.iloc[:4]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "데이터프레임은 각 행이 고유한 값을 가진다면 정수가 아닌 어떤 값이라도 인덱스로 설정할 수 있습니다.   \n",
    "'Name'을 인덱스로 설정하고 이름을 사용하여 행을 선택할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 15,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "Name      Steven Stevenson\n",
       "Age                     25\n",
       "Driver               False\n",
       "Name: Steven Stevenson, dtype: object"
      ]
     },
     "execution_count": 15,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 인덱스를 설정합니다.\n",
    "new_dataframe = new_dataframe.set_index(new_dataframe['Name'])\n",
    "\n",
    "# 행을 확인합니다.\n",
    "new_dataframe.loc['Steven Stevenson']"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "loc는 데이터프레임의 인덱스가 레이블(문자열 등)일 때 사용합니다.   \n",
    "iloc는 데이터프레임의 위치를 참조합니다. 예를 들어 iloc[0]은 첫 번째 행을 반환합니다.   \n",
    "loc, iloc 메서드의 슬라이싱은 numpy와 달리 마지막 인덱스를 포함합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.4 조건에 따라 행 선택하기   \n",
    "   \n",
    "일부 조건에 따라 데이터프레임의 행을 선택해 보겠습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 16,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>Name</th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>Jacky Jackson</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>Molly Mooney</th>\n",
       "      <td>Molly Mooney</td>\n",
       "      <td>40</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                        Name  Age  Driver\n",
       "Name                                     \n",
       "Jacky Jackson  Jacky Jackson   38    True\n",
       "Molly Mooney    Molly Mooney   40    True"
      ]
     },
     "execution_count": 16,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 'Driver' 열이 True인 행을 출력합니다.\n",
    "new_dataframe[new_dataframe['Driver'] == True]"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 17,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>Name</th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>Molly Mooney</th>\n",
       "      <td>Molly Mooney</td>\n",
       "      <td>40</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                      Name  Age  Driver\n",
       "Name                                   \n",
       "Molly Mooney  Molly Mooney   40    True"
      ]
     },
     "execution_count": 17,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "#'Driver' 열이 True인 데이터 중 나이가 40세 이상인 행을 출력합니다.\n",
    "new_dataframe[(new_dataframe['Driver'] == True) & (new_dataframe['Age'] >= 40)]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.5 값 치환하기   \n",
    "   \n",
    "값을 치환할 때 replace 메서드를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 18,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "Name\n",
       "Jacky Jackson          Jacky Jackson\n",
       "Steven Stevenson    Steven Stevenson\n",
       "Molly Mooney                  Hubert\n",
       "Name: Name, dtype: object"
      ]
     },
     "execution_count": 18,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 'Molly Mooney' 이름을 변경합니다.\n",
    "new_dataframe['Name'].replace('Molly Mooney', 'Hubert')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.6 열 이름 바꾸기   \n",
    "   \n",
    "열 이름을 바꿀 때 rename 메서드를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 19,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Nickname</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>Name</th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>Jacky Jackson</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>Steven Stevenson</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>Molly Mooney</th>\n",
       "      <td>Molly Mooney</td>\n",
       "      <td>40</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                          Nickname  Age  Driver\n",
       "Name                                           \n",
       "Jacky Jackson        Jacky Jackson   38    True\n",
       "Steven Stevenson  Steven Stevenson   25   False\n",
       "Molly Mooney          Molly Mooney   40    True"
      ]
     },
     "execution_count": 19,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 열 이름을 변경합니다.\n",
    "new_dataframe.rename(columns={'Name': 'Nickname'})"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.7 최솟값, 최댓값, 합, 평균 계산 및 개수 세기   \n",
    "   \n",
    "pandas는 최솟값, 최댓값, 합, 평균, 분산, 표준편차, 중간값, 첨도(kurt), 비대칭도(skew), 평균의 표준오차(SEM), 최빈값(mode)을 포함하여 많은 메서드를 제공합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 20,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "최솟값: 25\n",
      "최댓값: 40\n",
      "평균: 34.333333333333336\n",
      "합: 103\n",
      "카운트: 3\n"
     ]
    }
   ],
   "source": [
    "# 통곗값을 계산합니다.   \n",
    "print('최솟값:', new_dataframe['Age'].min())\n",
    "print('최댓값:', new_dataframe['Age'].max())\n",
    "print('평균:', new_dataframe['Age'].mean())\n",
    "print('합:', new_dataframe['Age'].sum())\n",
    "print('카운트:', new_dataframe['Age'].count())"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 21,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "Name      3\n",
       "Age       3\n",
       "Driver    3\n",
       "dtype: int64"
      ]
     },
     "execution_count": 21,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터프레임 전체에 적용할 수도 있습니다.\n",
    "new_dataframe.count()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "이 외에도 상관계수를 계산할 때 corr 메서드를 사용합니다.   \n",
    "공분산을 계산할 때 cov 메서드를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 22,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>Age</th>\n",
       "      <td>1.000000</td>\n",
       "      <td>0.992434</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>Driver</th>\n",
       "      <td>0.992434</td>\n",
       "      <td>1.000000</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "             Age    Driver\n",
       "Age     1.000000  0.992434\n",
       "Driver  0.992434  1.000000"
      ]
     },
     "execution_count": 22,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 수치형 열의 상관계수를 계산합니다.\n",
    "new_dataframe.corr()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 23,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>Age</th>\n",
       "      <td>66.333333</td>\n",
       "      <td>4.666667</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>Driver</th>\n",
       "      <td>4.666667</td>\n",
       "      <td>0.333333</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "              Age    Driver\n",
       "Age     66.333333  4.666667\n",
       "Driver   4.666667  0.333333"
      ]
     },
     "execution_count": 23,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 수치형 열의 공분산을 계산합니다.\n",
    "new_dataframe.cov()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.8 고유한 값 찾기   \n",
    "   \n",
    "고유한 값을 찾을 때는 unique 메서드와 value_counts 메서드를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 24,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([ True, False])"
      ]
     },
     "execution_count": 24,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 고유한 값을 찾습니다.\n",
    "new_dataframe['Driver'].unique()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 25,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "True     2\n",
       "False    1\n",
       "Name: Driver, dtype: int64"
      ]
     },
     "execution_count": 25,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 고유한 값과 등장 횟수를 출력합니다.\n",
    "new_dataframe['Driver'].value_counts()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "nunique 메서드는 고유한 값의 개수만 출력합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 26,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "Name      3\n",
       "Age       3\n",
       "Driver    2\n",
       "dtype: int64"
      ]
     },
     "execution_count": 26,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터프레임 전체에 고유한 값의 갯수를 출력합니다.\n",
    "new_dataframe.nunique()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.9 누락된 값 다루기   \n",
    "   \n",
    "isnull과 notnull 메서드는 누락 여부를 나타내는 불리언 값을 반환합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 27,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "      <th>Nickname</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>Molly Mooney</td>\n",
       "      <td>40</td>\n",
       "      <td>True</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age Driver Nickname\n",
       "0     Jacky Jackson   38   True      NaN\n",
       "1  Steven Stevenson   25  False      NaN\n",
       "2      Molly Mooney   40   True      NaN"
      ]
     },
     "execution_count": 27,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "data2 = pd.Series(['Ashley', 32, False], index=['Nickname', 'Age', 'Driver'])\n",
    "data3 = pd.Series(['Macro', 22, ''], index=['Nickname', 'Age', 'Driver'])\n",
    "data4 = pd.Series(['Son',47 , ''], index=['Nickname', 'Age', 'Driver'])\n",
    "\n",
    "new_dataframe2 = new_dataframe.append(data2, ignore_index=True)\n",
    "new_dataframe3 = new_dataframe2.append(data3, ignore_index=True)\n",
    "new_dataframe4 = new_dataframe3.append(data4, ignore_index=True)\n",
    "\n",
    "# 누락된 값을 선택하고 출력합니다.\n",
    "new_dataframe4[new_dataframe4['Nickname'].isnull()]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.10 열 삭제하기   \n",
    "   \n",
    "열을 삭제하는 가장 좋은 방법은 drop 메서드에 axis=1 매개변수를 사용하는 것입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 28,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>Molly Mooney</td>\n",
       "      <td>40</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>NaN</td>\n",
       "      <td>32</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>NaN</td>\n",
       "      <td>22</td>\n",
       "      <td></td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>5</th>\n",
       "      <td>NaN</td>\n",
       "      <td>47</td>\n",
       "      <td></td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age Driver\n",
       "0     Jacky Jackson   38   True\n",
       "1  Steven Stevenson   25  False\n",
       "2      Molly Mooney   40   True\n",
       "3               NaN   32  False\n",
       "4               NaN   22       \n",
       "5               NaN   47       "
      ]
     },
     "execution_count": 28,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "new_dataframe4.drop('Nickname', axis=1)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "열 이름이 없다면 dataframe.columns에 열 인덱스를 지정하여 삭제할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 29,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>Molly Mooney</td>\n",
       "      <td>40</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>NaN</td>\n",
       "      <td>32</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>NaN</td>\n",
       "      <td>22</td>\n",
       "      <td></td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>5</th>\n",
       "      <td>NaN</td>\n",
       "      <td>47</td>\n",
       "      <td></td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age Driver\n",
       "0     Jacky Jackson   38   True\n",
       "1  Steven Stevenson   25  False\n",
       "2      Molly Mooney   40   True\n",
       "3               NaN   32  False\n",
       "4               NaN   22       \n",
       "5               NaN   47       "
      ]
     },
     "execution_count": 29,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 열 인덱스를 지정하여 삭제합니다.\n",
    "new_dataframe4.drop(new_dataframe4.columns[3], axis=1)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.11 행 삭제하기   \n",
    "   \n",
    "불리언 조건을 사용하면 행 하나 또는 여러 개를 동시에 삭제할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 30,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "      <th>Nickname</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>Molly Mooney</td>\n",
       "      <td>40</td>\n",
       "      <td>True</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>NaN</td>\n",
       "      <td>22</td>\n",
       "      <td></td>\n",
       "      <td>Macro</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>5</th>\n",
       "      <td>NaN</td>\n",
       "      <td>47</td>\n",
       "      <td></td>\n",
       "      <td>Son</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "            Name  Age Driver Nickname\n",
       "0  Jacky Jackson   38   True      NaN\n",
       "2   Molly Mooney   40   True      NaN\n",
       "4            NaN   22           Macro\n",
       "5            NaN   47             Son"
      ]
     },
     "execution_count": 30,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 조건에 맞는 행을 삭제합니다.\n",
    "new_dataframe4[new_dataframe4['Driver'] != False]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "마찬가지로 행 인덱스를 지정하여 삭제할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 31,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "      <th>Nickname</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>Molly Mooney</td>\n",
       "      <td>40</td>\n",
       "      <td>True</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>NaN</td>\n",
       "      <td>32</td>\n",
       "      <td>False</td>\n",
       "      <td>Ashley</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>NaN</td>\n",
       "      <td>22</td>\n",
       "      <td></td>\n",
       "      <td>Macro</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>5</th>\n",
       "      <td>NaN</td>\n",
       "      <td>47</td>\n",
       "      <td></td>\n",
       "      <td>Son</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age Driver Nickname\n",
       "1  Steven Stevenson   25  False      NaN\n",
       "2      Molly Mooney   40   True      NaN\n",
       "3               NaN   32  False   Ashley\n",
       "4               NaN   22           Macro\n",
       "5               NaN   47             Son"
      ]
     },
     "execution_count": 31,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 행 인덱스를 사용하여 첫 행을 제거하고 출력합니다.\n",
    "new_dataframe4[new_dataframe4.index != 0]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.12 중복된 행 삭제하기   \n",
    "   \n",
    "매개변수에 주의해서 drop_duplicates를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 32,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "      <th>Nickname</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>Molly Mooney</td>\n",
       "      <td>40</td>\n",
       "      <td>True</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>NaN</td>\n",
       "      <td>32</td>\n",
       "      <td>False</td>\n",
       "      <td>Ashley</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>NaN</td>\n",
       "      <td>22</td>\n",
       "      <td></td>\n",
       "      <td>Macro</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>5</th>\n",
       "      <td>NaN</td>\n",
       "      <td>47</td>\n",
       "      <td></td>\n",
       "      <td>Son</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age Driver Nickname\n",
       "0     Jacky Jackson   38   True      NaN\n",
       "1  Steven Stevenson   25  False      NaN\n",
       "2      Molly Mooney   40   True      NaN\n",
       "3               NaN   32  False   Ashley\n",
       "4               NaN   22           Macro\n",
       "5               NaN   47             Son"
      ]
     },
     "execution_count": 32,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 중복 행을 삭제하고 출력합니다.\n",
    "new_dataframe4.drop_duplicates()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "어떤 행도 삭제되지 않았습니다.   \n",
    "drop_duplicates는 기본적으로 모든 열이 완벽히 동일한 행만 삭제하기 때문입니다.   \n",
    "일부 열만 대상으로 중복된 행을 검사할 때 subset 매개변수를 사용합니다.   \n",
    "이 때 중복된 행에서 처음 나타난 것을 유지하고 나머지 행을 버립니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 33,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "      <th>Nickname</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>Jacky Jackson</td>\n",
       "      <td>38</td>\n",
       "      <td>True</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>Steven Stevenson</td>\n",
       "      <td>25</td>\n",
       "      <td>False</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>NaN</td>\n",
       "      <td>22</td>\n",
       "      <td></td>\n",
       "      <td>Macro</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "               Name  Age Driver Nickname\n",
       "0     Jacky Jackson   38   True      NaN\n",
       "1  Steven Stevenson   25  False      NaN\n",
       "4               NaN   22           Macro"
      ]
     },
     "execution_count": 33,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 'Driver' 열의 중복된 행을 삭제합니다.\n",
    "new_dataframe4.drop_duplicates(subset='Driver')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.13 값에 따라 행을 그룹핑하기   \n",
    "   \n",
    "pandas에서 가장 강력한 기능 중 하나인 groupby를 사용합니다.   \n",
    "groupby에서 data wrangling이 진짜 시작됩니다.   \n",
    "어떤 조건에 따라 이들을 그룹핑하고 통계를 계산합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 34,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "Driver  Name            \n",
       "False   Steven Stevenson    25\n",
       "True    Jacky Jackson       38\n",
       "        Molly Mooney        40\n",
       "Name: Age, dtype: int64"
      ]
     },
     "execution_count": 34,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 행을 그룹핑한 다음 평균을 계산합니다.\n",
    "new_dataframe4.groupby(['Driver', 'Name'])['Age'].mean()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.14 시간에 따라 행을 그룹핑하기   \n",
    "   \n",
    "resample 메서드를 사용하여 시간 간격에 따라 행을 그룹핑합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 35,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Sale_Amount</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>1987-01-01 00:00:00</th>\n",
       "      <td>8</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-01-01 00:00:30</th>\n",
       "      <td>6</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-01-01 00:01:00</th>\n",
       "      <td>7</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-01-01 00:01:30</th>\n",
       "      <td>4</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-01-01 00:02:00</th>\n",
       "      <td>5</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>...</th>\n",
       "      <td>...</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-02-04 17:17:30</th>\n",
       "      <td>5</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-02-04 17:18:00</th>\n",
       "      <td>9</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-02-04 17:18:30</th>\n",
       "      <td>6</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-02-04 17:19:00</th>\n",
       "      <td>9</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-02-04 17:19:30</th>\n",
       "      <td>4</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "<p>100000 rows × 1 columns</p>\n",
       "</div>"
      ],
      "text/plain": [
       "                     Sale_Amount\n",
       "1987-01-01 00:00:00            8\n",
       "1987-01-01 00:00:30            6\n",
       "1987-01-01 00:01:00            7\n",
       "1987-01-01 00:01:30            4\n",
       "1987-01-01 00:02:00            5\n",
       "...                          ...\n",
       "1987-02-04 17:17:30            5\n",
       "1987-02-04 17:18:00            9\n",
       "1987-02-04 17:18:30            6\n",
       "1987-02-04 17:19:00            9\n",
       "1987-02-04 17:19:30            4\n",
       "\n",
       "[100000 rows x 1 columns]"
      ]
     },
     "execution_count": 35,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 날짜 범위를 만듭니다.\n",
    "time_index = pd.date_range('01/01/1987', periods=100000, freq='30S')\n",
    "\n",
    "# 데이터프레임을 만듭니다.\n",
    "date_dataframe = pd.DataFrame(index=time_index)\n",
    "\n",
    "# 난숫갑으로 열을 만듭니다.\n",
    "date_dataframe['Sale_Amount'] = np.random.randint(1, 10, 100000)\n",
    "\n",
    "# 데이터프레임을 출력해 봅니다.\n",
    "date_dataframe"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 36,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Sale_Amount</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>1987-01-04</th>\n",
       "      <td>57603</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-01-11</th>\n",
       "      <td>101182</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-01-18</th>\n",
       "      <td>101161</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-01-25</th>\n",
       "      <td>100500</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-02-01</th>\n",
       "      <td>100861</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-02-08</th>\n",
       "      <td>39209</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "            Sale_Amount\n",
       "1987-01-04        57603\n",
       "1987-01-11       101182\n",
       "1987-01-18       101161\n",
       "1987-01-25       100500\n",
       "1987-02-01       100861\n",
       "1987-02-08        39209"
      ]
     },
     "execution_count": 36,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 주 단위로 행을 그룹핑한 다음 합을 계산합니다.\n",
    "date_dataframe.resample('W').sum()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 37,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Sale_Amount</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>1987-01-31</th>\n",
       "      <td>446964</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1987-02-28</th>\n",
       "      <td>53552</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "            Sale_Amount\n",
       "1987-01-31       446964\n",
       "1987-02-28        53552"
      ]
     },
     "execution_count": 37,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 한 달 단위로 행을 그룹핑한 다음 합을 계산합니다.\n",
    "date_dataframe.resample('M').sum()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "resample 메서드는 datetime 형태의 인덱스를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.15 열 원소 순회하기   \n",
    "   \n",
    "pandas의 열을 파이썬의 시퀀스처럼 다룰 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 38,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "JACKY JACKSON\n",
      "STEVEN STEVENSON\n"
     ]
    }
   ],
   "source": [
    "# 처음 두 이름을 대문자로 바꾸어 출력합니다.\n",
    "for name in new_dataframe4['Name'][0:2]:\n",
    "    print(name.upper())"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "for 반복문보다 pandas의 apply 메서드를 사용하는 것이 좀 더 파이썬다운 방법입니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.16 모든 열 원소에 함수 적용하기   \n",
    "   \n",
    "apply 메서드를 사용하여 열의 모든 원소에 내장 함수나 사용자 정의 함수를 적용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 39,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0       JACKY JACKSON\n",
       "1    STEVEN STEVENSON\n",
       "Name: Name, dtype: object"
      ]
     },
     "execution_count": 39,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 함수를 만듭니다.\n",
    "def uppercase(x):\n",
    "    return x.upper()\n",
    "\n",
    "# 함수를 적용하고 출력합니다.\n",
    "new_dataframe4['Name'][:2].apply(uppercase)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "apply 메서드와 유사한 map 메서드가 있습니다.   \n",
    "두 함수는 거의 비슷하지만 map 메서드는 dictionary를 input으로 넣을 수 있고   \n",
    "apply 메서드는 매개변수를 지정할 수 있다는 것이 큰 차이입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 40,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0    1.0\n",
       "1    0.0\n",
       "2    1.0\n",
       "3    0.0\n",
       "4    NaN\n",
       "5    NaN\n",
       "Name: Driver, dtype: float64"
      ]
     },
     "execution_count": 40,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# Driver 열의 True를 1로, False를 0으로 바꿉니다.\n",
    "new_dataframe4['Driver'].map({True: 1, False: 0})"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 41,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0     True\n",
       "1     True\n",
       "2    False\n",
       "3     True\n",
       "4     True\n",
       "5    False\n",
       "Name: Age, dtype: bool"
      ]
     },
     "execution_count": 41,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 함수의 매개변수(age)를 apply 메서드를 호출할 때 전달할 수 있습니다.\n",
    "new_dataframe4['Age'].apply(lambda x, age: x < age, age=40)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.17 그룹에 함수 적용하기   \n",
    "   \n",
    "groupby로 행을 그룹핑하고 각 그룹에 apply 메서드를 연결하여 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 42,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>Name</th>\n",
       "      <th>Age</th>\n",
       "      <th>Driver</th>\n",
       "      <th>Nickname</th>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>Driver</th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>False</th>\n",
       "      <td>1</td>\n",
       "      <td>2</td>\n",
       "      <td>2</td>\n",
       "      <td>1</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>True</th>\n",
       "      <td>2</td>\n",
       "      <td>2</td>\n",
       "      <td>2</td>\n",
       "      <td>0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th></th>\n",
       "      <td>0</td>\n",
       "      <td>2</td>\n",
       "      <td>2</td>\n",
       "      <td>2</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "        Name  Age  Driver  Nickname\n",
       "Driver                             \n",
       "False      1    2       2         1\n",
       "True       2    2       2         0\n",
       "           0    2       2         2"
      ]
     },
     "execution_count": 42,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 행을 그룹핑한 다음 함수를 적용합니다.\n",
    "new_dataframe4.groupby('Driver').apply(lambda x: x.count())"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.18 데이터프레임 연결하기   \n",
    "   \n",
    "두 개의 데이터프레임을 연결합니다.   \n",
    "concat 함수에 axis=0 매개변수를 설정하여 행의 축을 따라 연결합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 43,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>id</th>\n",
       "      <th>first</th>\n",
       "      <th>last</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>1</td>\n",
       "      <td>Alex</td>\n",
       "      <td>Anderson</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>2</td>\n",
       "      <td>Amy</td>\n",
       "      <td>Ackerman</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>3</td>\n",
       "      <td>Allen</td>\n",
       "      <td>Ali</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>4</td>\n",
       "      <td>Billy</td>\n",
       "      <td>Bonder</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>5</td>\n",
       "      <td>Brian</td>\n",
       "      <td>Black</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>6</td>\n",
       "      <td>Bran</td>\n",
       "      <td>Balwner</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "  id  first      last\n",
       "0  1   Alex  Anderson\n",
       "1  2    Amy  Ackerman\n",
       "2  3  Allen       Ali\n",
       "0  4  Billy    Bonder\n",
       "1  5  Brian     Black\n",
       "2  6   Bran   Balwner"
      ]
     },
     "execution_count": 43,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터프레임a를 만듭니다.\n",
    "data_a = {'id': ['1', '2', '3'],\n",
    "          'first': ['Alex', 'Amy', 'Allen'],\n",
    "          'last': ['Anderson', 'Ackerman', 'Ali']}\n",
    "dataframe_a = pd.DataFrame(data_a, columns = ['id', 'first', 'last'])\n",
    "\n",
    "# 데이터프레임b를 만듭니다.\n",
    "data_b = {'id': ['4', '5', '6'],\n",
    "          'first': ['Billy', 'Brian', 'Bran'],\n",
    "          'last': ['Bonder', 'Black', 'Balwner']}\n",
    "dataframe_b = pd.DataFrame(data_b, columns=['id', 'first', 'last'])\n",
    "\n",
    "# 행 방향으로 데이터프레임을 연결합니다.\n",
    "pd.concat([dataframe_a, dataframe_b], axis=0)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 44,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>id</th>\n",
       "      <th>first</th>\n",
       "      <th>last</th>\n",
       "      <th>id</th>\n",
       "      <th>first</th>\n",
       "      <th>last</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>1</td>\n",
       "      <td>Alex</td>\n",
       "      <td>Anderson</td>\n",
       "      <td>4</td>\n",
       "      <td>Billy</td>\n",
       "      <td>Bonder</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>2</td>\n",
       "      <td>Amy</td>\n",
       "      <td>Ackerman</td>\n",
       "      <td>5</td>\n",
       "      <td>Brian</td>\n",
       "      <td>Black</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>3</td>\n",
       "      <td>Allen</td>\n",
       "      <td>Ali</td>\n",
       "      <td>6</td>\n",
       "      <td>Bran</td>\n",
       "      <td>Balwner</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "  id  first      last id  first     last\n",
       "0  1   Alex  Anderson  4  Billy   Bonder\n",
       "1  2    Amy  Ackerman  5  Brian    Black\n",
       "2  3  Allen       Ali  6   Bran  Balwner"
      ]
     },
     "execution_count": 44,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 열 방향으로 데이터프레임을 연결합니다.\n",
    "pd.concat([dataframe_a, dataframe_b], axis=1)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "또한 append 메서드를 사용하여 데이터프레임에 새로운 행을 추가할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 45,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>id</th>\n",
       "      <th>first</th>\n",
       "      <th>last</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>1</td>\n",
       "      <td>Alex</td>\n",
       "      <td>Anderson</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>2</td>\n",
       "      <td>Amy</td>\n",
       "      <td>Ackerman</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>3</td>\n",
       "      <td>Allen</td>\n",
       "      <td>Ali</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>10</td>\n",
       "      <td>Chris</td>\n",
       "      <td>Chillon</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   id  first      last\n",
       "0   1   Alex  Anderson\n",
       "1   2    Amy  Ackerman\n",
       "2   3  Allen       Ali\n",
       "3  10  Chris   Chillon"
      ]
     },
     "execution_count": 45,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 행을 만듭니다.\n",
    "row = pd.Series([10, 'Chris', 'Chillon'], index=['id', 'first', 'last'])\n",
    "\n",
    "# 행을 추가합니다.\n",
    "dataframe_a.append(row, ignore_index=True)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 3.19 데이터프레임 병합하기   \n",
    "   \n",
    "Inner join을 하려면 on 매개변수에 병합 열을 지정하여 merge 메서드를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 48,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>employee_id</th>\n",
       "      <th>name</th>\n",
       "      <th>total_sales</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>3</td>\n",
       "      <td>Alice Bees</td>\n",
       "      <td>23456</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>4</td>\n",
       "      <td>Tim Horton</td>\n",
       "      <td>2512</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "  employee_id        name  total_sales\n",
       "0           3  Alice Bees        23456\n",
       "1           4  Tim Horton         2512"
      ]
     },
     "execution_count": 48,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터프레임을 만듭니다.\n",
    "employee_data = {'employee_id': ['1', '2', '3', '4'],\n",
    "                 'name': ['Amy Jones', 'Allen Keys', 'Alice Bees', 'Tim Horton']}\n",
    "dataframe_employees = pd.DataFrame(employee_data, columns = ['employee_id', 'name'])\n",
    "\n",
    "# 데이터프레임을 만듭니다.\n",
    "sales_data = {'employee_id': ['3', '4', '5', '6'],\n",
    "              'total_sales': [23456, 2512, 2345, 1455]}\n",
    "dataframe_sales = pd.DataFrame(sales_data, columns = ['employee_id', 'total_sales'])\n",
    "\n",
    "# 데이터프레임을 병합합니다.\n",
    "pd.merge(dataframe_employees, dataframe_sales, on='employee_id')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "merge는 기본적으로 inner join을 수행합니다.   \n",
    "Outer join이 필요하다면 how 매개변수로 지정할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 49,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>employee_id</th>\n",
       "      <th>name</th>\n",
       "      <th>total_sales</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>1</td>\n",
       "      <td>Amy Jones</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>2</td>\n",
       "      <td>Allen Keys</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>3</td>\n",
       "      <td>Alice Bees</td>\n",
       "      <td>23456.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>4</td>\n",
       "      <td>Tim Horton</td>\n",
       "      <td>2512.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>4</th>\n",
       "      <td>5</td>\n",
       "      <td>NaN</td>\n",
       "      <td>2345.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>5</th>\n",
       "      <td>6</td>\n",
       "      <td>NaN</td>\n",
       "      <td>1455.0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "  employee_id        name  total_sales\n",
       "0           1   Amy Jones          NaN\n",
       "1           2  Allen Keys          NaN\n",
       "2           3  Alice Bees      23456.0\n",
       "3           4  Tim Horton       2512.0\n",
       "4           5         NaN       2345.0\n",
       "5           6         NaN       1455.0"
      ]
     },
     "execution_count": 49,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터프레임을 병합합니다.\n",
    "pd.merge(dataframe_employees, dataframe_sales, on='employee_id', how='outer')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "같은 매개변수로 left join과 right join을 지정할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 50,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>employee_id</th>\n",
       "      <th>name</th>\n",
       "      <th>total_sales</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>1</td>\n",
       "      <td>Amy Jones</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>2</td>\n",
       "      <td>Allen Keys</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>3</td>\n",
       "      <td>Alice Bees</td>\n",
       "      <td>23456.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>4</td>\n",
       "      <td>Tim Horton</td>\n",
       "      <td>2512.0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "  employee_id        name  total_sales\n",
       "0           1   Amy Jones          NaN\n",
       "1           2  Allen Keys          NaN\n",
       "2           3  Alice Bees      23456.0\n",
       "3           4  Tim Horton       2512.0"
      ]
     },
     "execution_count": 50,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터프레임을 병합합니다.\n",
    "pd.merge(dataframe_employees, dataframe_sales, on='employee_id', how='left')"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 51,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>employee_id</th>\n",
       "      <th>name</th>\n",
       "      <th>total_sales</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>3</td>\n",
       "      <td>Alice Bees</td>\n",
       "      <td>23456</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>4</td>\n",
       "      <td>Tim Horton</td>\n",
       "      <td>2512</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>5</td>\n",
       "      <td>NaN</td>\n",
       "      <td>2345</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>6</td>\n",
       "      <td>NaN</td>\n",
       "      <td>1455</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "  employee_id        name  total_sales\n",
       "0           3  Alice Bees        23456\n",
       "1           4  Tim Horton         2512\n",
       "2           5         NaN         2345\n",
       "3           6         NaN         1455"
      ]
     },
     "execution_count": 51,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터프레임을 병합합니다.\n",
    "pd.merge(dataframe_employees, dataframe_sales, on='employee_id', how='right')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "각 데이터프레임에서 병합하기 위한 열 이름을 지정할 수도 있습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 52,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>employee_id</th>\n",
       "      <th>name</th>\n",
       "      <th>total_sales</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>3</td>\n",
       "      <td>Alice Bees</td>\n",
       "      <td>23456</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>4</td>\n",
       "      <td>Tim Horton</td>\n",
       "      <td>2512</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "  employee_id        name  total_sales\n",
       "0           3  Alice Bees        23456\n",
       "1           4  Tim Horton         2512"
      ]
     },
     "execution_count": 52,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터프레임을 병합합니다.\n",
    "pd.merge(dataframe_employees, dataframe_sales, left_on='employee_id', right_on='employee_id')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "두 열을 기준으로 병합하는 대신 각 데이터프레임의 인덱스를 기준으로 병합하려면   \n",
    "left_index=True와 right_index=True를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 53,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/html": [
       "<div>\n",
       "<style scoped>\n",
       "    .dataframe tbody tr th:only-of-type {\n",
       "        vertical-align: middle;\n",
       "    }\n",
       "\n",
       "    .dataframe tbody tr th {\n",
       "        vertical-align: top;\n",
       "    }\n",
       "\n",
       "    .dataframe thead th {\n",
       "        text-align: right;\n",
       "    }\n",
       "</style>\n",
       "<table border=\"1\" class=\"dataframe\">\n",
       "  <thead>\n",
       "    <tr style=\"text-align: right;\">\n",
       "      <th></th>\n",
       "      <th>employee_id_x</th>\n",
       "      <th>name</th>\n",
       "      <th>employee_id_y</th>\n",
       "      <th>total_sales</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>1</td>\n",
       "      <td>Amy Jones</td>\n",
       "      <td>3</td>\n",
       "      <td>23456</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>2</td>\n",
       "      <td>Allen Keys</td>\n",
       "      <td>4</td>\n",
       "      <td>2512</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>2</th>\n",
       "      <td>3</td>\n",
       "      <td>Alice Bees</td>\n",
       "      <td>5</td>\n",
       "      <td>2345</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>3</th>\n",
       "      <td>4</td>\n",
       "      <td>Tim Horton</td>\n",
       "      <td>6</td>\n",
       "      <td>1455</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "  employee_id_x        name employee_id_y  total_sales\n",
       "0             1   Amy Jones             3        23456\n",
       "1             2  Allen Keys             4         2512\n",
       "2             3  Alice Bees             5         2345\n",
       "3             4  Tim Horton             6         1455"
      ]
     },
     "execution_count": 53,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터프레임을 병합합니다.\n",
    "pd.merge(dataframe_employees, dataframe_sales, left_index=True, right_index=True)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "복잡한 데이터를 사용해야 할 경우가 많습니다.   \n",
    "데이터가 언제나 한 덩어리로 제공되는 것은 아닙니다.   \n",
    "여러 쿼리나 파일로부터 온 다양한 데이터셋을 다루게 됩니다.   \n",
    "모든 데이터를 하나로 모으려면 각 데이터 쿼리나 파일을   \n",
    "pandas의 개별 데이터프레임으로 만든 다음 병합하여 하나의 데이터프레임으로 합칩니다.   \n",
    "   \n",
    "merge 연산을 위해 세 가지 사항을 지정해야 합니다.   \n",
    "1. 병합할 두 개의 데이터프레임을 지정해야 합니다.   \n",
    "2. 병합하기 위한 열 이름을 지정해야 합니다.   \n",
    "3. 수행하려는 병합 연산의 종류를 지정해야 합니다. 이는 how 매개변수로 지정합니다. merge는 네 개의 join type을 지원합니다.\n",
    " 1. inner - 두 데이터프레임에 모두 존재하는 행만 반환됩니다.\n",
    " 2. outer - 두 데이터프레임의 모든 행이 반환됩니다. 한 쪽 데이터프레임에만 존재하는 행의 누락된 값은 NaN으로 채워집니다.\n",
    " 3. left - 왼쪽 데이터프레임의 모든 행이 반환됩니다. 누락된 값은 NaN으로 채워집니다.\n",
    " 4. right - 오른쪽 데이터프레임의 모든 행이 반환됩니다. 누락된 값은 NaN으로 채워집니다."
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.8.5"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
```
