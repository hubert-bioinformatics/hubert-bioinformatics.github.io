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


## Family-wise error rate
***

세 개의 집단에 대해 일반적인 다중비교를 실행하면, 각 비교시 유의수준을 $$ \alpha $$로 잡았다고 하더라도 최종 유의수준은 $$1 - (1 - \alpha)^(n)$$이 되는 error가 발생합니다. 예를 들어 세 개의 집단을 두고 각 집단간 비교시 유의수준을 0.05로 잡았다면, 집단A vs. 집단B, 집단A vs. 집단C, 집단B vs. 집단C를 비교 후 최종 유의수준은 0.143이 됩니다.
<br><br>


![Post-Image](Python_Data_Analysis28.png)
_Family-wise error rate<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475050_
<br><br>


## Tukey HSD
***

다중비교(Multiple comparison) = 사후분석(Post-Hoc) 방법 중 하나로 Tukey HSD(Honest Significant Difference)가 있습니다.

* 특징: 비교 대상 표본수가 동일한 경우에만 사용 가능합니다. 모든 집단 조합에 대해서 분석합니다.

* 장점: 표본수가 동일한 경우 가장 많이 사용되는 사후 검정 기법입니다.

* 단점: 비교 대상 표본수가 동일하여야 합니다. 표본수가 적을수록 정확도가 낮아집니다.
<br><br>


![Post-Image](Python_Data_Analysis29.png)
_Tukey<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475050_
<br><br>


## Dunnett
***

다중비교(Multiple comparison) = 사후분석(Post-Hoc) 방법 중 하나로 Dunnett이 있습니다.

* 특징: 하나의 집단을 기준으로 다른 집단들과 차이에 대하여 분석합니다. 양측 검정이 가능합니다.

* 장점: 1개의 대조군과 여러 실험군과의 비교를 하는 연구에 사용 가능합니다. Tukey보다 검정력이 높습니다.

* 단점: 모든 집단 조합에 대한 검정을 하지 않습니다.
<br><br>


## Duncan
***

다중비교(Multiple comparison) = 사후분석(Post-Hoc) 방법 중 하나로 Duncan이 있습니다.

* 특징: 오차비율을 통제하지 않아 상대적으로 엄격하지 않은 기준을 가집니다. 인접하는 평균값들을 단계적으로 비교하는 방법입니다.

* 장점: 엄격하지 않은 기준으로 통계적 유의성을 도출하기 쉽습니다.

* 단점: 비교대상이 많아질수록 검정력이 약해집니다.
<br><br>


## Bonferroni
***

다중비교(Multiple comparison) = 사후분석(Post-Hoc) 방법 중 하나로 Bonferroni가 있습니다.

* 특징: 응용 범위가 넓습니다.(모수, 비모수 적용 가능) Tukey보다 엄격하지만 Scheffe보다는 관대합니다.

* 장점: ANOVA, 다중 t-test, 비모수 검정 등에 적용 가능합니다.

* 단점: 비교대상이 많아질수록 검정력이 약해집니다.
<br><br>


## Scheffe
***

다중비교(Multiple comparison) = 사후분석(Post-Hoc) 방법 중 하나로 Scheffe가 있습니다.

* 특징: 가장 보수적이고 엄격한 사후검정 방식입니다.

* 장점: 엄격한 기준으로 사후 검정을 실시합니다.

* 단점: 통계적으로 유의한 차이를 도출하기가 쉽지 않습니다.
<br><br>



![Post-Image](Python_Data_Analysis29.png)
_Tukey<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475050_
<br><br>


## 가설 세우기
***

* 귀무가설 (Null Hypothesis, H<sub>0</sub>)
    * 재배방법(group)에 따라 풀의 생산량(weight)이 두 집단 간에는 차이가 없습니다.

* 대립가설 (Alternative Hypothesis, H<sub>1</sub> or H<sub>A</sub>)
    * 재배방법(group)에 따라 풀의 생산량(weight)이 두 집단 간에는 차이가 있습니다.
<br><br>


## 실습
***

* 가설 설정
    * 귀무가설: 재배방법(group)에 따라 풀의 생산량(weight)이 두 집단 간에는 차이가 없습니다.
    * 대립가설: 재배방법(group)에 따라 풀의 생산량(weight)이 두 집단 간에는 차이가 있습니다.
<br><br>


![Post-Image](Python_Data_Analysis24.png)
_데이터 로딩<br>
https://www.edwith.org/python-data-analysis-2023/lecture/1475050_
<br><br>


* 분석 1단계: Tukey HSD
    * 귀무가설: 재배방법(group)에 따라 풀의 생산량(weight)이 두 집단 간에는 차이가 없습니다.
    * 대립가설: 재배방법(group)에 따라 풀의 생산량(weight)이 두 집단 간에는 차이가 있습니다.
    * Tukey HSD 결과,
        * ctrl vs. trt1: adjusted p-value가 0.391로 귀무가설을 기각하지 못합니다. 즉, 두 집단 간 차이가 없습니다.
        * ctrl vs. trt2: adjusted p-value가 0.198로 귀무가설을 기각하지 못합니다. 즉, 두 집단 간 차이가 없습니다.
        * trtl vs. trt2: adjusted p-value가 0.012로 귀무가설을 기각합니다. 즉, 두 집단 간 차이가 있습니다.
<br><br>


## 코드
***

```python
import pandas as pd
from statsmodels.stats.multicomp import pairwise_tukeyhsd

PlantGrowth = pd.read_excel(
    io = '07PlantGrowth.xlsx',
    sheet_name = 0
)

print(PlantGrowth)


# Analysis I: Tukey HSD
tukey = pairwise_tukeyhsd(
    endog = PlantGrowth.weight,
    groups = PlantGrowth.group,
    alpha = 0.05
)

print(tukey)
```
<br><br>


## Take Home Message
***

Parametric Multiple Comparison 이론을 학습하고 Google colab에서 실습해 보았습니다.
<br><br>