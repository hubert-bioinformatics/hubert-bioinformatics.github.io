---
layout: post
title: 파이썬을 활용한 데이터 분석 (중급) - 8. Parametric Multiple Comparison with python
date: 2023-07-04 20:14:42 +0900
published: true
math: true
categories: [Bioinformatics, Statistics]
tags: [BI,bioinformatics,python,statistics]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 인사이트마이닝 이부일 CEO의 [Parametric Multiple Comparison with python](https://www.edwith.org/python-data-analysis-2023/lecture/1475050, "Parametric Multiple Comparison with python")을 정리한 내용입니다.


## Intro
***

Python을 이용하여 Parametric Multiple Comparison with python 수행과정을 알아봅니다.
<br><br>


## 언제 사용하는가?
***

모수적 방법인 분산분석(ANOVA)에서 집단에 따라 통계적으로 차이가 있다고 나왔을 때 사용하는 다중비교 방법입니다. 범주가 3개 이상인 범주형 자료와 수치형 자료가 필요합니다.
<br><br>


## 가설 세우기
***

* 귀무가설 (Null Hypothesis, H<sub>0</sub>)
    * 재배방법(group)에 따라 풀의 생산량(weight)에 차이가 없습니다.

* 대립가설 (Alternative Hypothesis, H<sub>1</sub> or H<sub>A</sub>)
    * 재배방법(group)에 따라 풀의 생산량(weight)에 차이가 있습니다.
<br><br>


![Post-Image](Python_Data_Analysis22.png)
_SST(Sum of Square Total)<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475049_
<br><br>


* SST(Sum of Squuare Total)는 총제곱합으로 Y에 있는 모든 다름의 양을 의미합니다.
* SST = SSE + SSB
* SSE: 집단 내 제곱합을 의미합니다. 집단 내부적인 이유때문에 생긴 Y의 다름의 양입니다. 즉, SSE가 클수록 $$ H_{0} $$(집단 간 차이가 없음)을 지지합니다.
* SSB: 집단 간 제곱합을 의미합니다. 집단이 달라서 생긴 Y의 다름의 양입니다. 즉, SSB가 클수록 $$ H_{1} $$(집단 간 차이가 있음)을 지지합니다.
<br><br>


![Post-Image](Python_Data_Analysis23.png)
_F분포<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475049_
<br><br>


## Analysis of variance
***

* 1단계: 정규성 검정(Normality Test)
    * 귀무가설: 정규분포를 따릅니다.
    * 대립가설: 정규분포를 따르지 않습니다.
    * n < 5,000: Shapiro-Wilk Normality Test
    * n >= 5,000: Anderson-Darling Normality Test
    * 정규성 검정은 control group에서 한 번, treat1 group에서 한 번, treat2 group에서 한 번, 총 세 번 시행합니다.

* 2단계: Levene의 등분산 검정
    * 귀무가설: 등분산입니다.
    * 대립가설: 이분산입니다.

* 3단계: 등분산이 가정된 ANOVA 또는 이분산이 가정된 ANOVA
    * ANOVA를 시행합니다.
<br><br>


## 실습
***

* 가설 설정
    * 귀무가설: 재배방법(group)에 따라 풀의 생산량(weight)에 차이가 없습니다.
    * 대립가설: 재배방법(group)에 따라 풀의 생산량(weight)에 차이가 있습니다.
<br><br>


![Post-Image](Python_Data_Analysis24.png)
_데이터 로딩<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475049_
<br><br>


* 분석 1단계: 정규성 검정(Normality Test)
    * 귀무가설: 정규분포를 따릅니다.
    * 대립가설: 정규분포를 따르지 않습니다.
    * n < 5,000 : Shapito-Wilk Normality Test (shapiro(data.variable))
    * n >= 5,000 : Anderson-Darling Normality Test (anderson(data.variable))
    * shapiro normality test 결과,
        * ctrl group: 유의확률(p-value)가 0.747로 정규성 가정을 만족합니다.
        * trt1 group: 유의확률(p-value)가 0.452로 정규성 가정을 만족합니다.
        * trt2 group: 유의확률(p-value)가 0.564로 정규성 가정을 만족합니다.
<br><br>


![Post-Image](Python_Data_Analysis25.png)
_정규성 검정<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475049_
<br><br>


* 분석 2단계: Levene의 등분산 검정
    * 귀무가설: 등분산입니다.
    * 대립가설: 이분산입니다.
    * levene 등분산 검정 결과 유의확률(p-value) 0.341로 유의수준(0.05)보다 크므로 귀무가설을 기각하지 못합니다. 즉, 등분산입니다.
<br><br>


![Post-Image](Python_Data_Analysis26.png)
_Levene의 등분산 검정<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475049_
<br><br>


* 분석 3단계: Analysis of variance
    * 귀무가설: 재배방법(group)에 따라 풀의 생산량(weight)에 차이가 없습니다.
    * 대립가설: 재배방법(group)에 따라 풀의 생산량(weight)에 차이가 있습니다.
    * 유의확률(p-value) 0.016으로 유의수준(0.05)보다 작으므로 귀무가설을 기각합니다. 즉, 재배방법(group)에 따라 풀의 생산량(weight)에 차이가 있습니다.
<br><br>


![Post-Image](Python_Data_Analysis27.png)
_ANOVA<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475049_
<br><br>


## 코드
***

```python
import pandas as pd
import scipy.stats as stats

PlantGrowth = pd.read_excel(
    io = '07PlantGrowth.xlsx',
    sheet_name = 0
)

print(PlantGrowth)


# Analysis I: Normality Test
# n < 5,000 -> Shapiro-Wilk Normality Test
print(stats.shapiro(PlantGrowth.loc[PlantGrowth['group'] == 'ctrl', 'weight']))
print(stats.shapiro(PlantGrowth.loc[PlantGrowth['group'] == 'trt1', 'weight']))
print(stats.shapiro(PlantGrowth.loc[PlantGrowth['group'] == 'trt2', 'weight']))


# Analysis II: Levene의 등분산 검정
# 귀무가설: 등분산입니다.
# 대립가설: 이분산입니다.
stats.levene(
    PlantGrowth.loc[PlantGrowth['group'] == 'ctrl', 'weight'],
    PlantGrowth.loc[PlantGrowth['group'] == 'trt1', 'weight'],
    PlantGrowth.loc[PlantGrowth['group'] == 'trt2', 'weight'],
)


# Analysis III: ANOVA
stats.f_oneway(
    PlantGrowth.loc[PlantGrowth['group'] == 'ctrl', 'weight'],
    PlantGrowth.loc[PlantGrowth['group'] == 'trt1', 'weight'],
    PlantGrowth.loc[PlantGrowth['group'] == 'trt2', 'weight'],
)
```
<br><br>


## Take Home Message
***

Analysis of variance 이론을 학습하고 Google colab에서 실습해 보았습니다.
<br><br>