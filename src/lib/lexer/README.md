# lexer

This lexer was implemented using [`peggy`](https://www.npmjs.com/package/peggy). Our grammar can be found [`here`](./lexer.grammar.js)

## Usage

### Code
```js
const { parser } = require('./index');

// examples of usage
const case1 = parser(`1+2+3`);
console.log(case1);

try {
    parser(`1+@`);
} catch (error) {
    console.log(`Error invalidChar: ${error.found}`);
}

const case2 = parser(`2;3abr03`);
console.log(`case2: ${case2}`);
```

### Output

```
Case 1: TkNumber(1),TkPlus,TkNumber(2),TkPlus,TkNumber(3)
Error invalidChar: @
Case 2: TkNumber(2),TkSemicolon,TkNumber(3),TkId("abr03")
```
