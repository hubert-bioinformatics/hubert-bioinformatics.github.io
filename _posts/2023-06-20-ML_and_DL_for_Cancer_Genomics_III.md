---
layout: post
title: ML and DL for Cancer Genomics III - DL Algorithm I
date: 2023-06-20 11:49:55 +0900
published: true
math: true
categories: [Bioinformatics, ML]
tags: [BI,bioinformatics,cancer,ML,DL]
img_path: /assets/img/post/
---

본 post는 국가생명연구자원정보센터(KOBIC) 주관 경희대학교 이과대학 김권일 교수님의 [딥러닝 알고리즘 1](https://www.edwith.org/deep-learning-2023/lecture/1475085, "딥러닝 알고리즘 1")을 정리한 내용입니다.


## Intro
***

Machine learning 관련 기초 개념을 확인하고, 공개된 논문내용 및 데이터를 바탕으로 직접 실습하고 학습하는 과정입니다.
<br><br>


## 인공신경망 개념 - Neural network 구조
***

생물의 neural network에서 각 neuron은 기타 neuron과 서로 연결되어 있습니다. 만약 neuron이 흥분한다면 연결된 neuron으로 화학물질을 전하여 neuron 내의 전압을 바굽니다. 이후 neuron의 전압이 threshold(임계값)을 넘으면 해당 neuron이 활성화 됩니다. 즉, neuron이 흥분해서 다른 neuron을 향해 화학물질을 전달하는 방식으로 신호를 전달합니다.

생물 neural network를 machine learning model로 구현 가능합니다. (Artificial Neural Network, 인공신경망) 이 model에서 neuron은 n개의 기타 neuron에서 전송하는 입력 신호를 받습니다. 이러한 입력 신호는 weight(가중치)를 가진 connection(연결)을 거쳐 전달됩니다. Neuron이 받은 총 입력값은 neuron이 threshold와 비교하고 activation function(활성화 함수)를 통해 neuron의 출력을 처리합니다.
<br><br>


![Post-Image](MLDL4CancerGenome13.png)
_Neural Network 구조<br>
https://www.edwith.org/deep-learning-2023/lecture/1475085_
<br><br>


가장 직관적인 activation function은 단위 계단 함수입니다. 이 함수는 입력값을 출력값 '0'(억제)이나 '1'(흥분)에 투영시킯니다. 그러나 단위 계단 함수는 매끄럽지 못하고 불연속성이라는 좋지 않은 특성이 있습니다. 따라서 activation function으로 sigmoid function을 자주 사용합니다. Sigmoid function은 비교적 넓은 범위 내에서 변화하는 입력값을 (0, 1) 사이의 출력값 범위 내로 밀어넣을 수 있습니다. 이런 다수의 neuron을 일정한 겹층 구조로 연결하면 neural network를 얻게 됩니다.
<br><br>


![Post-Image](MLDL4CancerGenome14.png)
_Activation Function<br>
https://www.edwith.org/deep-learning-2023/lecture/1475085_
<br><br>


## Neuron 기본 구조
***

Neuron의 기본 구조는 McCulloch and Pitts(M-P) neuron으로 불립니다. 해당 neuron은 연결된 이전 neuron들의 입력값에 연결 weight(가중치)의 총합을 받은 뒤 임계값(threshold)과 비교하여 activation function을 통해 출력값을 생성합니다. 입력층 neuron들의 입력신호(x1, x2, ...)에 각각 고유한 weight(w1, w2, ...)를 부여하는데, weight는 각 신호가 다음 연결 neuron에 주는 영향력을 조절하는 요소입니다. Weight가 클수록 해당 신호가 그만큼 더 중요함을 의미합니다. w는 입력값이 출력값에 주는 영향력을 조절하는 parameter라면, threshold(실제 계산에서는 bias로 처리됨)는 neuron이 얼마나 쉽게 활성화 되느냐를 조절하는 parameter입니다.
<br><br>


![Post-Image](MLDL4CancerGenome15.png)
_McCulloch and Pitts(M-P) Neuron<br>
https://www.edwith.org/deep-learning-2023/lecture/1475085_
<br><br>


## Multi-layer Neural Network
***

Neuron의 아름다움은 '층을 쌓아' multi-layer neural network를 만들 수 있다는 데 있습니다. 그림에서 출력층과 입력층 사이에 한 층의 neuron이 있는데 이를 hidden layer(은닉층)이라고 부릅니다. Hidden layer와 출력층 neuron은 모두 activation function의 기능을 가집니다.

Neural network 각 층의 neuron은 다음 층 neuron과 완전 연결되어 있고, 같은 층의 neuron이나 층을 뛰어넘는 neuron끼리는 연결되지 않습니다. 이러한 neural network 결합 구조를 일반적으로 multi-layer feedforward neural networks (다층 순방향 신경망)이라고 부릅니다. 여기서 입력층 neuron은 외부 입력을 받고, hidden layer와 출력층 neuron은 신호를 가공합니다. 그리고 최종 결과는 출력층 neuron에 의해 출력되고, 입력층 neuron은 입력만 받고 함수 처리는 하지 않습니다. 반면 hidden layer와 출력층은 기능성 neuron을 포함합니다.
<br><br>


![Post-Image](MLDL4CancerGenome16.png)
_Multi-layer Neural Network<br>
https://www.edwith.org/deep-learning-2023/lecture/1475085_
<br><br>


Neural network 학습 과정에서는 training data를 통해 neuron 간의 connection weight(연결 가중치)와 각 기능성 neuron의 threshold만 조절하면 됩니다. 즉, neural network가 학습하는 것은 모두 connection weight와 threshold에 내재되어 있습니다.
<br><br>


## Take Home Message
***

![Post-Image](MLDL4CancerGenome17.png)
_Summary<br>
https://www.edwith.org/deep-learning-2023/lecture/1475084_
<br><br>