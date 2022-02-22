module.exports = 
`
    start = 
        Primary
            / Char
                TkNumber
                / TkId
                / Extra
                    / TkLComment
                    / TkOpenBComment
                    / TkCloseBComment
                / Reserved
                    / TkNum
                    / TkBool
                    / TkTrue
                    / TkFalse
                    / TkType
                    / TkIf
                    / TkElse
                    / TkSwitch
                    / TkCase
                    / TkDefault
                    / TkWhile
                    / TkFor
                    / TkBreak
                    / TkContinue
                    / TkTry
                    / TkCatch
                / Operator
                    / TkOpenPar
                    / TkClosePar
                    / TkOpenBracket
                    / TkCloseBracket
                    / TkOpenBrace
                    / TkCloseBrace
                    / TkNot
                    / TkPower
                    / TkMult
                    / TkDiv
                    / TkMod
                    / TkPlus
                    / TkMinus
                    / TkLE
                    / TkLT
                    / TkGE
                    / TkGT
                    / TkEQ
                    / TkNE
                    / TkAnd
                    / TkOr
                    / TkQuote
                    / TkDoubleQuote
                    / TkComma
                    / TkAssign
                    / TkSemicolon
                    / TkColon
                    / TkYields
                    / TkRArrow
                    / TkLArrow
                    / TkDot

    Primary = 
        l:Char r:Char+ { return l+","+r }

        Char =
            TkNumber
            / TkId
            / Extra
            / Reserved
            / Operator

            TkNumber "number" = [0-9]+ { return 'TkNumber(' + text() + ')' }

            TkId "id" = ([$_a-zA-Z]i [$_a-zA-Z0-9]i*) { return 'TkId("' + text() + '")' }

            Extra = 
                TkLComment
                / TkOpenBComment
                / TkCloseBComment

                TkLComment = '//' { return 'TkLComment' }
                TkOpenBComment = '/*' { return 'TkOpenBComment' }
                TkCloseBComment = '*/' { return 'TkCloseBComment' }

            Reserved = 
                TkNum
                / TkBool
                / TkTrue
                / TkFalse
                / TkType
                / TkIf
                / TkElse
                / TkSwitch
                / TkCase
                / TkDefault
                / TkWhile
                / TkFor
                / TkBreak
                / TkContinue
                / TkTry
                / TkCatch

                TkNum = 'num' { return 'TkNum' }
                TkBool = 'bool' { return 'TkBool' }
                TkTrue = 'true' { return 'TkTrue' }
                TkFalse = 'false' { return 'TkFalse' }
                TkType = 'type' { return 'TkType' }
                TkIf = 'if' { return 'TkIf' }
                TkElse = 'else' { return 'TkElse' }
                TkSwitch = 'switch' { return 'TkSwitch' }
                TkCase = 'case' { return 'TkCase' }
                TkDefault = 'default' { return 'TkDefault' }
                TkWhile = 'while' { return 'TkWhile' }
                TkFor = 'for' { return 'TkFor' }
                TkBreak = 'break' { return 'TkBreak' }
                TkContinue = 'continue' { return 'TkContinue' }
                TkTry = 'try' { return 'TkTry' }
                TkCatch = 'catch' { return 'TkCatch' }

            Operator = 
                TkOpenPar
                / TkClosePar
                / TkOpenBracket
                / TkCloseBracket
                / TkOpenBrace
                / TkCloseBrace
                / TkNot
                / TkPower
                / TkMult
                / TkDiv
                / TkMod
                / TkPlus
                / TkMinus
                / TkLE
                / TkLT
                / TkGE
                / TkGT
                / TkEQ
                / TkNE
                / TkAnd
                / TkOr
                / TkQuote
                / TkDoubleQuote
                / TkComma
                / TkAssign
                / TkSemicolon
                / TkColon
                / TkYields
                / TkRArrow
                / TkLArrow
                / TkDot

                TkOpenPar = '(' { return 'TkOpenPar' }
                TkClosePar = ')' { return 'TkClosePar' }
                TkOpenBracket = '[' { return 'TkOpenBracket' }
                TkCloseBracket = ']' { return 'TkCloseBracket' }
                TkOpenBrace = '{' { return 'TkOpenBrace'}
                TkCloseBrace = '}' { return 'TkCloseBrace'}
                TkNot = '!' { return 'TkNot' }
                TkPower = '^' { return 'TkPower' }
                TkMult = '*' { return 'TkMult' }
                TkDiv = '/' { return 'TkDiv' }
                TkMod = '%' { return 'TkMod' }
                TkPlus = '+' { return 'TkPlus' }
                TkMinus = '-' { return 'TkMinus' }
                TkLE = '<=' { return 'TkLE' }
                TkLT = '<' { return 'TkLT' }
                TkGE = '>=' { return 'TkGE' }
                TkGT = '>' { return 'TkGT' }
                TkEQ = '=' { return 'TkEQ' }
                TkNE = '<>' { return 'TkNE' }
                TkAnd = '&&' { return 'TkAnd' }
                TkOr = '||' { return 'TkOr' }
                TkQuote = '‘' { return 'TkQuote' }
                TkDoubleQuote = '"' { return 'TkDoubleQuote' }
                TkComma = ',' { return 'TkComma' }
                TkAssign = ':=' { return 'TkAssign' }
                TkSemicolon = ';' { return 'TkSemicolon' }
                TkColon = ':' { return 'TkColon' }
                TkYields = '=>' { return 'TkYields' }
                TkRArrow = '->' { return 'TkRArrow' }
                TkLArrow = '<-' { return 'TkLArrow' }
                TkDot = '.' { return 'TkDot' }
`;