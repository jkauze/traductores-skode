'use strict';

const fs = require('fs');

/**
 * 
 * @param {String} fileName 
 * @returns - FileName and array of lines inside fileName. If error, return null
 */
const fileReader = (fileName) => {
    try {
        const data = fs.readFileSync(fileName, 'UTF-8');
        const lines = data.split(/\r?\n/);
    
        return {fileName, lines};
    } catch (e) {
        return null;
    }
};


module.exports = { fileReader };