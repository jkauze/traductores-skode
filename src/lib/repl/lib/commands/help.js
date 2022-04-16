'use strict';

const helpMessage = `
.reset                        Clear error logs
.failed                       Show error logs
.help                         Print this help message
.load <file>                  Load a <file> and execute each line
.lex <input>                  Invoke lexer to analyze lexicographically the <input>
.ast <input>                  Invoke parser to create ast of the <input> and print in a string
.env                          Print all defined variables in mem
sum([<exp>])                  Sum all <exp> array items. Return a number
avg([<exp>])                  Return average of all <exp> array items. Return a number
length([<exp>])               Return the length of the array. Return a number
type(<exp>)                   Return the type (number or boolean) of the <exp>, also works with arrays. Return a string
ltype(<exp>)                  Return the type (number or boolean) of the <exp> if the exp is assignable. Return a string
pi()                          Return a pi aproximated. Return a number
now()                         Return a date in ms from statict checkpoint. Return a number
uniform()                     Return a random number between 0 and 1. Return a number
if(<exp>, <expT>, <expF>)     Return a <expT> if <exp> is true, else return <expF>
.                             Exit the REPL
`
const help = () => (
  console.log(helpMessage)
)

module.exports = help
