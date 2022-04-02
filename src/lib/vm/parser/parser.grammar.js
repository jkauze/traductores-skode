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
        = i:instruction { return i }
        / f:function { return f }
        / e:generalExpression { return e }

    instruction
        = d:definition { return d }
        / a:assignation { return a }

    definition
        = t:typeDef space* i:id space* 'TkAssign' space* e:arrayExpression space* 'TkSemicolon'* { return { op: ':=', type: 'instruction', operands: [i,e,t] } }

    assignation
        = i:id space* 'TkAssign' space* e:arrayExpression space* 'TkSemicolon'* { return { op: ':=', type: 'instruction', operands: [i, e] } }

    typeDef
        = 'TkOpenBracket' space* t:typeTokens space* 'TkCloseBracket' { return [getTokenValue(t)] }
        / t:typeTokens { return getTokenValue(t) }

    function
        = 'TkId("type")' space* 'TkOpenPar' space* e:generalExpression space* 'TkClosePar' { return { op: 'type', type: 'expression', operands: [e] } }
        / 'TkId("itype")' space* 'TkOpenPar' space* e:generalExpression space* 'TkClosePar' { return { op: 'itype', type: 'expression', operands: [e] } }
        / 'TkId("reset")' space* 'TkOpenPar' space* 'TkClosePar' { return { op: 'reset', type: 'expression' } }
        / 'TkId("uniform")' space* 'TkOpenPar' space* 'TkClosePar' { return { op: 'uniform', type: 'expression' } }
        / 'TkId("floor")' space* 'TkOpenPar' space* e:generalExpression space* 'TkClosePar' { return { op: 'floor', type: 'expression', operands: [e] } }
        / 'TkId("length")' space* 'TkOpenPar' space* e:generalExpression space* 'TkClosePar' { return { op: 'length', type: 'expression', operands: [e] } }
        / 'TkId("sum")' space* 'TkOpenPar' space* e:generalExpression space* 'TkClosePar' { return { op: 'sum', type: 'expression', operands: [e] } }
        / 'TkId("avg")' space* 'TkOpenPar' space* e:generalExpression space* 'TkClosePar' { return { op: 'avg', type: 'expression', operands: [e] } }
        / 'TkId("pi")' space* 'TkOpenPar' space* 'TkClosePar' { return { op: 'reset', type: 'expression' } }
        / 'TkId("now")' space* 'TkOpenPar' space* 'TkClosePar' { return { op: 'reset', type: 'expression' } }
        / 'TkId("if")' space* 'TkOpenPar' space* i:ifArgs space* 'TkClosePar' { return i }

    ifArgs
        = c:alternativeExpression space* 'TkComma' space* t:alternativeExpression space* 'TkComma' space* f:alternativeExpression { return {op: 'if', type:'expresion', operands: [c,t,f] } }

    generalExpression
        = arrayExpression
        / expression

    alternativeExpression
        = expression
        / arrayExpression

    arrayExpression
        = 'TkOpenBracket' space* ('TkComma')? space* 'TkCloseBracket' { return [] }
        / 'TkOpenBracket' space* e:expression space* 'TkCloseBracket' { return [e] }
        / 'TkOpenBracket' space* e:arrayContent space* 'TkCloseBracket' { return e }
        / arrayContent

    arrayContent
        = h:expression t:(arrayItem)* { return t.length > 0 ? [h].concat(t[0]) : h }
        / expression

    arrayItem
        = space* 'TkComma' space* e:arrayExpression { return e }

    expression
        =  or / primary

    or
        = l:(and space* 'TkOr' space*)* r:and { return leftAssoc(l, r) }

    and
        = l:(comparison space* 'TkAnd' space*)* r:comparison { return leftAssoc(l, r) }

    comparison
        = l:relational space* op:comparisonTokens space* r:comparison { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / relational

    relational
        = l:aditive space* op:relationalTokens space* r:relational { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / aditive

    aditive
        = l:(multiplicative space* aditiveTokens space*)* r:multiplicative { return leftAssoc(l, r) }

    multiplicative
        = l:(power space* multiplicativeTokens space*)* r:power { return leftAssoc(l, r) }

    power
        = l:unary space* op:('TkPower') space* r:power { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / unary

    unary
        = op:(aditiveTokens/'TkNot') space* v:primary { return { op: getTokenValue(op), type: 'expression', operands: [v] } }
        / primary

    primary
        = 'TkQuote' space* e:expression space* 'TkQuote' { return { op:'quote', type: 'expression', operands:[e] } }
        / 'TkOpenPar' space* e:expression space* 'TkClosePar' { return e }
        / 'TkOpenBracket' space* e:expression space* 'TkCloseBracket' { return e }
        / 'TkOpenBrace' space* e:expression space* 'TkCloseBrace' { return e }
        / value
    
    value
        = number / reserved / id

    number 
        = 'TkDot' space* d:numberArgs { return parseFloat('.' + d) }
        / i:numberArgs space* 'TkDot' space* d:numberArgs { return parseFloat(i + '.' + d) }
        / n:numberArgs space* 'TkDot' { return n }
        / n:numberArgs { return n }

    numberArgs
        = 'TkNumber(' c:numberContent ')' { return parseInt(c.join('')) }

    numberContent
        = c:[0-9]+ { return c }

    reserved
        = 'TkTrue' { return true }
        / 'TkFalse' { return false }

    id
        = 'TkId("' c:content '")' { return c.join('') }

    content
        = c:[a-zA-Z0-9_]+ { return c }

    space = ' ' / '\\t' / '\\n'

    typeTokens
        = 'TkNum'
        / 'TkBool'

    aditiveTokens
        = 'TkPlus'
        / 'TkMinus'

    multiplicativeTokens
        = 'TkMult'
        / 'TkDiv'
        / 'TkMod'

    comparisonTokens
        = 'TkEQ'
        / 'TkNE'

    relationalTokens
        = 'TkLT'
        / 'TkLE'
        / 'TkGT'
        / 'TkGE'

    capsuleTokens
        = 'TkOpenPar'
        / 'TkClosePar'
        / 'TkOpenBrace'
        / 'TkCloseBrace'
        / 'TkOpenBracket'
        / 'TkCloseBracket'
`