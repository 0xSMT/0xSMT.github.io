---
layout: cogsci-card
title: 'Denotational Semantics'
references:
    - 
---

Denotational semantics is an approach to evaluating the semantics of a programming language. In this strategy, syntactic structures are given function templates in the lambda calculus, and the semantic meaning of a program reduces to an elaborate term in the lambda calculus.

A program is ultimately about mutating state, and the final lambda calculus expression will transform this state into the final output of the algorithm.

Denotational semantics is useful for proving programs are equivalent, and proving what a program will do.

Representing the semantics of the program in this way also serves as an intermediate language for compilation purposes. If a programming language can be provided denotation semantics, translation between language is made easier as well. 