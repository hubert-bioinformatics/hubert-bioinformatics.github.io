---
title: "Phred Score (Base Call Quality Score)"
date: 2022-06-18
category: bioinformatics
tags: ["BI", "bioinformatics", "fastq", "phred score", "NGS"]
legacyPath: "/posts/Phred-Score-Base-Call-Quality-Score/"
source: manual
---

## Definition
***

 Sequencing 결과로 나온 base call이 얼마나 정확한지 나타내는 수치입니다. Fastq 파일 내 각 read의 네 번 째 line을 구성합니다. Phred+33 encoding과 ASCII 표기법을 사용합니다. 아래와 같은 계산식으로 score를 산출합니다.<br>

 $ Q = -10log_{10}^{(e)} $ 

 e는 base call 결과가 틀렸을 확률을 의미합니다.

 ```json
{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [
    {
     "data": {
      "text/plain": [
       "<matplotlib.legend.Legend at 0x1cd7ffecd30>"
      ]
     },
     "execution_count": 1,
     "metadata": {},
     "output_type": "execute_result"
    },
    {
     "data": {
      "image/png": "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2rVrOfvss9lll13Ydddd2WOPPZgzZ06zXVetX77CrONmJUlqdSorK5k6dSozZ86kY8eO/OpXv2r0satXr96sa//xj3/kjTfeYPr06cyYMYPbb7+dHj16bNY5N7cmFVc+wmxVG99xKZIktWof+9jHePHFFwFYs2YNp59+OsOHD+fggw/mg0JT6oADDuCCCy5gzJgx/PSnP2XKlCmMGTOG3XffnUMOOYQ333wTgClTpjBy5Ej23ntvfv7zn9d7vTfffJN+/frRrtD4GjBgAD179gTgnnvu4SMf+QgjR47kwAOzWUEXLlzIkUceyYgRI9hrr72YPn06ABdddBFnnHEGBx98MCeddBLz58/n6KOPZo899mCPPfbgsccea7kvTZslH2HWzqwkSa3e6tWrufvuu9l1110BeOGFFzjrrLOYNWsWPXr0YOLEidX7Llq0iIceeoizzz6br371q/zpT39iypQpnHrqqXznO98B4JRTTuFnP/sZjz/+eIPX/PSnP81dd93FqFGjOPfcc/n3v/8NwPz58zn99NOZOHEi06ZN49ZbbwXg+9//PrvtthvTp0/nBz/4ASeddFL1uaZMmcKdd97JzTffzNe+9jW+/vWv869//YuJEyfyhS98odm/LzWP/EzNBXZmJUnakHPOgalTm/eco0bBVVdtcJcPPviAUaNGAVln9rTTTuONN95ghx12qF6/++6788orr1Qfc9xxxwHw3HPPMXPmTA466CAg6+b269eP9957j0WLFjFmzBgATjzxRO6+++71rj1gwACee+457r//fu6//34OPPBAbr31Vt5//33233//6mmzevXqBcCjjz5aHao//vGPs2DBAt577z0ADj/8cCorKwG49957eeaZZ6qvs3jxYpYsWUK3bt0a+cWpWPIVZu3MSpLU6lSNma2rU6dO1e/bt29fPcwAoEuXLkA2X+vw4cPX674uWrSo0bMFdOrUicMOO4zDDjuMrbfemjvuuIODDjqo3uNTSuutq9qvqibIbix7/PHHq8OtWq98hFnHzEqStHEb6aC2RkOHDmX+/Pk8/vjj7L333qxatYrnn3+e4cOH0717dx599FH2228/JkyYUO/xTz/9NNtssw3bbrsta9euZfr06YwYMYK9996bs846izlz5rDDDjuwcOFCevXqxf7778+ECRP43ve+x4MPPshWW23Flltu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ttmGK6+8coPnu/nmmxk4cCBdunThyCOPZOHChdXbvv3tb/Od73ynSfVJkiSVSj7D7CZ2Zq+77jrGjRtHZWUlAO+88w7jx4/n0ksvZeHChYwePZrjjjuuwePPOussOnbsyFtvvcWECRP40pe+xKxZsxp1ri5dunDqqady+eWXN7nuD3/4w/z9739n0aJFvPHGG3zoQx/iS1/6UvX2iy66iBdeeIFXX32VBx54gJ/85CcNdldnzZrFmWeeyY033shbb71F586d+fKXv1y9fc8992Tx4sVMnjy5yXVKkiQVWz7D7CZ2Zu+++27GjBlT/fm2225j+PDhHHvssVRUVHDRRRcxbdo0nn322fWOXbZsGRMnTuTSSy+la9eu7Lfffhx++OHceOONjTrXnnvuyYknnsjgwYObXPfWW2/NtttuW/25ffv2vPjii9Wfb7jhBr73ve/Rs2dPdt55Z04//XSuu+66es81YcIEPvWpT7H//vvTtWtXLr30Um677TaWLFlSvc8BBxzAX//61ybXKUmSVGz5DLOb2JmdMWMGQ4cOrf48a9YsRo4cWf25S5cu7LjjjtXd1pqef/552rdvz5AhQ6rXjRw5snrfppxrU7z22mv06NGDyspK/vu//5vzzjsPgHfffZc33nij1rVr1lVX3Tp33HFHOnbsyPPPP1+9buedd2batGnNUrckSVJL2qLUBWySTezMLlq0iG7dulV/Xrp0KX369Km1T/fu3Wt1KWvu27179wb3bcq5NsX222/PokWLWLhwIb/5zW8YNmxY9XWrrtWY627s7wDo1q0bixYtapa6JUmSWlJ+O7OrVsGaNU06rGfPnrVCW9euXVm8eHGtfRYvXlwr8DZ236aca3P06tWLk08+mSOOOILVq1fTtWvX6ms15rqNqXPJkiX06NGjWeuWJElqCfkMs4UbuJo61GDEiBG1/jl9+PDhtf45fdmyZbz00ksMHz58vWOHDBnC6tWreeGFF6rXTZs2rXrfppxrc61evZq3336bxYsX07NnT/r161fr2jXrqqtunS+//DIrVqyoNXxi9uzZtYYiSJIktVb5DLMVFdlrE8PsuHHjeOihh6o/H3XUUcycOZOJEyeyfPlyLrnkEkaMGFH9T/g1denShfHjx3PhhReybNkyHnvsMe68805OPPHERp1r7dq1LF++nFWrVpFSYvny5axc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M2zYMO69997qbYcffjgzZ85k+vTpja5PkiSpFBozzGCrlNKiqg+FrmzfFqtoUzRjZ/a6665j3LhxVBYC8jvvvMP48eO59NJLWbhwIaNHj+a4445r8PizzjqLjh078tZbbzFhwgS+9KUvMWvWrOrt++23HzfddBPbbLNNk+paunQpe+yxB1OmTGHhwoWcfPLJ/L//9/9YujSb9nfWrFmceeaZ3Hjjjbz11lt07tyZL3/5yw2e7/jjj2e33XZjwYIFXHbZZRxzzDHMnz+/1vZrrrmmSTVKkiQVXUppgwswBdi+xueBwNMbO645l9133z1t0JtvpgQp/fKXG96vEcaOHZtuvPHG6s+//vWv09577139eenSpamioiLNnj17vWOXLl2aOnTokJ577rnqdZ/73OfSt771rfX27d+/f3rggQc2q9Zu3bqlyZMnp5RSOv/889Pxxx9fve3FF19MHTp0SIsXL17vuOeeey517Nix1rb99tsv/bLG9/foo4+mQYMGbVZ9kiSVI2ByKmJOKvelMZ3Z7wCPRsSNEXEj8DBwfgtl603TjJ3ZGTNmMHTo0OrPs2bNYuTIkdWfu3Tpwo477lir21rl+eefp3379gwZMqR63ciRI+vdd3NNnTqVlStXstNOO9Vb54477kjHjh15/vnn1zt21qxZDB48mG7d1j2duG6dO++8M6+88gqLFy9u9tolSZKaS2MeZ3tPRHwE2Kuw6usppXdatqwmasYxs4sWLaoV8pYuXUqfPn1q7dO9e3eWLFmy3rFLly6le/fujdp3cyxevJgTTzyR73//+9XXa8q1G9p33rx51Z+rvoNFixax5ZZbNmv9kiRJzaXBzmxEDIyI7gCF8LoMOAg4KSI6Fqm+xulYKKcZOrM9e/asFQC7du26Xndy8eLFtQLvpuy7qT744AM+9alPsddee3H++esa5M1dZ9V30KNHj2arXZIkqbltaJjBLRSe9BURo4BbgdeAkcAvWryypojIhho0Q2d2xIgRtf5pfvjw4UybNq3687Jly3jppZcYPnz4escOGTKE1atX88ILL1SvmzZtWr37booVK1Zw5JFH0r9/f37961/X2la3zpdffpkVK1bUGvJQc9+XX365VmivW+fs2bMZNGiQXVlJktSqbSjMVqaU3ii8/xxwbUrpCrIHJuzZ4pU1VWVls3Rmx40bx0MPPVT9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QLt0aakr4rrrrmPcuHFUVlYC8M477zB+/HguvfRSFi5cyOjRoznuuOMaPH7bbbflu9/9LqeeemqTr92lSxdOPfVULr/88nq3H3/88ey2224sWLCAyy67jGOOOYb58+fXu+8111zDHXfcwbRp05g+fTp/+ctf+PWvf129/bOf/SzXX389K1asaHKdkiQpfwyzLWXkSLjlFpg+HT7zGVi9uqTl3H333YwZM6b682233cbw4cM59thjqaio4KKLLmLatGk8++yz9R4/fvx4jjzySHr37t3ka++5556ceOKJDB48eL1tzz//PE8//TQXX3wxlZWVHH300ey6665MnDix3nNdf/31nHvuuQwYMID+/ftz7rnnct1111VvHzBgAD179uSJJ55ocp2SJCl/DLMt6bDD4Oc/z7q0X/saFP45vBRmzJjB0KFDqz/PmjWLkSNHVn/u0qULO+64I7NmzSpqXbNmzWLw4MF069atet3IkSMbrKNu3fXtu/POOzOtlY1XliRJLWOLUhfQ5p15Jrz8MvzkJ7DjjvCNb5SkjEWLFtUKjEuXLqVPnz619unevTtLliwpal1Lly6le/fu69Uxb968Ru3fvXt3li5dSkqJiACgW7duLFq0qMVqliRJrYdhthh++EOYMwf+v/8PBg6Eo48uegk9e/asFVS7du3K4sWLa+2zePHiWoG3GJpaR939Fy9eTNeuXauDLMCSJUvo0aNHi9QrSZJaF4cZFEO7dnD99bDXXvC5z8GTTxa9hBEjRvB8jSeTDR8+vNY/xS9btoyXXnqJ4cOHF7Wu4cOH8/LLL9cK2tOmTWuwjrp117fv7Nmzaw1FkCRJbZdhtlgqK+HOO2HbbbPH3r78clEvP27cOB566KHqz0cddRQzZ85k4sSJLF++nEsuuYQRI0YwbNiweo9fvXo1y5cvZ82aNaxZs4bly5ezusZNbRHBgw8+WO+xa9euZfny5axatYqUEsuXL2flypUADBkyhFGjRnHxxRezfPlybr/9dqZPn87RDXSvTzrpJK688krmzZvHG2+8wRVXXFFrqrB58+axcOFC9tprryZ+Q5IkKZdSSi2yANcCbwMza6zrBUwCXii89mzMuXbffffUZjz3XEq9eqU0dGhKCxYU7bLz589P/fv3T++//371ukmTJqWhQ4emioqKNGbMmDRnzpzqbZdddlk69NBD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\n",
      "text/plain": [
       "<Figure size 720x720 with 1 Axes>"
      ]
     },
     "metadata": {
      "needs_background": "light"
     },
     "output_type": "display_data"
    }
   ],
   "source": [
    "import numpy as np\n",
    "from matplotlib import pyplot as plt\n",
    "\n",
    "x = np.linspace(0.00006, 1)\n",
    "\n",
    "plt.figure(figsize=(10,10))\n",
    "plt.xlim(0, 1)\n",
    "plt.xlabel('Probability of Error')\n",
    "plt.ylabel('Phred Score')\n",
    "plt.ylim(0, 40)\n",
    "plt.plot(x, -10*(np.log10(x)), 'r-', label='Phred Score')\n",
    "\n",
    "for i in [0.00010, 0.001, 0.01, 0.1, 1.0]:\n",
    "    height = -10*(np.log10(i))\n",
    "    plt.text(i+0.1, height, (i, height), ha='center', va='bottom', size=12)\n",
    "plt.legend()"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.8.5"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
```

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
