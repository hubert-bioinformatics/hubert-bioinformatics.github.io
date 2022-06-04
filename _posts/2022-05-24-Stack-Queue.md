---
layout: post
title: Stack vs Queue
date: 2022-05-24 07:57:42 +0900
published: true
math: true
categories: [Programming, Database]
tags: [database,LIFO,FIFO]
img_path: /assets/img/post/
---

## Stack
***

 > <br>A pile of things arranged one on top of another<br><br>

 Stack의 사전적 의미로 어떤 물체를 다른 것 위에 차곡차곡 쌓아 놓은 더미를 뜻합니다. 흔히 게임에서 자신의 캐릭터가 능력을 발휘하기 위해 특정 동작을 여러 번 반복하는 행위를 두고 'stack을 쌓는다'라고 표현합니다. 이와 같이 차곡차곡 쌓아 올린 data structure가 stack입니다.

 Stack은 data를 다룰 때 LIFO(Last-in, First-out) approach를 사용합니다. 가장 마지막에 들어간 data가 가장 먼저 나오는 방식입니다. 아래 그림은 밑이 막혀 있는 상자 안에 data A, B, C, D를 넣고 빼는 과정입니다. 가장 마지막에 들어간(LI) data D가 가장 먼저 나오고(FO) 있습니다.

![Post-Image](STACK-QUEUE_stack.png)
 _Stack structure & LIFO approach_
 <br><br>


 우리는 이미 일상 생할에서 stack을 사용하고 있습니다.

 * 실행 취소(ctrl+z): 취소 단축키를 사용하면 가장 마지막에 실행된 동작부터 순서대로 취소합니다.
 
 * 접시 꺼내기: 찬장 안 쌓여 있는 접시를 꺼낼 때 가장 위에서부터 하나씩 꺼낼 수 있습니다.

 * 뒤로 가기: 웹 브라우저의 뒤로 가기 버튼은 가장 마지막에 열린 페이지로 되돌아 갑니다.

 * DFS(Deep-first Search) 구현: 가장 깊은 단계 node까지 확장하며 search하는 방식입니다. [DFS](https://hubert-bioinformatics.github.io/posts/Algorithm_Search_DFS/, "DFS") post를 참고하세요.
 <br><br>


## Queue
***

 > <br>A line of people, usually standing or in cars, waitin for something<br><br>

 Queue의 사전적 의미로 사람들이 줄 서있는 모습을 연상할 수 있습니다. 커피를 구입하기 위해 줄을 서면 가장 먼저 온 사람부터 차례대로 주문을 받습니다. 이처럼 data가 들어가는 입구와 출구가 다른 data structure가 queue입니다.

 Queue는 data를 다룰 때 FIFO(First-in, First-out) approach를 사용합니다. 가장 먼저 들어간 data가 가장 먼저 나오는 방식입니다. 아래 그림은 밑이 뚫려 있는 상자 안에 data A, B, C, D를 넣고 빼는 과정입니다. 가장 먼저 들어간(FI) data A가 가장 먼저 나오고(FO) 있습니다.

 ![Post-Image](STACK-QUEUE_queue.png)
 _Queue structure & FIFO approach_
 <br><br>


 우리는 이미 이상 생활에서 queue를 사용하고 있습니다.

 * 스타벅스 DT: 자동차를 타고 줄을 서면 먼저 온 순서대로 커피를 주문하고 받아갑니다.

 * Sungrid engine: qsub command를 실행하면 queue 대기열에 들어간 job 순서대로 실행됩니다.

 * BFS(Breathe-first Search) 구현: 매 단계 같은 깊이의 node들을 순서대로 대기열에 넣고 들어온 순서대로 search하는 방식입니다. [BFS](https://hubert-bioinformatics.github.io/posts/Algorithm_Search_BFS/, "BFS") post를 참고하세요.
 <br><br>


 마지막으로 Stack vs Queue 비교화면을 보며 post를 마칩니다.

 ![Post-Image](STACK-QUEUE_gif.gif)
 _Stack vs Queue_