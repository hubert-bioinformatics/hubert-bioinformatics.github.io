---
layout: post
title: 파이썬을 활용한 데이터 분석 (중급) - 2. Wilcoxon's Signed Rank Test with python
date: 2023-06-28 07:29:14 +0900
published: true
math: true
categories: [Bioinformatics, Statistics]
tags: [BI,bioinformatics,python,statistics]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 인사이트마이닝 이부일 CEO의 [Wilcoxon's Signed Rank Test with python](https://www.edwith.org/python-data-analysis-2023/lecture/1475044, "Wilcoxon's Signed Rank Test with python")을 정리한 내용입니다.


## Intro
***

Python을 이용하여 Wilcoxon's Signed Rank Test 수행과정을 알아봅니다.
<br><br>


## 언제 사용하는가?
***

Wilcoxon's Signed Rank Test는 하나의 모집단의 평균이 기존보다 커졌는지, 작아졌는지, 같지 않은지를 분석할 때 사용합니다. One sample t-test와 다른점은 정규성 가정이 깨졌을 때 사용하는 분석 방법입니다.
<br><br>


## 가설 세우기
***

* 귀무가설 (Null Hypothesis, H<sub>0</sub>)
    * 퀴즈 시험성적의 평균은 3.7점 입니다.

* 대립가설 (Alternative Hypothesis, H<sub>1</sub> or H<sub>A</sub>)
    * 퀴즈 시험성적의 평균은 3.7점이 아닙니다.
<br><br>


## Wilcoxon's Signed Rank Test
***

* 1단계
    * 데이터에서 평균 3.7점을 빼줍니다.

* 2단계
    * 1단계의 결과를 절대값으로 변경합니다.

* 3단계
    * 절대값이 0인 값은 삭제합니다.
    * 절대값이 가장 작은 값이 순위 1이 됩니다.
    * 동일한 값이 있을 때에는 순위의 평균으로 지정합니다.

* 4단계
    * 평균 3.7점보다 작은 값의 순위에 -를 붙입니다.

* 5단계
    * W+ (평균보다 큰 값의 순위의 합)
    * W- (평균보다 작은 값의 순위의 합)
    * 두 가지 값을 구합니다.

* 6단계
    * Wilcoxon의 표에서 유의확률(p-value)를 구합니다.
<br><br>


## 실습
***

* 가설 설정
    * 귀무가설: iris 꽃잎의 평균 길이는 3 입니다.
    * 대립가설: iris 꽃잎의 평균 길이는 3이 아닙니다.
<br><br>


![Post-Image](Python_Data_Analysis5.png)
_데이터 로딩<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475044_
<br><br>


* 분석 1단계: 정규성 검정(Normality Test)
    * 귀무가설: 정규분포를 따릅니다. (정규분포를 따라야만 One sample t-test를 수행할 수 있습니다.)
    * 대립가설: 정규분포를 따르지 않습니다.
    * n < 5,000 : Shapito-Wilk Normality Test (shapiro(data.variable))
    * n >= 5,000 : Anderson-Darling Normality Test (anderson(data.variable))
    * shapiro normality test의 유의확률(p-value)가 0.79로 귀무가설(정규분포 따름)을 만족합니다.
<br><br>


![Post-Image](Python_Data_Analysis6.png)
_정규성 검정<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475044_
<br><br>


* 분석 2단계: Wilcoxon's signed rank test
<br><br>


![Post-Image](Python_Data_Analysis7.png)
_Wilcoxon's Signed Rank Test<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475044_
<br><br>


## 코드
***

```python
import pandas as pd
import seaborn as sns
import scipy.stats as stats
from scipy.stats import shapiro

# load data
iris = sns.load_dataset('iris')
print(iris)


# Analysis I: Normality Test
# n < 5,000 -> Shapito-Wilk Normality Test
shapiro_test = shapiro(iris.petal_length)
print(shapiro_test)

# 유의확률 (7.413 * 10^(-10)) < 유의수준 (0.05) -> 대립가설 지지 -> 정규성 가정을 만족하지 않습니다.


# Analysis II: Wilcoxon's Signed Rank Test
stats.wilcoxon(
    iris.petal_length - 3,
    alternative = 'two-sided'
    )

# 유의확률 (6.942 * 10^(-7)) < 유의수준 (0.05) -> 대립가설 지지 -> iris의 꽃잎 길이는 통계적으로 유의한 차이가 있는 것으로 나타났습니다.
```
<br><br>


## Take Home Message
***

Wilcoxon's Signed Rank Test 이론을 학습하고 Google colab에서 실습해 보았습니다.
<br><br>