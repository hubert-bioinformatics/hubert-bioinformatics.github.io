---
layout: post
title: Style Guide for Shell - Google
date: 2022-04-15 12:31:12 +0900
published: true
math: true
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
 "[ ... ]", "test", "/usr/bin/[" 보다 "**[[ ... ]]**"가 선호되는 방식입니다. 후자 방식이 errors를 줄이고 정규표현식 사용이 가능하기 때문입니다.

```bash
# This ensures the string on the left is made up of characters in
# the alnum character class followed by the string name.
# Note that the RHS should not be quoted here.
if [[ "filename" =~ &[[:alnum:]]+name ]]; then
  echo "Match"
fi

# This matches the exact pattern "f*" (Does not match in this case)
if [[ "filename" == "f*" ]]; then
  echo "Match"
fi
```

```bash
# This gives a "too many arguments" error as f* is expanded to the
# contents of the current directory
if [ "filename" == f* ]; then
  echo "Match"
fi
```
<br><br>


## &nbsp;&nbsp;Testing Strings
***
 가능하면 filter characters 방식보다 quote를 사용하세요.

```bash
# Do this:
if [[ "${mu_var}" == "some_string" ]]; then
  do_something
fi

# -z (string length is zero) and -n (string length is not zero) are
# preffered over testing for an empty string
if [[ -z "${my_var}" ]]; then
  do_something
fi

# This is OK (ensure quotes on the empty side), but not preferred:
if [[ "${my_var}" == "" ]]; then
  do_something
fi
```

```bash
# Not this:
if [[ "${my_var}X" == "some_stringX" ]]; then
  do_something
fi
```

 혼란을 피하기 위해서 "-z"나 "-n" 옵션을 사용합니다.

```bash
# Use this
if [[ -n "${my_var}" ]]; then
  do_something
fi

# Instead of this
if [[ "${my_var}" ]]; then
  do_something
fi
```

 Equality 표현은 "=" 대신 "**==**"을 사용합니다. 숫자를 비교할 때는 "**(( ... ))**" 혹은 "**-lt**", "**-gt**" 방식을 사용합니다.

```bash
# Use this
if [[ "${my_var}" == "val" ]]; then
  do_something
fi

if (( my_var > 3 )); then
  do_something
fi

if [[ "${my_var}" -gt 3 ]]; then
  do_something
fi
```

```bash
# Instead of this
if [[ "${my_var}" = "val" ]]; then
  do_something
fi

# Probably unintended lexicographical comparison.
if [[ "${my_var}" > 3 ]]; then
  # True for 4, false for 22.
  do_something
fi
```
<br><br>


## &nbsp;&nbsp;Wildcard Expansion of Filenames
***
 Wildcard를 사용한 파일명을 확장할 때는 명시적인 경로명을 사용합니다. 파일명이 "-"로 시작할 수도 있고, "*" 대신 "**./\***"가 훨씬 안전합니다.

```bash
# Here's the contents of the directory:
# -f -r somedir somefile

# Incorrectly deletes almost everything in the directory by force
psa@bilby$ rm -v *
removed directory: `somedir'
removed `somefile'
```

```bash
# As opposed to:
psa@bilby$ rm -v ./*
removed `./-f'
removed `./-r'
rm: cannot remove `./somedir': Is a directory
removed `./somefile'
```
<br><br>


## &nbsp;&nbsp;Eval
***
 "**eval**"은 사용하지 않아야 합니다. Eval은 variable을 할당할 때 input을 삭제하고, 해당 변수들이 과거에 무엇이었는지 확인하지 않고도 할당할 수 있습니다.

```bash
# What does this set?
# Did it succeed? In part or whole?
eval $(set_my_variables)

# What happens if one of the returned values has a space in it?
variable="$(eval some_function)"
```
<br><br>


## &nbsp;&nbsp;Arrays
***
 Bash array는 lists of elements를 저장하고 quoting complications를 피하기 위해 사용합니다. 특히 argument lists에 적용됩니다. Array는 정렬된 strings collection을 저장하고 command나 loop문의 각각 elements로 안전하게 확장할 수 있습니다.

```bash
# An array is assigned using parentheses, and can be appended to
# with +=( ... ).
declare -a flags
flags=(--foo --bar='baz')
flags+=(--greeting="Hello ${name}")
mybinary "${flags[@]}"
```

```bash
# Don't use strings for sequences.
flags='--foo --bar=baz'
flags+=' --greeting="Hello world"' # This won't work as intended.
mybinary ${flags}
```

