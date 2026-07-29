---
title: "Dataframe in Pandas"
date: 2022-05-24
category: programming
tags: ["python", "pandas", "dataframe"]
legacyPath: "/posts/Dataframe-in-Pandas/"
source: manual
---

## Intro
***

 Pandas는 data analysis에 유용한 python package 입니다. Pandas는 쉽고 편리하게 data를 다룰 수 있도록 유연한 structure를 제공하는데, 그 중 하나가 바로 Dataframe 입니다.

 이 post는 pandas 공식 가이드 내 [10 minutes to pandas](https://pandas.pydata.org/pandas-docs/stable/user_guide/10min.html, "10 minutes to pandas")를 참고 했습니다.
 <br><br>
 

## Dataframe이란? 
***
 Dataframe은 data를 직사각형 모양 table에 저장한 구조입니다. Row는 숫자, 문자, 논리 등 여러 가지 data type이 들어갈 수 있습니다. Column은 동일한 data type이 들어갈 수 있습니다. 즉, 각 column에 아마도 서로 다른 data type을 지닌 2d array data 구조로 요약할 수 있습니다. 참고로 1d array data 구조는 Series 입니다.

 R 언어를 알고 계시는 분들은 data.frame이 친숙할 것입니다. Pandas의 dataframe과 유사한 구조입니다.

 Dataframe의 주요 요소입니다.

 * Data: Dataframe 자체가 들어갈 수 있고 그 외 series, numpy의 ndarray, 2d ndarray, dictionary가 들어갈 수 있습니다.

 * Index: Numpy의 array나 2d array와 비슷하지만, dataframe에는 index가 존재한다는 차이가 있습니다.

 * Column: Column의 index도 존재하여 data를 손쉽게 다룰 수 있도록 도와줍니다.

 ![Post-Image](../../assets/post/DATAFRAME_df.webp)
 _Dataframe 주요 요소_
 <br><br>
 

## Manipulating Dataframe
***


## &nbsp;&nbsp;Object creation
***
 Dataframe을 생성합니다.

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "### Import required libraries\n",
    "\n",
    "#### Numpy와 Pandas를 import 합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "import numpy as np\n",
    "import pandas as pd"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "***\n",
    "***\n",
    "\n",
    "### Object creation\n",
    "\n",
    "#### pandas에 list를 넘겨 'Series'를 만들어 봅시다.\n",
    "#### Index는 기본 설정을 사용합니다. 0부터 시작하여 1씩 증가합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0    1\n",
       "1    3\n",
       "2    5\n",
       "3    7\n",
       "4    9\n",
       "dtype: int64"
      ]
     },
     "execution_count": 2,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "s = pd.Series([1, 3, 5, 7, 9])\n",
    "s"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### pandas에 NumPy array를 넘겨 'DataFrame'을 만들어 봅시다.\n",
    "#### Index는 연속된 날짜를, column name은 A, B, C를 사용합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "DatetimeIndex(['2020-07-17', '2020-07-18', '2020-07-19', '2020-07-20',\n",
       "               '2020-07-21', '2020-07-22'],\n",
       "              dtype='datetime64[ns]', freq='D')"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "dates = pd.date_range('20200717', periods=6)\n",
    "dates"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-17</td>\n",
       "      <td>-0.649036</td>\n",
       "      <td>1.194016</td>\n",
       "      <td>-1.671976</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-18</td>\n",
       "      <td>-0.551816</td>\n",
       "      <td>-2.254361</td>\n",
       "      <td>-0.109569</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-19</td>\n",
       "      <td>-0.914518</td>\n",
       "      <td>-0.385325</td>\n",
       "      <td>0.259745</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-20</td>\n",
       "      <td>-0.029484</td>\n",
       "      <td>0.119984</td>\n",
       "      <td>-0.299513</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-21</td>\n",
       "      <td>-0.302863</td>\n",
       "      <td>0.004918</td>\n",
       "      <td>-0.671543</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-22</td>\n",
       "      <td>-0.615118</td>\n",
       "      <td>-1.382085</td>\n",
       "      <td>0.226391</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C\n",
       "2020-07-17 -0.649036  1.194016 -1.671976\n",
       "2020-07-18 -0.551816 -2.254361 -0.109569\n",
       "2020-07-19 -0.914518 -0.385325  0.259745\n",
       "2020-07-20 -0.029484  0.119984 -0.299513\n",
       "2020-07-21 -0.302863  0.004918 -0.671543\n",
       "2020-07-22 -0.615118 -1.382085  0.226391"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df = pd.DataFrame(\n",
    "        np.random.randn(6, 3), # NumPy array\n",
    "        index=dates,\n",
    "        columns=list('ABC')\n",
    "        )\n",
    "df"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "***\n",
    "\n",
    "#### pandas에 series와 유사하게 변형될 수 있는 형태의 dictionary를 넘겨 'DataFrame'을 만들어 봅시다.\n",
    "#### Index는 기본 설정이, column name은 dictionary의 key가 들어갑니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>E</th>\n",
       "      <th>F</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>1.0</td>\n",
       "      <td>2020-07-01</td>\n",
       "      <td>1.0</td>\n",
       "      <td>3</td>\n",
       "      <td>test</td>\n",
       "      <td>foo</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>1.0</td>\n",
       "      <td>2020-07-01</td>\n",
       "      <td>1.0</td>\n",
       "      <td>3</td>\n",
       "      <td>train</td>\n",
       "      <td>foo</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2</td>\n",
       "      <td>1.0</td>\n",
       "      <td>2020-07-01</td>\n",
       "      <td>1.0</td>\n",
       "      <td>3</td>\n",
       "      <td>test</td>\n",
       "      <td>foo</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>3</td>\n",
       "      <td>1.0</td>\n",
       "      <td>2020-07-01</td>\n",
       "      <td>1.0</td>\n",
       "      <td>3</td>\n",
       "      <td>train</td>\n",
       "      <td>foo</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "     A          B    C  D      E    F\n",
       "0  1.0 2020-07-01  1.0  3   test  foo\n",
       "1  1.0 2020-07-01  1.0  3  train  foo\n",
       "2  1.0 2020-07-01  1.0  3   test  foo\n",
       "3  1.0 2020-07-01  1.0  3  train  foo"
      ]
     },
     "execution_count": 7,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df2 = pd.DataFrame({\n",
    "            'A': 1.,\n",
    "            'B': pd.Timestamp('20200701'),\n",
    "            'C': pd.Series(1, index=list(range(4)), dtype='float32'),\n",
    "            'D': np.array([3] * 4, dtype='int32'),\n",
    "            'E': pd.Categorical([\"test\", \"train\", \"test\", \"train\"]),\n",
    "            'F': 'foo'\n",
    "            })\n",
    "df2"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### df2는 column별로 다른 data type으로 구성되어 있습니다.\n",
    "#### 소수점은 'float64', 문자는 'object' 자료형이 할당됩니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "A           float64\n",
       "B    datetime64[ns]\n",
       "C           float32\n",
       "D             int32\n",
       "E          category\n",
       "F            object\n",
       "dtype: object"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df2.dtypes"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "***\n",
    "\n",
    "#### df2.\\<TAB\\> 혹은 dir(df2)를 실행하면 DataFrame(df2)이 가지고 있는 속성을 확인할 수 있습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "['A',\n",
       " 'B',\n",
       " 'C',\n",
       " '...',\n",
       " 'var',\n",
       " 'where',\n",
       " 'xs']"
      ]
     },
     "execution_count": 10,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "dir(df2)"
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
 <br><br>
 

## &nbsp;&nbsp;Viewing data
***
 생성한 dataframe을 확인합니다. 간단한 statistics summary, 행렬변환, 정렬 등을 시도해 보겠습니다.

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "#### 앞서 진행한 import와 DataFrame 생성을 반복합니다."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "import numpy as np\n",
    "import pandas as pd\n",
    "\n",
    "dates = pd.date_range('20200724', periods=6)\n",
    "df = pd.DataFrame(\n",
    "        np.random.randn(6, 4),\n",
    "        index=dates,\n",
    "        columns=list('ABCD')\n",
    "        )"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "***\n",
    "\n",
    "### Viewing data\n",
    "\n",
    "#### DataFrame의 처음과 끝 부분을 출력해 봅시다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>-0.165906</td>\n",
       "      <td>1.178056</td>\n",
       "      <td>0.018960</td>\n",
       "      <td>0.032754</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.194626</td>\n",
       "      <td>0.387675</td>\n",
       "      <td>0.400168</td>\n",
       "      <td>0.236478</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-0.667234</td>\n",
       "      <td>-0.513509</td>\n",
       "      <td>-1.760879</td>\n",
       "      <td>-1.337563</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-1.291120</td>\n",
       "      <td>0.151518</td>\n",
       "      <td>0.231840</td>\n",
       "      <td>0.066671</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>0.229097</td>\n",
       "      <td>1.285831</td>\n",
       "      <td>-0.852687</td>\n",
       "      <td>0.366998</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-24 -0.165906  1.178056  0.018960  0.032754\n",
       "2020-07-25 -0.194626  0.387675  0.400168  0.236478\n",
       "2020-07-26 -0.667234 -0.513509 -1.760879 -1.337563\n",
       "2020-07-27 -1.291120  0.151518  0.231840  0.066671\n",
       "2020-07-28  0.229097  1.285831 -0.852687  0.366998"
      ]
     },
     "execution_count": 2,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df.head()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-1.291120</td>\n",
       "      <td>0.151518</td>\n",
       "      <td>0.231840</td>\n",
       "      <td>0.066671</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>0.229097</td>\n",
       "      <td>1.285831</td>\n",
       "      <td>-0.852687</td>\n",
       "      <td>0.366998</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>1.640661</td>\n",
       "      <td>-0.006239</td>\n",
       "      <td>0.494051</td>\n",
       "      <td>-1.189063</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-27 -1.291120  0.151518  0.231840  0.066671\n",
       "2020-07-28  0.229097  1.285831 -0.852687  0.366998\n",
       "2020-07-29  1.640661 -0.006239  0.494051 -1.189063"
      ]
     },
     "execution_count": 3,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df.tail(3)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "#### DataFrame의 index와 column name도 출력해 봅시다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "DatetimeIndex(['2020-07-24', '2020-07-25', '2020-07-26', '2020-07-27',\n",
       "               '2020-07-28', '2020-07-29'],\n",
       "              dtype='datetime64[ns]', freq='D')"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df.index"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "Index(['A', 'B', 'C', 'D'], dtype='object')"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df.columns"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "#### describe()는 DataFrame의 요약통계치를 빠르게 보여줍니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>count</td>\n",
       "      <td>6.000000</td>\n",
       "      <td>6.000000</td>\n",
       "      <td>6.000000</td>\n",
       "      <td>6.000000</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>mean</td>\n",
       "      <td>-0.074855</td>\n",
       "      <td>0.413889</td>\n",
       "      <td>-0.244758</td>\n",
       "      <td>-0.303954</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>std</td>\n",
       "      <td>0.988760</td>\n",
       "      <td>0.700048</td>\n",
       "      <td>0.886190</td>\n",
       "      <td>0.754287</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>min</td>\n",
       "      <td>-1.291120</td>\n",
       "      <td>-0.513509</td>\n",
       "      <td>-1.760879</td>\n",
       "      <td>-1.337563</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>25%</td>\n",
       "      <td>-0.549082</td>\n",
       "      <td>0.033200</td>\n",
       "      <td>-0.634775</td>\n",
       "      <td>-0.883609</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>50%</td>\n",
       "      <td>-0.180266</td>\n",
       "      <td>0.269597</td>\n",
       "      <td>0.125400</td>\n",
       "      <td>0.049712</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>75%</td>\n",
       "      <td>0.130346</td>\n",
       "      <td>0.980461</td>\n",
       "      <td>0.358086</td>\n",
       "      <td>0.194027</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>max</td>\n",
       "      <td>1.640661</td>\n",
       "      <td>1.285831</td>\n",
       "      <td>0.494051</td>\n",
       "      <td>0.366998</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "              A         B         C         D\n",
       "count  6.000000  6.000000  6.000000  6.000000\n",
       "mean  -0.074855  0.413889 -0.244758 -0.303954\n",
       "std    0.988760  0.700048  0.886190  0.754287\n",
       "min   -1.291120 -0.513509 -1.760879 -1.337563\n",
       "25%   -0.549082  0.033200 -0.634775 -0.883609\n",
       "50%   -0.180266  0.269597  0.125400  0.049712\n",
       "75%    0.130346  0.980461  0.358086  0.194027\n",
       "max    1.640661  1.285831  0.494051  0.366998"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df.describe()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "*** \n",
    "\n",
    "#### DataFrame의 행과 열을 뒤바꿀 수도 있습니다.\n"
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
       "      <th>2020-07-24</th>\n",
       "      <th>2020-07-25</th>\n",
       "      <th>2020-07-26</th>\n",
       "      <th>2020-07-27</th>\n",
       "      <th>2020-07-28</th>\n",
       "      <th>2020-07-29</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>A</td>\n",
       "      <td>-0.165906</td>\n",
       "      <td>-0.194626</td>\n",
       "      <td>-0.667234</td>\n",
       "      <td>-1.291120</td>\n",
       "      <td>0.229097</td>\n",
       "      <td>1.640661</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>B</td>\n",
       "      <td>1.178056</td>\n",
       "      <td>0.387675</td>\n",
       "      <td>-0.513509</td>\n",
       "      <td>0.151518</td>\n",
       "      <td>1.285831</td>\n",
       "      <td>-0.006239</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>C</td>\n",
       "      <td>0.018960</td>\n",
       "      <td>0.400168</td>\n",
       "      <td>-1.760879</td>\n",
       "      <td>0.231840</td>\n",
       "      <td>-0.852687</td>\n",
       "      <td>0.494051</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>D</td>\n",
       "      <td>0.032754</td>\n",
       "      <td>0.236478</td>\n",
       "      <td>-1.337563</td>\n",
       "      <td>0.066671</td>\n",
       "      <td>0.366998</td>\n",
       "      <td>-1.189063</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   2020-07-24  2020-07-25  2020-07-26  2020-07-27  2020-07-28  2020-07-29\n",
       "A   -0.165906   -0.194626   -0.667234   -1.291120    0.229097    1.640661\n",
       "B    1.178056    0.387675   -0.513509    0.151518    1.285831   -0.006239\n",
       "C    0.018960    0.400168   -1.760879    0.231840   -0.852687    0.494051\n",
       "D    0.032754    0.236478   -1.337563    0.066671    0.366998   -1.189063"
      ]
     },
     "execution_count": 7,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df.T"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "#### DataFrame의 정렬기능은 index에 따라, column name에 따라, 혹은 특정 value에 따라 가능합니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>-0.165906</td>\n",
       "      <td>1.178056</td>\n",
       "      <td>0.018960</td>\n",
       "      <td>0.032754</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.194626</td>\n",
       "      <td>0.387675</td>\n",
       "      <td>0.400168</td>\n",
       "      <td>0.236478</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-0.667234</td>\n",
       "      <td>-0.513509</td>\n",
       "      <td>-1.760879</td>\n",
       "      <td>-1.337563</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-1.291120</td>\n",
       "      <td>0.151518</td>\n",
       "      <td>0.231840</td>\n",
       "      <td>0.066671</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>0.229097</td>\n",
       "      <td>1.285831</td>\n",
       "      <td>-0.852687</td>\n",
       "      <td>0.366998</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>1.640661</td>\n",
       "      <td>-0.006239</td>\n",
       "      <td>0.494051</td>\n",
       "      <td>-1.189063</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-24 -0.165906  1.178056  0.018960  0.032754\n",
       "2020-07-25 -0.194626  0.387675  0.400168  0.236478\n",
       "2020-07-26 -0.667234 -0.513509 -1.760879 -1.337563\n",
       "2020-07-27 -1.291120  0.151518  0.231840  0.066671\n",
       "2020-07-28  0.229097  1.285831 -0.852687  0.366998\n",
       "2020-07-29  1.640661 -0.006239  0.494051 -1.189063"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df.sort_index() # sorting by index"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 9,
   "metadata": {
    "scrolled": true
   },
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
       "      <th>D</th>\n",
       "      <th>C</th>\n",
       "      <th>B</th>\n",
       "      <th>A</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.032754</td>\n",
       "      <td>0.018960</td>\n",
       "      <td>1.178056</td>\n",
       "      <td>-0.165906</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>0.236478</td>\n",
       "      <td>0.400168</td>\n",
       "      <td>0.387675</td>\n",
       "      <td>-0.194626</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.337563</td>\n",
       "      <td>-1.760879</td>\n",
       "      <td>-0.513509</td>\n",
       "      <td>-0.667234</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>0.066671</td>\n",
       "      <td>0.231840</td>\n",
       "      <td>0.151518</td>\n",
       "      <td>-1.291120</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>0.366998</td>\n",
       "      <td>-0.852687</td>\n",
       "      <td>1.285831</td>\n",
       "      <td>0.229097</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>-1.189063</td>\n",
       "      <td>0.494051</td>\n",
       "      <td>-0.006239</td>\n",
       "      <td>1.640661</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   D         C         B         A\n",
       "2020-07-24  0.032754  0.018960  1.178056 -0.165906\n",
       "2020-07-25  0.236478  0.400168  0.387675 -0.194626\n",
       "2020-07-26 -1.337563 -1.760879 -0.513509 -0.667234\n",
       "2020-07-27  0.066671  0.231840  0.151518 -1.291120\n",
       "2020-07-28  0.366998 -0.852687  1.285831  0.229097\n",
       "2020-07-29 -1.189063  0.494051 -0.006239  1.640661"
      ]
     },
     "execution_count": 9,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df.sort_index(axis=1, ascending=False) # sorting by column name in descending order"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 11,
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-0.667234</td>\n",
       "      <td>-0.513509</td>\n",
       "      <td>-1.760879</td>\n",
       "      <td>-1.337563</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>1.640661</td>\n",
       "      <td>-0.006239</td>\n",
       "      <td>0.494051</td>\n",
       "      <td>-1.189063</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-1.291120</td>\n",
       "      <td>0.151518</td>\n",
       "      <td>0.231840</td>\n",
       "      <td>0.066671</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.194626</td>\n",
       "      <td>0.387675</td>\n",
       "      <td>0.400168</td>\n",
       "      <td>0.236478</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>-0.165906</td>\n",
       "      <td>1.178056</td>\n",
       "      <td>0.018960</td>\n",
       "      <td>0.032754</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>0.229097</td>\n",
       "      <td>1.285831</td>\n",
       "      <td>-0.852687</td>\n",
       "      <td>0.366998</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-26 -0.667234 -0.513509 -1.760879 -1.337563\n",
       "2020-07-29  1.640661 -0.006239  0.494051 -1.189063\n",
       "2020-07-27 -1.291120  0.151518  0.231840  0.066671\n",
       "2020-07-25 -0.194626  0.387675  0.400168  0.236478\n",
       "2020-07-24 -0.165906  1.178056  0.018960  0.032754\n",
       "2020-07-28  0.229097  1.285831 -0.852687  0.366998"
      ]
     },
     "execution_count": 11,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "df.sort_values(by='B') # sorting by values in 'B' column"
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
 <br><br>
 

