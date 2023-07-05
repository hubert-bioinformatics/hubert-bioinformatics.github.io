---
layout: post
title: (Error) CommandNotFoundError - Your shell has not been properly configured to use 'conda activate'
date: 2023-07-05 08:05:15 +0900
published: true
math: true
categories: [Programming, Python]
tags: [python,anaconda,conda,activate]
img_path: /assets/img/post/
---

## Error 내용
***

conda environment를 생성한 뒤 activate 시도했을 때 아래와 같은 error message를 출력합니다.
<br><br>


![Post-Image](CommandNotFoundError1.png)
_CommandNotFoundError<br>
https://hubert-bioinformatics.github.io/_
<br><br>
 

내용에 따라 `conda init <SHELL_NAME>` 실행한 뒤 shell을 재실행해도 마찬가지 error message를 출력하고 conda environment를 실행할 수 없습니다.
<br><br>


## Error 원인 및 해결
***

Error 원인은 새로 생성한 environment가 현재 접속 중인 shell에서 기본적으로 사용할 수 있는 상태가 아니기 때문입니다.

따라서 아래와 같이 conda 설정 파일(conda.sh) 변경사항을 source 명령어를 사용하여 반영하면 해결됩니다.
<br><br>


![Post-Image](CommandNotFoundError2.png)
_CommandNotFoundError<br>
https://hubert-bioinformatics.github.io/_
<br><br>


```bash
source /(conda_path)/etc/profile.d/conda.sh
conda activate (env name)
```
<br><br>


## 출처
***

https://github.com/conda/conda/issues/7980