```bash
# Command expansions return single strings, not arrays. Avoid
# unquoted expansion in array assignments because it won't
# work correctly if the command output contains special
# characters or whitespace.

# This expands the listing output into a string, then does special keyword
# expansion, and then whitespace splitting. Only then is it turned into a
# list of words. The ls command may also change behavior based on the user's
# active environment!
declare -a files=($(ls /directory))

# The get_arguments writes everything to STDOUT, but then goes through the
# some expansion process above before turning into a list of arguments.
mybinary $(get_arguments)
```
<br><br>


## &nbsp;&nbsp;Pipes to While
***
 Pipe로 while을 연결하는 대신 process substitution이나 bash4+ builtin readarray를 사용하세요. Pipe는 subshell을 생성하는데 이 곳에서 수정되는 모든 variables는 parent shell에 공유되지 않기 때문입니다.

```bash
last_line='NULL'
your_command | while read -r line; do
  if [[ -n "{line}" ]]; then
    last_line="${line}"
  fi
done

# This will always output 'NULL'!
echo "{last_line}"
```

 Process substitution도 마찬가지로 subshell을 생성하지만, subshell 내에서 while이나 다른 command 없이 while로 reditecting을 허용합니다.

```bash
last_line='NULL'
while read line; do
  if [[ -n "${line}" ]]; then
    last_line="${line}"
  fi
done < <(your_command)

# This will output the last non-empth line from your_command
echo "${last_line}"
```

 또는 내장된 readarray를 사용하세요. 위와 같은 이유로 pipe 대신 readarray와 함께 process substitution 방식을 사용합니다.

```bash
last_line='NULL'
readarray -t lines < <(your_command)
for line in "${lines[#]}"; do
  if [[ -n "${line}" ]]; then
    last_line="${line}"
  fi
done
echo "${last_line}"
```
<br><br>


## &nbsp;&nbsp;Arithmetic
***
 "let", "$[ ... ]", "expr" 대신 "**(( ... ))**", "**$(( ... ))**"를 사용하세요.

```bash
# Simple calculation used as text - note the use of $(( ... )) within
# a string.
echo "$(( 2 + 2 )) is 4"

# When performing arithmetic comparisons for testing
if (( a < b )); then
  ...
fi

# Some calculation assigned to a variable.
(( i = 10 * j + 400 ))
```

```bash
# This form is non-portable and deprecated
i=$[2 * 10]

# Despite appearances, 'let' isn't one of the declarative keywords,
# so unquoted assignments are subject to globbing wordsplitting.
# For the sake of simplicity, avoid 'let' and use (( ... ))
let i="2 + 2"

# The expr utility is an externak program and not a shell builtin.
i=$( expr 4 + 4 )

# Quoting can be error prone when using expr too.
i=$( expr 4 '*' 4 )
```

 또한 "expr"보다 shell의 built-in arithmetic이 몇 배 더 빠릅니다. Variables를 사용할 때 "$(( ... ))" 안에서 "**${var}**" (그리고 "**$var**")) 형태가 필요하지 않습니다.

```bash
# N. B.: Remember to declare your variables as integers when
# possible, and to prefer local variables over glovals.
local -i hundred=$(( 10 * 10 ))
declare -i five=$(( 10 / 2 ))

# Increment the variable "i" by three.
# Note that:
#  - We do not write ${i} or $i.
#  - We put a aspace after the (( and before the )).
(( i += 3 ))

# To decrement the variable "i" by five:
(( i -= 5 ))

# Do some complicated computations.
# Note that normal ariithmetic operator precedence is observed.
hr=2
min=5
sec=30
echo $(( hr * 3600 + min * 60 + sec )) # prints 7530 as expected
```
<br><br>


## Naming Conventions
***


## &nbsp;&nbsp;Function Names
***
 소문자를 사용하고 두 개 이상 단어를 분리할 때 underscore를 사용합니다. 복수 개의 library는 "::" 기호로 분리합니다. Function name 다음에는 parentheses를 사용합니다.

```bash
# Single function
my_func() {
  ...
}

# Part of a package
mypackage::my_func() {
  ...
}
```
<br><br>


## &nbsp;&nbsp;Variable Names
***
 Functiona names와 동일한 규칙을 따릅니다. 반복문 내 looping variable name은 서로 유사한 name을 사용합니다.

```bash
for zone in "${zones[@]}"; do
  something_with "${zone}"
done
```
<br><br>


