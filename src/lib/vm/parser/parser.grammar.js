module.exports = 
`
    start
        = i:instruction { return i; }
        / e:expresion { return e; }

    instruction
        = d:definition { return d; }
        / a:assignation { return a; }

    definition
        = t:typeDef space* i:identifier space* 'TkAssign' space* e:arrayExpresion { return { op: ':=', type: 'instruction', operands: [i,e,t] } }

    assignation
        = i:identifier space* 'TkAssign' space* e:arrayExpresion { return { op: ':=', type: 'instruction', operands: [i, e] } }

    typeDef
        = 'TkOpenBracket' space* n:normalType space* 'TkCloseBracket' { return [n]; }
        / normalType
    
    normalType
        = 'TkNum' { return 'Num'; }
        / 'TkBool' { return 'Boolean'; }
        / t:[a-zA-Z()]+ { return t.join(''); } // fallback rule delete after test
    
    identifier
        = i:id { return i; }

    arrayExpresion
        = 'TkOpenBracket' space* e:arrayContentExpresion space* 'TkCloseBracket' { return e; }
        / arrayContentExpresion

    arrayContentExpresion
        = h:expresion t:(expresionWithCommas)* { return t.length > 0 ? [h].concat(t[0]) : h }
        / expresion

    expresionWithCommas
        = space* 'TkComma' space* e:arrayExpresion { return e }

    expresion
        = and / primary

    and
        = l:or space* 'TkAnd' space* r:and { return { op: '&&', type: 'expression', operands: [l, r] } }
        / or

    or
        = l:eq space* 'TkOr' space* r:or { return { op: '||', type: 'expression', operands: [l, r] } }
        / eq
       
    eq
        = l:ne space* 'TkEQ' space* r:eq { return { op: '=', type: 'expression', operands: [l, r] } }
        / ne

    ne
        = l:lt space* 'TkNE' space* r:ne { return { op: '<>', type: 'expression', operands: [l, r] } }
        / lt

    lt
        = l:le space* 'TkLT' space* r:lt { return { op: '<', type: 'expression', operands: [l, r] } }
        / le

    le
        = l:gt space* 'TkLE' space* r:le { return { op: '<=', type: 'expression', operands: [l, r] } }
        / gt

    gt
        = l:ge space* 'TkGT' space* r:gt { return { op: '>', type: 'expression', operands: [l, r] } }
        / ge

    ge
        = l:pow space* 'TkGE' space* r:gt { return { op: '>=', type: 'expression', operands: [l, r] } }
        / pow

    pow
        = l:mod space* 'TkPower' space* r:pow { return { op: '^', type: 'expression', operands: [l, r] } }
        / mod

    mod
        = l:div space* 'TkMod' space* r:mod { return { op: '%', type: 'expression', operands: [l, r] } }
        / div

    div
        = l:mult space* 'TkDiv' space* r:div { return { op: '*', type: 'expression', operands: [l, r] } }
        / mult

    mult
        = l:minus space* 'TkMult' space* r:mult { return { op: '*', type: 'expression', operands: [l, r] } }
        / minus

    minus
        = l:plus space* 'TkMinus' space* r:minus { return { op: '-', type: 'expression', operands: [l, r] } }
        / plus

    plus
        = l:unary space* 'TkPlus' space* r:plus { return { op: '+', type: 'expression', operands: [l, r] } }
        / unary


    unary
        = 'TkNot' space* v:primary { return { op: '!', type: 'expression', operands: [v] } }
        / 'TkPlus' space* v:primary { return { op: '+', type: 'expression', operands: [v] } }
        / 'TkMinus' space* v:primary { return { op: '-', type: 'expression', operands: [v] } }
        / primary


    primary
        = 'TkOpenPar' space* e:expresion space* 'TkClosePar' { return e }
        / 'TkOpenBracket' space* e:expresion space* 'TkCloseBracket' { return e }
        / 'TkOpenBrace' space* e:expresion space* 'TkCloseBrace' { return e }
        / value
    
    value
        = number / id

    number 
        = 'TkNumber(' n:content ')' { return n.join('') }

    id
        = 'TkId("' n:content '")' { return n.join('') }

    content 
        = c:[a-zA-Z0-9_]+ { return c }

    space = ' ' / '\\t' / '\\n' 
`