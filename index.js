const memoryUtils = require('./src/memory')
const cpuUtils = require('./src/cpu')
const sysUtils = require('./src/system')
const diskUtils = require('./src/disk')
const procUtils = require('./src/process')

module.exports = { ...memoryUtils, ...sysUtils, ...cpuUtils, ...diskUtils, ...procUtils }

