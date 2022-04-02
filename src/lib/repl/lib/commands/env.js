'use strict';

const logger = require('../../../../shared/logger')
const data = require('../../../vm/data')

/**
 * @returns {Object} all mem data vars
 */
const env = () => (
    logger(data)
)

module.exports = env
