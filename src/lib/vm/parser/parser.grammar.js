module.exports = 
`
    start
        = i:instruction { return i; }
        / e:expresion { return e; }

    instruction
        = d:definition { return d; }
        / a:assignation { return a; }

    definition
        = t:typeDef space* i:identifier space* 'TkAssign' space* e:expresion { return { op: ':=', type: 'instruction', operands: [i,e,t] } }

    assignation
        = i:identifier space* 'TkAssign' space* e:expresion { return { op: ':=', type: 'instruction', operands: [i, e] } }

    typeDef
        // Debe validar [<type>]
        = 'TkNum' { return 'Num'; }
        / 'TkBool' { return 'Boolean' }
        / t:[a-zA-Z()]+ { return t.join(''); } // fallback rule delete after test
    
    identifier
        = i:id { return i; }

    expresion
        // Ampliar para soportar arrays
        = plus / primary

    plus
        = l:minus space* 'TkPlus' space* r:plus { return { op: '+', type: 'expression', operands: [l, r] } }
        / minus

    minus
        = l:mult space* 'TkMinus' space* r:minus { return { op: '-', type: 'expression', operands: [l, r] } }
        / mult

    mult
        = l:unary space* 'TkMult' space* r:minus { return { op: '*', type: 'expression', operands: [l, r] } }
        / unary

    unary
        = 'TkPlus' space* v:primary { return { op: '+', type: 'expression', operands: [v] } }
        / 'TkMinus' space* v:primary { return { op: '-', type: 'expression', operands: [v] } }
        / primary
    
    primary
        = 'TkOpenPar' space* e:expresion space* 'TkClosePar' { return e }
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