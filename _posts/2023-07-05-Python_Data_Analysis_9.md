---
layout: post
title: 파이썬을 활용한 데이터 분석 (중급) - 9. Kruskal-Wallis Rank Sum Test with python
date: 2023-07-05 07:01:02 +0900
published: true
math: true
categories: [Bioinformatics, Statistics]
tags: [BI,bioinformatics,python,statistics]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 인사이트마이닝 이부일 CEO의 [Kruskal-Wallis Rank Sum Test with python](https://www.edwith.org/python-data-analysis-2023/lecture/1475051, "Kruskal-Wallis Rank Sum Test with python")을 정리한 내용입니다.


## Intro
***

Python을 이용하여 Kruskal-Wallis Rank Sum Test with python 수행과정을 알아봅니다.
<br><br>


## 언제 사용하는가?
***

세 개 이상의 독립적인 집단의 양적 자료의 평균에 차이가 있는지를 분석할 때 사용하는 방법입니다. 하나의 집단에서라도 정규성 가정을 만족하지 않을 때, 즉 ANOVA를 사용할 수 없을 때 사용합니다. 3개 이상 범주와 수치형 자료를 가질 때 사용합니다.
<br><br>


## 가설 세우기
***

* 귀무가설 (Null Hypothesis, H<sub>0</sub>)
    * 살충제의 종류(spray)에 따라 살충효과가 없습니다.

* 대립가설 (Alternative Hypothesis, H<sub>1</sub> or H<sub>A</sub>)
    * 살충제의 종류(spray)에 따라 살충효과가 있습니다.
<br><br>


## Kruskal-Wallis Rank Sum Test
***

* 1단계: 세 군의 측정치를 모두 풀어 크기 순으로 정렬합니다.

* 2단계: 크기 순으로 순위를 부여합니다. 이 때 동률은 순위의 평균값을 부여합니다.
<br><br>


![Post-Image](Python_Data_Analysis31.png)
_Kruskal-Wallis Rank Sum Test1<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475051_
<br><br>


* 3단계: 집단별로 순위합을 구합니다.

* 4단계: 집단별로 평균순위합을 구합니다.
<br><br>


![Post-Image](Python_Data_Analysis32.png)
_Kruskal-Wallis Rank Sum Test2<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475051_
<br><br>


* 5단계: 기대값을 구합니다. 관찰값 합계를 구한 뒤 집단 간 차이가 없다면 동일하게 나눠 가질 것이라는 가정하에 기대값을 구하고 관찷값과 비교하는 것입니다.
<br><br>


![Post-Image](Python_Data_Analysis33.png)
_Kruskal-Wallis Rank Sum Test3<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475051_
<br><br>


* 6단계: 편차의 제곱합을 구합니다.
<br><br>


![Post-Image](Python_Data_Analysis34.png)
_Kruskal-Wallis Rank Sum Test4<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475051_
<br><br>


* 7단계: 카이제곱을 구합니다.
<br><br>


![Post-Image](Python_Data_Analysis35.png)
_Kruskal-Wallis Rank Sum Test5<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475051_
<br><br>


## 코드
***

```python
import pandas as pd
import scipy.stats as stats

InsectSprays = pd.read_excel(
    io = '09InsectSprays.xlsx',
    sheet_name = 0
)

print(InsectSprays)


# Analysis I: Normality Test
# n < 5,000 -> Shapiro-Wilk Normality Test
print(stats.shapiro(InsectSprays.loc[InsectSprays['spray'] == 'A', 'count']))
print(stats.shapiro(InsectSprays.loc[InsectSprays['spray'] == 'B', 'count']))
print(stats.shapiro(InsectSprays.loc[InsectSprays['spray'] == 'C', 'count']))
print(stats.shapiro(InsectSprays.loc[InsectSprays['spray'] == 'D', 'count']))
print(stats.shapiro(InsectSprays.loc[InsectSprays['spray'] == 'E', 'count']))
print(stats.shapiro(InsectSprays.loc[InsectSprays['spray'] == 'F', 'count']))

# 정규성 검정 결과, C, D는 각각 유의확률(p-value)이 0.048, 0.003으로 유의확률(0.05)보다 작으므로 정규성 가정을 만족하지 않습니다.
# 따라서, ANOVA를 사용할 수 없고 Kruskal-Wallis Rank Sum Test를 사용해야 합니다.


# Analysis II: Kruskal-Wallis Rank Sum Test
# 귀무가설: 살충제의 종류(spray)에 따라 살충효과가 없습니다.
# 대립가설: 살충제의 종류(spray)에 따라 살충효과가 있습니다.
stats.kruskal(
    InsectSprays.loc[InsectSprays['spray'] == 'A', 'count'],
    InsectSprays.loc[InsectSprays['spray'] == 'B', 'count'],
    InsectSprays.loc[InsectSprays['spray'] == 'C', 'count'],
    InsectSprays.loc[InsectSprays['spray'] == 'D', 'count'],
    InsectSprays.loc[InsectSprays['spray'] == 'E', 'count'],
    InsectSprays.loc[InsectSprays['spray'] == 'F', 'count'],
)
# Kruskal-Wallis Rank Sum Test 결과 유의확률(p-value) 0.000으로 유의수준(0.05)보다 작으므로 귀무가설을 기각합니다. 즉, 살충제의 종류에 따라 통계적으로 유의한 살충효과가 있습니다.
```
<br><br>


## Take Home Message
***

Kruskal-Wallis Rank Sum Test 이론을 학습하고 Google colab에서 실습해 보았습니다.
<br><br>