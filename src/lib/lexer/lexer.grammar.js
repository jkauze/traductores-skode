module.exports = 
`
    start = 
        primary
            / char
                / TkNumber
                / op
                    / TkPlus
                    / TkMult
                / par
                    / TkOpenPar
                    / TkClosePar
                / bracket
                    / TkOpenBracket
                    / TkCloseBracket

    primary = 
        l:char r:char+ { return l+","+r }

        char = TkNumber / op / par / bracket

            TkNumber "number" = [0-9]+ { return 'TkNumber(' + text() + ')' }

            op = TkPlus / TkMult
                TkPlus = '+' { return 'TkPlus' }
                TkMult = '*' { return 'TkMult' }

            par = TkOpenPar / TkClosePar
                TkOpenPar = '(' { return 'TkOpenPar' }
                TkClosePar = ')' { return 'TkClosePar' }
        
            bracket = TkOpenBracket / TkCloseBracket
                TkOpenBracket = '[' { return 'TkOpenBracket' }
                TkCloseBracket = ']' { return 'TkCloseBracket' }
`;
