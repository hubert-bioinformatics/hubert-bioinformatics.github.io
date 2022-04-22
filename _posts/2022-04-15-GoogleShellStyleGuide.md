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

 예를 들어,

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
 Code에서 까다롭거나 명확하지 않은 부분, 혹은 흥미롭거나 중요한 부분에 comment를 사용하세요. 모든 내용을 comment에 담지 말고 간단히 적으세요.
 <br><br>


## &nbsp;&nbsp;TODO Comments
***
 Code의 임시내용, 단기적인 해결책, 충분하지만 완벽하지 않은 부분에 TODO comment를 사용합니다. [C++ 가이드](https://google.github.io/styleguide/cppguide.html#TODO_Comments, "C++ 가이드")를 준수합니다. 'TODO' 단어 자체는 모두 대문자를 표기하며, 문제에 대한 설명 내용과 함께 이름, e-mail 주소, 혹은 작성자를 대표하는 다른 표식자를 사용합니다. 이러한 형태의 주요 목적은 일관성 있는 'TODO'를 작성함으로써 추후 요청에 대한 자세한 내용을 검색할 수 있도록 하는데 있습니다. 'TODO'에서 언급한 작성자가 꼭 미래에 해당 문제를 해결해야 하는 것은 아니므로 항상 작성자 정보를 함께 기재합니다.

 예를 들어,

```bash
# TODO(mrmonkey): Handle the unlikely edge cases (bug ####)
```
<br><br>


## Formatting
***


## &nbsp;&nbsp;Indentation
***
 Indent는 2-spaces를 사용합니다. Tab은 사용하지 않습니다. 가독성을 높이기 위해 block 사이에는 blank lines를 사용합니다.
 <br><br>


## &nbsp;&nbsp;Line Length and Long Strings
***
 Line의 최대 글자수는 80자 입니다. 그 이상의 문자가 들어간다면 "here document"나 "개행문자"를 사용합니다.

```bash
# DO use 'here document's
cat <<END
I am an exceptionally long
string.
END

# Embedded newlines are ok too
long_string="I am an exceptionally
long string."
```
<br><br>


## &nbsp;&nbsp;Pipelines
***
 Pipeline은 하나의 line에 모두 들어가지 않으면 line당 하나로 분리해서 사용합니다. 이 때 새로운 line에 들어가는 pipeline은 2-spaces indent를 사용합니다. 이 규칙은 command 결합에 사용하는 '|', logical 결합에 사용하는 '||'와 '&&'에 적용됩니다.

```bash
# All fits on one line
command1 | command2

# Long commands
command1 \
  | command2 \
  | command3 \
  | command4
```
<br><br>


## &nbsp;&nbsp;Loops
***
 '**; do**'와 '**; then**'은 'while', 'for', 'if'와 동일한 line에 사용하세요.

 예를 들어,

```bash
# If inside a function, consider declaring the Loop variable as
# a Local to avoid it Leaking into the global environment:
# Local dir
for dir in "#{dirs_to_cleanup[@]}"; do
  if [[ -d "${dir}/${ORACLE_SID}" ]]; then
    log_date "Cleaning up old files in ${dir}/${ORACLE_SID}"
    rm "${dir}/${ORACLE_SID}/"*
    if (( $? != 0 )); then
      error_message
    fi
  else
    mkdir -p "${dir}/${ORACLE_SID}"
    if (( $? != 0 )); then
      error_message
    fi
  fi
done
```
<br><br>


## &nbsp;&nbsp;Case statement
***
 * 2-spaces indent를 사용합니다.

 * One-line alternative는 닫는 부호 이후 ";;" 부호 이전에 space 한 개가 필요합니다.

 * Long or multi-command alternatives는 pattern, actions, 그리고 ";;" 기호와 함께 복수 개의 lines로 나뉘어져야 합니다.

 Matching expressions는 "case"와 "esac"로부터 한 단계 indent를 사용합니다. Multiline actions는 이로부터 한 단계 더 indent를 사용합니다. ";&"와 ";;&" notations는 사용하지 않습니다.

```bash
case "${expression}" in
  a) 
    variable="..." 
    some_command "${variable}" "${other_expr}" ... 
    ;; 
  absolute)
    actions="relative" 
    another_command "${ations}" "${other_expr}" ... 
    ;; 
  *) 
    error "Inexpected expression '${expression}'" 
    ;; 
esac
```
<br><br>


 간단한 commands는 가독성이 떨어지지 않는한 pattern, ";;" 기호와 동일한 line에 놓습니다.

```bash
vervose='false'
aflag=''
bflag=''
files=''
while getopts 'abf:v' flag; do
  case "${flag}" in
    a) aflag='true' ;;
    b) bflag='true' ;;
    f) files="${OPTARG}" ;;
    v) verbose='true' ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done
```
<br><br>


## &nbsp;&nbsp;Variable expansion
***
 Variable quote에서 선호되는 방식은 "$var"보다는 "**${var}**" 입니다. 하지만 script에서 원래 사용하던 방식을 준수하세요.

```bash
# Section of *recommended* cases.

# Preferred style for 'special' variables:
echo "Positional: $1" "$5" "$3"
echo "Specials: !=$1, -=$-, _=$+. ?=$?, #=$# *=$* @=$@ \$=$$ ..."

# Braces necessary:
echo "many parameters: ${10}"

# Braces avoiding confusion:
# Output is "a0b0c0"
set -- a b c
echo "${1}0${2}0${3}0"

# Preferred style for other variables:
echo "PATH=${PATH}, PWD=${PWD}, mine=${some_var}"
while read -r f; do
  echo "file=${f}"
done < < (find /tmp)
```
<br><br>


```bash
# Section of *discouraged* cases

# Unquoted vars, unbraced vars, brace-delimited single letter
# shell specials.
echo a=$avar "b=$bvar" "PID=${$}" "${1}"

# Confusing use: this is expanded as "${1}0${2}0${3}0",
# not "${10}${20}${30}
set -- a b c
echo "$10$20$30"
```
<br><br>


## &nbsp;&nbsp;Quoting
***
 * Variables, command substitutions, spaces, 혹은 shell meta characters를 포함하는 문자열은 항상 quote를 사용합니다.

 * Lists of elements의 안전한 quote를 위해서 array를 사용합니다. 

 * 정수로 정의된 shell-internal, readonly special variables는 선택적으로 quote를 사용합니다: "$?", "$#", "$$", "$!"

 * Command options이나 path name이 아닌 "words"는 quote를 사용합니다.

 * Literal 정수는 quote를 사용하지 않습니다.

 * "$*"를 사용해야하는 특별한 이유가 있지 않다면 "**$@**"를 사용하세요.

```bash
# 'Single' quotes indicate that no substitution is desired.
# "Double" quotes indicate that substitution is required/tolerated.

# Simple examples

# "quote command substitutions"
# Note that quotes nested inside "$()" don't need escaping.
flag="$(some_command and its args "$@" 'quoted separately')"

# "quote variables"
echo "${flag}"

# Use arrays with quoted expansion for lists.
declare -a FLAGS
FLAGS=( --foo --bar='baz' )
readonly FLAGS
mybinary "${FLAGS[@]}"

# It's ok to not quote internal integer variables.
if (( $# > 3 )); then
  echo "ppid=${PPID}"
fi

# "never quote literal integers"
value=32
# "quote command substitutions", even when you expect integers
number="$(generate_number)"

# "prefer quoting words", not compulsory
readonly USE_INTEGER='true'

# "quote shell meta characters"
echo 'Hello stranger, and well met. Earn lots of $$$'
echo "Process $$: Done making \$\$\$."

# "command options or path names"
# ($1 is assumed to contain a value here)
grep -li Hugo /dev/null "$1"

# Less simple examples
# "quote variables, unless proven false": ccs might be empty
git send-email --to "${reviewers}" ${ccs:+"--cc" "${ccs}"}

# For passing on arguments,
# "$@" is right almost every time, and
# $* is wrong almost every time:

# * $* and $@ will split on spaces, clobbering up arguments
#   that contain spaces and dropping empty strings;
# * "$@" will retain arguments as-is, so no args
#   provided will result in no args being passed on;
#   This is in most cases what you want to use for passing
#   on arguments.
# * "$*" expands to one argument, with all args joined
#   by (usually) spaces,
#   so no args provided will result in one empty string
#   being passed on.
# (Consult `man bash` for the nit-grits ;-)

(set -- 1 "2 two" "3 three tres"; echo $#; set -- "$*"; echo "$#, $@")
(set -- 1 "2 two" "3 three tres"; echo $#; set -- "$@"; echo "$#, $@")
```
<br><br>


## Features and Bugs
***


## &nbsp;&nbsp;ShellCheck
***
 [ShellCheck Project](https://www.shellcheck.net/, "ShellCheck Project")는 입력한 shell scripts의 일반적인 bugs와 warnings를 확인해 주는 사이트 입니다.
 <br><br>


## &nbsp;&nbsp;Command Substitution
***
 Backticks 대신 "**$(command)**"를 사용합니다. Nested backticks는 내부에 escaping 문자로 "\"를 사용해야 합니다. 이에 반해 "**#(command)**" 형식은 읽기 쉽고 escaping도 필요하지 않습니다.

 예를 들어,

```bash
# This is preferred:
var="$(command "$(commdna1)")"

# This is not:
var="`command \`command1\``"
```
<br><br>


## &nbsp;&nbsp;Test, [ ... ], and [[ ... ]]
***
 Back