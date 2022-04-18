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
