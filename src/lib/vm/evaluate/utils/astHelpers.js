'use strict'

const isAst = ast => typeof ast === 'object'

const isNotAst = ast => typeof ast !== 'object'

module.exports = {
    isAst,
    isNotAst
}

