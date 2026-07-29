---
title: "ch2. Data Load"
date: 2022-05-25
category: ml-data
tags: ["ml", "python", "study", "sklearn"]
series: "ML with Python Cookbook"
seriesOrder: 2
legacyPath: "/posts/ch2-Data-Load/"
source: manual
---

## Summary
***

 Machine learning의 첫 단계는 data를 불러 오는 것입니다. CSV, SQL DB 등 다양한 source에서 data load 방법을 알아봅니다. pandas library 도구를 사용합니다. Toy data set은 scikit-learn을 사용합니다.
 <br><br>


 * Toy Data Set (2.1)
 
   * load_boston: Boston house cose에 대한 503개 data set 입니다. (Regression)

   * load_iris: Iris sample size에 대한 150개 data set 입니다. (Classification)
   
   * load_digits: 손 글씨 숫자 이미지 1,979개 data set 입니다. (Image clustering)
   <br><br>


 * scikit-learn을 사용한 Mock Data Set (2.2)

   * make_regression: regression을 위한 실수 feature matrix와 target vector return

   * make_classification: classification을 위한 실수 feature matrix와 정수 target vector return

   * make_blobs: clustering을 위한 실수 feature matrix와 정수 target vector return
   <br><br>


* Pandas를 사용한 Data Load
    
   * **read_csv**: csv file (2.3)

   * **read_excel**: excel file (2.4)
 
   * **read_json**: json file (2.5)
   
   * **read_sql_query**: SQL database (2.6)
   <br><br>


