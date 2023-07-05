---
layout: post
title: 파이썬을 활용한 데이터 분석 (중급) - 10. Non-Parametric Multiple Comparison with python
date: 2023-07-05 19:02:40 +0900
published: true
math: true
categories: [Bioinformatics, Statistics]
tags: [BI,bioinformatics,python,statistics]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 인사이트마이닝 이부일 CEO의 [Non-Parametric Multiple Comparison with python](https://www.edwith.org/python-data-analysis-2023/lecture/1475052, "Non-Parametric Multiple Comparison with python")을 정리한 내용입니다.


## Intro
***

Python을 이용하여 Non-Parametric Multiple Comparison with python 수행과정을 알아봅니다.
<br><br>


## 언제 사용하는가?
***

비모수적 방법인 Kruskal-Wallis rank sum test에서 집단에 따라 통계적으로 유의한 차이가 있다고 결론이 나왔을 때, 어느 집단 간 유의한 차이가 있는지 확인할 때 사용하는 방법입니다. 3개 이상 범주와 수치형 자료를 가질 때 사용합니다.
<br><br>


## 비모수적 다중비교
***

* bonferroni
* sidak
* holm-sidak
* simes-Hochberg
* hommel
* fdf_bh
* fdr_by
* fdr_tsbh
* fdr_tsbky
<br><br>


## 코드
***

```python
# 비모수적 사후분석: Dunn Test
# 귀무가설: 두 집단 간에는 차이가 없습니다.
# 대립가설: 두 집단 간에는 차이가 있습니다.

import pandas as pd
import scikit_posthocs as sp
InsectSprays = pd.read_excel(
    io = '09InsectSprays.xlsx',
    sheet_name = 0
)

print(InsectSprays)



sp.posthoc_dunn(
    InsectSprays,
    val_col = 'count',
    group_col = 'spray',
    p_adjust = 'holm'
)
```
<br><br>


## Take Home Message
***

Non-Parametric Multiple Comparison 이론을 학습하고 Google colab에서 실습해 보았습니다.
<br><br>