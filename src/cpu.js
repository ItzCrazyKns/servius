const os = require('node:os');
const shelljs = require("shelljs");

/* Returns a Object That Contains The Time Taken By Cpu To Execute a Specefic Process.
*  Ex- {
*       user: '73.80',
*       system: '0.00',
*       nice: '0.00',
*       idle: '0.00',
*       steal: '0.00'
*      }
*/

const cpuTimes = () => {
    let user = shelljs.exec(`top -bn1 | grep '^%Cpu' | awk '{printf "%.2f", $2}'`, {silent: true}).stdout.trim()
    let nice = shelljs.exec(`top -bn1 | grep '^%Cpu' | awk '{printf "%.2f", $6}'`, {silent: true}).stdout.trim()
    let sys = shelljs.exec(`top -bn1 | grep '^%Cpu' | awk '{printf "%.2f", $4}'`, {silent: true}).stdout.trim()
    let idle = shelljs.exec(`top -bn1 | grep '^%Cpu' | awk '{printf "%.2f", $8}'`, {silent: true}).stdout.trim()
    let steal = shelljs.exec(`top -bn1 | grep '^%Cpu' | awk '{printf "%.2f", $16}'`, {silent: true}).stdout.trim()
    return JSON.parse(JSON.stringify({user: user, system: sys, nice: nice, idle: idle, steal: steal}))
}

/* Returns The Number Of Logical Cpu Cores.
* Ex- 4
*/

const cpuCount = () => {
    let cores = shelljs.exec('nproc', {silent: true}).stdout
    return cores
}

/* Returns A Object Containing The Logical Cpu Information.
* Ex- {
*     name: 'Intel(R) Core(TM) i5 CPU 12400F @ 4.40GHz',
*     speed: 2826,
*     cores: 4,
*     loadAvg: [ 0.1, 0.2, 0.1]
*  }
*/

const cpu = () => {
    const cpudetail = {
        name: os.cpus()[0].model,
        speed: os.cpus()[0].speed,
        cores: os.cpus().length,
        loadAvg: os.loadavg()
    }

    return JSON.parse(JSON.stringify(cpudetail))
}

module.exports = {cpu, cpuCount, cpuTimes}