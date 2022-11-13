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
1. 데이터 수정 명령어
   1. UPDATE 명령어
      1. **UPDATE** 명령어를 사용하여 데이터를 수정합니다.
      2. 데이터의 수정은 컬럼(column, attribute) 단위로 이루어집니다.
      3. 조건에 맞는 행(row)들의 지정한 컬럼을 주어진 값으로 바꿉니다.
![Post-Image](DBMS-DB38.png)
_UPDATE 예시<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_   
   2. 연습문제
      1. 질의문) 최현주 학생의 주소를 '부산'으로 변경하세요.
         1. SQL) UPDATE student SET st_addr = '부산' WHERE st_name = '최현주';
      2. 질의문) 모든 학생의 중간고사 점수를 1점 올리세요.
         1. SQL) UPDATE enrol SET mid = mid + 1;    

## 데이터 검색
***
1. 데이터 검색 명령어  
   1. SELECT 명령어   
      1. 관계형 데이터베이스는 데이터를 가져오기 위해 **SELECT** 명령어를 사용합니다.   
      2. 데이터의 검색은 행(row, tuple, record) 단위로 이루어집니다.   
      3. 원하는 행 또는 원하는 열의 데이터만 가져올 수 있습니다.   
![Post-Image](DBMS-DB39.png)
_SELECT 예시<br>
http://www.kmooc.kr/courses/course-v1:MA_CUK+MATCHUP_CUK03+2022_2/course/_   
   2. 연습문제  
      1. 질의문) 학생에 대한 모든 정보를 검색하세요. (테이블의 모든 컬럼에 대한 데이터를 보여주고 싶을 경우)
         1. SQL) SELECT * FROM student;
      2. 질의문) 학생의 학번, 이름을 검색하세요. (테이블의 컬럼 일부를 검색하는 경우)
         1. SQL) SELECT st_id '학번', st_name '이름' FROM student;   
      3. 질의문) 학생이 소속된 학과만을 출력하세요. (검색 결과에 중복된 로우(레코드)를 제거할 경우)
         1. SQL) SELECT dept_id FROM student;
      4. 질의문) 학생 정보를 이름의 오름차순으로 검색하세요. (검색 결과를 정렬해서 보여주기 1)
         1. SQL) SELECT * FROM student ORDER BY st_name ASC;   
         2. SQL) SELECT * FROM student ORDER BY st_name DESC;   
      5. 질의문) 등록 테이블의 정보를 성적순(오름차순)으로 정렬하세요. (검색 결과를 정렬해서 보여주기 2)
         1. SQL) SELECT * FROM enrol ORDER BY grade ASC;   
      6. 질의문) 등록 테이블에서 시험 점수 합계를 포함해서 보여주세요. (계산해서 보여주기)
         1. SQL) SELECT *, mid+final FROM enrol WHERE co_num = 'IT111';
         2. SQL) SELECT *, mid+final '총정' FROM enrol WHERE co_num = 'IT111';   
2. 조건검색  
   1. WHERE절
      1. **SELECT <컬럼리스트> FROM <테이블리스트> WHERE <행검색조건>**
      2. 원하는 조건을 만족하는 행만을 검색하고자 하는 경우 **WHERE**절에 조건을 명시합니다.  
      3. WHERE절에는 조건식이 들어갑니다.  
      4. 조건식은 비교연산자와 논리연산자를 사용하여 구성합니다.  
   2. 연습문제  
      1. 질의문) 경영학과(BZ)에 재학중인 학생의 이름과 연락처를 검색하세요.
         1. SQL) SELECT st_name '이름', st_phn_mlb '연락처' FROM student WHERE dept_id = 'BZ';  
   3. 조건식의 연결 1
      1. **<조건식> 논리연산자 <조건식>**
      2. 논리연산자를 이용해서 두 개 이상의 컬럼에 대해 조건을 적용합니다.  
         1. NOT: 논리적 부정  
         2. AND: 논리곱. 연산 대상이 모두 참  
         3. OR: 논리합. 연산 대상 중 하나라도 참이면 참  
      3. 연습문제  
         1. 질의문) 소프트웨어공학 과목에서 중간고사 성적이 90점 이상인 학생을 검색하세요.
            1. SQL) SELECT * FROM enrol WHERE co_num = 'IT111' AND mid>=90;  
3. 집계함수  
   1. 집계함수 개요  
      1. 통계나 집계 목적으로 사용되는 함수입니다.  
      2. 자주 사용하는 집계함수  
         1. SUM(): 합계  
         2. AVG(): 평균  
         3. MIN(), MAX(): 최소값, 최대값  
         4. COUNT(): 행의 개수  
      3. 연습문제  
         1. 질의문) 중간고사, 기말고사 점수의 평균을 구하세요.  
            1. SQL) SELECT avg(mid) '중간평균', avg(final) '기말평균' FROM enrol;  
4. 그룹별 집계  
   1. GROUP BY절  
      1. 검색 결과를 일정한 기준에 의해 그룹으로 묶어주는 역할을 합니다.  
      2. 집계함수와 함께 사용되는 경우가 많습니다.  
      3. 여러 그룹별 집계 자료를 만드는 경우 유용하게 사용됩니다.  
   2. 연습문제  
      1. 질의문) 과목별 기말시험 점수의 합계를 구하세요.  
         1. SQL) SELECT sum(final) '과목별 총점' FROM enrol GROUP BY co_num;  
   3. HAVING절  
      1. 그룹별 집계 자료에서 조건에 맞는 결과만 보여줍니다.  
   4. 연습문제  
      1. 질의문) 과목별 기말시험 점수의 합계를 구하세요. 단, 합계가 200 이상인 과목만 보여줍니다.  
         1. SQL) SELECT co_num '과목번호', sum(final) '총점' FROM enrol GROUP BY co_num HAVING sum(final)>=200;     

## Take Home Message
***   
SQL 기본 명령어(삽입, 삭제/수정, 검색)를 알 수 있었습니다.