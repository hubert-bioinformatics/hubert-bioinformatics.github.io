---
layout: post
title: WES 연구 디자인법
date: 2022-07-25 08:25:13 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,NGS,WES]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 서울대학교 의과대학 최무림 교수님의 [WES 기초편](https://www.edwith.org/wes-beginner/, "WES 기초편") 강의를 정리한 내용입니다.

## Intro
***

WES 연구 예시를 접합니다. 연구 주제 정할 때 주의점을 이해합니다. 그리고 연구 규모에 대한 예측과 연구 디자인 시 주의점을 이해합니다.
<br><br>


## WES 연구예시
***

   1. AML

![Post-Image](WES-study1.png)
 _WES Research<br>
 www.edwith.org/wes-beginner_
<br><br>


   AML 환자 2,869명과 control 6,405명 대상으로 WES 진행한 뒤 variants로 구분되는 gene을 확인 했습니다. Top 10 genes를 표기했는데 각각 gene이 가지는 AML에 대한 기여도는 약 1%에 지나지 않습니다. 즉, AML이 매우 complex한 disease임을 생각해 볼 수 있습니다.

   2. Autism

![Post-Image](WES-study2.png)
 _WES Research<br>
 www.edwith.org/wes-beginner_
<br><br>


   Autism 환자를 대상으로 WES 진행한 뒤 variants가 발견된 gene을 표기 했습니다. 위로 갈수록 gene name 크기가 커지는데, autism에 더 많은 영향을 미친다는 의미를 내포하고 있습니다.

   3. Type 2 diabetes

![Post-Image](WES-study3.png)
 _WES Research<br>
 www.edwith.org/wes-beginner_
<br><br>


   Type 2 diabetes 환자 20,791명과 control 24,440명 대상으로 WES 진행한 뒤 variants로 구분되는 gene을 확인 했습니다. 만성질환은 유전적인 요인보다 환경적인 요인의 작용이 더 크며 WES로 영향을 미치는 gene을 찾아내는데 어려움이 있습니다.
<br><br>


## WES 최근 연구예시
***

![Post-Image](WES-AJHG.png)
 _The American Journal of Human Genetics<br>
 www.edwith.org/wes-beginner_
<br><br>


[AJHG(The American Journal of Human Genetics)](https://www.cell.com/ajhg/home, "AJHG(The American Journal of Human Genetics)")는 sequencing 결과 어떤 gene에서 발생한 variants가 disease와 연관되는지 보고한 논문들을 모아 발표하는 학술지 입니다. 논문의 내용은 다음과 같이 정형화되어 있습니다.

   * Patient information: pedigrees, phenotype table, brain MRI, pictures etc
   * Variant profile in a protein map
   * Structural analysis
   * Functional analysis #1: variants are functional/pathogenic
   * Functional analysis #2: genes are functional/pathogenic

최근 학술지에 보고된 논문들도 형식에 따라 발표되고 있음을 확인할 수 있습니다.

![Post-Image](WES-AJHG2.png)
 _The American Journal of Human Genetics<br>
 https://www.cell.com/ajhg/home_
<br><br>


## WES 디자인
***

Monogenic Mendelian disorder의 경우, 전통적으로 진행하던 특정 syndrome의 원인 유전자 찾는 작업은 거의 종료 되었습니다. 아직 보고되지 않았다면 누군가 시도했으나 원인 유전자를 찾지 못한 경우일 가능성이 높습니다. 과거에는 phenotype-driven ascertainment로 접근했다면, 오늘날에는 genotype-driven ascertainment로의 방향 전환이 일어났습니다.

* WES at 2010

   특정 증상이 동일한 환자 00명 모집 → WES 분석 → 동일한 variants/genes 가지고 잇는 사람들 선택(최소 10% 이상) → Functional analysis

* WES at 2020

   증상이 다를 수 있으나 발달장애, 선천성 심장병 등 큰 임상적 범주에 드는 환자군 000/0000명 모집 → WES 분석 → 동일한 variants/genes 가지고 있는 사람들 선택(1% 정도도 가능) → GeneMatching → Functional analysis

그런데 희귀질환 연구의 딜레마는 바로 여기에 있습니다. 데이터의 보안 유지를 통한 연구의 novelty를 확보하는 것은, 데이터 공개를 통한 동일 돌연변이 환자군 확보와 배치되는 방향입니다. 따라서 [GeneMatching site](https://genematcher.org/, "GeneMatching site")를 통해 연구 중인 gene을 입력하면 같은 gene을 입력한 연구자들에게 mail이 전달되어 서로 협력하고 공동연구 할 수 있는 기회를 만들어주고 있습니다.

![Post-Image](WES-genematch.png)
 _Gene Matcher<br>
 https://genematcher.org/_
<br><br>


## How many genes remain to be found?
***

그렇다면 아직 기능이 완전히 연구되지 않은 gene은 얼마나 될까요?

![Post-Image](WES-remaingene.png)
 _How many genes remain to be found?<br>
 www.edwith.org/wes-beginner_
<br><br>


## Summary
***

* WES는 2009년 처음 개발된 이후로 발전을 거듭해 왔으며 질환 유전자 발견의 기법으로 사용되어 왔습니다.
* 현재도 계속 분석과 활용이 이루어지고 있습니다.
* 최근 몇년간 유전자 발견 경향에 큰 변화가 일어나고 있습니다. 빅데이터 & 유전형 기반 환자 모집과 GeneMatching을 통한 유전자 발견, 공유, 기능연구가 진행되고 있습니다.
* 하지만 아직 돌연변이가 생겼을 때 그 결과를 모르는 유전자가 많이 있습니다.