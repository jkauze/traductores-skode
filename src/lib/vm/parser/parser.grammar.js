module.exports = 
`
    start
        = i:instruction { return i; }
        / e:expresion { return e }

    instruction
        = d:definition { return d; }
        / a:assignation { return a; }

    definition
        = t:typeDef space* i:identifier space* 'TkAssign' space* e:expresion { return { op: ':=', type: 'instruction', operands: [i,e,t] } }

    assignation
        = i:identifier space* 'TkAssign' space* e:expresion { return { op: ':=', type: 'instruction', operands: [i, e] } }

    typeDef
        = 'TkNum' { return 'Num'; }
        / 'TkBool' { return 'Boolean' }
        / t:[a-zA-Z()]+ { return t.join(''); } // fallback rule delete after test
    
    identifier
        = i:tkid { return i; }

    expresion
        = plus / e:content space* { return e; }

    plus
        = l:mult space* 'TkPlus' space* r:plus { return { op: '+', type: 'expression', operands: [l, r] } }
        / mult

    mult
        = l:numbers space* 'TkMult' space* r:mult { return { op: '*', type: 'expression', operands: [l, r] } }
        / numbers
        / tkid

    numbers
        = 'TkNumber(' + n:content + ')'  { return n.join('') }

    tkid
        = 'TkId("' + n:content + '")'  { return n.join('') }

    content 
        = c:[a-zA-Z0-9_]+ { return c }

    space = ' ' / '\\t' / '\\n' 
`

