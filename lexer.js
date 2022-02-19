module.exports = `
start = Tokens 

Tokens = 
    TkOpenPar
    / TkClosePar
    / TkPower
    / TkPlus
    / TkMinus
    / TkNot
    / TkMult
    / TkMod
    / TkMod
    / TkLT
    / TkLE
    / TkGE
    / TkGT
    / TkEQ
    / TkNE
    / TkAnd
    / TkOr
    / TkQuote
    / TkComma
    / TkAssign
    / TkSemicolon
    / TkOpenBracket
    / TkCloseBracket
    / TkOpenBrace
    / TkCloseBrace
    / TkDot
    / TkColon
    / TkInt
    / TkBool
    / TkType
    / TkWhile
    / TkIf
    / TkTrue
    / TkFalse
    / TkNum
    / TkId

TkOpenPar = '(' { return 'TkOpenPar' }
TkClosePar = ')' { return 'TkClosePar' }
TkPower = '^' { return 'TkPower' }
TkPlus = '+' { return 'TkPlus' }
TkMinus = '-' { return 'TkMinus' }
TkNot = '!' { return 'TkNot' }
TkMult = '*' { return 'TkMult' }
TkMod = '%' { return 'TkMod' }
TkMod = '/' { return 'TkMod' }
TkLT = '<' { return 'TkLT' }
TkLE = '<=' { return 'TkLE' }
TkGE = '>=' { return 'TkGE' }
TkGT = '>' { return 'TkGT' }
TkEQ = '=' { return 'TkEQ' }
TkNE = '<>' { return 'TkNE' }
TkAnd = '&&' { return 'TkAnd' }
TkOr = '||' { return 'TkOr' }
TkQuote = '‘' { return 'TkQuote' }
TkComma = ',' { return 'TkComma' }
TkAssign = ':=' { return 'TkAssign' }
TkSemicolon = ';' { return 'TkSemicolon' }
TkOpenBracket = '[' { return 'TkOpenBracket' }
TkCloseBracket = ']' { return 'TkCloseBracket' }
TkOpenBrace = '{' { return 'TkOpenBrace' }
TkCloseBrace = '}' { return 'TkCloseBrace' }
TkDot = '.' { return 'TkDot' }
TkColon = ':' { return 'TkColon' }
TkInt = 'int' { return 'TkInt' }
TkBool = 'bool' { return 'TkBool' }
TkType = 'type' { return 'TkType' }
TkWhile = 'while'i { return 'TkWhile' }
TkIf = 'if'i { return 'TkIf' }
TkTrue = 'true'i { return 'TkTrue' }
TkFalse = 'false'i { return 'TkFalse' }
TkNum "number" = [0-9]+ { return 'TkNum(' + text() + ')' }
TkId "id" = ([$_a-zA-Z]i [$_a-zA-Z0-9]i*) { return 'TkId("' + text() + '")' }
`;