## Practice
***

 ```python
{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 2.0 소개   \n",
    "   \n",
    "머신러닝 작업의 첫 번째 단계는 시스템으로 원본 데이터를 불러오는 것입니다.   \n",
    "원본 데이터는 로그 파일이나 데이터셋 파일, 데이터베이스일 수 있습니다.   \n",
    "   \n",
    "이 장에서는 CSV 파일, SQL 데이터베이스 같은 다양한 소스에서 데이터를 적재하는 방법을 알아봅니다.   \n",
    "또한 실험에 필요한 특성을 가진 모의 데이터를 생성하는 방법도 알아봅니다.   \n",
    "   \n",
    "외부 데이터를 적재할 때는 pandas 라이브러리의 다양한 도구를 사용하고   \n",
    "모의 데이터를 생성할 때는 파이썬의 오픈 소스 머신러닝 라이브러리인 scikit-learn을 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 2.1 샘플 데이터셋 적재하기   \n",
    "   \n",
    "scikit-learn에는 이미 준비된 데이터셋이 존재합니다.   \n",
    "이 데이터셋들은 실재 마주하는 데이터와 비교해서 아주 작고 잘 정제되어 있기 때문에 토이 데이터셋이라고 부릅니다.   \n",
    "scikit-learn에서 자주 사용하는 데이터셋은 다음과 같습니다.   \n",
    "   \n",
    "* load_boston   \n",
    "보스턴 주택 가격에 대한 503개의 샘플을 가지고 있습니다.   \n",
    "회귀 알고리즘을 배울 때 사용하기 좋은 데이터셋입니다.   \n",
    "   \n",
    "   \n",
    "* load_iris   \n",
    "150개의 붓꽃 샘플 치수를 가지고 있습니다.   \n",
    "분류 알고리즘을 배울 때 사용하기 좋은 데이터셋입니다.   \n",
    "   \n",
    "   \n",
    "* load_digits   \n",
    "손으로 쓴 숫자 이미지 1,979개를 가지고 있습니다.   \n",
    "이미지 분류 작업을 배울 때 사용하기 좋은 데이터셋입니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "array([ 0.,  0.,  5., 13.,  9.,  1.,  0.,  0.,  0.,  0., 13., 15., 10.,\n",
       "       15.,  5.,  0.,  0.,  3., 15.,  2.,  0., 11.,  8.,  0.,  0.,  4.,\n",
       "       12.,  0.,  0.,  8.,  8.,  0.,  0.,  5.,  8.,  0.,  0.,  9.,  8.,\n",
       "        0.,  0.,  4., 11.,  0.,  1., 12.,  7.,  0.,  0.,  2., 14.,  5.,\n",
       "       10., 12.,  0.,  0.,  0.,  0.,  6., 13., 10.,  0.,  0.,  0.])"
      ]
     },
     "execution_count": 1,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# scikit-learn의 데이터셋을 적재합니다.\n",
    "from sklearn import datasets\n",
    "\n",
    "# 숫자 데이터셋을 적재합니다.\n",
    "digits = datasets.load_digits()\n",
    "\n",
    "# 특성 행렬을 만듭니다.\n",
    "features = digits.data\n",
    "\n",
    "# 타겟 벡터를 만듭니다.\n",
    "target = digits.target\n",
    "\n",
    "# 첫 번째 샘플을 확인합니다.\n",
    "features[0]"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 2.2 모의 데이터셋 만들기   \n",
    "   \n",
    "선형 회귀에 사용할 데이터셋이 필요할 때는 make_regression이 좋은 선택입니다.   \n",
    "make_regression은 실수 특성 행렬과 실수 타겟 벡터를 반환합니다.   \n",
    "n_informative는 타겟 벡터를 생성하는 데 사용할 특성 수를 결정합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "특성 행렬\n",
      " [[ 1.29322588 -0.61736206 -0.11044703]\n",
      " [-2.793085    0.36633201  1.93752881]\n",
      " [ 0.80186103 -0.18656977  0.0465673 ]]\n",
      "타겟 벡터\n",
      " [-10.37865986  25.5124503   19.67705609]\n"
     ]
    }
   ],
   "source": [
    "from sklearn.datasets import make_regression\n",
    "\n",
    "# 특성 행렬, 타겟 벡터, 정답계수를 생성합니다.\n",
    "features, target, coefficients = make_regression(n_samples = 100,\n",
    "                                                 n_features = 3,\n",
    "                                                 n_informative = 3,\n",
    "                                                 n_targets = 1,\n",
    "                                                 noise = 0.0,\n",
    "                                                 coef = True,\n",
    "                                                 random_state = 1)\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 확인합니다.\n",
    "print('특성 행렬\\n', features[:3])\n",
    "print('타겟 벡터\\n', target[:3])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "분류에 필요한 모의 데이터셋을 만들려면 make_classification을 사용합니다.   \n",
    "make_classification은 실수 특성 행렬과 클래스의 소속을 나타내는 정수 타겟 벡터를 반환합니다.   \n",
    "마찬가지로 n_informative는 타겟 벡터를 생성하는 데 사용할 특성 수를 결정합니다.   \n",
    "또한 weights 매개변수를 사용해 불균형한 클래스를 가진 모의 데이터셋을 만들 수 있습니다.   \n",
    "예를 들어 weights = [ .25, .75]는 샘플의 25%가 한 클래스이고 75%가 두 번째 클래스에 속한 데이터셋을 반환합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "특성 행렬\n",
      " [[ 1.06354768 -1.42632219  1.02163151]\n",
      " [ 0.23156977  1.49535261  0.33251578]\n",
      " [ 0.15972951  0.83533515 -0.40869554]]\n",
      "타겟 벡터\n",
      " [1 0 0]\n"
     ]
    }
   ],
   "source": [
    "from sklearn.datasets import make_classification\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 생성합니다.\n",
    "features, target = make_classification(n_samples = 100,\n",
    "                                       n_features = 3,\n",
    "                                       n_informative = 3,\n",
    "                                       n_redundant = 0,\n",
    "                                       n_classes = 2,\n",
    "                                       weights = [.25, .75],\n",
    "                                       random_state = 1)\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 확인합니다.\n",
    "print('특성 행렬\\n', features[:3])\n",
    "print('타겟 벡터\\n', target[:3])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "마지막으로 군집 알고리즘에 적용할 데이터셋이 필요하다면 make_blobs를 사용합니다.   \n",
    "make_blobs 또한 실수 특성 행렬과 클래스의 소속을 나타내는 정수 타겟 벡터를 반환합니다.   \n",
    "또한 centers 매개변수가 생성될 클러스터의 수를 결정합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 4,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "특성 행렬\n",
      " [[ -1.22685609   3.25572052]\n",
      " [ -9.57463218  -4.38310652]\n",
      " [-10.71976941  -4.20558148]]\n",
      "타겟 벡터\n",
      " [0 1 1]\n"
     ]
    }
   ],
   "source": [
    "from sklearn.datasets import make_blobs\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 생성합니다.\n",
    "features, target = make_blobs(n_samples = 100,\n",
    "                              n_features = 2,\n",
    "                              centers = 3,\n",
    "                              cluster_std = 0.5,\n",
    "                              shuffle = True,\n",
    "                              random_state = 1)\n",
    "\n",
    "# 특성 행렬과 타겟 벡터를 확인합니다.\n",
    "print('특성 행렬\\n', features[:3])\n",
    "print('타겟 벡터\\n', target[:3])"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "matplotlib 그래프 라이브러리를 사용하여 make_blobs에서 생성한 클러스터를 시각화해보겠습니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 5,
   "metadata": {},
   "outputs": [
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
    "import matplotlib.pyplot as plt\n",
    "\n",
    "# 산점도를 출력합니다.\n",
    "plt.scatter(features[:, 0], features[:, 1], c=target)\n",
    "plt.show()"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 2.3 CSV 파일 적재하기   \n",
    "   \n",
    "CSV(comma-separated value) 파일을 불러올 때 pandas 라이브러리의 read_csv 함수를 사용합니다.   \n"
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
       "      <th>integer</th>\n",
       "      <th>datetime</th>\n",
       "      <th>category</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>5</td>\n",
       "      <td>2015-01-01 00:00:00</td>\n",
       "      <td>0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>5</td>\n",
       "      <td>2015-01-01 00:00:01</td>\n",
       "      <td>0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   integer             datetime  category\n",
       "0        5  2015-01-01 00:00:00         0\n",
       "1        5  2015-01-01 00:00:01         0"
      ]
     },
     "execution_count": 8,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "import pandas as pd\n",
    "\n",
    "# 데이터 url\n",
    "url = 'https://tinyurl.com/simulated-data'\n",
    "\n",
    "# 데이터 적재\n",
    "dataframe = pd.read_csv(url)\n",
    "\n",
    "# 처음 두 행을 확인합니다.\n",
    "dataframe.head(2)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "sep 매개변수는 파일이 사용하는 구분자를 지정할 수 있습니다.   \n",
    "header 매개변수는 제목 행이 몇 번째 줄인지 지정할 수 있습니다.   \n",
    "names 매개변수는 header=None인 경우 제목을 설정할 수 있습니다.   \n",
    "skiprows 매개변수는 건너 뛸 행의 개수나 범위를 지정할 수 있습니다.   \n",
    "nrows 매개변수는 읽을 행의 개수를 지정할 수 있습니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 2.4 엑셀 파일 적재하기   \n",
    "   \n",
    "엑셀 스프레드시트를 불러올 때 pandas 라이브러리의 read_excel 함수를 사용합니다.   \n"
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
       "      <th>5</th>\n",
       "      <th>2015-01-01 00:00:00</th>\n",
       "      <th>0</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>5</td>\n",
       "      <td>2015-01-01 00:00:01</td>\n",
       "      <td>0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>9</td>\n",
       "      <td>2015-01-01 00:00:02</td>\n",
       "      <td>0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   5 2015-01-01 00:00:00  0\n",
       "0  5 2015-01-01 00:00:01  0\n",
       "1  9 2015-01-01 00:00:02  0"
      ]
     },
     "execution_count": 9,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "#데이터 url\n",
    "url = 'https://tinyurl.com/simulated-excel'\n",
    "\n",
    "# 데이터 적재\n",
    "dataframe = pd.read_excel(url, sheet_name=0, header=1)\n",
    "\n",
    "# 처음 두 행을 확인합니다.\n",
    "dataframe.head(2)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "read_csv와 비슷하나 주요 차이점은 sheet_name 매개변수를 사용하여 스프레드시트를 선택할 수 있다는 점입니다.   \n",
    "sheet_name 매개변수는 시트 이름 문자열이나 시트의 위치를 나타내는 정수를 모두 받을 수 있습니다.   \n",
    "read_excel 함수도 na_filter, skip_rows, nrows, keep_default_na, na_values 매개변수를 지원합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 2.5 JSON 파일 적재하기   \n",
    "   \n",
    "json 파일을 불러올 때 pandas 라이브러리의 read_json 함수를 사용합니다.   \n"
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
       "      <th>integer</th>\n",
       "      <th>datetime</th>\n",
       "      <th>category</th>\n",
       "    </tr>\n",
       "  </thead>\n",
       "  <tbody>\n",
       "    <tr>\n",
       "      <th>0</th>\n",
       "      <td>5</td>\n",
       "      <td>2015-01-01 00:00:00</td>\n",
       "      <td>0</td>\n",
       "    </tr>\n",
       "    <tr>\n",
       "      <th>1</th>\n",
       "      <td>5</td>\n",
       "      <td>2015-01-01 00:00:01</td>\n",
       "      <td>0</td>\n",
       "    </tr>\n",
       "  </tbody>\n",
       "</table>\n",
       "</div>"
      ],
      "text/plain": [
       "   integer            datetime  category\n",
       "0        5 2015-01-01 00:00:00         0\n",
       "1        5 2015-01-01 00:00:01         0"
      ]
     },
     "execution_count": 10,
     "metadata": {},
     "output_type": "execute_result"
    }
   ],
   "source": [
    "# 데이터 url\n",
    "url = 'https://tinyurl.com/simulated-json'\n",
    "\n",
    "# 데이터 적재\n",
    "dataframe = pd.read_json(url, orient='columns')\n",
    "\n",
    "# 처음 두 행을 확인합니다.\n",
    "dataframe.head(2)"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "앞에서 살펴본 함수와 비슷하지만 주요 차이점은 json 파일이 어떻게 구성되었는지 지정하는 orient 매개변수를 사용한다는 점 입니다.   \n",
    "'column'은 json 파일이 {열: {인덱스: 값, ...}, ...} 의 구조를 가질 때 사용합니다.   \n",
    "그 외 json 파일 구조에 따라 split, records, index, values를 사용합니다.   \n"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "   \n",
    "# 2.6 SQL 데이터베이스로부터 적재하기   \n",
    "   \n",
    "SQL(structured query language) 데이터베이스는   \n",
    "pandas의 read_sql_query 함수를 사용하여 데이터베이스에 SQL 쿼리를 던져 데이터를 적재합니다.   \n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 24,
   "metadata": {},
   "outputs": [
    {
     "ename": "OperationalError",
     "evalue": "(sqlite3.OperationalError) no such table: data\n[SQL: SELECT * FROM data]\n(Background on this error at: http://sqlalche.me/e/13/e3q8)",
     "output_type": "error",
     "traceback": [
      "\u001b[1;31m---------------------------------------------------------------------------\u001b[0m",
      "\u001b[1;31mOperationalError\u001b[0m                          Traceback (most recent call last)",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\sqlalchemy\\engine\\base.py\u001b[0m in \u001b[0;36m_execute_context\u001b[1;34m(self, dialect, constructor, statement, parameters, *args)\u001b[0m\n\u001b[0;32m   1265\u001b[0m                 \u001b[1;32mif\u001b[0m \u001b[1;32mnot\u001b[0m \u001b[0mevt_handled\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m-> 1266\u001b[1;33m                     self.dialect.do_execute_no_params(\n\u001b[0m\u001b[0;32m   1267\u001b[0m                         \u001b[0mcursor\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mstatement\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mcontext\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\sqlalchemy\\engine\\default.py\u001b[0m in \u001b[0;36mdo_execute_no_params\u001b[1;34m(self, cursor, statement, context)\u001b[0m\n\u001b[0;32m    595\u001b[0m     \u001b[1;32mdef\u001b[0m \u001b[0mdo_execute_no_params\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mself\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mcursor\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mstatement\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mcontext\u001b[0m\u001b[1;33m=\u001b[0m\u001b[1;32mNone\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m--> 596\u001b[1;33m         \u001b[0mcursor\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mexecute\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mstatement\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m    597\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;31mOperationalError\u001b[0m: no such table: data",
      "\nThe above exception was the direct cause of the following exception:\n",
      "\u001b[1;31mOperationalError\u001b[0m                          Traceback (most recent call last)",
      "\u001b[1;32m<ipython-input-24-796ef047a7c2>\u001b[0m in \u001b[0;36m<module>\u001b[1;34m\u001b[0m\n\u001b[0;32m      5\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m      6\u001b[0m \u001b[1;31m# 데이터를 적재합니다.\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m----> 7\u001b[1;33m \u001b[0mdataframe\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0mpd\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mread_sql_query\u001b[0m\u001b[1;33m(\u001b[0m\u001b[1;34m'SELECT * FROM data'\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mdatabase_connection\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m      8\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m      9\u001b[0m \u001b[1;31m# 처음 두 개의 행을 확인합니다.\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\pandas\\io\\sql.py\u001b[0m in \u001b[0;36mread_sql_query\u001b[1;34m(sql, con, index_col, coerce_float, params, parse_dates, chunksize)\u001b[0m\n\u001b[0;32m    375\u001b[0m     \"\"\"\n\u001b[0;32m    376\u001b[0m     \u001b[0mpandas_sql\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0mpandasSQL_builder\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mcon\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m--> 377\u001b[1;33m     return pandas_sql.read_query(\n\u001b[0m\u001b[0;32m    378\u001b[0m         \u001b[0msql\u001b[0m\u001b[1;33m,\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m    379\u001b[0m         \u001b[0mindex_col\u001b[0m\u001b[1;33m=\u001b[0m\u001b[0mindex_col\u001b[0m\u001b[1;33m,\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\pandas\\io\\sql.py\u001b[0m in \u001b[0;36mread_query\u001b[1;34m(self, sql, index_col, coerce_float, parse_dates, params, chunksize)\u001b[0m\n\u001b[0;32m   1293\u001b[0m         \u001b[0margs\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0m_convert_params\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0msql\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mparams\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1294\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m-> 1295\u001b[1;33m         \u001b[0mresult\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0mself\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mexecute\u001b[0m\u001b[1;33m(\u001b[0m\u001b[1;33m*\u001b[0m\u001b[0margs\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m   1296\u001b[0m         \u001b[0mcolumns\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0mresult\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mkeys\u001b[0m\u001b[1;33m(\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1297\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\pandas\\io\\sql.py\u001b[0m in \u001b[0;36mexecute\u001b[1;34m(self, *args, **kwargs)\u001b[0m\n\u001b[0;32m   1159\u001b[0m     \u001b[1;32mdef\u001b[0m \u001b[0mexecute\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mself\u001b[0m\u001b[1;33m,\u001b[0m \u001b[1;33m*\u001b[0m\u001b[0margs\u001b[0m\u001b[1;33m,\u001b[0m \u001b[1;33m**\u001b[0m\u001b[0mkwargs\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1160\u001b[0m         \u001b[1;34m\"\"\"Simple passthrough to SQLAlchemy connectable\"\"\"\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m-> 1161\u001b[1;33m         return self.connectable.execution_options(no_parameters=True).execute(\n\u001b[0m\u001b[0;32m   1162\u001b[0m             \u001b[1;33m*\u001b[0m\u001b[0margs\u001b[0m\u001b[1;33m,\u001b[0m \u001b[1;33m**\u001b[0m\u001b[0mkwargs\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1163\u001b[0m         )\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\sqlalchemy\\engine\\base.py\u001b[0m in \u001b[0;36mexecute\u001b[1;34m(self, statement, *multiparams, **params)\u001b[0m\n\u001b[0;32m   2233\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   2234\u001b[0m         \u001b[0mconnection\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0mself\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0m_contextual_connect\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mclose_with_result\u001b[0m\u001b[1;33m=\u001b[0m\u001b[1;32mTrue\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m-> 2235\u001b[1;33m         \u001b[1;32mreturn\u001b[0m \u001b[0mconnection\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mexecute\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mstatement\u001b[0m\u001b[1;33m,\u001b[0m \u001b[1;33m*\u001b[0m\u001b[0mmultiparams\u001b[0m\u001b[1;33m,\u001b[0m \u001b[1;33m**\u001b[0m\u001b[0mparams\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m   2236\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   2237\u001b[0m     \u001b[1;32mdef\u001b[0m \u001b[0mscalar\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mself\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mstatement\u001b[0m\u001b[1;33m,\u001b[0m \u001b[1;33m*\u001b[0m\u001b[0mmultiparams\u001b[0m\u001b[1;33m,\u001b[0m \u001b[1;33m**\u001b[0m\u001b[0mparams\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\sqlalchemy\\engine\\base.py\u001b[0m in \u001b[0;36mexecute\u001b[1;34m(self, object_, *multiparams, **params)\u001b[0m\n\u001b[0;32m   1001\u001b[0m         \"\"\"\n\u001b[0;32m   1002\u001b[0m         \u001b[1;32mif\u001b[0m \u001b[0misinstance\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mobject_\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mutil\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mstring_types\u001b[0m\u001b[1;33m[\u001b[0m\u001b[1;36m0\u001b[0m\u001b[1;33m]\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m-> 1003\u001b[1;33m             \u001b[1;32mreturn\u001b[0m \u001b[0mself\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0m_execute_text\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mobject_\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mmultiparams\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mparams\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m   1004\u001b[0m         \u001b[1;32mtry\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1005\u001b[0m             \u001b[0mmeth\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0mobject_\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0m_execute_on_connection\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\sqlalchemy\\engine\\base.py\u001b[0m in \u001b[0;36m_execute_text\u001b[1;34m(self, statement, multiparams, params)\u001b[0m\n\u001b[0;32m   1170\u001b[0m         \u001b[0mdialect\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0mself\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mdialect\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1171\u001b[0m         \u001b[0mparameters\u001b[0m \u001b[1;33m=\u001b[0m \u001b[0m_distill_params\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mmultiparams\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mparams\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m-> 1172\u001b[1;33m         ret = self._execute_context(\n\u001b[0m\u001b[0;32m   1173\u001b[0m             \u001b[0mdialect\u001b[0m\u001b[1;33m,\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1174\u001b[0m             \u001b[0mdialect\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mexecution_ctx_cls\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0m_init_statement\u001b[0m\u001b[1;33m,\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\sqlalchemy\\engine\\base.py\u001b[0m in \u001b[0;36m_execute_context\u001b[1;34m(self, dialect, constructor, statement, parameters, *args)\u001b[0m\n\u001b[0;32m   1314\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1315\u001b[0m         \u001b[1;32mexcept\u001b[0m \u001b[0mBaseException\u001b[0m \u001b[1;32mas\u001b[0m \u001b[0me\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m-> 1316\u001b[1;33m             self._handle_dbapi_exception(\n\u001b[0m\u001b[0;32m   1317\u001b[0m                 \u001b[0me\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mstatement\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mparameters\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mcursor\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mcontext\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1318\u001b[0m             )\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\sqlalchemy\\engine\\base.py\u001b[0m in \u001b[0;36m_handle_dbapi_exception\u001b[1;34m(self, e, statement, parameters, cursor, context)\u001b[0m\n\u001b[0;32m   1508\u001b[0m                 \u001b[0mutil\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mraise_\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mnewraise\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mwith_traceback\u001b[0m\u001b[1;33m=\u001b[0m\u001b[0mexc_info\u001b[0m\u001b[1;33m[\u001b[0m\u001b[1;36m2\u001b[0m\u001b[1;33m]\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mfrom_\u001b[0m\u001b[1;33m=\u001b[0m\u001b[0me\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1509\u001b[0m             \u001b[1;32melif\u001b[0m \u001b[0mshould_wrap\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m-> 1510\u001b[1;33m                 util.raise_(\n\u001b[0m\u001b[0;32m   1511\u001b[0m                     \u001b[0msqlalchemy_exception\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mwith_traceback\u001b[0m\u001b[1;33m=\u001b[0m\u001b[0mexc_info\u001b[0m\u001b[1;33m[\u001b[0m\u001b[1;36m2\u001b[0m\u001b[1;33m]\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mfrom_\u001b[0m\u001b[1;33m=\u001b[0m\u001b[0me\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1512\u001b[0m                 )\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\sqlalchemy\\util\\compat.py\u001b[0m in \u001b[0;36mraise_\u001b[1;34m(***failed resolving arguments***)\u001b[0m\n\u001b[0;32m    180\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m    181\u001b[0m         \u001b[1;32mtry\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m--> 182\u001b[1;33m             \u001b[1;32mraise\u001b[0m \u001b[0mexception\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m    183\u001b[0m         \u001b[1;32mfinally\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m    184\u001b[0m             \u001b[1;31m# credit to\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\sqlalchemy\\engine\\base.py\u001b[0m in \u001b[0;36m_execute_context\u001b[1;34m(self, dialect, constructor, statement, parameters, *args)\u001b[0m\n\u001b[0;32m   1264\u001b[0m                             \u001b[1;32mbreak\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1265\u001b[0m                 \u001b[1;32mif\u001b[0m \u001b[1;32mnot\u001b[0m \u001b[0mevt_handled\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m-> 1266\u001b[1;33m                     self.dialect.do_execute_no_params(\n\u001b[0m\u001b[0;32m   1267\u001b[0m                         \u001b[0mcursor\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mstatement\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mcontext\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m   1268\u001b[0m                     )\n",
      "\u001b[1;32mD:\\anaconda\\lib\\site-packages\\sqlalchemy\\engine\\default.py\u001b[0m in \u001b[0;36mdo_execute_no_params\u001b[1;34m(self, cursor, statement, context)\u001b[0m\n\u001b[0;32m    594\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m    595\u001b[0m     \u001b[1;32mdef\u001b[0m \u001b[0mdo_execute_no_params\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mself\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mcursor\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mstatement\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mcontext\u001b[0m\u001b[1;33m=\u001b[0m\u001b[1;32mNone\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[1;32m--> 596\u001b[1;33m         \u001b[0mcursor\u001b[0m\u001b[1;33m.\u001b[0m\u001b[0mexecute\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mstatement\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0m\u001b[0;32m    597\u001b[0m \u001b[1;33m\u001b[0m\u001b[0m\n\u001b[0;32m    598\u001b[0m     \u001b[1;32mdef\u001b[0m \u001b[0mis_disconnect\u001b[0m\u001b[1;33m(\u001b[0m\u001b[0mself\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0me\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mconnection\u001b[0m\u001b[1;33m,\u001b[0m \u001b[0mcursor\u001b[0m\u001b[1;33m)\u001b[0m\u001b[1;33m:\u001b[0m\u001b[1;33m\u001b[0m\u001b[1;33m\u001b[0m\u001b[0m\n",
      "\u001b[1;31mOperationalError\u001b[0m: (sqlite3.OperationalError) no such table: data\n[SQL: SELECT * FROM data]\n(Background on this error at: http://sqlalche.me/e/13/e3q8)"
     ]
    }
   ],
   "source": [
    "from sqlalchemy import create_engine\n",
    "\n",
    "# 데이터베이스에 연결합니다.\n",
    "database_connection = create_engine('sqlite:///sample.db')\n",
    "\n",
    "# 데이터를 적재합니다.\n",
    "dataframe = pd.read_sql_query('SELECT * FROM data', database_connection)\n",
    "\n",
    "# 처음 두 개의 행을 확인합니다.\n",
    "dataframe.head(2)"
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
