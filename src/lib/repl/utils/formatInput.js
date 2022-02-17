'use strict';

/**
 * 
 * @param {String} input 
 * @returns - Formated input, deletes extras spaces
 */
const formatInput = (input) => (input.length ? input.trim() : null);

module.exports = { formatInput };
