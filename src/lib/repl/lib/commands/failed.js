'use strict';

const fs = require('fs');

const { errorMessage } = require('../../utils/messages');
const { replConfig } = require('../../config/replConfig');

/**
 * @param {Object} options
 * @param {String} options.input
 * @param {Object} options.fileInfo
 * @returns 
 */
const failed = ({ input, fileInfo }) => {
  try {
    const fileData = fs.readFileSync(replConfig.errorLogFile, 'utf8');
    console.log(fileData)
  } catch (error) {
    errorMessage({ input, error: error.message, fileInfo });
  }
  return;
};

module.exports = failed;
