---
layout: post
title: ML and DL for Cancer Genomics VI - 딥러닝 구동 환경 구축 1
date: 2023-06-22 07:42:50 +0900
published: true
math: true
categories: [Bioinformatics, ML]
tags: [BI,bioinformatics,cancer,ML,DL]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 경희대학교 이과대학 김권일 교수님의 [딥러닝 구동 환경 구축 1](https://www.edwith.org/deep-learning-2023/lecture/1475088, "딥러닝 구동 환경 구축 1")를 정리한 내용입니다.


## Intro
***

Machine learning 관련 기초 개념을 확인하고, 공개된 논문내용 및 데이터를 바탕으로 직접 실습하고 학습하는 과정입니다.
<br><br>


## 데이터를 표현하는 방식: 텐서
***

텐서는 핵심 속성 세 가지를 지니고 있습니다.

1. rank: 축의 개수. rank-3 텐서에는 3개의 축이 있습니다. 행렬에는 2개의 축이 있습니다. numpy, tensorflow 같은 python library에서 ndim 속성에 저장되어 있습니다.

2. shape: 텐서의 각 축을 따라 얼마나 많은 차원이 있는지 나타내는 정보입니다. 

3. dtype: 텐서에 포함된 데이터 타입입니다.
<br><br>


## 텐서플로와 케라스
***

* 텐서플로(TensorFlow)
    * 구글에서 만든 python 기반의 무료 오픈 소스 machine learning 플랫폼입니다.
    * NumPy와 매우 비슷하며 간단한 텐서 연산 뿐만 아니라 학습 과정에 필요한 연산들을 제공합니다.

* 케라스(Keras)
    * TensorFlow 위에 구축된 python용 deep learning API로 deep learning model을 쉽게 만들고 훈련할 수 있는 방법을 제공합니다.
    * NumPy와 매우 비슷하며, 간단한 텐서 연산 뿐만 아니라 학습 과정에 필요한 연산들을 제공합니다.
<br><br>


![Post-Image](MLDL4CancerGenome25.png)
_<br>
https://www.edwith.org/deep-learning-2023/lecture/1475088_
<br><br>


## DeepDEP
***

이러한 배경에서 DeepDEP은 unsupervised pretraining을 수행하는데 다음과 같은 특징을 가집니다.

1. Genomic representations(대표값) of tumors를 얻기 위해서 수많은 unlabeled tumor samples로 pretrain을 진행합니다. (with genomics data but no screening results)

2. Gene dependency 예측을 최적화하기 위하여 limited 'labeled' CCL samples로 fine-tune을 진행합니다. (with genomics and screens)

결국 DeepDEP는 high-dimensional genomic profiles of both tumor and cell line samples로부터 representations를 pretraining으로 추출한 후 이에 기반하여 gene dependency와의 상관관계를 학습합니다.
<br><br>


## Autoencoder
***

Autoencoder란 단순히 입력을 출력으로 복사하는 신경망입니다. Hidden layer의 neuron 수를 input layer보다 작게 해서 data를 압축할 수 있는데, 이를 통하여 data를 효율적으로 표현하는 방법을 학습하도록 합니다. Autoencoder는 항상 encoder와 decoder 두 부분으로 구성되어 있습니다.

* encoder: 인지 네트워크(recognition network)라고도 하며, 입력을 내부 표현으로 변환합니다.

* decoder: 생성 네트워크(generative network)라고도 하며, 내부 표현을 출력으로 변환합니다.

이러한 학습을 통해 입력 data에서 가장 중요한 특성을 학습하도록 합니다. 또한 여러 개의 hidden layer를 추가하여 deep autoencoder도 만들 수 있습니다.
<br><br>


## Take Home Message
***

Google colab에서 딥러닝 구동 환경을 구축하고 분석을 실습해 보았습니다.
<br><br>