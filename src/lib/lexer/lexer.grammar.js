module.exports = `
start = Tokens

Tokens = 
    TkLT
    / TkLE
    / TkGE
    / TkGT
    / TkEQ
    / TkNE
    / TkAssign
    / TkYields
    / TkRArrow
    / TkLArrow
    / TkColon
    / TkOpenPar 
    / TkClosePar
    / TkPower
    / TkPlus
    / TkMinus
    / TkNot
    / TkMult
    / TkMod
    / TkAnd
    / TkOr
    / TkQuote
    / TkComma
    / TkSemicolon
    / TkOpenBracket
    / TkCloseBracket
    / TkOpenBrace
    / TkCloseBrace
    / TkDot
    / TkNum
    / TkBool
    / TkType
    / TkWhile
    / TkIf
    / TkTrue
    / TkFalse
    / TkNumber
    / TkId
    
TkOpenPar = '(' { return 'TkOpenPar' }
TkClosePar = ')' { return 'TkClosePar' }
TkPower = '^' { return 'TkPower' }
TkPlus = '+' { return 'TkPlus' }
TkMinus = '-' { return 'TkMinus' }
TkNot = '!' { return 'TkNot' }
TkMult = '*' { return 'TkMult' }
TkMod = '%' { return 'TkMod' }
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
TkYields = '=>' { return 'TkYields' }
TkRArrow = '->' { return 'TkRArrow' }
TkLArrow = '<-' { return 'TkLArrow' }
TkOpenBracket = '[' { return 'TkOpenBracket' }
TkCloseBracket = ']' { return 'TkCloseBracket' }
TkOpenBrace = '{' { return 'TkOpenBrace' }
TkCloseBrace = '}' { return 'TkCloseBrace' }
TkDot = '.' { return 'TkDot' }
TkColon = ':' { return 'TkColon' }
TkNum = 'num' { return 'TkNum' }
TkBool = 'bool' { return 'TkBool' }
TkType = 'type' { return 'TkType' }
TkWhile = 'while'i { return 'TkWhile' }
TkIf = 'if'i { return 'TkIf' }
TkTrue = 'true'i { return 'TkTrue' }
TkFalse = 'false'i { return 'TkFalse' }
TkNumber "number" = [0-9]+ { return 'TkNum(' + text() + ')' }
TkId "id" = ([$_a-zA-Z]i [$_a-zA-Z0-9]i*) { return 'TkId("' + text() + '")' }
`;
