'use strict';

const logger = require('../../../../shared/logger')
const data = require('../../../vm/data');
const memTick = require('../../../vm/memTick');

/**
 * @returns {Object} all mem data vars
 */
const env = () => {
    logger(data)
    logger(memTick)
}

module.exports = env

/**
 * x: value = 10, cvalue = y + 1, tick 2
 * 
 * hago tick, ahora estaria en el tick 3
 * 
 * expresion: x + 10, al momento de hacer el getValue de x, debe verificar el tick actual
 * si el tick actual es el mismo que el ultimo, evaluo como lo hago normalmente y continuo
 * si el tick es diferente, debo evaluar como lo hago normalmente, reasignarle el RVALUE a x,
 * reasignar el tick en la data de x y continuar
 * 
 * EJEMPLO DE DATA CON tick y RVALUE
 * {
 *  x: {
 *    rvalue: 10
 *    cvalue: ast original?
 *    quoted: false
 *    tick: 2
 *  }
 * }
 */
