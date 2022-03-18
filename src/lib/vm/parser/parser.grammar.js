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
        }
    }}

    start
        = i:instruction { return i }
        / e:arrayExpresion { return e }

    instruction
        = d:definition { return d }
        / a:assignation { return a }

    definition
        = t:typeDef space* i:id space* 'TkAssign' space* e:arrayExpresion { return { op: ':=', type: 'instruction', operands: [i,e,t] } }

    assignation
        = i:id space* 'TkAssign' space* e:arrayExpresion { return { op: ':=', type: 'instruction', operands: [i, e] } }

    typeDef
        = 'TkOpenBracket' space* t:typeTokens space* 'TkCloseBracket' { return [getTokenValue(t)] }
        / t:typeTokens { return getTokenValue(t) }

    arrayExpresion
        = 'TkOpenBracket' space* ('TkComma')? space* 'TkCloseBracket' { return [] }
        / 'TkOpenBracket' space* e:expression space* 'TkCloseBracket' { return [e] }
        / 'TkOpenBracket' space* e:arrayContent space* 'TkCloseBracket' { return e }
        / arrayContent

    arrayContent
        = h:expression t:(arrayItem)* { return t.length > 0 ? [h].concat(t[0]) : h }
        / expression

    arrayItem
        = space* 'TkComma' space* e:arrayExpresion { return e }

    expression
        = string / aditive / primary

    string
        = 'TkQuote' space* ls:stringTransform space* rs:stringExpresion space* 'TkQuote' { return ls + rs }
        / 'TkQuote' space* ls:stringTransform space* 'TkQuote' { return ls }

    stringExpresion
        = ls:stringTransform space* rs:stringExpresion { return ls + rs }
        / ls:stringTransform { return ls }   

    stringTransform
        = n:number { return n.toString() }
        / i:id { return i }
        / c:content { return getTokenValue(c) }

    aditive
        = l:multiplicative space* op:aditiveTokens space* r:aditive { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / multiplicative

    multiplicative
        = l:relational space* op:multiplicativeTokens space* r:multiplicative { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / relational

    relational
        = l:boolean space* op:relationalTokens space* r:relational { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / boolean

    boolean
        = l:unary space* op:booleanTokens space* r:boolean { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / unary

    unary
        = op:(aditiveTokens/'TkNot') space* v:primary { return { op: getTokenValue(op), type: 'expression', operands: [v] } }
        / primary

    primary
        = 'TkOpenPar' space* e:expression space* 'TkClosePar' { return e }
        / 'TkOpenBracket' space* e:expression space* 'TkCloseBracket' { return e }
        / 'TkOpenBrace' space* e:expression space* 'TkCloseBrace' { return e }
        / value
    
    value
        = number / id

    number 
        = 'TkNumber(' c:numberContent ')' { return parseFloat(c.join('')) }

    numberContent
        = c:[0-9]+ { return c }

    id
        = 'TkId("' c:content'")' { return c.join('') }

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
        / 'TkPower'

    relationalTokens
        = 'TkEQ'
        / 'TkNE'
        / 'TkLT'
        / 'TkLE'
        / 'TkGT'
        / 'TkGE'

    booleanTokens
        = 'TkAnd'
        / 'TkOr'
`