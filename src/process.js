const shelljs = require("shelljs")

const ListPids = () => {
    let pids = shelljs.exec('ps -eo pid', {silent: true}).stdout.trim()
    pids = pids.split('\n')
    let pid = []
    pids.forEach(element => {
        if(element.trim() != 'PID') {
            element = parseInt(element)
            pid.push(element)
        }
    })
    return pid
}

const ProcName = (pid) => {
    let result = shelljs.exec(`ps -p ${pid} -o comm=`, {silent: true}).stdout.trim()
    if(result) return result
    if(!result) return "Not Found"
}

const ProcExe = (pid) => {
    let result = shelljs.exec(`readlink -f /proc/${pid}/exe`, {silent: true}).stdout.trim()
    if(result) return result
    if(!result) return "Not Found"
}

const FindProc = (keyword) => {
    let result = shelljs.exec(`pgrep ${keyword}`, {silent: true}).stdout.trim()
    if(result) return result
    if(!result) return "Not Found"
}

module.exports = {ListPids,ProcName,ProcExe,FindProc}