## &nbsp;&nbsp;Selection
***
 Data를 선택하고 변경하는 방법입니다.

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 앞서 진행한 import와 DataFrame 생성을 반복합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "import numpy as np\n",
    "import pandas as pd\n",
    "\n",
    "dates = pd.date_range('20200724', periods=6)\n",
    "df = pd.DataFrame(\n",
    "        np.random.randn(6, 4),\n",
    "        index=dates,\n",
    "        columns=list('ABCD')\n",
    "        )"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### Data를 분석하려면 특정 값을 선택해서 다루거나 출력할 필요가 있습니다.\n",
    "\n",
    "#### 이 때 사용할 수 있는 기능들을 살펴 보겠습니다.\n",
    "\n",
    "***\n",
    "\n",
    "### Getting\n",
    "\n",
    "#### 하나의 column을 선택합니다. 'Series' 형태의 결과를 생성합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-07-24    0.769295\n",
       "2020-07-25   -0.501942\n",
       "2020-07-26   -1.569191\n",
       "2020-07-27   -0.861305\n",
       "2020-07-28    1.572154\n",
       "2020-07-29   -0.287700\n",
       "Freq: D, Name: A, dtype: float64"
      ]
     },
     "execution_count": 2,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df['A'] # selecting a single column"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### [ ]를 이용하여 복수의 행을 잘라 선택할 수 있습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.769295</td>\n",
       "      <td>0.844431</td>\n",
       "      <td>-0.918174</td>\n",
       "      <td>-0.047887</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>0.097646</td>\n",
       "      <td>-0.963513</td>\n",
       "      <td>-0.260229</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>0.257844</td>\n",
       "      <td>-1.276382</td>\n",
       "      <td>0.620355</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-24  0.769295  0.844431 -0.918174 -0.047887\n",
       "2020-07-25 -0.501942  0.097646 -0.963513 -0.260229\n",
       "2020-07-26 -1.569191  0.257844 -1.276382  0.620355"
      ]
     },
     "execution_count": 3,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df[0:3] # selecting rows"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>0.097646</td>\n",
       "      <td>-0.963513</td>\n",
       "      <td>-0.260229</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>0.257844</td>\n",
       "      <td>-1.276382</td>\n",
       "      <td>0.620355</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.861305</td>\n",
       "      <td>-0.123141</td>\n",
       "      <td>-0.729888</td>\n",
       "      <td>0.465927</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.227942</td>\n",
       "      <td>0.125129</td>\n",
       "      <td>0.278978</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-25 -0.501942  0.097646 -0.963513 -0.260229\n",
       "2020-07-26 -1.569191  0.257844 -1.276382  0.620355\n",
       "2020-07-27 -0.861305 -0.123141 -0.729888  0.465927\n",
       "2020-07-28  1.572154  0.227942  0.125129  0.278978"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df['2020-07-25':'2020-07-28'] # selecting rows"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "### Selection by label\n",
    "\n",
    "\n",
    "#### Index name이나 column name으로 선택할 수 있습니다.\n",
    "\n",
    "#### 'loc'을 사용합니다.\n",
    "\n",
    "#### 첫 번째 Index에 해당하는 모든 데이터를 가져와 보겠습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "A    0.769295\n",
       "B    0.844431\n",
       "C   -0.918174\n",
       "D   -0.047887\n",
       "Name: 2020-07-24 00:00:00, dtype: float64"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.loc[dates[0]]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 두 개의 column name에 해당하는 모든 데이터를 가져와 보겠습니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.769295</td>\n",
       "      <td>0.844431</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>0.097646</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>0.257844</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.861305</td>\n",
       "      <td>-0.123141</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.227942</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>-0.287700</td>\n",
       "      <td>0.835631</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B\n",
       "2020-07-24  0.769295  0.844431\n",
       "2020-07-25 -0.501942  0.097646\n",
       "2020-07-26 -1.569191  0.257844\n",
       "2020-07-27 -0.861305 -0.123141\n",
       "2020-07-28  1.572154  0.227942\n",
       "2020-07-29 -0.287700  0.835631"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.loc[:, ['A', 'B']]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 이번에는 index name과 column name 모두 조건에 만족하는 데이터를 가져와 보겠습니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>0.097646</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>0.257844</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B\n",
       "2020-07-25 -0.501942  0.097646\n",
       "2020-07-26 -1.569191  0.257844"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.loc['2020-07-25':'2020-07-26', ['A', 'B']]"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 9,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "A   -0.501942\n",
       "B    0.097646\n",
       "Name: 2020-07-25 00:00:00, dtype: float64"
      ]
     },
     "execution_count": 9,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.loc['2020-07-25', ['A', 'B']]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 특정 위치의 한 개 값을 가져와 보겠습니다.\n",
    "\n",
    "#### 'loc'과 'at' 모두 사용할 수 있습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.7692952378187148"
      ]
     },
     "execution_count": 10,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.loc[dates[0], 'A']"
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
       "0.7692952378187148"
      ]
     },
     "execution_count": 11,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.at[dates[0], 'A']"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "### Selection by position\n",
    "\n",
    "#### 이번에는 index와 column 모두 위치를 기준으로 데이터를 선택하는 방법에 대해서 알아보겠습니다.\n",
    "\n",
    "#### 여기서 사용하는 위치는 python에서 사용하는 index 개념과 동일합니다.\n",
    "\n",
    "#### 'iloc'을 사용합니다.\n",
    "\n",
    "#### 먼저 하나의 단일 위치를 사용할 수 있습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "A   -0.861305\n",
       "B   -0.123141\n",
       "C   -0.729888\n",
       "D    0.465927\n",
       "Name: 2020-07-27 00:00:00, dtype: float64"
      ]
     },
     "execution_count": 12,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.iloc[3]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 다음은 행과 열 모두 범위 단위 인덱스 정보를 사용한 예 입니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 13,
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.861305</td>\n",
       "      <td>-0.123141</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.227942</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B\n",
       "2020-07-27 -0.861305 -0.123141\n",
       "2020-07-28  1.572154  0.227942"
      ]
     },
     "execution_count": 13,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.iloc[3:5, 0:2]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 또한 list 형태로 위치를 사용할 수도 있습니다.\n"
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
       "      <th>A</th>\n",
       "      <th>C</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>-0.963513</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>-1.276382</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.125129</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         C\n",
       "2020-07-25 -0.501942 -0.963513\n",
       "2020-07-26 -1.569191 -1.276382\n",
       "2020-07-28  1.572154  0.125129"
      ]
     },
     "execution_count": 14,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.iloc[\n",
    "        [1, 2, 4],\n",
    "        [0, 2]\n",
    "        ]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### label을 사용했을 때와 마찬가지로 행이나 열을 선택할 수도 있습니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>0.097646</td>\n",
       "      <td>-0.963513</td>\n",
       "      <td>-0.260229</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>0.257844</td>\n",
       "      <td>-1.276382</td>\n",
       "      <td>0.620355</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-25 -0.501942  0.097646 -0.963513 -0.260229\n",
       "2020-07-26 -1.569191  0.257844 -1.276382  0.620355"
      ]
     },
     "execution_count": 17,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.iloc[1:3, :] # selecting by row index"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 18,
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
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.844431</td>\n",
       "      <td>-0.918174</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>0.097646</td>\n",
       "      <td>-0.963513</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>0.257844</td>\n",
       "      <td>-1.276382</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.123141</td>\n",
       "      <td>-0.729888</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>0.227942</td>\n",
       "      <td>0.125129</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>0.835631</td>\n",
       "      <td>1.684919</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   B         C\n",
       "2020-07-24  0.844431 -0.918174\n",
       "2020-07-25  0.097646 -0.963513\n",
       "2020-07-26  0.257844 -1.276382\n",
       "2020-07-27 -0.123141 -0.729888\n",
       "2020-07-28  0.227942  0.125129\n",
       "2020-07-29  0.835631  1.684919"
      ]
     },
     "execution_count": 18,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.iloc[:, 1:3] # selecting by column index"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 역시 특정 위치를 선택하여 하나의 value만 선택할 수도 있습니다.\n",
    "\n",
    "#### 'iloc'과 'iat' 모두 사용할 수 있습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 19,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.09764616018895249"
      ]
     },
     "execution_count": 19,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.iloc[1, 1]"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 20,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0.09764616018895249"
      ]
     },
     "execution_count": 20,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.iat[1, 1]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "### Boolean indexing\n",
    "\n",
    "#### 논리에 따라 해당되는 값을 선택하는 방법을 알아보겠습니다.\n",
    "\n",
    "#### 특정 column의 값들 중 조건에 해당하는 data만 선택하는 방법입니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 21,
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.769295</td>\n",
       "      <td>0.844431</td>\n",
       "      <td>-0.918174</td>\n",
       "      <td>-0.047887</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.227942</td>\n",
       "      <td>0.125129</td>\n",
       "      <td>0.278978</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-24  0.769295  0.844431 -0.918174 -0.047887\n",
       "2020-07-28  1.572154  0.227942  0.125129  0.278978"
      ]
     },
     "execution_count": 21,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df[df['A'] > 0] # select if the 'A' columne's value is greater than 0 "
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 전체 DataFrame 값 중 조건을 충족하는 data만 선택할 수도 있습니다.\n",
    "\n",
    "#### 이 때 조건을 충족하지 못하는 data는 모두 NaN으로 표기됩니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.769295</td>\n",
       "      <td>0.844431</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>NaN</td>\n",
       "      <td>0.097646</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>NaN</td>\n",
       "      <td>0.257844</td>\n",
       "      <td>NaN</td>\n",
       "      <td>0.620355</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>0.465927</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.227942</td>\n",
       "      <td>0.125129</td>\n",
       "      <td>0.278978</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>NaN</td>\n",
       "      <td>0.835631</td>\n",
       "      <td>1.684919</td>\n",
       "      <td>0.506765</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-24  0.769295  0.844431       NaN       NaN\n",
       "2020-07-25       NaN  0.097646       NaN       NaN\n",
       "2020-07-26       NaN  0.257844       NaN  0.620355\n",
       "2020-07-27       NaN       NaN       NaN  0.465927\n",
       "2020-07-28  1.572154  0.227942  0.125129  0.278978\n",
       "2020-07-29       NaN  0.835631  1.684919  0.506765"
      ]
     },
     "execution_count": 22,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df[df > 0]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### isin() method를 사용해서 filter 할 수도 있습니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>E</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.769295</td>\n",
       "      <td>0.844431</td>\n",
       "      <td>-0.918174</td>\n",
       "      <td>-0.047887</td>\n",
       "      <td>one</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>0.097646</td>\n",
       "      <td>-0.963513</td>\n",
       "      <td>-0.260229</td>\n",
       "      <td>one</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>0.257844</td>\n",
       "      <td>-1.276382</td>\n",
       "      <td>0.620355</td>\n",
       "      <td>two</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.861305</td>\n",
       "      <td>-0.123141</td>\n",
       "      <td>-0.729888</td>\n",
       "      <td>0.465927</td>\n",
       "      <td>three</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.227942</td>\n",
       "      <td>0.125129</td>\n",
       "      <td>0.278978</td>\n",
       "      <td>four</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>-0.287700</td>\n",
       "      <td>0.835631</td>\n",
       "      <td>1.684919</td>\n",
       "      <td>0.506765</td>\n",
       "      <td>three</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D      E\n",
       "2020-07-24  0.769295  0.844431 -0.918174 -0.047887    one\n",
       "2020-07-25 -0.501942  0.097646 -0.963513 -0.260229    one\n",
       "2020-07-26 -1.569191  0.257844 -1.276382  0.620355    two\n",
       "2020-07-27 -0.861305 -0.123141 -0.729888  0.465927  three\n",
       "2020-07-28  1.572154  0.227942  0.125129  0.278978   four\n",
       "2020-07-29 -0.287700  0.835631  1.684919  0.506765  three"
      ]
     },
     "execution_count": 23,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df2 = df.copy()\n",
    "df2['E'] = ['one', 'one', 'two', 'three', 'four', 'three']\n",
    "df2"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 24,
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>E</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>0.257844</td>\n",
       "      <td>-1.276382</td>\n",
       "      <td>0.620355</td>\n",
       "      <td>two</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.227942</td>\n",
       "      <td>0.125129</td>\n",
       "      <td>0.278978</td>\n",
       "      <td>four</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D     E\n",
       "2020-07-26 -1.569191  0.257844 -1.276382  0.620355   two\n",
       "2020-07-28  1.572154  0.227942  0.125129  0.278978  four"
      ]
     },
     "execution_count": 24,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df2[df2['E'].isin(['two', 'four'])] # select if the 'E' column's value is 'two' or 'four'"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "### Setting\n",
    "\n",
    "#### DataFrame의 data를 변경할 수 있습니다.\n",
    "\n",
    "#### 먼저 DataFrame에 새로운 column을 추가하는 방법을 알아보겠습니다.\n",
    "\n",
    "#### index를 가지고 있는 Series를 만들고 DataFrame의 새로운 column을 지정하여 추가할 수 있습니다.\n"
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
       "2020-07-25    1\n",
       "2020-07-26    2\n",
       "2020-07-27    3\n",
       "2020-07-28    4\n",
       "2020-07-29    5\n",
       "2020-07-30    6\n",
       "Freq: D, dtype: int64"
      ]
     },
     "execution_count": 25,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "new_s1 = pd.Series(\n",
    "        [1, 2, 3, 4, 5, 6],\n",
    "        index=pd.date_range('20200725', periods=6)\n",
    "        )\n",
    "\n",
    "new_s1"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>F</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.769295</td>\n",
       "      <td>0.844431</td>\n",
       "      <td>-0.918174</td>\n",
       "      <td>-0.047887</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>0.097646</td>\n",
       "      <td>-0.963513</td>\n",
       "      <td>-0.260229</td>\n",
       "      <td>1.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>0.257844</td>\n",
       "      <td>-1.276382</td>\n",
       "      <td>0.620355</td>\n",
       "      <td>2.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.861305</td>\n",
       "      <td>-0.123141</td>\n",
       "      <td>-0.729888</td>\n",
       "      <td>0.465927</td>\n",
       "      <td>3.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.227942</td>\n",
       "      <td>0.125129</td>\n",
       "      <td>0.278978</td>\n",
       "      <td>4.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>-0.287700</td>\n",
       "      <td>0.835631</td>\n",
       "      <td>1.684919</td>\n",
       "      <td>0.506765</td>\n",
       "      <td>5.0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D    F\n",
       "2020-07-24  0.769295  0.844431 -0.918174 -0.047887  NaN\n",
       "2020-07-25 -0.501942  0.097646 -0.963513 -0.260229  1.0\n",
       "2020-07-26 -1.569191  0.257844 -1.276382  0.620355  2.0\n",
       "2020-07-27 -0.861305 -0.123141 -0.729888  0.465927  3.0\n",
       "2020-07-28  1.572154  0.227942  0.125129  0.278978  4.0\n",
       "2020-07-29 -0.287700  0.835631  1.684919  0.506765  5.0"
      ]
     },
     "execution_count": 27,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df['F'] = new_s1 # assign Series to DataFrame's 'F' column\n",
    "\n",
    "df"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### label을 사용하여 data를 수정할 수도 있습니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>F</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.000000</td>\n",
       "      <td>0.844431</td>\n",
       "      <td>-0.918174</td>\n",
       "      <td>-0.047887</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>0.097646</td>\n",
       "      <td>-0.963513</td>\n",
       "      <td>-0.260229</td>\n",
       "      <td>1.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>0.257844</td>\n",
       "      <td>-1.276382</td>\n",
       "      <td>0.620355</td>\n",
       "      <td>2.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.861305</td>\n",
       "      <td>-0.123141</td>\n",
       "      <td>-0.729888</td>\n",
       "      <td>0.465927</td>\n",
       "      <td>3.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.227942</td>\n",
       "      <td>0.125129</td>\n",
       "      <td>0.278978</td>\n",
       "      <td>4.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>-0.287700</td>\n",
       "      <td>0.835631</td>\n",
       "      <td>1.684919</td>\n",
       "      <td>0.506765</td>\n",
       "      <td>5.0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D    F\n",
       "2020-07-24  0.000000  0.844431 -0.918174 -0.047887  NaN\n",
       "2020-07-25 -0.501942  0.097646 -0.963513 -0.260229  1.0\n",
       "2020-07-26 -1.569191  0.257844 -1.276382  0.620355  2.0\n",
       "2020-07-27 -0.861305 -0.123141 -0.729888  0.465927  3.0\n",
       "2020-07-28  1.572154  0.227942  0.125129  0.278978  4.0\n",
       "2020-07-29 -0.287700  0.835631  1.684919  0.506765  5.0"
      ]
     },
     "execution_count": 28,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.at[dates[0], 'A'] = 0\n",
    "df"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 위치 정보를 사용하여 data를 수정할 수도 있습니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>F</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.000000</td>\n",
       "      <td>0.000000</td>\n",
       "      <td>-0.918174</td>\n",
       "      <td>-0.047887</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>0.097646</td>\n",
       "      <td>-0.963513</td>\n",
       "      <td>-0.260229</td>\n",
       "      <td>1.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>0.257844</td>\n",
       "      <td>-1.276382</td>\n",
       "      <td>0.620355</td>\n",
       "      <td>2.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.861305</td>\n",
       "      <td>-0.123141</td>\n",
       "      <td>-0.729888</td>\n",
       "      <td>0.465927</td>\n",
       "      <td>3.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.227942</td>\n",
       "      <td>0.125129</td>\n",
       "      <td>0.278978</td>\n",
       "      <td>4.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>-0.287700</td>\n",
       "      <td>0.835631</td>\n",
       "      <td>1.684919</td>\n",
       "      <td>0.506765</td>\n",
       "      <td>5.0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D    F\n",
       "2020-07-24  0.000000  0.000000 -0.918174 -0.047887  NaN\n",
       "2020-07-25 -0.501942  0.097646 -0.963513 -0.260229  1.0\n",
       "2020-07-26 -1.569191  0.257844 -1.276382  0.620355  2.0\n",
       "2020-07-27 -0.861305 -0.123141 -0.729888  0.465927  3.0\n",
       "2020-07-28  1.572154  0.227942  0.125129  0.278978  4.0\n",
       "2020-07-29 -0.287700  0.835631  1.684919  0.506765  5.0"
      ]
     },
     "execution_count": 29,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.iat[0, 1] = 0\n",
    "df"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### data를 수정할 때 numpy array를 대응시켜 특정 column data를 모두 수정할 수도 있습니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>F</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.000000</td>\n",
       "      <td>0.000000</td>\n",
       "      <td>-0.918174</td>\n",
       "      <td>5</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>0.097646</td>\n",
       "      <td>-0.963513</td>\n",
       "      <td>5</td>\n",
       "      <td>1.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>0.257844</td>\n",
       "      <td>-1.276382</td>\n",
       "      <td>5</td>\n",
       "      <td>2.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.861305</td>\n",
       "      <td>-0.123141</td>\n",
       "      <td>-0.729888</td>\n",
       "      <td>5</td>\n",
       "      <td>3.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>1.572154</td>\n",
       "      <td>0.227942</td>\n",
       "      <td>0.125129</td>\n",
       "      <td>5</td>\n",
       "      <td>4.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>-0.287700</td>\n",
       "      <td>0.835631</td>\n",
       "      <td>1.684919</td>\n",
       "      <td>5</td>\n",
       "      <td>5.0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C  D    F\n",
       "2020-07-24  0.000000  0.000000 -0.918174  5  NaN\n",
       "2020-07-25 -0.501942  0.097646 -0.963513  5  1.0\n",
       "2020-07-26 -1.569191  0.257844 -1.276382  5  2.0\n",
       "2020-07-27 -0.861305 -0.123141 -0.729888  5  3.0\n",
       "2020-07-28  1.572154  0.227942  0.125129  5  4.0\n",
       "2020-07-29 -0.287700  0.835631  1.684919  5  5.0"
      ]
     },
     "execution_count": 31,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.loc[:, 'D'] = np.array([5] * len(df))\n",
    "df"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 마지막으로 조건에 해당하는 data 값들을 모두 음수로 변환해 보겠습니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>F</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.000000</td>\n",
       "      <td>0.000000</td>\n",
       "      <td>-0.918174</td>\n",
       "      <td>-5</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>-0.501942</td>\n",
       "      <td>-0.097646</td>\n",
       "      <td>-0.963513</td>\n",
       "      <td>-5</td>\n",
       "      <td>-1.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.569191</td>\n",
       "      <td>-0.257844</td>\n",
       "      <td>-1.276382</td>\n",
       "      <td>-5</td>\n",
       "      <td>-2.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.861305</td>\n",
       "      <td>-0.123141</td>\n",
       "      <td>-0.729888</td>\n",
       "      <td>-5</td>\n",
       "      <td>-3.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>-1.572154</td>\n",
       "      <td>-0.227942</td>\n",
       "      <td>-0.125129</td>\n",
       "      <td>-5</td>\n",
       "      <td>-4.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>-0.287700</td>\n",
       "      <td>-0.835631</td>\n",
       "      <td>-1.684919</td>\n",
       "      <td>-5</td>\n",
       "      <td>-5.0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C  D    F\n",
       "2020-07-24  0.000000  0.000000 -0.918174 -5  NaN\n",
       "2020-07-25 -0.501942 -0.097646 -0.963513 -5 -1.0\n",
       "2020-07-26 -1.569191 -0.257844 -1.276382 -5 -2.0\n",
       "2020-07-27 -0.861305 -0.123141 -0.729888 -5 -3.0\n",
       "2020-07-28 -1.572154 -0.227942 -0.125129 -5 -4.0\n",
       "2020-07-29 -0.287700 -0.835631 -1.684919 -5 -5.0"
      ]
     },
     "execution_count": 32,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df2 = df.copy()\n",
    "df2[df2 > 0] = -df2\n",
    "df2"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
 <br><br>
 

