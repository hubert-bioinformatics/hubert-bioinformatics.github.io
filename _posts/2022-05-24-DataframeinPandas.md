---
layout: post
title: Dataframe in Pandas
date: 2022-05-24 21:58:27 +0900
published: true
categories: [Programming, Python]
tags: [python,pandas,dataframe]
img_path: /assets/img/post/
---

## Intro
***

 Pandas는 data analysis에 유용한 python package 입니다. Pandas는 쉽고 편리하게 data를 다룰 수 있도록 유연한 structure를 제공하는데, 그 중 하나가 바로 Dataframe 입니다.

 이 post는 pandas 공식 가이드 내 [10 minutes to pandas](https://pandas.pydata.org/pandas-docs/stable/user_guide/10min.html, "10 minutes to pandas")를 참고 했습니다.
 <br><br>
 

## Dataframe이란? 
***
 Dataframe은 data를 직사각형 모양 table에 저장한 구조입니다. Row는 숫자, 문자, 논리 등 여러 가지 data type이 들어갈 수 있습니다. Column은 동일한 data type이 들어갈 수 있습니다. 즉, 각 column에 아마도 서로 다른 data type을 지닌 2d array data 구조로 요약할 수 있습니다. 참고로 1d array data 구조는 Series 입니다.

 R 언어를 알고 계시는 분들은 data.frame이 친숙할 것입니다. Pandas의 dataframe과 유사한 구조입니다.

 Dataframe의 주요 요소입니다.

 * Data: Dataframe 자체가 들어갈 수 있고 그 외 series, numpy의 ndarray, 2d ndarray, dictionary가 들어갈 수 있습니다.

 * Index: Numpy의 array나 2d array와 비슷하지만, dataframe에는 index가 존재한다는 차이가 있습니다.

 * Column: Column의 index도 존재하여 data를 손쉽게 다룰 수 있도록 도와줍니다.

 ![Post-Image](DATAFRAME_df.png)
 _Dataframe 주요 요소_
 <br><br>
 

## Manipulating Dataframe
***


## &nbsp;&nbsp;Object creation
***
 Dataframe을 생성합니다.

 <script src="https://gist.github.com/hubert-bioinformatics/73bd31063cff7a94389e9f8a2f9a5a54.js"></script>
 <br><br>
 

## &nbsp;&nbsp;Viewing data
***
 생성한 dataframe을 확인합니다. 간단한 statistics summary, 행렬변환, 정렬 등을 시도해 보겠습니다.

 <script src="https://gist.github.com/hubert-bioinformatics/7eb8dbd12e90908d3161a94659f9f159.js"></script>
 <br><br>
 

## &nbsp;&nbsp;Selection
***
 Data를 선택하고 변경하는 방법입니다.

 <script src="https://gist.github.com/hubert-bioinformatics/c1535eca5805a95153df140012715b6b.js"></script>
 <br><br>
 

## &nbsp;&nbsp;Missing data
***
 결측치를 확인하고 처리하는 방법입니다.

 <script src="https://gist.github.com/hubert-bioinformatics/72e99266a9ec3abb0adf26ab6f2247f7.js"></script>
 <br><br>
 

## &nbsp;&nbsp;Operations
***
 본격적으로 data를 다뤄봅니다. Statistics를 구하고 사칙연산 function을 적용합니다.

 <script src="https://gist.github.com/hubert-bioinformatics/c2bcc963a5ed9ef40cc82a2a111b31e0.js"></script>
 <br><br>
 

## &nbsp;&nbsp;Merge
***
 서로 다른 구조의 data를 합치거나 나누는 방법입니다.

 <script src="https://gist.github.com/hubert-bioinformatics/addf6811d21ef4f33a90459d8505c6ea.js"></script>
 <br><br>
 

## &nbsp;&nbsp;Grouping
***
 Data를 특정 기준에 따라 분류하여 처리합니다.

 <script src="https://gist.github.com/hubert-bioinformatics/2f25c1fb63b61a7f0613e6275ae6acf1.js"></script>
 <br><br>
 

## &nbsp;&nbsp;Reshaping
***
 Dataframe을 다른 형태로 변환합니다.

 <script src="https://gist.github.com/hubert-bioinformatics/6d4b46c02ad0f1f599a54f0f643f7ba0.js"></script>
 <br><br>
 

## &nbsp;&nbsp;Time series
***
 Time series data를 다루는 방법입니다.

 <script src="https://gist.github.com/hubert-bioinformatics/5809d59e7f65030d9e614a705a6b8385.js"></script>
 <br><br>
 

## &nbsp;&nbsp;Categoricals
***
 Categorical data를 다뤄보지 않을 수 없겠죠?

 <script src="https://gist.github.com/hubert-bioinformatics/91d969b4a39b6867a1041dc4544e4506.js"></script>
 <br><br>
 

## &nbsp;&nbsp;Plotting
***
 Data analysis의 정점! plotting 입니다.

 <script src="https://gist.github.com/hubert-bioinformatics/1de30f3485e5cfaef96999eceb8632d2.js"></script>
 <br><br>
 

## &nbsp;&nbsp;Getting data in/out
***
 생성/분석에 사용하는 data를 파일로 쓰거나 불러오는 방법입니다.

 <script src="https://gist.github.com/hubert-bioinformatics/d0a11d76be312db9bb00c606e7e11c8c.js"></script>