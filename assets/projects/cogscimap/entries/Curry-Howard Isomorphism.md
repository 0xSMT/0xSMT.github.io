---
layout: cogsci-card
title: 'Curry-Howard Isomorphism'
references:
    - 
---

The Curry-Howard isomorphism is a complicated name for an incredibly useful idea: proofs as programs. In essence, the insight in Curry-Howard is that logical proofs and computation (computer programs) are one and the same. More specifically, intuitionistic logic (constructive logic) yields a computer program to solve that problem easily. There is an isomorphic relationship (one-to-one mapping) between a constructive proof (which are proof that create an example rather than prove existence) and a program.

This theorem is particularly handy in syntactic parses. Syntax itself can be viewed as a proof. Rules of syntax are textured as rules of logic. So a sentence is syntactically valid is a logically sound proof. A sentence is not syntactically valid if a proof cannot be derived. What Curry-Howard reveals is that a correct syntactic parse in this case has a semantic interpretation, where each rule used in the proof derivation has an associated semantic rule or instruction. Therefore, the proof (or syntactic parse) automatically yields a semantic interpretation of the sentence. This si the basis of Type-Logical Grammars in linguistics, where the semantic meaning of a sentence is a result of the semantic meaning of the lexemes (words) along with the syntactic structure of the sentence. The syntax shows how each word relates to each other.
