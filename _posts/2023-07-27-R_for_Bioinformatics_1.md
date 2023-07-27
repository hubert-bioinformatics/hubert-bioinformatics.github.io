---
layout: post
title: 생물정보학을 위한 R프로그래밍 I - R 설치 및 환경설정
date: 2023-07-27 07:40:04 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,R]
img_path: /assets/img/post/
---

본 post는 LAIAD에서 제공하는 부산대학교 이해승 교수님의 [생물정보학을 위한 R프로그래밍](https://www.laidd.org/local/ubonline/view.php?id=181&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==, "생물정보학을 위한 R프로그래밍")을 정리한 내용입니다.


## Intro
***

* R 프로그래밍 기초를 익힙니다.

* R을 활용한 전사체 정보를 분석합니다.
<br><br>


## 데이터 분석 과정
***

데이터 분석 과정은 다섯 개의 단계로 구성됩니다. 데이터 준비부터 데이터 분석까지 효율적인 작업이 필요한데, 이 때 R과 같이 다양한 언어와 tool을 사용할 수 있습니다.
<br><br>


![Post-Image](Rprogramming1.png)
_데이터 분석 과정 다섯 단계<br>
https://www.laidd.org/local/ubonline/view.php?id=181&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
<br><br>


SPSS, SAS, STATA는 유료이며 프로그래밍 기능이 약해서 요구사항에 딱 맞는 맞춤처리가 약합니다. 반면 R, python은 무료이며 프로그래밍 기능이 강합니다. 또한 오픈 커뮤니티를 통한 무수한 라이브러리가 존재하고 배우기 쉽습니다. Python이 범용 프로그래밍 언어라면, R은 통계 특화 언어이며 시각화가 뛰어납니다. R은 1993년 뉴질랜드 오클랜드 대학의 Robert Gentleman과 Ross Ihaka가 개발한 프로그래밍 언어입니다.

보조자료 및 참고 사이트는 아래와 같습니다.

* 도구
    * R 다운로드: https://www.r-project.org
    * R 스튜디오: https://www.rstudio.com/products/rstudio/#Desktop
    * Sublime Text: https://www.sublimetext.com

* 데이터 저장소
    * CRAN: http://cran.r-project.org
    * Bioconductor: https://www.bioconductor.org
    * 캐글: https://www.kaggle.com
<br><br>


R 다운로드 및 설치 후 기본 명령어를 실행해 봅니다.
<br><br>


```R
print("Hello") # print

data() # default dataset
```
<br><br>


![Post-Image](Rprogramming2.png)
_R cmd: data()<br>
https://www.laidd.org/local/ubonline/view.php?id=181&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
<br><br>


'str' 함수는 데이터의 내용을 요약해서 보여줍니다. 이 때 색깔을 지정하는 옵션 col, 축의 이름을 지정하는 xlab, ylab, 기호 모양을 지정하는 pch를 사용할 수 있습니다.
```R
str(cars)
plot(cars, col='blue')
plot(cars, col='blue', xlab='속도')
plot(cars, col='blue', xlab='속도', ylab='거리')
plot(cars, col='blue', xlab='속도', ylab='거리', pch=18)
```
<br><br>


![Post-Image](Rprogramming4.png)
_R cmd: plot()<br>
https://www.laidd.org/local/ubonline/view.php?id=181&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
<br><br>


Rstudio는 R을 효과적으로 편리하게 사용할 수 있게 도와주는 통합 개발 환경(IDE; Integrated Development Environment)입니다.

Rstudio 개발 환경은 콘솔창, 스크립트창, 환경창, 그리고 파일창으로 구성되어 있습니다.
* 콘솔창
    * 코드 실행 및 결과, 오류 확인 등

* 스크립트창
    * 코드 작성 창
    * 콘솔창과 달리 긴 코드 작성에 용이
    * 별도의 코드파일(.R)로 저장/불러오기 가능
    * 함수에 대한 자동완성 그낭 제공

* 환경창
    * 입력된 데이터 세트 확인
    * 실행한 명령어, 결과 등 확인
    * DB서버와 연결 관리

* 파일창
    * 파일 탐색기, 그래프 출력, 패키지 관리, 도움말
<br><br>


![Post-Image](Rprogramming5.png)
_Rstudio<br>
https://www.laidd.org/local/ubonline/view.php?id=181&group=1&returnurl=aHR0cHM6Ly93d3cubGFpZGQub3JnL2xvY2FsL3Vib25saW5lL2luZGV4LnBocD9vcmRlcnR5cGU9cmNfZCZrZXl3b3JkPSZwcm9ncmVzcyU1QiU1RD0xMyZlbnJvbF9zdGFydD0mZW5yb2xfZW5kPSZzdHVkeV9zdGFydD0mc3R1ZHlfZW5kPQ==_
<br><br>


## Take Home Message
***

* R과 Rstudio를 설치하고 기본 사용법을 익힙니다.