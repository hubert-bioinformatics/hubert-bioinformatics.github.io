---
layout: post
title: ML and DL for Cancer Genomics II - ML Basic Concpts and Evaluation Methods
date: 2023-06-20 07:57:12 +0900
published: true
math: true
categories: [Bioinformatics, ML]
tags: [BI,bioinformatics,cancer,ML,DL]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 경희대학교 이과대학 김권일 교수님의 [기계학습 기초 개념 및 평가 방법](https://www.edwith.org/deep-learning-2023/lecture/1475084, "기계학습 기초 개념 및 평가 방법")을 정리한 내용입니다.


## Intro
***

Machine learning 관련 기초 개념을 확인하고, 공개된 논문내용 및 데이터를 바탕으로 직접 실습하고 학습하는 과정입니다.
<br><br>


## 기계학습(Machine Learning)이란?
***

기계학습(Machine Learning)이란 컴퓨터로 경험을 활용해 시스템을 개선해 나가는 방법론입니다. 컴퓨터 시스템에서 일반적으로 경험은 data 형식으로 존재합니다. 컴퓨터를 활용해 data에서 하나의 model을 만들어내는 learning algorithm입니다. 즉, model이란 data를 대상으로 learning algorithm이 학습한 결과물 입니다. 이러한 model은 새로운 상황에 대면했을 때 이에 상응하는 판단을 제공합니다.

예를 들어 다음과 같이 수박에 관한 데이터가 존재합니다.

1. 수박1: (색깔=청록; 꼭지모양=말림; 소리=혼탁함)
2. 수박2: (색깔=진녹색 꼭지모양=약간 말림; 소리=둔탁함)
3. 수박3: (색깔=연녹색; 꼭지모양=곧음; 소리=맑음)

수박에 관한 데이터의 집합을 data set,
각 기록은 하나의 대상에 대한 묘사이고 이 대상을 instance(사례) 혹은 sample,
색깔, 소리 등 대상의 성질을 반영하는 것을 attribute(속성) 혹은 feature(특성),
청록색, 진녹색, 연녹색 등 feature에 대해 취할 수 있는 값을 attribute value 혹은 feature value,
이러한 feature value가 sample별로 투영되어 잇는 공간을 sample space
라고 지칭합니다.
<br><br>


![Post-Image](MLDL4CancerGenome7.png)
_Sample Space<br>
https://www.edwith.org/deep-learning-2023/lecture/1475084_
<br><br>


Data set의 feature 수는 차원수(dimensionality)를 결정합니다.
<br><br>


## Training
***

Training 혹은 learning은 data를 통해 model을 만들어가는 과정을 의미합니다. Model training 과정은 data를 통해 hypothesis를 세우고 잠재되어 있는 규칙을 찾아내는 과정입니다. (data-driven hypothesis)

하지만 data의 feature만으로는 유용한 결과를 얻어낼 수 없습니다. Label이라는 결과를 나타내는 정보가 필요합니다.

만약 우리가 예측하려는 값이 '잘 익은 수박', '덜 익은 수박'과 같은 discrete value(이산값; 비연속적인 값)일 경우, 이러한 학습 문제를 classification이라고 합니다.

반대로 예측하려는 값이 수박의 당도를 나타내는 수치 '0.95', '0.37'과 같은 continuous value(연속값)일 경우, 이러한 학습 문제를 regression이라고 합니다.
<br><br>


## Testing
***

Model training 후, 해당 model을 활용하여 예측하는 과정을 testing이라고 합니다. 기계학습의 목표는 training set에서 좋은 성능을 나타내는 것이 아니라, 새로운 sample과 data에 적용되고 좋은 퍼포먼스를 내는 것입니다. 이런 경우를 generalization(일반화)가 잘 되었다고 이야기 합니다.

![Post-Image](MLDL4CancerGenome3.png)
_PCR vs. NGS<br>
https://www.edwith.org/deep-learning-2023/lecture/1475083_
<br><br>


NGS의 시작과 함께 DNA는 big data 수준으로 축적되어 가고 있습니다. 빅데이터는 3V로 요약할 수 있는데, 데이터의 양(Volume), 데이터 생성 속도(Velocity), 형태의 다양성(Variety)을 의미합니다. 2020년 Nebula Genomics는 한 사람의 WGS data를 $299에 제공하고 있습니다.
<br><br>


![Post-Image](MLDL4CancerGenome4.png)
_DNA is Big data<br>
https://www.edwith.org/deep-learning-2023/lecture/1475083_
<br><br>


또한 염기서열 분석기술의 발전은 한 명의 한 개 유전자를 분석하는 수준에서 여러 명의 여러 유전자를 분석하는 것으로 발전했습니다. (유전체학, Genomics) 그 뿐만 아니라 Epigenomics, Transcriptomics, Proteomics, Metabolomics 등 Genomics와 연관된 다양한 학문 분야로 발전했습니다.
<br><br>


![Post-Image](MLDL4CancerGenome5.png)
_NGS와 -omics 연구의 발전<br>
https://www.edwith.org/deep-learning-2023/lecture/1475083_
<br><br>


## AlphaFold를 사용한 Proteomics data 분석
***

2021년 구글 딥마인드가 발표한 Protein 구조 예측 인공지능 AlphaFold2는 인간 Protein 3D 구조 data 갯수를 20,296개(전체의 98.5% 수준)로 늘렸습니다. 이는 지금까지 실험을 통하여 확인된 3,500여개(전체의 17% 수준)에 비해 매우 증가된 수치입니다.
<br><br>


![Post-Image](MLDL4CancerGenome6.png)
_AlphaFold2<br>
https://www.edwith.org/deep-learning-2023/lecture/1475083_
<br><br>


## Take Home Message
***
생물정보학은 생물학과 관련된 모든 문제들을 이해하기 위한 방법론을 다루고, 학제간 분야를 아우르는 학문입니다. 생물학과 더불어 전산학, 통계학의 통합적 이해를 요구합니다.

생물정보를 담고 있는 DNA 염기서열이 주 연구대상 중 하나이고, NGS 발전에 따라 Genomics, Epigenomics, Transcriptomics, Proteomics 등 주요한 생물학 분야의 문제들을 해결하는데 필수불가결한 요소가 되고 있습니다.

최근 omics big data가 출현함에 따라 다양한 machine learning 및 deep learning을 수행하여 해결하기 힘든 각종 생물학 난제들을 풀어나가려는 시도가 이루어지고 있습니다.