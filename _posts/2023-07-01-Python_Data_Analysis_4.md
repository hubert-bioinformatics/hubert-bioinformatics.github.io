---
layout: post
title: 파이썬을 활용한 데이터 분석 (중급) - 4. Wilcoxons Rank Sum Test with python
date: 2023-07-01 15:32:10 +0900
published: true
math: true
categories: [Bioinformatics, Statistics]
tags: [BI,bioinformatics,python,statistics]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 인사이트마이닝 이부일 CEO의 [Wilcoxons Rank Sum Test with python](https://www.edwith.org/python-data-analysis-2023/lecture/1475046, "Wilcoxons Rank Sum Test with python")을 정리한 내용입니다.


## Intro
***

Python을 이용하여 Wilcoxons Rank Sum Test with python 수행과정을 알아봅니다.
<br><br>


## 언제 사용하는가?
***

Wilcoxons Rank Sum Test with python은 두 개의 독립적인 모집단의 평균이 같은지, 다른지, 같지 않은지를 분석하는 방법입니다. 두 개이 모집단 중에서 하나의 모집단이라도 정규성 가정이 깨졌을 때, 또는 모집단의 분포에 대한 가정을 할 수 없을 때 사용합니다.
<br><br>


## 가설 세우기
***

* 귀무가설 (Null Hypothesis, H<sub>0</sub>)
    * 성별(F, M)에 따라 혈압에 차이가 없습니다.

* 대립가설 (Alternative Hypothesis, H<sub>1</sub> or H<sub>A</sub>)
    * 성별(F, M)에 따라 혈압에 차이가 있습니다.
<br><br>


## Wilcoxons Rank Sum Test
***

* 1단계: 정규성 검정(Normality Test)
    * 귀무가설: 정규분포를 따릅니다.
    * 대립가설: 정규분포를 따르지 않습니다.
    * n < 5,000: Shapiro-Wilk Normality Test
    * n >= 5,000: Anderson-Darling Normality Test

* 2단계: Wilcoxons Rank Sum Test
    * 혈압을 기준으로 오름차순으로 정렬합니다.
    * 정렬된 혈압에 순위(rank)를 매깁니다. 참고로 동점이 있는 경우에는 평균 순위를 사용합니다.
    * 성별로 순위의 합계를 구한 뒤 차이가 있는지 비교합니다.
<br><br>


## 실습
***

* 가설 설정
    * 귀무가설: 성별(F, M)에 따라 혈압에 차이가 없습니다.
    * 대립가설: 성별(F, M)에 따라 혈압에 차이가 있습니다.
<br><br>


![Post-Image](Python_Data_Analysis13.png)
_데이터 로딩<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475046_
<br><br>


* 분석 1단계: 정규성 검정(Normality Test)
    * 귀무가설: 정규분포를 따릅니다.
    * 대립가설: 정규분포를 따르지 않습니다.
    * n < 5,000 : Shapito-Wilk Normality Test (shapiro(data.variable))
    * n >= 5,000 : Anderson-Darling Normality Test (anderson(data.variable))
    * shapiro normality test 결과 female의 유의확률(p-value)가 0.337로 정규성 가정을 만족하고, male의 유의확률(p-value)가 0.003으로 정규성 가정을 만족하지 못합니다.
<br><br>


![Post-Image](Python_Data_Analysis14.png)
_정규성 검정<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475046_
<br><br>


* 분석 2단계: Wilcoxon's rank sum test
    * 귀무가설: 성별(F, M)에 따라 혈압에 차이가 없습니다.
    * 대립가설: 성별(F, M)에 따라 혈압에 차이가 있습니다.
<br><br>


![Post-Image](Python_Data_Analysis15.png)
_Wilcoxon's rank sum test<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475046_
<br><br>


## 코드
***

```python
import pandas as pd
import scipy.stats as stats

health = pd.read_excel(
    io = '04health.xlsx',
    sheet_name = 0
)

print(health)


# Analysis I: Normality Test
# n < 5,000 -> Shapiro-Wilk Normality Test
# female
female_normality = stats.shapiro(health.loc[health['gender'] == 'F', 'hypertension'])
print(female_normality)

# male
male_normality = stats.shapiro(health.loc[health['gender'] == 'M', 'hypertension'])
print(male_normality)


# Analysis II: Wilcoxon's rank sum test
stats.wilcoxon(
    health.loc[health['gender'] == 'F', 'hypertension'],
    health.loc[health['gender'] == 'M', 'hypertension'],
    alternative = 'two-sided'
)

# 유의확률(0.212) > 유의수준(0.05)이므로 귀무가설을 기각하지 못합니다. 즉, 성별(F, M)에 따라 혈압에 통계적으로 유의한 차이가 없습니다.
```
<br><br>


## Take Home Message
***

Wilcoxon's rank sum test 이론을 학습하고 Google colab에서 실습해 보았습니다.
<br><br>