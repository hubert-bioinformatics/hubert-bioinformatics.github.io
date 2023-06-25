---
layout: post
title: ML and DL for Cancer Genomics V - DeepDEP 논문 소개
date: 2023-06-21 07:10:05 +0900
published: true
math: true
categories: [Bioinformatics, ML]
tags: [BI,bioinformatics,cancer,ML,DL]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 경희대학교 이과대학 김권일 교수님의 [DeepDEP 논문 소개](https://www.edwith.org/deep-learning-2023/lecture/1475086, "DeepDEP 논문 소개")를 정리한 내용입니다.


## Intro
***

Machine learning 관련 기초 개념을 확인하고, 공개된 논문내용 및 데이터를 바탕으로 직접 실습하고 학습하는 과정입니다.
<br><br>


## DeepDEP 논문
***

['Prediction and characterizing a cancer dependency map of tumors with deep learning'](https://pubmed.ncbi.nlm.nih.gov/34417181/, 'Prediction and characterizing a cancer dependency map of tumors with deep learning')

각종 오믹스 데이터를 input으로 사용하고 deep learning algorithm을 사용하여 cancer dependency를 예측하는 내용의 논문입니다.

Cancer dependencies는 genome-wide loss-of-function screens를 통해서 cancer cell proliferation에 필수적인 gene을 의미합니다. Cancer dependencies와 molecular compositions of cancer cells를 연결 짓는 것은 문제의 복잡도 때문에 굉장히 어려운 문제입니다. DeepDEP은 deep learning model을 사용하여 integrative genomic profiles를 통해 cancer dependencies를 예측하는 tool입니다. 독보적인 unsupervised pretraining을 사용하는 것이 특징인데, 이는 cancer dependencies 학습을 위한 unlabeled tumor genomic representations를 파악할 수 있습니다.
<br><br>


## Cancer Dependency Map (DepMap)
***

많은 연구자들이 RNA interference(RNAi)와 CRISPR-Cas9 knockout screens를 사용한 loss-of-function screens를 통해 방대한 양의 cancer cell lines(CCLs) data를 확보했습니다. 하지만 cancer genome과 cancer dependency 간 상관관계는 비선형이므로 단순하게 이해하기 어려움이 있습니다.

과거에도 CCLs genomics를 사용하여 drug sensitivity를 예측하는데 전형적인 machine learning(ML)이나 deep learning(DL) 방법이 사용되어 왔습니다. 하지만 CCLs의 sample size가 DL model의 성능을 끌어올리는데 분명한 한계가 존재합니다. 예를 들어 tumor heterogeneity나 microenvironment의 복잡성을 학습하기 어렵습니다.
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

![Post-Image](MLDL4CancerGenome24.png)
_Summary<br>
https://www.edwith.org/deep-learning-2023/lecture/1475086_
<br><br>