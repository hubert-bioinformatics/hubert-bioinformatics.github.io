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

 3. Solution 확인과 return: 2번의 node가 goal test를 통과하면 search process를 종료하고 explored set을 solution으로 정의한 뒤 return합니다.

 4. Explored set에 node 추가: 2번의 node가 goal test를 통과하지 못하면 explored set에 node를 추가합니다.

 5. Frontier expansion: Frontier에 child node를 추가 합니다. 이 때 child node가 frontier와 explore set에 이미 존재하는지 확인합니다.


 ![Post-Image](BFS_process.gif)
 _BFS process_

 DFS와 차이점을 찾으셨나요? DFS는 search 과정에서 goal node(F)를 만날 때까지 계속 child node를 찾아갑니다. 하지만 BFS는 우선 같은 depth의 모든 node(C, D)를 우선 찾아갑니다.
 <br><br>


## &nbsp;&nbsp;BFS 공간 복잡도, 시간 복잡도
***
 Node의 수를 V(Vertex), 연결선의 수를 E(Edge)라고 할 때,
 
 BFS의 공간 복잡도는 다음과 같습니다.

 * 인접 행렬인 경우: O($V^2$)

 * 인접 리스트인 경우: O(V+E)

 시간 복잡도는 다음과 같습니다.

 * 인접 행렬인 경우: O($V^2$)

 * 인접 리스트인 경우: O(V+E)
 <br><br>