## &nbsp;&nbsp;Missing data
***
 결측치를 확인하고 처리하는 방법입니다.

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 앞서 진행한 import와 DataFrame 생성을 반복합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "import numpy as np\n",
    "import pandas as pd\n",
    "\n",
    "dates = pd.date_range('20200724', periods=6)\n",
    "df = pd.DataFrame(\n",
    "        np.random.randn(6, 4),\n",
    "        index=dates,\n",
    "        columns=list('ABCD')\n",
    "        )"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### pandas에서는 결측치(missing data)를 주로 'np.nan'으로 표현합니다.\n",
    "\n",
    "#### 이번에는 결측치(missing data)를 다루는 방법에 대해 살펴보겠습니다.\n",
    "\n",
    "#### 'reindex'는 특정 column의 index를 수정/추가/삭제 할 수 있습니다.\n",
    "\n",
    "#### 그 결과 복사된 DataFrame을 반환합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>E</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.301247</td>\n",
       "      <td>-0.425514</td>\n",
       "      <td>-1.233032</td>\n",
       "      <td>0.259611</td>\n",
       "      <td>1.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>1.090123</td>\n",
       "      <td>-1.035311</td>\n",
       "      <td>1.168112</td>\n",
       "      <td>-1.214599</td>\n",
       "      <td>1.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>1.266217</td>\n",
       "      <td>0.809175</td>\n",
       "      <td>-0.578900</td>\n",
       "      <td>-0.658111</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.911602</td>\n",
       "      <td>0.208199</td>\n",
       "      <td>0.596766</td>\n",
       "      <td>1.066030</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D    E\n",
       "2020-07-24  0.301247 -0.425514 -1.233032  0.259611  1.0\n",
       "2020-07-25  1.090123 -1.035311  1.168112 -1.214599  1.0\n",
       "2020-07-26  1.266217  0.809175 -0.578900 -0.658111  NaN\n",
       "2020-07-27 -0.911602  0.208199  0.596766  1.066030  NaN"
      ]
     },
     "execution_count": 3,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df1 = df.reindex(\n",
    "        index=dates[0:4],\n",
    "        columns=list(df.columns) + ['E']\n",
    "        )\n",
    "df1.loc[dates[0]:dates[1], 'E'] = 1\n",
    "df1"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### missing data가 하나라도 포함된 행을 제외시켜 봅시다.\n",
    "\n",
    "#### 'dropna'를 사용합니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>E</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.301247</td>\n",
       "      <td>-0.425514</td>\n",
       "      <td>-1.233032</td>\n",
       "      <td>0.259611</td>\n",
       "      <td>1.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>1.090123</td>\n",
       "      <td>-1.035311</td>\n",
       "      <td>1.168112</td>\n",
       "      <td>-1.214599</td>\n",
       "      <td>1.0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D    E\n",
       "2020-07-24  0.301247 -0.425514 -1.233032  0.259611  1.0\n",
       "2020-07-25  1.090123 -1.035311  1.168112 -1.214599  1.0"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df1.dropna(how='any')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### missing data를 특정 값으로 채워봅시다.\n",
    "\n",
    "#### 'fillna'를 사용합니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>E</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>0.301247</td>\n",
       "      <td>-0.425514</td>\n",
       "      <td>-1.233032</td>\n",
       "      <td>0.259611</td>\n",
       "      <td>1.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>1.090123</td>\n",
       "      <td>-1.035311</td>\n",
       "      <td>1.168112</td>\n",
       "      <td>-1.214599</td>\n",
       "      <td>1.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>1.266217</td>\n",
       "      <td>0.809175</td>\n",
       "      <td>-0.578900</td>\n",
       "      <td>-0.658111</td>\n",
       "      <td>5.0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.911602</td>\n",
       "      <td>0.208199</td>\n",
       "      <td>0.596766</td>\n",
       "      <td>1.066030</td>\n",
       "      <td>5.0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D    E\n",
       "2020-07-24  0.301247 -0.425514 -1.233032  0.259611  1.0\n",
       "2020-07-25  1.090123 -1.035311  1.168112 -1.214599  1.0\n",
       "2020-07-26  1.266217  0.809175 -0.578900 -0.658111  5.0\n",
       "2020-07-27 -0.911602  0.208199  0.596766  1.066030  5.0"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df1.fillna(value=5)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### data 값이 'nan'인지 아닌지 확인만 해봅시다.\n",
    "\n",
    "#### 'isna'를 사용합니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>E</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>False</td>\n",
       "      <td>True</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                A      B      C      D      E\n",
       "2020-07-24  False  False  False  False  False\n",
       "2020-07-25  False  False  False  False  False\n",
       "2020-07-26  False  False  False  False   True\n",
       "2020-07-27  False  False  False  False   True"
      ]
     },
     "execution_count": 7,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "pd.isna(df1)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
 <br><br>
 

