---
layout: post
title: 파이썬을 활용한 데이터 분석 (중급) - 6. Wilcoxon's matched pairs signed rank test with python
date: 2023-07-03 11:55:05 +0900
published: true
math: true
categories: [Bioinformatics, Statistics]
tags: [BI,bioinformatics,python,statistics]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 인사이트마이닝 이부일 CEO의 [Wilcoxon's matched pairs signed rank test with python](https://www.edwith.org/python-data-analysis-2023/lecture/1475048, "Wilcoxon's matched pairs signed rank test with python")을 정리한 내용입니다.


## Intro
***

Python을 이용하여 Wilcoxon's matched pairs signed rank test with python 수행과정을 알아봅니다.
<br><br>


## 언제 사용하는가?
***

Wilcoxon's matched pairs signed rank test with python은 동일한 모집단의 사전자료(수치형 자료)와 사후자료(수치형 자료) 간에 통계적으로 의미 있는 차이가 있는지를 분석할 때 사용하는 방법입니다. 사전자료, 사후자료의 값이 정규분포를 따르지 않을 때 사용할 수 있습니다.
<br><br>


## 가설 세우기
***

* 귀무가설 (Null Hypothesis, H<sub>0</sub>)
    * 경호원의 경호효과는 없습니다.

* 대립가설 (Alternative Hypothesis, H<sub>1</sub> or H<sub>A</sub>)
    * 경호원의 경호효과는 있습니다.
<br><br>


## Paired t-test
***

* 1단계: 정규성 검정(Normality Test)
    * 귀무가설: (사전-사후) 값이 정규분포를 따릅니다.
    * 대립가설: (사전-사후) 값이 정규분포를 따르지 않습니다.
    * n < 5,000: Shapiro-Wilk Normality Test
    * n >= 5,000: Anderson-Darling Normality Test

* 2단계: Wilcoxon's matched pairs signed rank test
    * difference = before - after 값을 구합니다.
    * difference에 절대값을 취합니다.
    * 순위를 구합니다. 동점(tie)이 발생할 경우에는 평균 순위를 줍니다.
    * W+, W-를 구합니다.
<br><br>


## 실습
***

* 가설 설정
    * 귀무가설: 경호원의 경호효과는 없습니다.
    * 대립가설: 경호원의 경호효과는 있습니다.
<br><br>


![Post-Image](Python_Data_Analysis19.png)
_데이터 로딩<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475048_
<br><br>


* 분석 1단계: 정규성 검정(Normality Test)
    * 귀무가설: 정규분포를 따릅니다.
    * 대립가설: 정규분포를 따르지 않습니다.
    * n < 5,000 : Shapito-Wilk Normality Test (shapiro(data.variable))
    * n >= 5,000 : Anderson-Darling Normality Test (anderson(data.variable))
    * shapiro normality test 결과 difference의 유의확률(p-value)가 0.016으로 정규성 가정을 만족하지 않습니다.
<br><br>


![Post-Image](Python_Data_Analysis20.png)
_정규성 검정<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475048_
<br><br>


* 분석 2단계: Wilcoxon's matched pairs signed rank test
    * 귀무가설: 경호원의 경호효과는 없습니다.
    * 대립가설: 경호원의 경호효과는 있습니다.
    * 유의확률(p-value) 0.289로 유의수준(0.05)보다 크므로 귀무가설을 기각하지 못합니다. 즉, 경호원에 대한 통계적으로 유의한 경호효과는 없습니다.
<br><br>


![Post-Image](Python_Data_Analysis21.png)
_Paired t-test<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475048_
<br><br>


## 코드
***

```python
import pandas as pd
import scipy.stats as stats

security = pd.read_excel(
    io = '06security.xlsx',
    sheet_name = 0
)

print(security)


# Analysis I: Normality Test
# n < 5,000 -> Shapiro-Wilk Normality Test
security['difference'] = security.before - security.after
stats.shapiro(security.difference)


# Analysis II: Wilcoxon's matched pairs signed rank test
stats.wilcoxon(
    security.difference,
    alternative = 'greater'
)
```
<br><br>


## Take Home Message
***

Wilcoxon's matched pairs signed rank test 이론을 학습하고 Google colab에서 실습해 보았습니다.
<br><br>