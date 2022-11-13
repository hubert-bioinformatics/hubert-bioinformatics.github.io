---
layout: post
title: 관계형 모델
date: 2022-11-06 08:12:21 +0900
published: true
math: true
categories: [Programming, Database]
tags: [programming,database,relationalmodel]
img_path: /assets/img/post/
---

본 post는 K-MOOC 고려사이버대학교(매치업) 이건길 교수님의 [SQL 정형 데이터 분석 강의](http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/, "SQL 정형 데이터 분석 강의")를 정리한 내용입니다.


## Intro
***
데이터베이스의 개념과 관계형 모델의 개념에 대해 알아봅니다. 그리고 관계형 모델을 다루는 SQL 언어에 대해 설명할 수 있습니다.
<br><br>


## 데이터베이스 개요
***
1. 데이터베이스 정의

    데이터베이스에 대한 정의는 다음과 같습니다.
    
    1. A collection of related data (Fundamentals of Database System, Elmasri and Navathe)
    
    2. An organized collection of data, generally stored and accessed electronically from a compyter system (wikipedia)
    <br><br>

2. 데이터베이스 특성<br>
![Post-Image](DBMS-DB1.png)
_데이터베이스 특성<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_
<br><br>


   1. 실시간 접근성(Real-time Accessibility)

      1. 데이터베이스는 사용자의 데이터 요구에 실시간으로 응답해야 합니다.

      2. 사용자의 개인 특성이나 제공되는 서비스 유형에 따라 허용되는 응답 시간이 다르지만 대개 몇 초를 넘지 않는 시간 내에 데이터를 제공할 수 있어야 합니다.
      
   2. 계속적인 변화(Continuous Evolution)

      1. 데이터베이스는 현실 세계의 상태를 정확히 반영해야 하며 데이터베이스에 저장된 데이터도 계속 변해야 합니다.

      2. 데이터를 계속 삽입(insert), 삭제(delete), 수정(update)하여 현재의 정확한 데이터를 유지합니다.

   3. 동시 공용(Concurrent Sharing)

      1. 데이터베이스는 여러 사용자가 동시에 이용할 수 있어야 합니다.

      2. 사용자가 서로 다른 데이터를 동시에 사용하는 것뿐만 아니라 같은 데이터를 동시에 사용하는 것도 모두 지원해야 합니다.

      3. 여러 사용자가 함께 사용하지만 단독으로 사용하는 것과 같은 일관성을 유지해야 합니다.

   4. 내용에 의한 참조(Content Reference)

       1. 일반적으로 컴퓨터에 저장된 데이터는 저장 주소를 알아야 검색이 가능합니다.

       2. 데이터베이스는 저장된 주소나 위치가 아닌 데이터의 내용(content), 즉 값(value)으로 참조합니다.

       3. 찾고자 하는 데이터의 내용 조건만 제시하면 조건에 맞는 데이터가 저장된 위치에 관계없이 모두 검색합니다.
       <br><br>

3. 데이터베이스 구축 목적<br>
![Post-Image](DBMS-DB2.png)
_데이터베이스 구축 목적<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_
<br><br>


4. 데이터베이스 스키마(Schema)<br>
![Post-Image](DBMS-DB3.png)
_데이터베이스 스키마<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_
<br><br>


## 관계형 모델 개요
***
1. 데이터 모델링<br>
![Post-Image](DBMS-DB4.png)
_데이터의 세계<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_<br>

    데이터 모델링이란 정보시스템을 구축하기 위해, 어떤 데이터가 존재하는지 또는 업무가 필요로 하는 정보는 무엇인지를 분석/표현하는 방법입니다. 또한 고객으로부터 데이터에 대한 요구사항을 파악하고, 프로젝트에 참여하는 분석자, 설계자, 개발자, 사용자 간의 효율적인 의사 소통을 위해 필수적인 과정입니다. 신규 또는 개선 시스템 개발을 위한 기초가 됩니다.
    
    데이터 모델링 단계는 아래와 같습니다.
![Post-Image](DBMS-DB5.png)
_데이터 모델링 단계<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_   

2. 데이터 모델

    데이터 모델이란 현실 세계를 데이터베이스로 표현하는 과정에서 데이터베이스의 구조를 개념적/논리적으로 표현하기 위해 사용되는 도구입니다.   
    데이터 모델의 종류와 장단점은 다음과 같습니다.   
![Post-Image](DBMS-DB6.png)
_데이터 모델 종류<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_   
![Post-Image](DBMS-DB7.png)
_데이터 모델 장단점<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_   

3. 관계 모델

    1970년 IBM 연구소의 "A relational model for large shared data banks"라는 논문에서 처음으로 소개된 모델입니다. Mathmatical relation의 개념을 사용해서 table의 형태로 표현합니다. 현재 대부분의 상업용 DBMS에서 지원합니다. (ORACLE, SQL Server, MySQL, IBM DB2 등)

    관계 모델에서는 데이터베이스를 relation(table)의 집합으로 정의합니다. 즉, table 형태로 데이터를 저장하는 것입니다.<br>
![Post-Image](DBMS-DB8.png)
_관계 모델 구조<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_   
![Post-Image](DBMS-DB9.png)
_관계 모델 용어 정의<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_   
관계 모델의 특징은 다음과 같습니다.
   1. Set theory(집합이론)에 기초합니다.
   2. 한 relation에 포함된 tuple들은 모두 상이합니다.
   3. 모든 attribute 값은 atomic value(원자 값)입니다.
   4. 한 relation을 구성하는 tuple과 attribute 사이에는 순서가 없습니다.<br><br>


## 관계형 모델과 SQL
***
1. 데이터베이스 언어<br>
![Post-Image](DBMS-DB10.png)
_데이터베이스 언어<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_   

데이터베이스 언어는 데이터베이스를 정의하고 접근하기 위한 목적으로 만들어진 언어입니다. 데이터 정의어, 데이터 조작어, 데이터 제어어로 나뉩니다.   
   1. 데이터 정의어(Data Definition Language)
      1. 데이터베이스를 정의하거나 그 정의를 수정할 목적으로 사용하는 언어입니다.
      2. 데이터베이스 스키마를 컴퓨터가 이해할 수 있게끔 기술하는 데 사용합니다.
      3. 데이터베이스 관리자나 데이터베이스 설계자가 주로 사용합니다.
      4. DDL로 기술된 스키마는 통상 DDL 컴파일러가 컴파일하여 데이터 사전이나 시스템 카탈로그에 저장하여 놓고 필요한 경우에 시스템이 활용합니다.
      5. 예) 테이블 생성, 변경 등
   2. 데이터 조작어(Data Manipulation Language)
      1. 사용자로 하여금 데이터를 처리할 수 있게 하는 도구입니다.
      2. 사용자(응용프로그램)와 DBMS 간의 인터페이스를 제공합니다.
      3. 예) 데이터의 검색, 삽입, 삭제, 변경 등
   3. 데이터 제어어(Data Control Language)
      1. 여러 사용자가 데이터베이스를 올바르게 공용하고, 정확하게 유지하기 위해 관리 및 통제 기능을 목적으로 사용하는 언어입니다.
      2. 주로 데이터 관리 목적으로 데이터베이스 관리자가 사용합니다.   

## Take Home Message
***   
관계형 모델에 대한 전반적인 개요 내용을 살펴볼 수 있었습니다.