## &nbsp;&nbsp;Operations
***
 본격적으로 data를 다뤄봅니다. Statistics를 구하고 사칙연산 function을 적용합니다.

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 앞서 진행한 import와 DataFrame 생성을 반복합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {
    "scrolled": true
   },
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>-0.910768</td>\n",
       "      <td>0.416166</td>\n",
       "      <td>0.197304</td>\n",
       "      <td>0.252876</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>0.615104</td>\n",
       "      <td>1.164349</td>\n",
       "      <td>0.044059</td>\n",
       "      <td>-1.996138</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.354868</td>\n",
       "      <td>-0.017010</td>\n",
       "      <td>-0.784717</td>\n",
       "      <td>1.337247</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-0.414421</td>\n",
       "      <td>0.992017</td>\n",
       "      <td>1.257737</td>\n",
       "      <td>-0.361511</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>-0.194671</td>\n",
       "      <td>-1.427558</td>\n",
       "      <td>0.896521</td>\n",
       "      <td>0.110179</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>1.486213</td>\n",
       "      <td>0.975022</td>\n",
       "      <td>-0.125846</td>\n",
       "      <td>1.531045</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-24 -0.910768  0.416166  0.197304  0.252876\n",
       "2020-07-25  0.615104  1.164349  0.044059 -1.996138\n",
       "2020-07-26 -1.354868 -0.017010 -0.784717  1.337247\n",
       "2020-07-27 -0.414421  0.992017  1.257737 -0.361511\n",
       "2020-07-28 -0.194671 -1.427558  0.896521  0.110179\n",
       "2020-07-29  1.486213  0.975022 -0.125846  1.531045"
      ]
     },
     "execution_count": 10,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "import numpy as np\n",
    "import pandas as pd\n",
    "\n",
    "dates = pd.date_range('20200724', periods=6)\n",
    "df = pd.DataFrame(\n",
    "        np.random.randn(6, 4),\n",
    "        index=dates,\n",
    "        columns=list('ABCD')\n",
    "        )\n",
    "df"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### DataFrame의 연산을 살펴보겠습니다.\n",
    "\n",
    "***\n",
    "\n",
    "\n",
    "### Stats\n",
    "\n",
    "\n",
    "#### 일반적으로 연산에서 missing data는 제외합니다.\n",
    "\n",
    "#### 우선 기술통계(descriptive statistic)를 수행해 보겠습니다.\n",
    "\n",
    "#### 각 column 별로 평균값을 구해봅시다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "A    0.231753\n",
       "B   -0.123741\n",
       "C    0.078004\n",
       "D   -0.031127\n",
       "dtype: float64"
      ]
     },
     "execution_count": 2,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.mean()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 이번에는 각 index 별로 평균값을 구해봅시다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-07-24    0.410100\n",
       "2020-07-25   -0.124489\n",
       "2020-07-26    0.140944\n",
       "2020-07-27   -0.362837\n",
       "2020-07-28    0.360954\n",
       "2020-07-29   -0.192337\n",
       "Freq: D, dtype: float64"
      ]
     },
     "execution_count": 3,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.mean(1)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 서로 다른 차원을 가진 object 끼리 연산하려면, 하나의 축을 기준으로 서로 맞춰줘야 합니다.\n",
    "\n",
    "#### pandas는 기준이 되는 축을 지정해주면 자동으로 맞춰 연산을 진행합니다.\n",
    "\n",
    "#### 이 때 missing data는 연산할 수 없으므로 모두 nan으로 변환됩니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-07-24    NaN\n",
       "2020-07-25    NaN\n",
       "2020-07-26    1.0\n",
       "2020-07-27    3.0\n",
       "2020-07-28    5.0\n",
       "2020-07-29    NaN\n",
       "Freq: D, dtype: float64"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "s = pd.Series([1, 3, 5, np.nan, 6, 8], index=dates).shift(2)\n",
    "s"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>-1.094756</td>\n",
       "      <td>-1.824522</td>\n",
       "      <td>0.098717</td>\n",
       "      <td>-0.615664</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>-3.166569</td>\n",
       "      <td>-3.352613</td>\n",
       "      <td>-3.934610</td>\n",
       "      <td>-2.997557</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>-4.989865</td>\n",
       "      <td>-4.053373</td>\n",
       "      <td>-5.244049</td>\n",
       "      <td>-4.268896</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-24       NaN       NaN       NaN       NaN\n",
       "2020-07-25       NaN       NaN       NaN       NaN\n",
       "2020-07-26 -1.094756 -1.824522  0.098717 -0.615664\n",
       "2020-07-27 -3.166569 -3.352613 -3.934610 -2.997557\n",
       "2020-07-28 -4.989865 -4.053373 -5.244049 -4.268896\n",
       "2020-07-29       NaN       NaN       NaN       NaN"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.sub(s, axis='index') # (df's value - s's value)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "\n",
    "### Apply\n",
    "\n",
    "\n",
    "#### DataFrame에 함수를 적용할 수 있습니다.\n",
    "\n",
    "#### 'np.cumsum()'은 같은 column의 위에서 아래로 내려가며 data 값의 누적 합을 구합니다.\n",
    "\n",
    "#### 'lambda' 함수를 사용하여 각 column별로 '최대값-최소값'을 계산합니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>2020-07-24</td>\n",
       "      <td>-0.039085</td>\n",
       "      <td>0.291738</td>\n",
       "      <td>0.414307</td>\n",
       "      <td>0.973440</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-25</td>\n",
       "      <td>0.520146</td>\n",
       "      <td>-0.035361</td>\n",
       "      <td>0.694975</td>\n",
       "      <td>-0.037316</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-26</td>\n",
       "      <td>0.425390</td>\n",
       "      <td>-0.859883</td>\n",
       "      <td>1.793692</td>\n",
       "      <td>0.347020</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-27</td>\n",
       "      <td>0.258820</td>\n",
       "      <td>-1.212495</td>\n",
       "      <td>0.859082</td>\n",
       "      <td>0.349463</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-28</td>\n",
       "      <td>0.268955</td>\n",
       "      <td>-0.265869</td>\n",
       "      <td>0.615033</td>\n",
       "      <td>1.080567</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2020-07-29</td>\n",
       "      <td>1.390517</td>\n",
       "      <td>-0.742444</td>\n",
       "      <td>0.468026</td>\n",
       "      <td>-0.186761</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                   A         B         C         D\n",
       "2020-07-24 -0.039085  0.291738  0.414307  0.973440\n",
       "2020-07-25  0.520146 -0.035361  0.694975 -0.037316\n",
       "2020-07-26  0.425390 -0.859883  1.793692  0.347020\n",
       "2020-07-27  0.258820 -1.212495  0.859082  0.349463\n",
       "2020-07-28  0.268955 -0.265869  0.615033  1.080567\n",
       "2020-07-29  1.390517 -0.742444  0.468026 -0.186761"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.apply(np.cumsum)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "A    1.288131\n",
       "B    1.771149\n",
       "C    2.033328\n",
       "D    2.240768\n",
       "dtype: float64"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.apply(lambda x: x.max() - x.min())"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "\n",
    "### Histogramming\n",
    "\n",
    "\n",
    "#### Series를 가지고 히스토그램을 그리기 위한 데이터를 만들어 보겠습니다.\n",
    "\n",
    "#### 'value_counts()'를 사용합니다. 엑셀의 'countif'와 기능이 유사합니다.\n"
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
       "0    5\n",
       "1    0\n",
       "2    3\n",
       "3    1\n",
       "4    2\n",
       "5    5\n",
       "6    0\n",
       "7    0\n",
       "8    4\n",
       "9    1\n",
       "dtype: int32"
      ]
     },
     "execution_count": 11,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "s = pd.Series(np.random.randint(0, 7, size=10))\n",
    "s"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0    3\n",
       "5    2\n",
       "1    2\n",
       "4    1\n",
       "3    1\n",
       "2    1\n",
       "dtype: int64"
      ]
     },
     "execution_count": 12,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "s.value_counts()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "\n",
    "### String Methods\n",
    "\n",
    "\n",
    "#### Series는 'str' 속성에 문자열을 처리할 수 있는 방법을 가지고 있습니다.\n",
    "\n",
    "#### 이는 array의 각 요소를 더욱 쉽게 다룰 수 있도록 도와줍니다.\n",
    "\n",
    "#### 'str' 속성은 패턴 매칭에 일반적으로 정규표현식을 사용합니다.\n"
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
       "0       a\n",
       "1       b\n",
       "2       c\n",
       "3    aaba\n",
       "4     NaN\n",
       "5    caba\n",
       "6     dog\n",
       "7     cat\n",
       "dtype: object"
      ]
     },
     "execution_count": 13,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "s = pd.Series(['A', 'B', 'C', 'Aaba', np.nan, 'CABA', 'dog', 'cat'])\n",
    "\n",
    "s.str.lower()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
 <br><br>
 

