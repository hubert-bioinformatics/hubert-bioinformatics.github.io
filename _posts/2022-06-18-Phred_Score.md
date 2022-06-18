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

 
 <br><br>


## Fastq Format
***

 ![Post-Image](Fastq_format.png)
 _Fastq format_
 
 Fastq는 한 개 read당 네 개 lines로 구성되어 있습니다.

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