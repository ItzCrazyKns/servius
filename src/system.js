const shelljs = require("shelljs");

//System Start
const uptime = () => {
    let time = shelljs.exec(`uptime -p`, {silent: true}).stdout.replace('up', '').trim()
    return time
}

const getOS = () => {
    let distributor = shelljs.exec("lsb_release -a | awk -F'\t' '/^Distributor ID:/ {print $2}'", {silent: true}).stdout.trim()
    let pretty_name = shelljs.exec("lsb_release -a | awk -F'\t' '/^Description:/ {print $2}'", {silent: true}).stdout.trim()
    let release = shelljs.exec("lsb_release -a | awk -F'\t' '/^Release:/ {print $2}'", {silent: true}).stdout.trim()
    let release_codename = shelljs.exec("lsb_release -a | awk -F'\t' '/^Codename:/ {print $2}'", {silent: true}).stdout.trim()

    return JSON.parse(JSON.stringify({distributor: distributor, name: pretty_name, version: release, codename: release_codename }))
}

const bootTime = (raw) => {
    raw = raw || false
    let time = raw ? shelljs.exec("cat /proc/stat | grep btime | awk '{print $2}'", {silent: true}).stdout.trim(): new Date(parseInt(shelljs.exec("cat /proc/stat | grep btime | awk '{print $2}'", {silent: true}).stdout.trim()) * 1000)
    return time
}

const getUsers = () => {
    let users = shelljs.exec('who | awk \'{print $1,$2,$3,$4,$5}\'', {silent: true}).stdout.trim()
    let each = users.split('\n')
    let user = []
    each.forEach(element => {
        let [name, tty, date, time, host] = element.split(' ')
        host = host.replace('(', ' ').trim()
        host = host.replace(')', ' ').trim()
        user.push({name,tty,date,time,host})
    })
    return user
}

//System End

module.exports = {getUsers, bootTime, getOS, uptime}