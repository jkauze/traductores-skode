'use strict';

const fs = require('fs');

const isNotShell = line => line !== 'shell'

const formatLine = line => isNotShell(line) ? line + 1 : line

/**
 * @param {Object} fileInfo - failed file
 * @param {String} error - error message
 * @returns 
 */
const saveError = ({ fileInfo = {}, error }) => {
  const fileName = fileInfo.fileName ?? 'shell'
  const line = fileInfo.line ?? 'shell'
  const formatedLine = formatLine(line)

  fs.appendFileSync('.errors.log', `  (${fileName}, ${formatedLine}, ${error}),\n`);
}

module.exports = { saveError };
