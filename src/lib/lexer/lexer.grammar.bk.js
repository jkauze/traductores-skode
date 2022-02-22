module.exports = `
start = Tokens

Tokens = 
    adition
    / multiplication
    / difference
    / division
    / module
    / primary
    / TkLT
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
    / TkNum
    / TkId

    
adition = l:multiplication o:TkPlus r:adition { return l+", "+o+", "+r }

multiplication = 
    l:difference o:TkMult { return l+", "+o }
    / l:difference o:TkMult r:multiplication { return l+", "+o+", "+r }
    / o:TkMult r:multiplication { return o+", "+r }

difference = l:division o:TkMinus r:difference { return l+", "+o+", "+r }
division = l:module o:TkDiv r:division { return l+", "+o+", "+r }
module = l:primary o:TkMod r:module { return l+", "+o+", "+r }

primary = 
    TkNumber
    / "(" e:adition ")" { return e; }
    / "{" e:adition "}" { return e; }
    / "[" e:adition "]" { return e; }

TkOpenPar = '(' { return 'TkOpenPar' }
TkClosePar = ')' { return 'TkClosePar' }
TkPower = '^' { return 'TkPower' }
TkPlus = '+' { return 'TkPlus' }
TkMinus = '-' { return 'TkMinus' }
TkNot = '!' { return 'TkNot' }
TkMult = '*' { return 'TkMult' }
TkDiv = '/' { return 'TkDiv' }
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
TkNumber "number" = [0-9]+ { return 'TkNumber(' + text() + ')' }
TkId "id" = ([$_a-zA-Z]i [$_a-zA-Z0-9]i*) { return 'TkId("' + text() + '")' }
`;
