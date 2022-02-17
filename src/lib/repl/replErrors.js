'use strict'

const errors = {
    notImplemented: 'interpretación no implementada',
    commandNotFound: (comando) => `comando especial "${comando}" no implementado`
}

module.exports = errors