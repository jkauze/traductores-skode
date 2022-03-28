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
    }}

    start
        = i:instruction { return i }
        / e:arrayExpresion { return e }

    instruction
        = d:definition { return d }
        / a:assignation { return a }

    definition
        = t:typeDef space* i:id space* 'TkAssign' space* e:arrayExpresion space* 'TkSemicolon'* { return { op: ':=', type: 'instruction', operands: [i,e,t] } }

    assignation
        = i:id space* 'TkAssign' space* e:arrayExpresion space* 'TkSemicolon'* { return { op: ':=', type: 'instruction', operands: [i, e] } }

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
        =  or / primary

    or
        = l:and space* op:('TkOr') space* r:or { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / and

    and
        = l:comparison space* op:('TkAnd') space* r:and { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / comparison

    comparison
        = l:relational space* op:comparisonTokens space* r:comparison { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / relational

    relational
        = l:aditive space* op:relationalTokens space* r:relational { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / aditive

    aditive
        = l:multiplicative space* op:aditiveTokens space* r:aditive { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / multiplicative

    multiplicative
        = l:power space* op:multiplicativeTokens space* r:multiplicative { return { op: getTokenValue(op), type: 'expression', operands: [l, r] } }
        / power

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