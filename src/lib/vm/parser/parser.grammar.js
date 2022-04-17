module.exports = 
`
    {{
        function getTokenValue(token) {
            if (token === 'TkNum') return 'Num'
            else if (token === 'TkBool') return 'Boolean'
            else if (token === 'TkPlus') return '+'
            else if (token === 'TkMinus') return '-'
            else if (token === 'TkMult') return '*'
            else if (token === 'TkDiv') return '/'
            else if (token === 'TkMod') return '%'
            else if (token === 'TkPower') return '^'
            else if (token === 'TkEQ') return '='
            else if (token === 'TkNE') return '<>'
            else if (token === 'TkLT') return '<'
            else if (token === 'TkLE') return '<='
            else if (token === 'TkGT') return '>'
            else if (token === 'TkGE') return '>='
            else if (token === 'TkAnd') return '&&'
            else if (token === 'TkOr') return '||'
            else if (token === 'TkNot') return '!'
            else if (token === 'TkOpenPar') return '('
            else if (token === 'TkClosePar') return ')'
            else if (token === 'TkOpenBrace') return '{'
            else if (token === 'TkCloseBrace') return '}'
            else if (token === 'TkOpenBracket') return '['
            else if (token === 'TkCloseBracket') return ']'
        }

        function getLast(left) {
            const last = left.pop()
            const formatedLast = last.filter( v => { return v[0] !== ' ' } )
            return formatedLast
        }

        function leftAssoc(left, val) {
            if (!left.length) return val
            const last = getLast(left)
            return { op: getTokenValue(last[1]), type: 'expression', operands: [leftAssoc(left, last[0]), val] }
        }

        const mapperFunction = {
            if:true, type:true, ltype:true, reset:true, uniform:true, floor:true, 
            length:true, sum:true, avg:true, pi:true, now:true, ln:true, exp:true, 
            sin:true, cos:true, formula:true, tick:true, array:true
        }
        
        function isReserverdId(id) { return mapperFunction[id] || false }
    }}

    start
        = i:Instruction { return i }
        / e:GeneralExpression { return e }
    

    Instruction
        = d:Definition { return d }
        / a:Assignation { return a }

    Definition
        = t:DefinitionType __ i:IdLiteral __ 'TkAssign' __ e:GeneralExpression __ 'TkSemicolon'* { return { op: ':=', type: 'instruction', operands: [i,e,t] } }

    Assignation
        = i:IdLiteral __ 'TkAssign' __ e:GeneralExpression __ 'TkSemicolon'* { return { op: ':=', type: 'instruction', operands: [i, e] } }

    DefinitionType
        = 'TkOpenBracket' __ t:ReserverdTypes __ 'TkCloseBracket' { return [getTokenValue(t)] }
        / t:ReserverdTypes { return getTokenValue(t) }

    ReserverdTypes
        = 'TkNum'
        / 'TkBool'


    GeneralExpression
        = FunctionExpression
        / BinaryExpression


    FunctionExpression
        = i:Id __ 'TkOpenPar' __ e:(ArrayElements)* __ 'TkClosePar' {
            if (isReserverdId(i)) return e[0] ? { op: i, type: 'expression', operands: e[0] } : { op: i, type: 'expression' }
            else return e[0] ? { op: "function", type: 'error', operands: [i, e[0]] } : { op: "function", type: 'error', operands: [i, e] }
        }


    PrimaryExpression
        = FunctionExpression
        / IdLiteral
        / ReservedLiteral
        / NumberLiteral
        / ArrayExpression
        / BlockExpression
    

    IdLiteral
        = i:Id __ a:(EmptyArrayExpression / SingleArrayExpression) { return { op: 'index', type: 'expression', operands:[i,a] } }
        / Id
    
    Id
        = 'TkId("' c:TkIdArgument '")' { return c.join('') }

    TkIdArgument
        = c:[a-zA-Z0-9_]+ { return c }


    ReservedLiteral
        = 'TkTrue' { return true }
        / 'TkFalse' { return false }


    NumberLiteral 
        = 'TkDot' __ d:Digit { return parseFloat('.' + d) }
        / i:Digit __ 'TkDot' __ d:Digit { return parseFloat(i + '.' + d) }
        / n:Digit __ 'TkDot' { return n }
        / n:Digit { return n }

    Digit
        = 'TkNumber(' c:TkNumArgument ')' { return parseInt(c.join('')) }

    TkNumArgument
        = c:[0-9]+ { return c}

    
    ArrayExpression
        = EmptyArrayExpression
        / 'TkOpenBracket' __ e:ArrayElements __ 'TkCloseBracket' __ a:(SingleArrayExpression) { return { op: 'index', type: 'expression', operands:[e,a] } }
        / 'TkOpenBracket' __ e:ArrayElements __ 'TkCloseBracket' { return e }

    SingleArrayExpression
        = 'TkOpenBracket' __ e:GeneralExpression __ 'TkCloseBracket' { return e }

    EmptyArrayExpression
        = 'TkOpenBracket' __ ('TkComma')? __ 'TkCloseBracket' { return [] }

    ArrayElements
        = p:GeneralExpression e:(ArrayElement)* { return e.length > 0 ? [p].concat(e[0]) : [p] }

    ArrayElement
        = __ 'TkComma' __ e:ArrayElements { return e }


    BinaryExpression
        = LogicalOrExpression

    LogicalOrExpression
        = l:(LogicalAndExpression __ 'TkOr' __)* r:LogicalAndExpression { return leftAssoc(l, r) }

    LogicalAndExpression
        = l:(ComparisonExpression __ 'TkAnd' __)* r:ComparisonExpression { return leftAssoc(l, r) }

    ComparisonExpression
        = l:RelationalExpression __ op:ComparisonOperator __ r:ComparisonExpression { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / RelationalExpression

    ComparisonOperator
        = 'TkEQ'
        / 'TkNE'

    RelationalExpression
        = l:AditiveExpression __ op:RelationalOperator __ r:RelationalExpression { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / AditiveExpression

    RelationalOperator
        = 'TkLT'
        / 'TkLE'
        / 'TkGT'
        / 'TkGE'

    AditiveExpression
        = l:(MultiplicativeExpression __ AditiveOperator __)* r:MultiplicativeExpression { return leftAssoc(l, r) }

    AditiveOperator
        = 'TkPlus'
        / 'TkMinus'

    MultiplicativeExpression
        = l:(PowerExpression __ MultiplicativeOperator __)* r:PowerExpression { return leftAssoc(l, r) }

    MultiplicativeOperator
        = 'TkMult'
        / 'TkDiv'
        / 'TkMod'

    PowerExpression
        = l:UnaryExpression __ op:('TkPower') __ r:PowerExpression { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / UnaryExpression

    UnaryExpression
        = op:UnaryOperator __ e:PrimaryExpression { return { op: getTokenValue(op), type: 'expression', operands: [e] } }
        / PrimaryExpression

    UnaryOperator
        = 'TkPlus'
        / 'TkMinus'
        / 'TkNot'

    BlockExpression
        = 'TkQuote' __ e:GeneralExpression __ 'TkQuote' { return { op:'quote', type: 'expression', operands:[e] } }
        / 'TkOpenPar' __ e:GeneralExpression __ 'TkClosePar' { return e }
        / 'TkOpenBrace' __ e:GeneralExpression __ 'TkCloseBrace' { return e }

   
    __ = (' ' / '\\t' / '\\n')*
`