## &nbsp;&nbsp;Merge
***
 서로 다른 구조의 data를 합치거나 나누는 방법입니다.

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 앞서 진행한 import를 반복합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "import numpy as np\n",
    "import pandas as pd"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "\n",
    "### Concat\n",
    "\n",
    "\n",
    "#### pandas는 Series와 DataFrame을 쉽게 합칠 수 있도록 다양한 기능을 제공합니다.\n",
    "\n",
    "#### 'concat'는 나뉘어진 pandas object를 이어주는 역할을 합니다.\n"
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
       "      <th>0</th>\n",
       "      <th>1</th>\n",
       "      <th>2</th>\n",
       "      <th>3</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>-0.427283</td>\n",
       "      <td>-1.203272</td>\n",
       "      <td>-0.919519</td>\n",
       "      <td>-0.364533</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>0.237756</td>\n",
       "      <td>-0.148395</td>\n",
       "      <td>-0.602008</td>\n",
       "      <td>0.710692</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2</td>\n",
       "      <td>-0.603432</td>\n",
       "      <td>1.141611</td>\n",
       "      <td>0.547971</td>\n",
       "      <td>-0.492113</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>3</td>\n",
       "      <td>1.588028</td>\n",
       "      <td>0.044180</td>\n",
       "      <td>-0.103019</td>\n",
       "      <td>-1.000912</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>4</td>\n",
       "      <td>-1.489813</td>\n",
       "      <td>1.044220</td>\n",
       "      <td>-0.689513</td>\n",
       "      <td>0.410836</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>5</td>\n",
       "      <td>-0.428696</td>\n",
       "      <td>0.015358</td>\n",
       "      <td>1.929976</td>\n",
       "      <td>0.428046</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>6</td>\n",
       "      <td>0.265216</td>\n",
       "      <td>-0.104723</td>\n",
       "      <td>-0.621128</td>\n",
       "      <td>1.857496</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>7</td>\n",
       "      <td>0.296143</td>\n",
       "      <td>1.984768</td>\n",
       "      <td>-1.734260</td>\n",
       "      <td>0.253092</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>8</td>\n",
       "      <td>-0.808476</td>\n",
       "      <td>-2.170828</td>\n",
       "      <td>-1.164643</td>\n",
       "      <td>2.075860</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>9</td>\n",
       "      <td>-0.203985</td>\n",
       "      <td>0.605092</td>\n",
       "      <td>-0.084670</td>\n",
       "      <td>0.844165</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "          0         1         2         3\n",
       "0 -0.427283 -1.203272 -0.919519 -0.364533\n",
       "1  0.237756 -0.148395 -0.602008  0.710692\n",
       "2 -0.603432  1.141611  0.547971 -0.492113\n",
       "3  1.588028  0.044180 -0.103019 -1.000912\n",
       "4 -1.489813  1.044220 -0.689513  0.410836\n",
       "5 -0.428696  0.015358  1.929976  0.428046\n",
       "6  0.265216 -0.104723 -0.621128  1.857496\n",
       "7  0.296143  1.984768 -1.734260  0.253092\n",
       "8 -0.808476 -2.170828 -1.164643  2.075860\n",
       "9 -0.203985  0.605092 -0.084670  0.844165"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df = pd.DataFrame(np.random.randn(10, 4))\n",
    "df\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 생성한 DataFrame을 여러 조각으로 분리합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "[          0         1         2         3\n",
       " 0 -0.427283 -1.203272 -0.919519 -0.364533\n",
       " 1  0.237756 -0.148395 -0.602008  0.710692\n",
       " 2 -0.603432  1.141611  0.547971 -0.492113,\n",
       "           0         1         2         3\n",
       " 3  1.588028  0.044180 -0.103019 -1.000912\n",
       " 4 -1.489813  1.044220 -0.689513  0.410836\n",
       " 5 -0.428696  0.015358  1.929976  0.428046\n",
       " 6  0.265216 -0.104723 -0.621128  1.857496,\n",
       "           0         1         2         3\n",
       " 7  0.296143  1.984768 -1.734260  0.253092\n",
       " 8 -0.808476 -2.170828 -1.164643  2.075860\n",
       " 9 -0.203985  0.605092 -0.084670  0.844165]"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "pieces = [\n",
    "        df[:3],\n",
    "        df[3:7],\n",
    "        df[7:]\n",
    "        ]\n",
    "pieces\n"
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
       "      <th>0</th>\n",
       "      <th>1</th>\n",
       "      <th>2</th>\n",
       "      <th>3</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>-0.427283</td>\n",
       "      <td>-1.203272</td>\n",
       "      <td>-0.919519</td>\n",
       "      <td>-0.364533</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>0.237756</td>\n",
       "      <td>-0.148395</td>\n",
       "      <td>-0.602008</td>\n",
       "      <td>0.710692</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2</td>\n",
       "      <td>-0.603432</td>\n",
       "      <td>1.141611</td>\n",
       "      <td>0.547971</td>\n",
       "      <td>-0.492113</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>3</td>\n",
       "      <td>1.588028</td>\n",
       "      <td>0.044180</td>\n",
       "      <td>-0.103019</td>\n",
       "      <td>-1.000912</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>4</td>\n",
       "      <td>-1.489813</td>\n",
       "      <td>1.044220</td>\n",
       "      <td>-0.689513</td>\n",
       "      <td>0.410836</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>5</td>\n",
       "      <td>-0.428696</td>\n",
       "      <td>0.015358</td>\n",
       "      <td>1.929976</td>\n",
       "      <td>0.428046</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>6</td>\n",
       "      <td>0.265216</td>\n",
       "      <td>-0.104723</td>\n",
       "      <td>-0.621128</td>\n",
       "      <td>1.857496</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>7</td>\n",
       "      <td>0.296143</td>\n",
       "      <td>1.984768</td>\n",
       "      <td>-1.734260</td>\n",
       "      <td>0.253092</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>8</td>\n",
       "      <td>-0.808476</td>\n",
       "      <td>-2.170828</td>\n",
       "      <td>-1.164643</td>\n",
       "      <td>2.075860</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>9</td>\n",
       "      <td>-0.203985</td>\n",
       "      <td>0.605092</td>\n",
       "      <td>-0.084670</td>\n",
       "      <td>0.844165</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "          0         1         2         3\n",
       "0 -0.427283 -1.203272 -0.919519 -0.364533\n",
       "1  0.237756 -0.148395 -0.602008  0.710692\n",
       "2 -0.603432  1.141611  0.547971 -0.492113\n",
       "3  1.588028  0.044180 -0.103019 -1.000912\n",
       "4 -1.489813  1.044220 -0.689513  0.410836\n",
       "5 -0.428696  0.015358  1.929976  0.428046\n",
       "6  0.265216 -0.104723 -0.621128  1.857496\n",
       "7  0.296143  1.984768 -1.734260  0.253092\n",
       "8 -0.808476 -2.170828 -1.164643  2.075860\n",
       "9 -0.203985  0.605092 -0.084670  0.844165"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "pd.concat(pieces)\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "\n",
    "### Join\n",
    "\n",
    "\n",
    "#### join은 SQL 스타일로 합치는 기능입니다.\n",
    "\n",
    "#### 먼저 key 값이 중복되는 경우 join의 작동 방식을 살펴보겠습니다.\n",
    "\n",
    "#### 아래 예제에서는 merge()를 사용하겠습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 13,
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
       "      <th>key</th>\n",
       "      <th>rval</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>foo</td>\n",
       "      <td>4</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>foo</td>\n",
       "      <td>5</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   key  rval\n",
       "0  foo     4\n",
       "1  foo     5"
      ]
     },
     "execution_count": 13,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "right = pd.DataFrame(\n",
    "        {\n",
    "                'key': ['foo', 'foo'],\n",
    "                'rval': [4, 5]\n",
    "                }\n",
    "        )\n",
    "\n",
    "right\n"
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
       "      <th>key</th>\n",
       "      <th>lval</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>foo</td>\n",
       "      <td>1</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>foo</td>\n",
       "      <td>2</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   key  lval\n",
       "0  foo     1\n",
       "1  foo     2"
      ]
     },
     "execution_count": 14,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "left = pd.DataFrame(\n",
    "        {\n",
    "                'key': ['foo', 'foo'],\n",
    "                'lval': [1, 2]\n",
    "                }\n",
    "        )\n",
    "\n",
    "left\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 15,
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
       "      <th>key</th>\n",
       "      <th>lval</th>\n",
       "      <th>rval</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>foo</td>\n",
       "      <td>1</td>\n",
       "      <td>4</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>foo</td>\n",
       "      <td>1</td>\n",
       "      <td>5</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2</td>\n",
       "      <td>foo</td>\n",
       "      <td>2</td>\n",
       "      <td>4</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>3</td>\n",
       "      <td>foo</td>\n",
       "      <td>2</td>\n",
       "      <td>5</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   key  lval  rval\n",
       "0  foo     1     4\n",
       "1  foo     1     5\n",
       "2  foo     2     4\n",
       "3  foo     2     5"
      ]
     },
     "execution_count": 15,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "pd.merge(left, right, on='key')\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 다음은 key값이 중복되지 않는 경우 join의 작동 방식을 살펴보겠습니다.\n",
    "\n",
    "#### 마찬가지로 merge()를 사용하겠습니다.\n"
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
       "      <th>key</th>\n",
       "      <th>rval</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>foo</td>\n",
       "      <td>4</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>bar</td>\n",
       "      <td>5</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   key  rval\n",
       "0  foo     4\n",
       "1  bar     5"
      ]
     },
     "execution_count": 16,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "right = pd.DataFrame(\n",
    "        {\n",
    "                'key': ['foo', 'bar'],\n",
    "                'rval': [4, 5]\n",
    "                }\n",
    "        )\n",
    "\n",
    "right\n"
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
       "      <th>key</th>\n",
       "      <th>lval</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>foo</td>\n",
       "      <td>1</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>bar</td>\n",
       "      <td>2</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   key  lval\n",
       "0  foo     1\n",
       "1  bar     2"
      ]
     },
     "execution_count": 17,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "left = pd.DataFrame(\n",
    "        {\n",
    "                'key': ['foo', 'bar'],\n",
    "                'lval': [1, 2]\n",
    "                }\n",
    "        )\n",
    "\n",
    "left\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 18,
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
       "      <th>key</th>\n",
       "      <th>lval</th>\n",
       "      <th>rval</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>foo</td>\n",
       "      <td>1</td>\n",
       "      <td>4</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>bar</td>\n",
       "      <td>2</td>\n",
       "      <td>5</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   key  lval  rval\n",
       "0  foo     1     4\n",
       "1  bar     2     5"
      ]
     },
     "execution_count": 18,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "pd.merge(left, right, on='key')\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
 <br><br>
 

