---
layout: post
title: Stack vs Queue
date: 2022-05-24 19:53:42 +0900
published: true
categories: [Programming, Database]
tags: [database,LIFO,FIFO]
img_path: /assets/img/post/
---

## Stack
***

 > <br>A pile of things arranged one on top of another<br><br>

 Stack의 사전적 의미로 어떤 물체를 다른 것 위에 차곡차곡 쌓아 놓은 더미를 뜻합니다. 흔히 게임에서 자신의 캐릭터가 능력을 발휘하기 위해 특정 동작을 여러 번 반복하는 행위를 두고 'stack을 쌓는다'라고 표현합니다. 이와 같이 data를 차곡차곡 쌓아 올린 structure를 stack이라고 합니다.

 Stack은 data를 다룰 때 LIFO(Last-in, First-out) approach를 사용합니다. 가장 마지막에 들어간 data가 가장 먼저 나오는 방식입니다. 아래 그림은 밑이 막혀 있는 상자 안에 data A, B, C, D를 넣고 빼는 과정입니다. 가장 마지막에 들어간(LI) data D가 가장 먼저 나오고(FO) 있습니다.

![Post-Image](STACK-QUEUE_stack.png)
 _Stack structure & LIFO approach_
 <br><br>


 우리는 이미 일상 생할에서 stack을 사용하고 있습니다.

 * 실행 취소(ctrl+z): 취소 단축키를 사용하면 가장 마지막에 실행된 동작부터 순서대로 취소합니다.
 
 * 