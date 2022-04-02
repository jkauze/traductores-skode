'use strict';

const helpMessage = `
.reset          Clear error logs
.failed         Show error logs
.help           Print this help message
.load <file>    Load a <file> and execute each line
.lex <input>    Invoke lexer to analyze lexicographically the <input>
.ast <input>    Invoke parser to create ast of the <input> and print in a string
.env            Print all defined variables in mem
.               Exit the REPL

`
const help = () => (
  console.log(helpMessage)
)

module.exports = help