## &nbsp;&nbsp;Grouping
***
 Data를 특정 기준에 따라 분류하여 처리합니다.

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 앞서 진행한 import를 반복합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "import numpy as np\n",
    "import pandas as pd"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### \"group by\"는 아래 과정 중 하나 이상과 연관된 작업을 할 때 사용합니다.\n",
    "\n",
    "* **Splitting**: 기준을 바탕으로 data를 분리함\n",
    "* **Applying**: 각 그룹 독립적으로 함수를 적용함\n",
    "* **Combining**: 결과를 data 구조로 통합함\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>foo</td>\n",
       "      <td>one</td>\n",
       "      <td>-0.531718</td>\n",
       "      <td>-0.273252</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>bar</td>\n",
       "      <td>one</td>\n",
       "      <td>-0.972429</td>\n",
       "      <td>-0.196942</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2</td>\n",
       "      <td>foo</td>\n",
       "      <td>two</td>\n",
       "      <td>0.389604</td>\n",
       "      <td>0.115921</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>3</td>\n",
       "      <td>bar</td>\n",
       "      <td>three</td>\n",
       "      <td>-1.061760</td>\n",
       "      <td>-0.776632</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>4</td>\n",
       "      <td>foo</td>\n",
       "      <td>two</td>\n",
       "      <td>-0.357100</td>\n",
       "      <td>-0.005084</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>5</td>\n",
       "      <td>bar</td>\n",
       "      <td>two</td>\n",
       "      <td>-0.147776</td>\n",
       "      <td>-0.124632</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>6</td>\n",
       "      <td>foo</td>\n",
       "      <td>one</td>\n",
       "      <td>-1.415400</td>\n",
       "      <td>-0.371575</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>7</td>\n",
       "      <td>bar</td>\n",
       "      <td>three</td>\n",
       "      <td>1.818523</td>\n",
       "      <td>-0.813351</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "     A      B         C         D\n",
       "0  foo    one -0.531718 -0.273252\n",
       "1  bar    one -0.972429 -0.196942\n",
       "2  foo    two  0.389604  0.115921\n",
       "3  bar  three -1.061760 -0.776632\n",
       "4  foo    two -0.357100 -0.005084\n",
       "5  bar    two -0.147776 -0.124632\n",
       "6  foo    one -1.415400 -0.371575\n",
       "7  bar  three  1.818523 -0.813351"
      ]
     },
     "execution_count": 3,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df = pd.DataFrame({\n",
    "        'A': ['foo', 'bar', 'foo', 'bar', 'foo', 'bar', 'foo', 'bar'],\n",
    "        'B': ['one', 'one', 'two', 'three', 'two', 'two', 'one', 'three'],\n",
    "        'C': np.random.randn(8),\n",
    "        'D': np.random.randn(8)\n",
    "        })\n",
    "\n",
    "df\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 'A' column을 기준으로 grouping한 뒤 결과 그룹에 sum() 함수를 적용해 봅시다.\n",
    "\n",
    "#### 'A' column이 index가 되고 이를 기준으로 'C', 'D' column의 값을 더하여 새로운 DataFrame을 생성합니다.\n"
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
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>A</th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>bar</td>\n",
       "      <td>-0.363442</td>\n",
       "      <td>-1.911557</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>foo</td>\n",
       "      <td>-1.914614</td>\n",
       "      <td>-0.533990</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "            C         D\n",
       "A                      \n",
       "bar -0.363442 -1.911557\n",
       "foo -1.914614 -0.533990"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.groupby('A').sum()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 이번에는 'A', 'B' column을 모두 선택하고 grouping하여 hierarchical index를 생성합니다.\n",
    "\n",
    "#### 그 다음 마찬가지로 결과 그룹에 sum() 함수를 적용해 봅시다.\n"
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
       "      <th></th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td rowspan=\"3\" valign=\"top\">bar</td>\n",
       "      <td>one</td>\n",
       "      <td>-0.972429</td>\n",
       "      <td>-0.196942</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>three</td>\n",
       "      <td>0.756763</td>\n",
       "      <td>-1.589983</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>two</td>\n",
       "      <td>-0.147776</td>\n",
       "      <td>-0.124632</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td rowspan=\"2\" valign=\"top\">foo</td>\n",
       "      <td>one</td>\n",
       "      <td>-1.947118</td>\n",
       "      <td>-0.644827</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>two</td>\n",
       "      <td>0.032504</td>\n",
       "      <td>0.110837</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                  C         D\n",
       "A   B                        \n",
       "bar one   -0.972429 -0.196942\n",
       "    three  0.756763 -1.589983\n",
       "    two   -0.147776 -0.124632\n",
       "foo one   -1.947118 -0.644827\n",
       "    two    0.032504  0.110837"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.groupby(['A', 'B']).sum()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
 <br><br>
 

## &nbsp;&nbsp;Reshaping
***
 Dataframe을 다른 형태로 변환합니다.

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 앞서 진행한 import를 반복합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "import numpy as np\n",
    "import pandas as pd"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### DataFrame을 다른 형태로 변형하는 방법에 대해 살펴보겠습니다.\n",
    "\n",
    "\n",
    "### Stack\n",
    "\n",
    "\n",
    "#### 'stack()'은 DataFrame이나 Series의 column을 index로 변형합니다.\n",
    "\n",
    "#### 이것을 '압축한다'라고 표현합니다.\n",
    "\n",
    "#### 우선 DataFrame을 생성해 보겠습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
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
       "      <th></th>\n",
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>first</th>\n",
       "      <th>second</th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td rowspan=\"2\" valign=\"top\">bar</td>\n",
       "      <td>one</td>\n",
       "      <td>-0.116541</td>\n",
       "      <td>0.924980</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>two</td>\n",
       "      <td>0.898203</td>\n",
       "      <td>0.663330</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td rowspan=\"2\" valign=\"top\">baz</td>\n",
       "      <td>one</td>\n",
       "      <td>-0.645516</td>\n",
       "      <td>-1.345679</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>two</td>\n",
       "      <td>-0.941975</td>\n",
       "      <td>0.581895</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                     A         B\n",
       "first second                    \n",
       "bar   one    -0.116541  0.924980\n",
       "      two     0.898203  0.663330\n",
       "baz   one    -0.645516 -1.345679\n",
       "      two    -0.941975  0.581895"
      ]
     },
     "execution_count": 3,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "tuples = list(zip(*[\n",
    "        ['bar', 'bar', 'baz', 'baz', 'foo', 'foo', 'qux', 'qux'],\n",
    "        ['one', 'two', 'one', 'two', 'one', 'two', 'one', 'two']\n",
    "        ]))\n",
    "\n",
    "index = pd.MultiIndex.from_tuples(tuples, names=['first', 'second'])\n",
    "\n",
    "df = pd.DataFrame(\n",
    "        np.random.randn(8, 2),\n",
    "        index=index,\n",
    "        columns=['A', 'B']\n",
    "        )\n",
    "\n",
    "df2 = df[:4]\n",
    "\n",
    "df2\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 'stack()'을 사용하여 DataFrame을 압축해 보겠습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "first  second   \n",
       "bar    one     A   -0.116541\n",
       "               B    0.924980\n",
       "       two     A    0.898203\n",
       "               B    0.663330\n",
       "baz    one     A   -0.645516\n",
       "               B   -1.345679\n",
       "       two     A   -0.941975\n",
       "               B    0.581895\n",
       "dtype: float64"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "stacked = df2.stack()\n",
    "\n",
    "stacked\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 압축된 Series나 DataFrame은 'unstack()'으로 되돌릴 수 있습니다.\n",
    "\n",
    "#### 이 때 index number를 사용하지 않으면 기본적으로 가장 마지막 레벨의 압축된 index를 column으로 되돌립니다.\n"
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
       "      <th></th>\n",
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>first</th>\n",
       "      <th>second</th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td rowspan=\"2\" valign=\"top\">bar</td>\n",
       "      <td>one</td>\n",
       "      <td>-0.116541</td>\n",
       "      <td>0.924980</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>two</td>\n",
       "      <td>0.898203</td>\n",
       "      <td>0.663330</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td rowspan=\"2\" valign=\"top\">baz</td>\n",
       "      <td>one</td>\n",
       "      <td>-0.645516</td>\n",
       "      <td>-1.345679</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>two</td>\n",
       "      <td>-0.941975</td>\n",
       "      <td>0.581895</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "                     A         B\n",
       "first second                    \n",
       "bar   one    -0.116541  0.924980\n",
       "      two     0.898203  0.663330\n",
       "baz   one    -0.645516 -1.345679\n",
       "      two    -0.941975  0.581895"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "stacked.unstack()\n"
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
       "      <th>second</th>\n",
       "      <th>one</th>\n",
       "      <th>two</th>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>first</th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td rowspan=\"2\" valign=\"top\">bar</td>\n",
       "      <td>A</td>\n",
       "      <td>-0.116541</td>\n",
       "      <td>0.898203</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>B</td>\n",
       "      <td>0.924980</td>\n",
       "      <td>0.663330</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td rowspan=\"2\" valign=\"top\">baz</td>\n",
       "      <td>A</td>\n",
       "      <td>-0.645516</td>\n",
       "      <td>-0.941975</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>B</td>\n",
       "      <td>-1.345679</td>\n",
       "      <td>0.581895</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "second        one       two\n",
       "first                      \n",
       "bar   A -0.116541  0.898203\n",
       "      B  0.924980  0.663330\n",
       "baz   A -0.645516 -0.941975\n",
       "      B -1.345679  0.581895"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "stacked.unstack(1)\n"
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
       "      <th>first</th>\n",
       "      <th>bar</th>\n",
       "      <th>baz</th>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>second</th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td rowspan=\"2\" valign=\"top\">one</td>\n",
       "      <td>A</td>\n",
       "      <td>-0.116541</td>\n",
       "      <td>-0.645516</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>B</td>\n",
       "      <td>0.924980</td>\n",
       "      <td>-1.345679</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td rowspan=\"2\" valign=\"top\">two</td>\n",
       "      <td>A</td>\n",
       "      <td>0.898203</td>\n",
       "      <td>-0.941975</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>B</td>\n",
       "      <td>0.663330</td>\n",
       "      <td>0.581895</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "first          bar       baz\n",
       "second                      \n",
       "one    A -0.116541 -0.645516\n",
       "       B  0.924980 -1.345679\n",
       "two    A  0.898203 -0.941975\n",
       "       B  0.663330  0.581895"
      ]
     },
     "execution_count": 7,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "stacked.unstack(0)\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "***\n",
    "\n",
    "\n",
    "### Pivot tables\n",
    "\n",
    "\n",
    "#### Pivot table을 생성하는 방법을 살펴보겠습니다.\n",
    "\n",
    "#### Pivot table이란 주어진 데이터에서 선택한 행과 열을 기준으로 data 구조를 다시 생성해주는 기능입니다.\n",
    "\n",
    "#### Excel 프로그램에서 사용해 보신 분도 계실텐데 바로 그 기능입니다.\n",
    "\n",
    "#### 'pivot_table()'을 사용합니다.\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "      <th>E</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>one</td>\n",
       "      <td>A</td>\n",
       "      <td>foo</td>\n",
       "      <td>-0.240438</td>\n",
       "      <td>1.463301</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>one</td>\n",
       "      <td>B</td>\n",
       "      <td>foo</td>\n",
       "      <td>0.923924</td>\n",
       "      <td>0.039437</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2</td>\n",
       "      <td>two</td>\n",
       "      <td>C</td>\n",
       "      <td>foo</td>\n",
       "      <td>0.161660</td>\n",
       "      <td>0.804357</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>3</td>\n",
       "      <td>three</td>\n",
       "      <td>A</td>\n",
       "      <td>bar</td>\n",
       "      <td>0.033519</td>\n",
       "      <td>0.053257</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>4</td>\n",
       "      <td>one</td>\n",
       "      <td>B</td>\n",
       "      <td>bar</td>\n",
       "      <td>-0.309891</td>\n",
       "      <td>-0.726151</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>5</td>\n",
       "      <td>one</td>\n",
       "      <td>C</td>\n",
       "      <td>bar</td>\n",
       "      <td>1.404628</td>\n",
       "      <td>0.168201</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>6</td>\n",
       "      <td>two</td>\n",
       "      <td>A</td>\n",
       "      <td>foo</td>\n",
       "      <td>0.264459</td>\n",
       "      <td>1.670975</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>7</td>\n",
       "      <td>three</td>\n",
       "      <td>B</td>\n",
       "      <td>foo</td>\n",
       "      <td>-0.323361</td>\n",
       "      <td>-0.036778</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>8</td>\n",
       "      <td>one</td>\n",
       "      <td>C</td>\n",
       "      <td>foo</td>\n",
       "      <td>0.954042</td>\n",
       "      <td>0.293365</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>9</td>\n",
       "      <td>one</td>\n",
       "      <td>A</td>\n",
       "      <td>bar</td>\n",
       "      <td>-0.076643</td>\n",
       "      <td>0.861221</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>10</td>\n",
       "      <td>two</td>\n",
       "      <td>B</td>\n",
       "      <td>bar</td>\n",
       "      <td>-0.542979</td>\n",
       "      <td>-0.438975</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>11</td>\n",
       "      <td>three</td>\n",
       "      <td>C</td>\n",
       "      <td>bar</td>\n",
       "      <td>0.563262</td>\n",
       "      <td>0.471445</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "        A  B    C         D         E\n",
       "0     one  A  foo -0.240438  1.463301\n",
       "1     one  B  foo  0.923924  0.039437\n",
       "2     two  C  foo  0.161660  0.804357\n",
       "3   three  A  bar  0.033519  0.053257\n",
       "4     one  B  bar -0.309891 -0.726151\n",
       "5     one  C  bar  1.404628  0.168201\n",
       "6     two  A  foo  0.264459  1.670975\n",
       "7   three  B  foo -0.323361 -0.036778\n",
       "8     one  C  foo  0.954042  0.293365\n",
       "9     one  A  bar -0.076643  0.861221\n",
       "10    two  B  bar -0.542979 -0.438975\n",
       "11  three  C  bar  0.563262  0.471445"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df = pd.DataFrame({\n",
    "        'A': ['one', 'one', 'two', 'three'] * 3,\n",
    "        'B': ['A', 'B', 'C'] * 4,\n",
    "        'C': ['foo', 'foo', 'foo', 'bar', 'bar', 'bar'] * 2,\n",
    "        'D': np.random.randn(12),\n",
    "        'E': np.random.randn(12)\n",
    "        })\n",
    "\n",
    "df\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 생성한 DataFrame에서 값은 'D', index는 'A'와 'B', column은 'C'를 사용해서 pivot table을 생성해 보겠습니다.\n",
    "\n",
    "#### 이 때 존재하지 않는 값은 모두 NaN으로 표기됩니다.\n"
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
       "      <th>C</th>\n",
       "      <th>bar</th>\n",
       "      <th>foo</th>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th></th>\n",
       "      <th></th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td rowspan=\"3\" valign=\"top\">one</td>\n",
       "      <td>A</td>\n",
       "      <td>-0.076643</td>\n",
       "      <td>-0.240438</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>B</td>\n",
       "      <td>-0.309891</td>\n",
       "      <td>0.923924</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>C</td>\n",
       "      <td>1.404628</td>\n",
       "      <td>0.954042</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td rowspan=\"3\" valign=\"top\">three</td>\n",
       "      <td>A</td>\n",
       "      <td>0.033519</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>B</td>\n",
       "      <td>NaN</td>\n",
       "      <td>-0.323361</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>C</td>\n",
       "      <td>0.563262</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td rowspan=\"3\" valign=\"top\">two</td>\n",
       "      <td>A</td>\n",
       "      <td>NaN</td>\n",
       "      <td>0.264459</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>B</td>\n",
       "      <td>-0.542979</td>\n",
       "      <td>NaN</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>C</td>\n",
       "      <td>NaN</td>\n",
       "      <td>0.161660</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "C             bar       foo\n",
       "A     B                    \n",
       "one   A -0.076643 -0.240438\n",
       "      B -0.309891  0.923924\n",
       "      C  1.404628  0.954042\n",
       "three A  0.033519       NaN\n",
       "      B       NaN -0.323361\n",
       "      C  0.563262       NaN\n",
       "two   A       NaN  0.264459\n",
       "      B -0.542979       NaN\n",
       "      C       NaN  0.161660"
      ]
     },
     "execution_count": 9,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "pd.pivot_table(\n",
    "        df,\n",
    "        values='D',\n",
    "        index=['A', 'B'],\n",
    "        columns=['C']\n",
    "        )\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
 <br><br>
 

