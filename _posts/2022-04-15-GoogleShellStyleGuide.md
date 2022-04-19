---
layout: post
title: Style Guide for Shell - Google
date: 2022-04-15 12:31:12 +0900
published: true
categories: [Programming, Linux]
tags: [linux,shell]
img_path: /assets/img/post/
---

## What is the Shell and Shell Script?
***
 > <br>the hard outer covering of some creatures<br><br>

 Shell의 사전적 의미 입니다. 컴퓨터에서의 shell도 비슷한 역할을 하는데 OS의 kernel(OS의 일부로서 컴퓨터의 메모리에 상주하는 프로그램)을 감싸고 있습니다. 더 나아가 사용자와 kernel을 연결하는 다리 역할까지 합니다. Shell은 대화창 형태의 interface를 제공하며 사용자가 command를 내리면 OS로 전달하고 OS는 hardware가 이해할 수 있는 언어로 번역합니다. Shell script의 기본 컨셉은 사용자의 command를 실행 순서대로 나열해 놓은 list 입니다.
 <br><br>


## Shell Types?
***

 Linux에는 다음과 같은 여러 가지 shell이 존재합니다.
 <br><br>
 
|Shell|Complete<br>path-name|Prompt for<br>root user|Prompt for<br>non-root user|

|---|---|---|---|
|Bourne shell<br>(sh)|/bin/sh<br>/sbin/sh|#|$|
|GNU Bourne-Again shell<br>(bash)|/bin/bash|bash-VersionNumber#|bash-VersionNumber$|
|C shell<br>(csh)|/bin/csh|#|%|
|Korn shell<br>(ksh)|/bin/ksh|#|$|
|Z shell<br>(zsh)|/bin/zsh|<hostname>#|<hostname>%|
<br>


  * Bourne shell (sh): 1977년 AT&T사의 Bell 연구소에서 Stephen Bourne이 개발 했습니다. 최초의 bourne shell 입니다.
  
  * Bourne Again shell (bash): 1989년 Brian Fox가 GNU project를 위해 개발 했습니다. 현재 linux standard shell로 사용합니다.
  <br><br>


## Google Shell Style Guide (Revision 2.02)
***
 많은 Googler에 의해 [Google Shell Style Guide](https://google.github.io/styleguide/shellguide.html, "Google Shell Style Guide")가 작성, 수정, 유지되고 있습니다.
 <br><br>


## Background
***


## &nbsp;&nbsp;Which Shell to Use
***
 Bash는 실행파일에 사용이 허용된 유일한 shell scripting language 입니다. 실행파일은 반드시 "**#!/bin/bash**"로 시작하고 최소한의 flag를 사용합니다. "**set**" 옵션을 