## &nbsp;&nbsp;Constants and Environment Variable Names
***
 모두 대문자를 사용하고 두 개 이상 단어를 분리할 때 underscore를 사용합니다. 파일의 최상단에 선언합니다.

```bash
# Constant
readonly PATH_TO_FILES='/some/path'

# Both constant and environment
declare -xr ORACLE_SID='PROD'
```

 명확성을 위해 "declare"보다 "**readonly**"나 "**export**" 사용을 권장합니다.

```bash
VERBOSE='false'
while getopts 'v' flag; do
  case "${flag}" in
    v) VERBOSE='true' ;;
  esac
done
readonly VERBOSE
```
<br><br>


## &nbsp;&nbsp;Source Filenames
***
 소문자를 사용하고 두 개 이상 단어를 분리할 때 underscore를 사용합니다.
<br><br>


## &nbsp;&nbsp;Read-only Variables
***
 Read-only임을 확실히 하기 위해 "**reaonly**"나 "**declare -r**"을 사용합니다.

```bash
zip_version="$(dpkg --status zip | grep Version: | cut -d ' ' -f 2)"
if [[ -z "${zip_version}" ]]; then
  eooro_message
else
  readonly zip_version
fi
```
<br><br>


## &nbsp;&nbsp;Use Local Variables
***
 Function-specific variables는 "**local**"과 함께 선언합니다. 선언과 assignment는 서로 다른 lines로 구분해야 합니다.

```bash
my_func2() {
  local name="$1"

  # Separate lines for declaration and assignment:
  local my_var
  my_var="$(my_func)"
  (( $? == 0 )) || return

  ...
}
```

```bash
my_func2() {
  # DO NOT do this:
  # $? will always be zero, as it contains the exit code of 'local', not my_func
  local my_var="$(my_func)"
  (( $? == 0 )) || return

  ...
}
```
<br><br>


## &nbsp;&nbsp;Function Location
***
 모든 function은 파일의 constants 바로 아래 함께 놓아두세요. Functions 사이에 executable code를 숨겨 놓지 않습니다.
 <br><br>


## &nbsp;&nbsp;main
***
 "**main**" function은 적어도 한 개 이상의 다른 function을 포함하며 파일의 제일 아래에 위치합니다. 가장 마지막 non-comment line은 "**main**" function calling을 합니다.
 <br><br>


## Calling Commands
***


## &nbsp;&nbsp;Checking Return Values
***
 항상 return values를 체크하고 관련 정보를 제공합니다. Unpiped commands에서는 "$?"를 사용하거나 "if"문을 통해서 확인합니다.

```bash
if ! mb "${file_list[@]}" "${dest_dir}/"; then
  echo "Unable to move ${file_list[*]} to ${dest_dir}" >&2
  exit 1
fi

# Or
mv "${file_list[@]}" "${dest_dir}/"
  echo "Unable to move ${file_list[*]} to ${dest_dir}" >&2
  exit 1
fi
```

 Bash는 또한 "**PIPESTATUS**" 변수를 가지고 있는데 모든 pipe의 return values를 체크하도록 허용합니다.

```bash
tar -cf - ./* | ( cd "${dir}" && tar -xf - )
if (( PIPESTATUS[0] != 0 || PIPESTATUS[1] != 0 )); then
  echo "Unable to rat files to ${dir}" >&2
fi
```

 하지만 "**PIPESTATUS**"는 다른 command를 사용하면 이를 덮어쓰기 때문에, pipe마다 발생하는 errors에 대해 서로 다른 대처가 필요한 경우 command를 실행한 이후 "**PIPESTATUS**"를 다른 변수에 할당해야 합니다.

```bash
tar -cf - ./* | ( cd "${DIR}" && tar -xf - )
return_codes=( "${PIPESTATUS[@]}" )
if (( return_codes[0] != 0 )); then
  do_something
fi
if (( return_codes[1] != 0 )); then
  do_something_else
fi
```
<br><br>


## &nbsp;&nbsp;Builtin Commands vs. External Commands
***
 Shell builtin commands와 분리된 프로세스 commands를 사용 가능하다면 shell builtin commands를 사용합니다.

```bash
# Prefer this:
addition=$(( X + Y ))
substitution="${string/#foo/bar}"

# Instead of this:
addition="$(expr "${X}" + "${Y}")"
substitution="$(echo "${string}" | sed -e 's/^foo/bar/')"
```
<br><br>


## Conclusion
***
 Use common sense and BE CONSISTENT.

 Revision 2.02