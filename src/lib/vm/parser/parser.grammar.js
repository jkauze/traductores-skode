module.exports = 
`
    start
        = i:instruction { return i; }
        / e:expresion { return e }

    instruction
        = d:definition { return d; }
        / a:assignation { return a; }

    definition
        = t:type i:identifier ':=' space* e:expresion { return { op: ':=', type: t, identifier: i, expresion: e } }

    assignation
        = i:identifier ':=' space* e:expresion { return { op: ':=', identifier: i, expresion: e } }

    type
        = t:[a-zA-Z()]+ space* { return t.join(''); }
    
    identifier
        = i:content space* { return i.join(''); }

    expresion
        = plus / e:content space* { return e; }

    plus
        = space* l:mult space* 'TkPlus' space* r:plus { return { op: '+', type: 'expression', operands: [l, r] } }
        / mult

    mult
        = l:numbers space* 'TkMult' space* r:mult { return { op: '*', type: 'expression', operands: [l, r] } }
        / numbers

    numbers
        = n:content { return n.join('') }

    content 
        = c:[a-zA-Z0-9_()]+ { return c }

    space = ' ' / '\\t' / '\\n' 
`

