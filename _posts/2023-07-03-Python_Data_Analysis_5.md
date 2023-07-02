---
layout: post
title: 파이썬을 활용한 데이터 분석 (중급) - 5. Paired t-test with python
date: 2023-07-03 07:42:52 +0900
published: true
math: true
categories: [Bioinformatics, Statistics]
tags: [BI,bioinformatics,python,statistics]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 인사이트마이닝 이부일 CEO의 [Paired t-test with python](https://www.edwith.org/python-data-analysis-2023/lecture/1475047, "Paired t-test with python")을 정리한 내용입니다.


## Intro
***

Python을 이용하여 Paired t-test with python 수행과정을 알아봅니다.
<br><br>


## 언제 사용하는가?
***

Paired t-test with python은 동일한 모집단의 사전자료(수치형 자료)와 사후자료(수치형 자료) 간에 통계적으로 의미 있는 차이가 있는지를 분석할 때 사용하는 방법입니다. 사전자료, 사후자료의 값이 정규분포를 따를 때 사용할 수 있습니다.
<br><br>


## 가설 세우기
***

* 귀무가설 (Null Hypothesis, H<sub>0</sub>)
    * 우울증 치료제는 우울증에 효과가 없습니다.

* 대립가설 (Alternative Hypothesis, H<sub>1</sub> or H<sub>A</sub>)
    * 우울증 치료제는 우울증에 효과가 있습니다.
<br><br>


## Paired t-test
***

* 1단계: 정규성 검정(Normality Test)
    * 귀무가설: (사전-사후) 값이 정규분포를 따릅니다.
    * 대립가설: (사전-사후) 값이 정규분포를 따르지 않습니다.
    * n < 5,000: Shapiro-Wilk Normality Test
    * n >= 5,000: Anderson-Darling Normality Test

* 2단계: Paired t-test
    * 
<br><br>


## 실습
***

* 가설 설정
    * 귀무가설: 우울증 치료제는 우울증에 효과가 없습니다.
    * 대립가설: 우울증 치료제는 우울증에 효과가 있습니다.
<br><br>


![Post-Image](Python_Data_Analysis16.png)
_데이터 로딩<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475047_
<br><br>


* 분석 1단계: 정규성 검정(Normality Test)
    * 귀무가설: 정규분포를 따릅니다.
    * 대립가설: 정규분포를 따르지 않습니다.
    * n < 5,000 : Shapito-Wilk Normality Test (shapiro(data.variable))
    * n >= 5,000 : Anderson-Darling Normality Test (anderson(data.variable))
    * shapiro normality test 결과 difference의 유의확률(p-value)가 0.828로 정규성 가정을 만족합니다.
<br><br>


![Post-Image](Python_Data_Analysis17.png)
_정규성 검정<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475047_
<br><br>


* 분석 2단계: Paired t-test
    * 귀무가설: 우울증 치료제는 우울증에 효과가 없습니다.
    * 대립가설: 우울증 치료제는 우울증에 효과가 있습니다.
    * 유의확률(p-value) 0.000으로 유의수준(0.05)보다 작으므로 귀무가설을 기각합니다. 즉, 우울증 치료제는 우울증에 통계적으로 유의한 효과가 있습니다.
<br><br>


![Post-Image](Python_Data_Analysis18.png)
_Paired t-test<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475047_
<br><br>


## 코드
***

```python
import pandas as pd
import scipy.stats as stats

depression = pd.read_excel(
    io = '05depression.xlsx',
    sheet_name = 0
)

print(depression)


# Analysis I: Normality Test
# n < 5,000 -> Shapiro-Wilk Normality Test
depression['difference'] = depression.pre - depression.post
stats.shapiro(depression.difference)


# Analysis II: Paired t-test
stats.ttest_rel(
    depression.pre,
    depression.post,
    alternative = 'greater'
)
```
<br><br>


## Take Home Message
***

Paired t-test 이론을 학습하고 Google colab에서 실습해 보았습니다.
<br><br>