---
layout: post
title: Phred Score (Base Call Quality Score)
date: 2022-06-18 11:05:40 +0900
published: true
math: true
categories: [Bioinformatics, NGS]
tags: [BI,bioinformatics,fastq,phred score,NGS]
img_path: /assets/img/post/
---

## Definition
***

 Sequencing 결과로 나온 base call이 얼마나 정확한지 나타내는 수치입니다. Fastq 파일 내 각 read의 네 번 째 line을 구성합니다. Phred+33 encoding과 ASCII 표기법을 사용합니다. 아래와 같은 계산식으로 score를 산출합니다.<br>

 $ Q = -10log_{10}^{(e)} $ 

 e는 base call 결과가 틀렸을 확률을 의미합니다.

 <script src="https://gist.github.com/hubert-bioinformatics/b437a5f57fd35652b4e49465ef389a46.js"></script>

 결과값을 음수로 변환하기 때문에 x축(e)이 증가하면 y축(phred score)은 감소합니다. 그리고 y축은 log scale에 따라 변화하기 때문에 x축 값이 $10^{n}$ 단위로 증가/감소하면 y축 값은 n 단위로 증가/감소 합니다.

 Phred score 20은 e가 0.01임을 의미합니다. 곧, base call error 확률이 1%이며, 100개 base call 중에서 1개의 error base를 포함하고 있음을 나타냅니다. 동시에 call accuracy가 99%임을 뜻합니다.

 Phred score 10 = probability of error 10% = call accuracy 90%


 Phred score 20 = probability of error 1% = call accuracy 99%

 Phred score 30 = probability of error 0.1% = call accuracy 99.9%
 <br><br>


## Phred+33 encoding과 ASCII 표기법
***

 Phred score는 왜 +33 encoding과 ASCII 표기법을 사용할까요?

 Illumina sequencer 데이터는 일반적으로 phred score 0~40 범위 안에서 출력됩니다. 0~9는 1byte를 사용하지만, 10 이상부터는 2byte를 사용합니다. 수 백 만 개의 read가 포함된 fastq 파일에서 quality score를 효율적으로 저장하기 위해서는 2byte보다 1byte 정보로 quality를 표현하는 것이 현명한 선택입니다. 또한 base와 quality score는 1:1 match이므로 반드시 한 자리수로 표현해야 fastq 파일에서 정확히 사용할 수 있습니다. ASCII 표기법은 하나의 character가 1byte를 차지하므로 위 두 가지 목적에 적합합니다.

 ASCII(**A**merican **S**tandard **C**ode for **I**nformation **I**nterchange, 미국 정보 교환 표준 부호) 표기법은 1963년 미국 ANSI에서 표준화한 정보교환용 7bit(8bit=1byte) 부호체계 입니다. 1byte 중 7bit만 사용하도록 만든 이유는 나머지 1bit를 통신 에러 검출 용도로 비워두었기 때문입니다. 000(0x00)부터 127(0x7F)까지 총 128개 부호가 사용됩니다.

 | Dec | Hx | Oct | Char |
 | 0 | 0 | 000 | NUL(null) |
 | 1 | 1 | 001 | SOH(start of heading) |
 | 2 | 2 | 002 | STX (start of text) |
 | 3 | 3 | 003 | ETX(end of text) |
 | 4 | 4 | 004 | EOT(end of transmission) |
 | 5 | 5 | 005 | ENQ(enquiry) |
 | 6 | 6 | 006 | ACK(acknowledge) |
 | 7 | 7 | 007 | BEL(bell) |
 | 8 | 8 | 010 | BS(backspace) |
 | 9 | 9 | 011 | TAB(horizontal tab) |
 | 10 | A | 012 | LF(NL line feed, new line) |
 | 11 | B | 013 | VT(vertical tab) |
 | 12 | C | 014 | FF(NP from feed, new page) |
 | 13 | D | 015 | CR(carriage return) |
 | 14 | E | 016 | SO(shift out) |
 | 15 | F | 017 | SI(shift in) |
 

 1. Line1 (sequence identifier): '@' 기호로 시작합니다. Sequencing run과 cluster 관련 정보를 담고 있습니다.<br>

    | Value | Description |
    | @ | sequence identifier start character |
    | NG501674 | uniqe instrument id | 
    | 510 | run id |
    | HTVWKAFX3 | flowcell id |
    | 1 | flocell lane |
    | 11101 | tile number within the flowcell lane |
    | 11906 | x-coordinate of the cluster within the tile |
    | 1035 | y-coordinate of the cluster within the tile |
    | 1 | read number [1, 2 (if paired-end or mate-pair reads only)] |
    | N | N means this read is NOT filtered (=passed), Y otherwise |
    | 0 | 0 when none of the control bits are on, otherwise it is an even number |
    | GAATCTGA | index sequence |

 2. Line2 (sequence): Read의 sequence 정보를 담고 있습니다.

 3. Line3 (separator): '+' 기호로 시작합니다. Sequence와 quality를 분리하는 구분자 입니다.

 4. Line4 (base call quality score): Line2의 각각 sequence에 대한 quality 값 정보를 담고 있습니다. Phred+33 encoding 방식을 따르며 quality score 표기는 ASCII 문자로 합니다.
 <br><br>


## Open Fastq
***
 Fastq 파일은 보통 몇 백 만개 단위의 reads 정보를 담고 있으며 파일 size 또한 Gb 단위입니다. 윈도우 OS 환경에서 이렇게 큰 파일을 열고 작업하는 것은 무리입니다. 그럼에도 불구하고 단순히 fastq 파일을 열어보고 싶다거나 작은 size의 fastq 파일을 다룰 때는 [NotePad++](https://notepad-plus-plus.org/downloads/, "NotePad++"), [Sublime Text](https://www.sublimetext.com/, "Sublime Text")와 같은 text editor를 사용할 수 있습니다.