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
    }}

    start
        = i:Instruccion { return i }
        / f:FunctionExpression { return f }
        / e:BinaryExpression { return e }
    

    Instruccion
        = d:Definition { return d }
        / a:Assignation { return a }

    Definition
        = t:DefinitionType __ i:Id __ 'TkAssign' __ e:BinaryExpression __ 'TkSemicolon'* { return { op: ':=', type: 'instruction', operands: [i,e,t] } }

    Assignation
        = i:Id __ 'TkAssign' __ e:BinaryExpression __ 'TkSemicolon'* { return { op: ':=', type: 'instruction', operands: [i, e] } }

    DefinitionType
        = 'TkOpenBracket' __ t:ReserverdTypes __ 'TkCloseBracket' { return [getTokenValue(t)] }
        / t:ReserverdTypes { return getTokenValue(t) }

    ReserverdTypes
        = 'TkNum'
        / 'TkBool'


    FunctionExpression
        = 'TkId("type")' __ 'TkOpenPar' __ e:BinaryExpression __ 'TkClosePar' { return { op: 'type', type: 'expression', operands: [e] } }
        / 'TkId("ltype")' __ 'TkOpenPar' __ e:BinaryExpression __ 'TkClosePar' { return { op: 'ltype', type: 'expression', operands: [e] } }
        / 'TkId("reset")' __ 'TkOpenPar' __ 'TkClosePar' { return { op: 'reset', type: 'expression' } }
        / 'TkId("uniform")' __ 'TkOpenPar' __ 'TkClosePar' { return { op: 'uniform', type: 'expression' } }
        / 'TkId("floor")' __ 'TkOpenPar' __ e:BinaryExpression __ 'TkClosePar' { return { op: 'floor', type: 'expression', operands: [e] } }
        / 'TkId("length")' __ 'TkOpenPar' __ e:BinaryExpression __ 'TkClosePar' { return { op: 'length', type: 'expression', operands: [e] } }
        / 'TkId("sum")' __ 'TkOpenPar' __ e:BinaryExpression __ 'TkClosePar' { return { op: 'sum', type: 'expression', operands: [e] } }
        / 'TkId("avg")' __ 'TkOpenPar' __ e:BinaryExpression __ 'TkClosePar' { return { op: 'avg', type: 'expression', operands: [e] } }
        / 'TkId("pi")' __ 'TkOpenPar' __ 'TkClosePar' { return { op: 'pi', type: 'expression' } }
        / 'TkId("now")' __ 'TkOpenPar' __ 'TkClosePar' { return { op: 'now', type: 'expression' } }
        / 'TkId("if")' __ 'TkOpenPar' __ i:IfFunctionArguments __ 'TkClosePar' { return i }

    IfFunctionArguments
        = c:BinaryExpression __ 'TkComma' __ t:BinaryExpression __ 'TkComma' __ f:BinaryExpression { return {op: 'if', type:'expresion', operands: [c,t,f] } }


    PrimaryExpression
        = IdLiteral
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
        = c:[0-9]+ { return c }

    
    ArrayExpression
        = EmptyArrayExpression
        / 'TkOpenBracket' __ e:ArrayElements __ 'TkCloseBracket' __ a:(SingleArrayExpression) { return { op: 'index', type: 'expression', operands:[e,a] } }
        / 'TkOpenBracket' __ e:ArrayElements __ 'TkCloseBracket' { return e }

    SingleArrayExpression
        = 'TkOpenBracket' __ e:BinaryExpression __ 'TkCloseBracket' { return e }

    EmptyArrayExpression
        = 'TkOpenBracket' __ ('TkComma')? __ 'TkCloseBracket' { return [] }

    ArrayElements
        = p:BinaryExpression e:(ArrayElement)* { return e.length > 0 ? [p].concat(e[0]) : [p] }

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
        = 'TkQuote' __ e:BinaryExpression __ 'TkQuote' { return { op:'quote', type: 'expression', operands:[e] } }
        / 'TkOpenPar' __ e:BinaryExpression __ 'TkClosePar' { return e }
        / 'TkOpenBrace' __ e:BinaryExpression __ 'TkCloseBrace' { return e }

   
    __ = (' ' / '\\t' / '\\n')*
`