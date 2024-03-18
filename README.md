# BrainRax

BrainFuck Collection | high-level programming language, minifier, optimizer, emulator, transpiler
on Bun

Created-by @amex2189

- High Level Lang
  - Compiler
    - Parser
  - Easy Syntax
- **Minifiy**
- **Optimization**
- **Emulator**
- **Transpiler**

## Transpiler
Transpile from brainfuck to js

```brainfuck
++++++++++
[
    >+++++++
    >++++++++++
    >+++++++++++
    >+++
    >+++++++++
    >+
    <<<<<<-
]
>++.
>+.
>--..
+++.
>++.
>---.
<<.
+++.
------.
<-.
>>+.
>>.
```

```js
/* Transpiled Code | by @EdamAme-x */a=[],m=new Proxy(a,{get(e,t){return(t in e)?e[t]:e[t]=0}}),p=0,l=console.log,r=prompt,s=String.fromCharCode;m[p]+=10;while(m[p]){p++;m[p]+=7;p++;m[p]+=10;p++;m[p]+=11;p++;m[p]+=3;p++;m[p]+=9;p++;m[p]++;p-=6;m[p]--;}p++;m[p]+=2;l(s(m[p]));p++;m[p]++;l(s(m[p]));p++;m[p]-=2;l(s(m[p]));l(s(m[p]));m[p]+=3;l(s(m[p]));p++;m[p]+=2;l(s(m[p]));p++;m[p]-=3;l(s(m[p]));p-=2;l(s(m[p]));m[p]+=3;l(s(m[p]));m[p]-=6;l(s(m[p]));p--;m[p]--;l(s(m[p]));p+=2;m[p]++;l(s(m[p]));p+=2;l(s(m[p]))
```

## High Level Lang

```asm
# BrainRax
str greet "Hello World"
str exc "!"
str text greet + exc
int flag 1
print text
if flag == 0
  print "flag is 0"
elif flag == 1
  print "flag is 1"
else
  print "flag is " + flag
endif
# and more
```

[https://ja.wikipedia.org/wiki/Brainfuck](https://ja.wikipedia.org/wiki/Brainfuck)
