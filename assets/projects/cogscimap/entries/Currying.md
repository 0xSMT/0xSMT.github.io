---
layout: cogsci-card
title: 'Currying'
references:
    - 
---

Currying is an important technique in functional programming and the lambda calculus generally, where a function of multiple variables can be reduced to a function of one variable. Rather than passing in several variables to function, you pass in one at a time, and he function returns a function that takes the next variable. So in the case of a function requiring two variables, passing in the first variable to a curried function would yield a new function, and passing in the next variable to this new function yields the final result.

Currying proves that functions do not need to have multiple arguments, and can instead be represented as a chain of several one-argument functions nested together. Currying is an essential rule in keeping the lambda calculus compact.

The idea is say you have a function of two variables, such as `f(x,y) -> x*(y+2)`. What currying says is this function could be expressed instead as follows:

`f(x) -> g(y) -> x*(y+2)`

So suppose you waned to compute this function. With currying, you would first call `f(3)`, which yields a new function as a result, called `g`. Calling this function as `g(2)` would yield `12` as the final result. But what if you called `g(4)` instead, after having called `f(3)`? The final result would instead be `18`. Currying allows the partial evaluation of functions -- a practical benefit to the impressive theoretical result. Partial evaluation is often used as an abstraction tool in functional programming languages. Rather than having two functions that are nearly identical other than small differences, have one function which yields the common behavior of the two function, and use as an argument to the first function a variable chich allows the functions to be differentiated. 