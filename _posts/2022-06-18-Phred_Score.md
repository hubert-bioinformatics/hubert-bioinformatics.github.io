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
 | 16 | 10 | 020 | DLE(data link escape) |
 | 17 | 11 | 021 | DC1(device control 1) |
 | 18 | 12 | 022 | DC2(device control 2) |
 | 19 | 13 | 023 | DC3(device control 3) |
 | 20 | 14 | 024 | DC4(device control 4) |
 | 21 | 15 | 025 | NAK(negative acknoledge) |
 | 22 | 16 | 026 | SYN(synchronous idle) |
 | 23 | 17 | 027 | ETB(end of trans. block) |
 | 24 | 18 | 030 | CAN(cancel) |
 | 25 | 19 | 031 | EM(end of medium) |
 | 26 | 1A | 032 | SUB(substitute) |
 | 27 | 1B | 033 | ESC(escape) |
 | 28 | 1C | 034 | FS(file separator) |
 | 29 | 1D | 035 | FS(group separator) |
 | 30 | 1E | 036 | RS(record separator) |
 | 31 | 1F | 037 | US(unit separator) |
 | 32 | 20 | 040 | Space |

 Dec 기준 0~32는 print가 불가능한 제어 문자입니다. 9~13, 32는 공백이 포함된 문자입니다. 따라서 quality score로 사용 불가한 위 문자를 제외하고 33부터 표기합니다.(Phred+33)

 | Dec | Hx | Oct | Char |
 | 33 | 21 | 041 | ! |
 | 34 | 22 | 042 | " |
 | 35 | 23 | 043 | # |
 | 36 | 24 | 044 | $ |
 | 37 | 25 | 045 | % |
 | 38 | 26 | 046 | & |
 | 39 | 27 | 047 | ' |
 | 40 | 28 | 050 | ( |
 | 41 | 29 | 051 | ) |
 | 42 | 2A | 052 | * |
 | 43 | 2B | 053 | + |
 | 44 | 2C | 054 | , |
 | 45 | 2D | 055 | - |
 | 46 | 2E | 056 | . |
 | 47 | 2F | 057 | / |
 | 48 | 30 | 060 | 0 |
 | 49 | 31 | 061 | 1 |
 | 50 | 32 | 062 | 2 |
 | 51 | 33 | 063 | 3 |
 | 52 | 34 | 064 | 4 |
 | 53 | 35 | 065 | 5 |
 | 54 | 36 | 066 | 6 |
 | 55 | 37 | 067 | 7 |
 | 56 | 38 | 070 | 8 |
 | 57 | 39 | 071 | 9 |
 | 58 | 3A | 072 | : |
 | 59 | 3B | 073 | ; |
 | 60 | 3C | 074 | < |
 | 61 | 3D | 075 | = |
 | 62 | 3E | 076 | > |
 | 63 | 3F | 077 | ? |
 | 64 | 40 | 100 | @ |
 | 65 | 41 | 101 | A |
 | 66 | 42 | 102 | B |
 | 67 | 43 | 103 | C |
 | 68 | 44 | 104 | D |
 | 69 | 45 | 105 | E |
 | 70 | 46 | 106 | F |
 | 71 | 47 | 107 | G |
 | 72 | 48 | 110 | H |
 | 73 | 49 | 111 | I |

 앞서 설명드린 내용처럼 illumina sequencer 데이터는 일반적으로 phred score 0~40 범위 안에서 출력됩니다. 즉, 위 !(33=0+33)부터 I(73=40+33)까지 ASCII 문자가 quality score로 사용됩니다. 물론 아래 문자도 사용될 수 있습니다.

 | Dec | Hx | Oct | Char |
 | 74 | 4A | 112 | J |
 | 75 | 4B | 113 | K |
 | 76 | 4C | 114 | L |
 | 77 | 4D | 115 | M |
 | 78 | 4E | 116 | N |
 | 79 | 4F | 117 | O |
 | 80 | 50 | 120 | P |
 | 81 | 51 | 121 | Q |
 | 82 | 52 | 122 | R |
 | 83 | 53 | 123 | S |
 | 84 | 54 | 124 | T |
 | 85 | 55 | 125 | U |
 | 86 | 56 | 126 | V |
 | 87 | 57 | 127 | W |
 | 88 | 58 | 128 | X |
 | 89 | 59 | 129 | Y |
 | 90 | 5A | 132 | Z |
 | 91 | 5B | 133 | [ |
 | 92 | 5C | 134 | / |
 | 93 | 5D | 135 | ] |
 | 94 | 5E | 136 | ^ |
 | 95 | 5F | 137 | _ |
 | 96 | 60 | 140 | ` |
 | 97 | 61 | 141 | a |
 | 98 | 62 | 142 | b |
 | 99 | 63 | 143 | c |
 | 100 | 64 | 144 | d |
 | 101 | 65 | 145 | e |
 | 102 | 66 | 146 | f |
 | 103 | 67 | 147 | g |
 | 104 | 68 | 148 | h |
 | 105 | 69 | 149 | i |
 | 106 | 6A | 152 | j |
 | 107 | 6B | 153 | k |
 | 108 | 6C | 154 | l |
 | 109 | 6D | 155 | m |
 | 110 | 6E | 156 | n |
 | 111 | 6F | 157 | o |
 | 112 | 70 | 160 | p |
 | 113 | 71 | 161 | q |
 | 114 | 72 | 162 | r |
 | 115 | 73 | 163 | s |
 | 116 | 74 | 164 | t |
 | 117 | 75 | 165 | u |
 | 118 | 76 | 166 | v |
 | 119 | 77 | 167 | w |
 | 120 | 78 | 170 | x |
 | 121 | 79 | 171 | y |
 | 122 | 7A | 172 | z |
 | 123 | 7B | 173 | { |
 | 124 | 7C | 174 | \| |
 | 125 | 7D | 175 | } |
 | 126 | 7E | 176 | ~ |
 | 127 | 7F | 177 | DEL |

 Phred score와 ASCII 문자표를 사용하는 이유, 방식까지 살펴봤습니다.