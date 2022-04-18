'use strict'

const memTick = require("../memTick")


/**
 * update tick to 1 more cycle
 * @returns {Number} actual tick number
 */
const tick = () => {
    const previousTick = memTick[memTick.length - 1]
    const actualTick = previousTick + 1
    memTick.push(actualTick)
    return actualTick
}

module.exports = { tick }