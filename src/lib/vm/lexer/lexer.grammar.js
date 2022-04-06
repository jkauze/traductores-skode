module.exports = 
`
    start = 
        Primary
            / Char
                / TkNumber
                / TkId
                / Reserved
                    / TkNum
                    / TkBool
                    / TkTrue
                    / TkFalse
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
                    / TkNE
                    / TkLE
                    / TkLT
                    / TkGE
                    / TkGT
                    / TkEQ
                    / TkAnd
                    / TkOr
                    / TkQuote
                    / TkDoubleQuote
                    / TkComma
                    / TkAssign
                    / TkSemicolon
                    / TkColon
                    / TkDot

    Primary = 
        l:Char r:Char+ { return l+","+r }

        Char =
            TkNumber
            / TkId
            / Reserved
            / Operator

            TkNumber "number" = (Reserved)?[0-9]+ { return 'TkNumber(' + text() + ')' }

            TkId "id" = (Reserved)?([_a-zA-Z]i [_a-zA-Z0-9]i*) { return 'TkId("' + text() + '")' }

            Reserved = 
                TkNum
                / TkBool
                / TkTrue
                / TkFalse

                TkNum = 'num' { return 'TkNum' }
                TkBool = 'bool' { return 'TkBool' }
                TkTrue = 'true' { return 'TkTrue' }
                TkFalse = 'false' { return 'TkFalse' }

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
                / TkNE
                / TkLE
                / TkLT
                / TkGE
                / TkGT
                / TkEQ
                / TkAnd
                / TkOr
                / TkQuote
                / TkDoubleQuote
                / TkComma
                / TkAssign
                / TkSemicolon
                / TkColon
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
                TkNE = '<>' { return 'TkNE' }
                TkLE = '<=' { return 'TkLE' }
                TkLT = '<' { return 'TkLT' }
                TkGE = '>=' { return 'TkGE' }
                TkGT = '>' { return 'TkGT' }
                TkEQ = '=' { return 'TkEQ' }
                TkAnd = '&&' { return 'TkAnd' }
                TkOr = '||' { return 'TkOr' }
                TkQuote = "'" { return 'TkQuote' }
                TkDoubleQuote = '"' { return 'TkDoubleQuote' }
                TkComma = ',' { return 'TkComma' }
                TkAssign = ':=' { return 'TkAssign' }
                TkSemicolon = ';' { return 'TkSemicolon' }
                TkColon = ':' { return 'TkColon' }
                TkDot = '.' { return 'TkDot' }
`;