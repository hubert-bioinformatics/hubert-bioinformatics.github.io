---
layout: post
title: Search Algorithm - BFS (Breadth-First Search)
date: 2022-05-27 07:52:29 +0900
published: true
categories: [Programming, Algorithm]
tags: [algorithm,search,python]
img_path: /assets/img/post/
---

## BFS (Breadth-First Search)
***

 (DFS에 이어 작성한 post 입니다. 먼저 [DFS](https://hubert-bioinformatics.github.io/posts/Algorithm_Search_DFS/, "DFS")를 읽고 오시는 것을 권장합니다.)

 BFS (Breadth-First Search)는 search algorithm 종류 중 하나입니다. DFS의 단점 중 하나는 항상 optimal solution을 찾는 것이 아니라는 것입니다. BFS는 이런 점을 보완한 search alogirithm 입니다. 전반적으로 DFS와 유사하므로 동일한 부분은 생략하고 차이나는 부분 위주로 살펴보겠습니다.

 BFS process는 다음과 같습니다. Frontier는 initial state(A)를 포함한 상태, explored set은 empty 상태로 시작합니다.

 1. Frontier에 search할 next node 확인: Frontier에 search할 next node가 존재하는지 확인합니다. 만약 없다면 solution이 없음을 의미하며 DFS process를 종료합니다. 참고로 여기서 언급한 node는 state, parent node, action, path cost 정보를 담고 있는 data structure입니다.

 2. Next node 가져오기: Frontier에서 <span style='color: black; background-color: #fff5b1'>**first node**</span>를 추출합니다. <span style='color: black; background-color: #fff5b1'>**(queue structure)**</span>
