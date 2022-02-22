'use strict';

const fs = require('fs');

const { errorMessage } = require('../../utils/messages');
const { replConfig } = require('../../config/replConfig');

/**
 * @param {Object} options
 * @param {String} options.input
 * @param {Object} options.fileInfo
 */
const reset = ({ input, fileInfo }) => {
  try {
    fs.writeFileSync(replConfig.errorLogFile, '', 'utf8');
  } catch (error) {
    errorMessage({ input, error: error.message, fileInfo });
  }
  return;
};

module.exports = reset;
