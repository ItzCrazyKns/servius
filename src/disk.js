const shelljs = require("shelljs");

// Disk Start

const VirtualDisk = (raw) => {
    raw = raw || false

    let total = raw ? shelljs.exec("df --output=size / | awk 'NR==2 {print $1}'", {silent: true}).stdout.trim() : bytestohuman(shelljs.exec("df --output=size / | awk 'NR==2 {print $1}'", {silent: true}).stdout.trim())
    let used = raw ? shelljs.exec("df --output=used / | awk 'NR==2 {print $1}'", {silent: true}).stdout.trim() : bytestohuman(shelljs.exec("df --output=used / | awk 'NR==2 {print $1}'", {silent: true}).stdout.trim())
    let avail = raw ? shelljs.exec("df --output=avail / | awk 'NR==2 {print $1}'", {silent: true}).stdout.trim() : bytestohuman(shelljs.exec("df --output=avail / | awk 'NR==2 {print $1}'", {silent: true}).stdout.trim())
    let perc = raw ? shelljs.exec("df --output=pcent / | awk 'NR==2 {print $1}'", {silent: true}).stdout.trim() : shelljs.exec("df --output=pcent / | awk 'NR==2 {print $1}'", {silent: true}).stdout.trim()

    return JSON.parse(JSON.stringify({total: total, used: used, available: avail, used_perc: perc}))
}

const DiskPart = () => {
    let parts = shelljs.exec('lsblk --noheadings --list --output NAME,FSTYPE,SIZE,MOUNTPOINT', {silent: true}).stdout.trim()
    parts = parts.split('\n')
    let part = []
    parts.forEach(element => {
      const [name, fstype, size, mountpoint] = element.match(/\S+/g)
      part.push({name, fstype, size, mountpoint})
    })
  
    return part
  }

// Disk End

module.exports = {DiskPart, VirtualDisk}

// Handlers

const bytestohuman = (bytes) => {
  const sizes = ['KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 B';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  const size = bytes / Math.pow(1024, i);
  const formattedSize = parseFloat(size.toFixed(2));
  return `${formattedSize} ${sizes[i]}`;
}
