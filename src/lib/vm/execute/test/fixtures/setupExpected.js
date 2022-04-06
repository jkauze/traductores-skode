'use strict'

const setupExpected = (expectValue, status = 'ACK') => ({
    message: expectValue,
    status
})

module.exports = setupExpected