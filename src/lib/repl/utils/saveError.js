'use strict';

const fs = require('fs');

/**
 * @param {Object} fileInfo - failed file
 * @param {String} error - error message
 * @returns 
 */
const saveError = ({ fileInfo = {}, error }) => {
  const fileName = fileInfo.fileName ?? 'shell'
  const line = fileInfo.line ?? 'shell'

  fs.appendFileSync('.errors.log', `  (${fileName}, ${line}, ${error}),\n`);
}

module.exports = { saveError };
