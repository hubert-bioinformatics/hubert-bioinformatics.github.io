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
|---|---|---|---
|Bourne shell<br>(sh)|/bin/sh<br>/sbin/sh|#|$|
|GNU Bourne-Again shell<br>(bash)|/bin/bash|bash-VersionNumber#|bash-VersionNumber$|
|C shell<br>(csh)|/bin/csh|#|%|
|Korn shell<br>(ksh)|/bin/ksh|#|$|
|Z shell<br>(zsh)|/bin/zsh|\<hostname\>#|\<hostname\>%|

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
 Bash는 실행파일에 사용이 허용된 유일한 shell scripting language 입니다. 실행파일은 반드시 "**#!/bin/bash**"로 시작하고 최소한의 flag를 사용합니다. "**set**"으로 shell 옵션을 설정하여 "**bash script name**"으로 script를 실행할 수 있도록 합니다. 모든 실행가능한 shell scripts는 일관성을 위해 "*bash*"로 한정합니다.
 <br><br>


## &nbsp;&nbsp;When to use Shell
***
 Shell은 small utilities나 간단한 wrapper scripts의 목적으로만 사용합니다. Shell script는 개발언어가 아니므로 Google에서는 다양한 utility script 작성 목적으로 사용됩니다.

 * 만약 대부분 다른 utilities를 부르거나 적은 data를 다룬다면, shell이 적합합니다.

 * 작업의 퍼포먼스가 중요하다면 shell이 아닌 다른 language를 사용하세요.

 * 만약 100 lines 이상 긴 script나 직관적이지 않은 로직을 사용한다면, 지금 당장 정형화된 구조로 다시 작성하세요.

 * Code의 복잡성을 평가할 때 (예를 들어 다른 language로 변경을 결정할 때), code 작성자가 아닌 다른 사람들에 의해 손쉽게 유지될 수 있는지 고려하세요.
 <br><br>


## Shell Files and Interpreter Invocation
***


## &nbsp;&nbsp;File Extensions
***
 실행파일은 (강력하게 권장하는 바) 확장자를 사용하지 않거나, "**.sh**" 확장자를 사용합니다. Libraries는 반드시 ".sh" 확장자를 사용하며 실행가능한 상태가 아니어야 합니다. 프로그램이 실행될 때 어떤 language가 사용되었는지 알아야 할 필요가 없으므로 확장자도 사용할 필요가 없습니다. 하지만 libraries는 비슷한 기능을 하는 다른 language로 작성된 library가 필요한 경우가 종종 있으므로 어떤 language로 작성되었는지 아는 것이 중요하며 확장자를 사용합니다.
 <br><br>


## &nbsp;&nbsp;SUID/SGID
***
 SUID와 SGID는 shell scripts에서 사용을 금지합니다. Shell은 보안 관련 issue가 너무 많으며 SUID/SGID를 허용할만큼 보안이 지켜질 수 없습니다.
 <br><br>


## Environment
***


## &nbsp;&nbsp;STDOUT vs STDERR
***
 모든 error messages는 "**STDERR**"로 보내야 합니다. 그렇게해야 일반적인 상태와 실제 issue를 구분하기 쉽습니다. 다른 상태 정보와 함께 error messages를 출력하는 기능이 권장됩니다.

```bash
err() {
  echo "[$(date + '%Y-%m-%dT%H:%M:%S%z')]: $*" >&2
}

if ! do_something; then
  err "Unable to do_something"
  exit 1
fi
```
<br><br>


## Comments
***


## &nbsp;&nbsp;File Header
***
 Script는 내용에 대한 설명으로 시작하세요. 모든 script는 반드시 전반적인 내용에 대한 간략한 요약을 top-level comment 형태로 가져야 합니다. Copyright와 작성자 정보 작성은 옵션입니다.

```bash
#!/bin/bash
#
#Perform hot backups of Oracle databases.
```
<br><br>


## &nbsp;&nbsp;Function Comments
***
 명확하지 않고 간략하지도 않은 function은 반드시 comment를 가져야 합니다. Library 내 모든 function은 길이나 복잡도와 상관없이 반드시 comment를 가져야 합니다. 누군가가 code를 읽지 않고 comment를 읽는 것 만으로도 program을 어떻게 사용하는지, library 내 function을 어떻게 사용하는지 알 수 있어야 합니다.

 * Function에 대한 설명

 * Globals: List of global variables used and modified

 * Arguments: Arguments taken

 * Outputs: Output to STDOUT or STDERR

 * Returns: Returned values other than the default exit status of the last command run

 예를들어,

```bash
#######################################
# Cleanup files from the backup directory.
# Globals:
#   BACKUP_DIR
#   ORACLE_SID
# Arguments:
#   None
#######################################
function cleanup() {
  …
}

#######################################
# Get configuration directory.
# Globals:
#   SOMEDIR
# Arguments:
#   None
# Outputs:
#   Writes location to stdout
#######################################
function get_dir() {
  echo "${SOMEDIR}"
}

#######################################
# Delete a file in a sophisticated manner.
# Arguments:
#   File to delete, a path.
# Returns:
#   0 if thing was deleted, non-zero on error.
#######################################
function del_thing() {
  rm "$1"
}
```
<br><br>


## &nbsp;&nbsp;Implementation Comments
***
 
