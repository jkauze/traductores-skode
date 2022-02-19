'use strict'

const errors = {
    notImplemented: 'interpretación no implementada',
    commandNotFound: (command) => `comando especial "${command}" no implementado`
}

module.exports = errors