## &nbsp;&nbsp;Time series
***
 Time series data를 다루는 방법입니다.

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 앞서 진행한 import를 반복합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "import numpy as np\n",
    "import pandas as pd"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### pandas는 주기 변환 중 resampling을 수행하는 간단하면서 강력하고 효율적인 기능을 제공합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {
    "scrolled": true
   },
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2012-01-01 00:00:00    356\n",
       "2012-01-01 00:00:01    195\n",
       "2012-01-01 00:00:02    484\n",
       "2012-01-01 00:00:03    420\n",
       "2012-01-01 00:00:04    453\n",
       "                      ... \n",
       "2012-01-01 00:01:35     96\n",
       "2012-01-01 00:01:36    448\n",
       "2012-01-01 00:01:37     70\n",
       "2012-01-01 00:01:38    470\n",
       "2012-01-01 00:01:39     95\n",
       "Freq: S, Length: 100, dtype: int32"
      ]
     },
     "execution_count": 3,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "rng = pd.date_range('1/1/2012', periods=100, freq='S')\n",
    "\n",
    "ts = pd.Series(np.random.randint(0, 500, len(rng)), index=rng)\n",
    "\n",
    "ts"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2012-01-01    24159\n",
       "Freq: 5T, dtype: int32"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "ts.resample('5Min').sum()\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### Time zone을 표현해 보겠습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-07-27   -0.946170\n",
       "2020-07-28   -1.424267\n",
       "2020-07-29    0.164408\n",
       "2020-07-30    0.391001\n",
       "2020-07-31   -0.123602\n",
       "Freq: D, dtype: float64"
      ]
     },
     "execution_count": 5,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "rng = pd.date_range('7/27/2020 00:00', periods=5, freq='D')\n",
    "\n",
    "ts = pd.Series(np.random.randn(len(rng)), rng)\n",
    "\n",
    "ts"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-07-27 00:00:00+00:00   -0.946170\n",
       "2020-07-28 00:00:00+00:00   -1.424267\n",
       "2020-07-29 00:00:00+00:00    0.164408\n",
       "2020-07-30 00:00:00+00:00    0.391001\n",
       "2020-07-31 00:00:00+00:00   -0.123602\n",
       "Freq: D, dtype: float64"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "ts_utc = ts.tz_localize('UTC')\n",
    "\n",
    "ts_utc\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-07-26 20:00:00-04:00   -0.946170\n",
       "2020-07-27 20:00:00-04:00   -1.424267\n",
       "2020-07-28 20:00:00-04:00    0.164408\n",
       "2020-07-29 20:00:00-04:00    0.391001\n",
       "2020-07-30 20:00:00-04:00   -0.123602\n",
       "Freq: D, dtype: float64"
      ]
     },
     "execution_count": 7,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "ts_utc.tz_convert('US/Eastern') # -4 hours\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-07-27 09:00:00+09:00   -0.946170\n",
       "2020-07-28 09:00:00+09:00   -1.424267\n",
       "2020-07-29 09:00:00+09:00    0.164408\n",
       "2020-07-30 09:00:00+09:00    0.391001\n",
       "2020-07-31 09:00:00+09:00   -0.123602\n",
       "Freq: D, dtype: float64"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "ts_utc.tz_convert('Asia/Seoul') # +8 hours\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 분기 단위 시간 표현을 변경해 보겠습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 10,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "DatetimeIndex(['2020-01-31', '2020-02-29', '2020-03-31', '2020-04-30',\n",
       "               '2020-05-31'],\n",
       "              dtype='datetime64[ns]', freq='M')"
      ]
     },
     "execution_count": 10,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "rng = pd.date_range('1/1/2020', periods=5, freq='M')\n",
    "rng\n"
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
       "2020-01-31    1.477907\n",
       "2020-02-29   -0.293158\n",
       "2020-03-31    0.320310\n",
       "2020-04-30   -0.829815\n",
       "2020-05-31   -0.858905\n",
       "Freq: M, dtype: float64"
      ]
     },
     "execution_count": 11,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "ts = pd.Series(np.random.randn(len(rng)), index=rng)\n",
    "ts\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-01    1.477907\n",
       "2020-02   -0.293158\n",
       "2020-03    0.320310\n",
       "2020-04   -0.829815\n",
       "2020-05   -0.858905\n",
       "Freq: M, dtype: float64"
      ]
     },
     "execution_count": 12,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "ps = ts.to_period()\n",
    "ps\n"
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
       "PeriodIndex(['2020-01', '2020-02', '2020-03', '2020-04', '2020-05'], dtype='period[M]', freq='M')"
      ]
     },
     "execution_count": 15,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "pd.period_range('1/1/2020', '5/31/2020', freq='M')\n",
    "\n",
    "# data_range를 to_period()로 변경한 결과가 period_range로 생성한 결과와 동일함\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 16,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-01-01    1.477907\n",
       "2020-02-01   -0.293158\n",
       "2020-03-01    0.320310\n",
       "2020-04-01   -0.829815\n",
       "2020-05-01   -0.858905\n",
       "Freq: MS, dtype: float64"
      ]
     },
     "execution_count": 16,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "ps.to_timestamp()\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 특정 기간과 시간을 변환하는 편리한 기능을 사용할 수 있습니다.\n",
    "\n",
    "#### 아래 예제에서는, 11월로 끝나는 분기 단위의 시간을 매 분기 마지막 달의 오전 9시로 변환해 보겠습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 19,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "PeriodIndex(['2020Q1', '2020Q2', '2020Q3', '2020Q4', '2021Q1', '2021Q2',\n",
       "             '2021Q3', '2021Q4'],\n",
       "            dtype='period[Q-NOV]', freq='Q-NOV')"
      ]
     },
     "execution_count": 19,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "prng = pd.period_range('2020Q1', '2021Q4', freq='Q-NOV')\n",
    "prng\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 20,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-03-01 09:00   -0.579663\n",
       "2020-06-01 09:00   -0.332148\n",
       "2020-09-01 09:00    1.880328\n",
       "2020-12-01 09:00    0.997593\n",
       "2021-03-01 09:00   -0.742055\n",
       "2021-06-01 09:00    0.795995\n",
       "2021-09-01 09:00    0.625877\n",
       "2021-12-01 09:00    0.009433\n",
       "Freq: H, dtype: float64"
      ]
     },
     "execution_count": 20,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "ts = pd.Series(np.random.randn(len(prng)), prng)\n",
    "ts.index = (prng.asfreq('M', 'e') + 1).asfreq('H', 's') + 9\n",
    "ts\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
 <br><br>
 

## &nbsp;&nbsp;Categoricals
***
 Categorical data를 다뤄보지 않을 수 없겠죠?

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 앞서 진행한 import를 반복합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "import numpy as np\n",
    "import pandas as pd"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### pandas는 DataFrame에 범주형 자료를 포함할 수 있습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
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
       "      <th>raw_grade</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>1</td>\n",
       "      <td>a</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>2</td>\n",
       "      <td>b</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2</td>\n",
       "      <td>3</td>\n",
       "      <td>b</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>3</td>\n",
       "      <td>4</td>\n",
       "      <td>a</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>4</td>\n",
       "      <td>5</td>\n",
       "      <td>a</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>5</td>\n",
       "      <td>6</td>\n",
       "      <td>e</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   id raw_grade\n",
       "0   1         a\n",
       "1   2         b\n",
       "2   3         b\n",
       "3   4         a\n",
       "4   5         a\n",
       "5   6         e"
      ]
     },
     "execution_count": 3,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df = pd.DataFrame(\n",
    "        {\n",
    "                \"id\": [1, 2, 3, 4, 5, 6],\n",
    "                \"raw_grade\": ['a', 'b', 'b', 'a', 'a', 'e']\n",
    "                }\n",
    "        )\n",
    "df\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0    a\n",
       "1    b\n",
       "2    b\n",
       "3    a\n",
       "4    a\n",
       "5    e\n",
       "Name: grade, dtype: category\n",
       "Categories (3, object): [a, b, e]"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df[\"grade\"] = df[\"raw_grade\"].astype(\"category\")\n",
    "df[\"grade\"]\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 범주형 자료에 더 의미있는 이름을 붙여봅시다. ('Series.cat.categories()'에 이름을 할당하면 됩니다!)\n"
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
       "      <th>id</th>\n",
       "      <th>raw_grade</th>\n",
       "      <th>grade</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>1</td>\n",
       "      <td>a</td>\n",
       "      <td>very good</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>2</td>\n",
       "      <td>b</td>\n",
       "      <td>good</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2</td>\n",
       "      <td>3</td>\n",
       "      <td>b</td>\n",
       "      <td>good</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>3</td>\n",
       "      <td>4</td>\n",
       "      <td>a</td>\n",
       "      <td>very good</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>4</td>\n",
       "      <td>5</td>\n",
       "      <td>a</td>\n",
       "      <td>very good</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>5</td>\n",
       "      <td>6</td>\n",
       "      <td>e</td>\n",
       "      <td>very bad</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   id raw_grade      grade\n",
       "0   1         a  very good\n",
       "1   2         b       good\n",
       "2   3         b       good\n",
       "3   4         a  very good\n",
       "4   5         a  very good\n",
       "5   6         e   very bad"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df[\"grade\"].cat.categories = [\n",
    "            \"very good\",\n",
    "            \"good\",\n",
    "            \"very bad\"\n",
    "            ]\n",
    "df\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 범주를 다시 정렬하는 동시에 새로운 범주를 추가할 수도 있습니다. ('Series.cat()' 아래 메소드들은 기본적으로 새로운 'Series'를 반환합니다.)\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 9,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "0    very good\n",
       "1         good\n",
       "2         good\n",
       "3    very good\n",
       "4    very good\n",
       "5     very bad\n",
       "Name: grade, dtype: category\n",
       "Categories (5, object): [very bad, bad, medium, good, very good]"
      ]
     },
     "execution_count": 9,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df[\"grade\"] = df[\"grade\"].cat.set_categories([\n",
    "            \"very bad\",\n",
    "            \"bad\",\n",
    "            \"medium\",\n",
    "            \"good\",\n",
    "            \"very good\"\n",
    "            ])\n",
    "df[\"grade\"]\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 정렬은 범주의 이름 순서가 아니라 범주에 이름을 할당할 때 정한 순서를 따릅니다.\n"
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
       "      <th>id</th>\n",
       "      <th>raw_grade</th>\n",
       "      <th>grade</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>5</td>\n",
       "      <td>6</td>\n",
       "      <td>e</td>\n",
       "      <td>very bad</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>2</td>\n",
       "      <td>b</td>\n",
       "      <td>good</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2</td>\n",
       "      <td>3</td>\n",
       "      <td>b</td>\n",
       "      <td>good</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>1</td>\n",
       "      <td>a</td>\n",
       "      <td>very good</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>3</td>\n",
       "      <td>4</td>\n",
       "      <td>a</td>\n",
       "      <td>very good</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>4</td>\n",
       "      <td>5</td>\n",
       "      <td>a</td>\n",
       "      <td>very good</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   id raw_grade      grade\n",
       "5   6         e   very bad\n",
       "1   2         b       good\n",
       "2   3         b       good\n",
       "0   1         a  very good\n",
       "3   4         a  very good\n",
       "4   5         a  very good"
      ]
     },
     "execution_count": 10,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.sort_values(by=\"grade\")\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 범주 column으로 grouping하면 범주별 빈도를 보여주는데 이 때 비어있는 범주를 확인할 수 있습니다.\n"
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
       "grade\n",
       "very bad     1\n",
       "bad          0\n",
       "medium       0\n",
       "good         2\n",
       "very good    3\n",
       "dtype: int64"
      ]
     },
     "execution_count": 11,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "df.groupby(\"grade\").size()\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
 <br><br>
 

