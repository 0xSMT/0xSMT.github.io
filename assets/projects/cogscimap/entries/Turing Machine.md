---
layout: cogsci-card
title: 'Turing Machine'
references:
    - 
---

The Turing Machine is a theoretical model of computation, and the theoretical backbone of the modern day computer. 

As Alan Turing formulated it, Turing Machine acted as a tape reader, a parsing machine. The machine is fed an infinitely long tape (theoretical, recall) and reads discrete cells along the length of the tape. Each cell contains a symbol, and the Turing Machine can make a decision depending on the symbol it reads. It can move forward and backward (one cell at a time) on the tape, read the cell it currently sees, and write new information on the tape. This very general framework allows the Turing Machine to transform a given tape, a list of symbols, into any other list of symbols. Incredibly, this simple blueprint for the machine is capable of computing any function. 

The behavior of the Turing Machine (the actions it takes upon reading a symbol) is an algorithm, and this algorithm is defined as the program provided to the Turing Machine. The machine itself is merely a general apparatus for allowing programs execute.

The computer is the practical, physical equivalent to the Turing Machine theoretical model. The operations of read, write, and scanning on a tape are analogously the operations a computer would do in internal memory. The only distinction (and an important one) is the computer does not have the infinite tape of the Turing Machine. That, and some operations are more expensive than others on a computer -- the Turing Machine has no real concept of speed, other than quantity of operations. 