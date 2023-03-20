const shelljs = require("shelljs")

//System Start
const uptime = () => {
    let time = shelljs.exec('cat /proc/uptime', {silent: true}).stdout.trim()
    time = time.split(' ')[0]
    return formatTime(time)
}

const getOS = () => {
    const osd = {}
    let details = shelljs.exec('cat /etc/*release', {silent: true}).stdout.trim()
    details = details.split('\n')
    details.forEach(line => {
        const [key, value] = line.split('=')
        switch (key) {
          case 'DISTRIB_ID':
            osd.distributor = value
            break
          case 'PRETTY_NAME':
            osd.pretty_name = value.replace(/"/g, '').trim()
            break
          case 'DISTRIB_RELEASE':
            osd.version = value
            break
          case 'DISTRIB_CODENAME':
            osd.codename = value.trim()
            break
        }
      })
      return JSON.parse(JSON.stringify({distributor: osd.distributor, name: osd.pretty_name, version: osd.version, codename: osd.codename }))
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

// Handlers
const formatTime = (seconds) => {
    let years = Math.floor(seconds / 31536000)
    seconds %= 31536000
    let months = Math.floor(seconds / 2592000)
    seconds %= 2592000
    let weeks = Math.floor(seconds / 604800)
    seconds %= 604800
    let days = Math.floor(seconds / 86400)
    seconds %= 86400
    let hours = Math.floor(seconds / 3600)
    seconds %= 3600
    let minutes = Math.floor(seconds / 60)
    seconds %= 60
  
    let result = ""
    if (years > 0) result += `${years} year${years > 1 ? 's' : ''}, `
    if (months > 0) result += `${months} month${months > 1 ? 's' : ''}, `
    if (weeks > 0) result += `${weeks} week${weeks > 1 ? 's' : ''}, `
    if (days > 0) result += `${days} day${days > 1 ? 's' : ''}, `
    if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''}, `
    if (minutes > 0) result += `${minutes} minute${minutes > 1 ? 's' : ''}, `
    
    return result.slice(0, -2)
}
  