## &nbsp;&nbsp;Plotting
***
 Data analysis의 정점! plotting 입니다.

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 앞서 진행한 import를 반복하고 추가로 graph를 그리는데 필요한 matplot 라이브러리를 import 합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "import numpy as np\n",
    "import pandas as pd\n",
    "import matplotlib.pyplot as plt"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [],
   "source": [
    "plt.close('all')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 아래와 같이 시계열 데이터를 그래프로 그려보겠습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 6,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-01-01    0.969912\n",
       "2020-01-02   -0.535957\n",
       "2020-01-03    0.583240\n",
       "2020-01-04    1.048595\n",
       "2020-01-05   -0.155751\n",
       "                ...   \n",
       "2022-09-22    2.418095\n",
       "2022-09-23    0.526203\n",
       "2022-09-24   -0.132599\n",
       "2022-09-25   -1.281945\n",
       "2022-09-26   -0.646137\n",
       "Freq: D, Length: 1000, dtype: float64"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "ts = pd.Series(\n",
    "        np.random.randn(1000),\n",
    "        index = pd.date_range('1/1/2020', periods=1000)\n",
    "        )\n",
    "ts\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "2020-01-01     0.969912\n",
       "2020-01-02     0.433955\n",
       "2020-01-03     1.017195\n",
       "2020-01-04     2.065790\n",
       "2020-01-05     1.910039\n",
       "                ...    \n",
       "2022-09-22   -27.169420\n",
       "2022-09-23   -26.643217\n",
       "2022-09-24   -26.775816\n",
       "2022-09-25   -28.057761\n",
       "2022-09-26   -28.703898\n",
       "Freq: D, Length: 1000, dtype: float64"
      ]
     },
     "execution_count": 7,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "\n",
    "ts = ts.cumsum() # cumsum: 첫 번째 성분부터 각 성분까지의 누적합을 계산\n",
    "ts\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "<matplotlib.axes._subplots.AxesSubplot at 0x19d01293848>"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    },
    {
     "data": {
      "image/png": "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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    }
   ],
   "source": [
    "\n",
    "ts.plot()\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### DataFrame에서 plot() method는 모든 column의 data를 간편하게 그래프로 표현할 수 있으며 각 column별로 labeling도 할 수 있습니다.\n"
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
       "<Figure size 432x288 with 0 Axes>"
      ]
     },
     "execution_count": 11,
     "metadata": {},
     "output_type": "execute_result"
    },
    {
     "data": {
      "text/plain": [
       "<Figure size 432x288 with 0 Axes>"
      ]
     },
     "metadata": {},
     "output_type": "display_data"
    }
   ],
   "source": [
    "\n",
    "df = pd.DataFrame(\n",
    "        np.random.randn(1000, 4),\n",
    "        index = ts.index,\n",
    "        columns = ['A', 'B', 'C', 'D']\n",
    "        )\n",
    "\n",
    "df = df.cumsum()\n",
    "\n",
    "plt.figure()\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 12,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "<matplotlib.axes._subplots.AxesSubplot at 0x19d00bf8c08>"
      ]
     },
     "execution_count": 12,
     "metadata": {},
     "output_type": "execute_result"
    },
    {
     "data": {
      "image/png": "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\n",
      "text/plain": [
       "<Figure size 432x288 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    }
   ],
   "source": [
    "\n",
    "df.plot()\n"
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
 <br><br>
 

## &nbsp;&nbsp;Getting data in/out
***
 생성/분석에 사용하는 data를 파일로 쓰거나 불러오는 방법입니다.

 ```json
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 앞서 진행한 import를 반복합니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "import numpy as np\n",
    "import pandas as pd"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 시계열 데이터를 생성한 뒤 csv 파일로 저장해 봅시다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "df = pd.DataFrame(\n",
    "        np.random.randn(1000, 4),\n",
    "        index = pd.Series(np.random.randn(1000), index=pd.date_range('1/1/2020', periods=1000)),\n",
    "        columns = ['A', 'B', 'C', 'D']\n",
    "        )\n",
    "df.to_csv('foo.csv')"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 반대로 csv 파일을 읽어봅시다.\n"
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
       "      <th>Unnamed: 0</th>\n",
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>-0.278836</td>\n",
       "      <td>0.207474</td>\n",
       "      <td>0.001968</td>\n",
       "      <td>1.314218</td>\n",
       "      <td>-0.199339</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>0.070793</td>\n",
       "      <td>-0.747281</td>\n",
       "      <td>0.057319</td>\n",
       "      <td>1.140240</td>\n",
       "      <td>1.507255</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2</td>\n",
       "      <td>0.620508</td>\n",
       "      <td>-0.361898</td>\n",
       "      <td>-0.663693</td>\n",
       "      <td>0.624234</td>\n",
       "      <td>0.331756</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>3</td>\n",
       "      <td>0.011931</td>\n",
       "      <td>0.208971</td>\n",
       "      <td>-0.636545</td>\n",
       "      <td>0.346130</td>\n",
       "      <td>-1.738320</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>4</td>\n",
       "      <td>0.271138</td>\n",
       "      <td>-0.164832</td>\n",
       "      <td>-1.424289</td>\n",
       "      <td>0.257722</td>\n",
       "      <td>-0.438648</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>995</td>\n",
       "      <td>-1.457444</td>\n",
       "      <td>-1.197647</td>\n",
       "      <td>-0.930289</td>\n",
       "      <td>0.032803</td>\n",
       "      <td>-0.156479</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>996</td>\n",
       "      <td>-0.025240</td>\n",
       "      <td>-0.861467</td>\n",
       "      <td>2.008338</td>\n",
       "      <td>0.769440</td>\n",
       "      <td>0.178559</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>997</td>\n",
       "      <td>0.341979</td>\n",
       "      <td>1.451293</td>\n",
       "      <td>-0.546777</td>\n",
       "      <td>-0.675252</td>\n",
       "      <td>0.392719</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>998</td>\n",
       "      <td>-1.139901</td>\n",
       "      <td>-0.247459</td>\n",
       "      <td>0.391524</td>\n",
       "      <td>0.321870</td>\n",
       "      <td>0.973132</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>999</td>\n",
       "      <td>1.208057</td>\n",
       "      <td>-1.950139</td>\n",
       "      <td>-0.638642</td>\n",
       "      <td>0.580319</td>\n",
       "      <td>-0.759484</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "<p>1000 rows × 5 columns</p>\n",
       "</div>"
      ],
      "text/plain": [
       "     Unnamed: 0         A         B         C         D\n",
       "0     -0.278836  0.207474  0.001968  1.314218 -0.199339\n",
       "1      0.070793 -0.747281  0.057319  1.140240  1.507255\n",
       "2      0.620508 -0.361898 -0.663693  0.624234  0.331756\n",
       "3      0.011931  0.208971 -0.636545  0.346130 -1.738320\n",
       "4      0.271138 -0.164832 -1.424289  0.257722 -0.438648\n",
       "..          ...       ...       ...       ...       ...\n",
       "995   -1.457444 -1.197647 -0.930289  0.032803 -0.156479\n",
       "996   -0.025240 -0.861467  2.008338  0.769440  0.178559\n",
       "997    0.341979  1.451293 -0.546777 -0.675252  0.392719\n",
       "998   -1.139901 -0.247459  0.391524  0.321870  0.973132\n",
       "999    1.208057 -1.950139 -0.638642  0.580319 -0.759484\n",
       "\n",
       "[1000 rows x 5 columns]"
      ]
     },
     "execution_count": 4,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "pd.read_csv('foo.csv')\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### HDF5 (Hierarchical Data Format version 5, 대용량 데이터를 저장하기 위한 파일 포맷)로 저장하고 읽을 수도 있습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "df.to_hdf('foo.h5', 'df')\n"
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
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>-0.278836</td>\n",
       "      <td>0.207474</td>\n",
       "      <td>0.001968</td>\n",
       "      <td>1.314218</td>\n",
       "      <td>-0.199339</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>0.070793</td>\n",
       "      <td>-0.747281</td>\n",
       "      <td>0.057319</td>\n",
       "      <td>1.140240</td>\n",
       "      <td>1.507255</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>0.620508</td>\n",
       "      <td>-0.361898</td>\n",
       "      <td>-0.663693</td>\n",
       "      <td>0.624234</td>\n",
       "      <td>0.331756</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>0.011931</td>\n",
       "      <td>0.208971</td>\n",
       "      <td>-0.636545</td>\n",
       "      <td>0.346130</td>\n",
       "      <td>-1.738320</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>0.271138</td>\n",
       "      <td>-0.164832</td>\n",
       "      <td>-1.424289</td>\n",
       "      <td>0.257722</td>\n",
       "      <td>-0.438648</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>-1.457444</td>\n",
       "      <td>-1.197647</td>\n",
       "      <td>-0.930289</td>\n",
       "      <td>0.032803</td>\n",
       "      <td>-0.156479</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>-0.025240</td>\n",
       "      <td>-0.861467</td>\n",
       "      <td>2.008338</td>\n",
       "      <td>0.769440</td>\n",
       "      <td>0.178559</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>0.341979</td>\n",
       "      <td>1.451293</td>\n",
       "      <td>-0.546777</td>\n",
       "      <td>-0.675252</td>\n",
       "      <td>0.392719</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>-1.139901</td>\n",
       "      <td>-0.247459</td>\n",
       "      <td>0.391524</td>\n",
       "      <td>0.321870</td>\n",
       "      <td>0.973132</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1.208057</td>\n",
       "      <td>-1.950139</td>\n",
       "      <td>-0.638642</td>\n",
       "      <td>0.580319</td>\n",
       "      <td>-0.759484</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "<p>1000 rows × 4 columns</p>\n",
       "</div>"
      ],
      "text/plain": [
       "                  A         B         C         D\n",
       "-0.278836  0.207474  0.001968  1.314218 -0.199339\n",
       " 0.070793 -0.747281  0.057319  1.140240  1.507255\n",
       " 0.620508 -0.361898 -0.663693  0.624234  0.331756\n",
       " 0.011931  0.208971 -0.636545  0.346130 -1.738320\n",
       " 0.271138 -0.164832 -1.424289  0.257722 -0.438648\n",
       "...             ...       ...       ...       ...\n",
       "-1.457444 -1.197647 -0.930289  0.032803 -0.156479\n",
       "-0.025240 -0.861467  2.008338  0.769440  0.178559\n",
       " 0.341979  1.451293 -0.546777 -0.675252  0.392719\n",
       "-1.139901 -0.247459  0.391524  0.321870  0.973132\n",
       " 1.208057 -1.950139 -0.638642  0.580319 -0.759484\n",
       "\n",
       "[1000 rows x 4 columns]"
      ]
     },
     "execution_count": 6,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "pd.read_hdf('foo.h5', 'df')\n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "\n",
    "#### 엑셀 파일로도 저장하고 읽을 수 있습니다.\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 7,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "df.to_excel('foo.xlsx', sheet_name='Sheet1')\n"
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
       "      <th>Unnamed: 0</th>\n",
       "      <th>A</th>\n",
       "      <th>B</th>\n",
       "      <th>C</th>\n",
       "      <th>D</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <td>0</td>\n",
       "      <td>-0.278836</td>\n",
       "      <td>0.207474</td>\n",
       "      <td>0.001968</td>\n",
       "      <td>1.314218</td>\n",
       "      <td>-0.199339</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>1</td>\n",
       "      <td>0.070793</td>\n",
       "      <td>-0.747281</td>\n",
       "      <td>0.057319</td>\n",
       "      <td>1.140240</td>\n",
       "      <td>1.507255</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>2</td>\n",
       "      <td>0.620508</td>\n",
       "      <td>-0.361898</td>\n",
       "      <td>-0.663693</td>\n",
       "      <td>0.624234</td>\n",
       "      <td>0.331756</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>3</td>\n",
       "      <td>0.011931</td>\n",
       "      <td>0.208971</td>\n",
       "      <td>-0.636545</td>\n",
       "      <td>0.346130</td>\n",
       "      <td>-1.738320</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>4</td>\n",
       "      <td>0.271138</td>\n",
       "      <td>-0.164832</td>\n",
       "      <td>-1.424289</td>\n",
       "      <td>0.257722</td>\n",
       "      <td>-0.438648</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "      <td>...</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>995</td>\n",
       "      <td>-1.457444</td>\n",
       "      <td>-1.197647</td>\n",
       "      <td>-0.930289</td>\n",
       "      <td>0.032803</td>\n",
       "      <td>-0.156479</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>996</td>\n",
       "      <td>-0.025240</td>\n",
       "      <td>-0.861467</td>\n",
       "      <td>2.008338</td>\n",
       "      <td>0.769440</td>\n",
       "      <td>0.178559</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>997</td>\n",
       "      <td>0.341979</td>\n",
       "      <td>1.451293</td>\n",
       "      <td>-0.546777</td>\n",
       "      <td>-0.675252</td>\n",
       "      <td>0.392719</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>998</td>\n",
       "      <td>-1.139901</td>\n",
       "      <td>-0.247459</td>\n",
       "      <td>0.391524</td>\n",
       "      <td>0.321870</td>\n",
       "      <td>0.973132</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <td>999</td>\n",
       "      <td>1.208057</td>\n",
       "      <td>-1.950139</td>\n",
       "      <td>-0.638642</td>\n",
       "      <td>0.580319</td>\n",
       "      <td>-0.759484</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "<p>1000 rows × 5 columns</p>\n",
       "</div>"
      ],
      "text/plain": [
       "     Unnamed: 0         A         B         C         D\n",
       "0     -0.278836  0.207474  0.001968  1.314218 -0.199339\n",
       "1      0.070793 -0.747281  0.057319  1.140240  1.507255\n",
       "2      0.620508 -0.361898 -0.663693  0.624234  0.331756\n",
       "3      0.011931  0.208971 -0.636545  0.346130 -1.738320\n",
       "4      0.271138 -0.164832 -1.424289  0.257722 -0.438648\n",
       "..          ...       ...       ...       ...       ...\n",
       "995   -1.457444 -1.197647 -0.930289  0.032803 -0.156479\n",
       "996   -0.025240 -0.861467  2.008338  0.769440  0.178559\n",
       "997    0.341979  1.451293 -0.546777 -0.675252  0.392719\n",
       "998   -1.139901 -0.247459  0.391524  0.321870  0.973132\n",
       "999    1.208057 -1.950139 -0.638642  0.580319 -0.759484\n",
       "\n",
       "[1000 rows x 5 columns]"
      ]
     },
     "execution_count": 9,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "\n",
    "pd.read_excel('foo.xlsx', 'Sheet1', index_col=None, na_values=['NA'])\n"
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
   "version": "3.7.4"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
```
