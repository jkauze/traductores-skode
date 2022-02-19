'use strict';

const setupPrompt = require('prompt-sync');
const history = require('prompt-sync-history')();

const prompt = setupPrompt({
  history,
  sigint: true,
  eot: true
});

module.exports = prompt
