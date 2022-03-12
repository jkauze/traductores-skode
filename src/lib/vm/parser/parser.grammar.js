module.exports = 
`
    start
        = i:instruction { return i; }
        / e:expresion { return e }

    instruction
        = d:definition { return d; }
        / a:assignation { return a; }

    definition
        = t:type i:identifier ':=' space* e:expresion { return { predicate: ':=', type: t, identifier: i, expresion: e } }

    assignation
        = i:identifier ':=' space* e:expresion { return { predicate: ':=', identifier: i, expresion: e } }

    type
        = t:[a-zA-Z]+ space* { return t.join(''); }
    
    identifier
        = i:[a-zA-Z0-9_]+ space* { return i.join(''); }

    expresion
        = plus / e:[a-zA-Z0-9_]+ space* { return e; }

    plus
        = l:mult space* '+' space* r:plus { return { predicate: '+', operands: [l, r] } }
        / mult

    mult
        = l:numbers space* '*' space* r:mult { return { predicate: '*', operands: [l, r] } }
        / numbers

    numbers
        = n:[a-zA-Z0-9_]+ { return n.join('') }

    space = ' ' / '\\t' / '\\n' 
`

