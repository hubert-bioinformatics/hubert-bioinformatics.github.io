---
layout: post
title: Sub-query와 JOIN, UNION
date: 2022-11-13 21:08:12 +0900
published: true
math: true
categories: [Programming, Database]
tags: [programming,database,SQL]
img_path: /assets/img/post/
---

본 post는 K-MOOC 고려사이버대학교(매치업) 이건길 교수님의 [SQL 정형 데이터 분석 강의](http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/, "SQL 정형 데이터 분석 강의")를 정리한 내용입니다.


## Intro
***   
관계대수를 이해하고 설명할 수 있습니다.   
Sub-query문을 이해하고 활용할 수 있습니다.  

<br>


## 관계대수
***
1. 관계대수 정의  
   1. 릴레이션 = tuple의 집합  
   2. 관계대수 = 릴레이션을 처리하기 위한 연산(operation)의 집합  
   3. 특징: 피연산자와 연산 결과가 모두 릴레이션  
   4. 절차적 언어(Procedural Language)로써 관계대수 연산자의 절차적인 적용을 통해서 원하는 결과(릴레이션)을 얻습니다.  
2. 관계대수 역할  
   1. 릴레이션 조작에 대한 이론적 기초를 제공합니다.  
   2. 데이터베이스 질의(query)를 구현하고 최적화하는 데 사용됩니다.  
   3. RDBMS의 표준 언어인 SQL이 관계대수의 일부 연산을 사용합니다.  
![Post-Image](DBMS-DB40.png)
_관계대수 역할<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_   

3. 관계대수 종류  
   1. 일반 집합 연산(Set Operation)  
      1. 릴레이션 = tuple의 집합이므로 집합 연산을 그대로 적용할 수 있습니다.  
      2. 합병 가능(Union Compatible)한 릴레이션에 적용 가능합니다.  
      3. 종류: 합집합(Union), 교집합(Intersection), 차집합(Difference), 곱집합(Cartesian Produce)  
   2. 순수 관계 연산  
      1. 릴레이션의 조작을 위해서 정의된 연산입니다.  
      2. 종류: 셀렉트(Select), 프로젝트(Project), 조인(Join), 디비전(Division)  
   
## Sub-query
***
1. 연산자  
   1. 연산자의 역할  
      1. SELECT문의 WHERE절은 조회하려는 데이터에 특정 조건을 부여할 목적으로 사용합니다.  
      2. 비교 연산자, SQL 연산자, 논리 연산자를 사용하여 조건식을 구성합니다.  
      3. SELECT [DISTINCT] <컬럼리스트>
      FROM <테이블 리스트>
      [WHERE <조건>]
      [GROPU BY <컬럼명>[HAVING <그룹 조건>]]
      [ORDERED BY <컬럼명>[ASC | DESC]]  
   2. 연산자의 종류  
![Post-Image](DBMS-DB41.png)
_연산자의 종류<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_   
   3. 연습문제   
      1. 질의문) 연봉이 4000 이하인 사원들의 이름과 연봉, 부서번호를 검색하세요.(단순 비교 연산자)
         1. SQL) SELECT ename, salary, dno FROM employee WHERE salary <= 4000;  
      2. 연봉이 4000 이상 5000 이하인 사원들의 이름과 연봉, 부서번호를 검색하세요.(BETWEEN a AND b)  
         1. SQL) SELECT ename, salary, dno FROM employee WHERE salary >= 4000 AND salary <= 5000;  
         2. SQL) SELECT ename, salary, dno FROM employee WHERE salary BETWEEN 4000 AND 5000;  
      3.        

## Take Home Message
***   
SQL 기본 명령어(삽입, 삭제/수정, 검색)를 알 수 있었습니다.