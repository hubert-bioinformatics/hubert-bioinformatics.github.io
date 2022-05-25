---
layout: post
title: ch2. Data Load
date: 2022-05-25 19:21:10 +0900
published: true
categories: [Study, B-ML_with_Python_Cookbook]
tags: [ml,python,study,sklearn]
img_path: /assets/img/post/
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

 <script src="https://gist.github.com/hubert-bioinformatics/f67046016fe37cfad7e6605a9c54fd0d.js"></script>