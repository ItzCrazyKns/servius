const shelljs = require("shelljs");

// Memory Start 
const VirtualMemory = (raw) => {
    raw = raw || false

    let data = shelljs.exec('cat /proc/meminfo', {silent: true}).stdout.trim()
    data = data.split('\n')
    let meminfo = {}
    data.forEach(line => {
        const lineval = line.split(':')
        switch (lineval[0]) {
            case 'MemTotal':
                let totalmem = raw ? lineval[1].trim().split(' ')[0] : bytestohuman(lineval[1].trim().split(' ')[0])
                meminfo.totalmem = totalmem
                break;
            case 'MemFree':
                let freemem = raw ? lineval[1].trim().split(' ')[0] : bytestohuman(lineval[1].trim().split(' ')[0])
                meminfo.freemem = freemem
                break;
            case 'MemAvailable':
                let availmem = raw ? lineval[1].trim().split(' ')[0] : bytestohuman(lineval[1].trim().split(' ')[0])
                meminfo.availmem = availmem
                break
            case 'Cached':
                let cachedmem = raw ? lineval[1].trim().split(' ')[0] : bytestohuman(lineval[1].trim().split(' ')[0])
                meminfo.cachedmem = cachedmem
                break
            case 'Shmem':
                let sharedmem = raw ? lineval[1].trim().split(' ')[0] : bytestohuman(lineval[1].trim().split(' ')[0])
                meminfo.sharedmem = sharedmem
                break
        }   

    });

    /* Since Used Is Removed For Now This Will Not Be Used
    return JSON.parse(JSON.stringify({ total: total, used: used, free: free, shared: shared, chached: chached, available: avail})) */

    return JSON.parse(JSON.stringify({ total: meminfo.totalmem, free: meminfo.freemem, cached: meminfo.cachedmem, available: meminfo.availmem, shared: meminfo.sharedmem}))
}

const SwapMemory = (raw) => {
    raw = raw || false

    let total = raw ? shelljs.exec("free | awk '/^Swap:/ {print $2}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Swap:/ {print $2}'", {silent:true}).stdout.split('\n')[0])
    let used = raw ? shelljs.exec("free | awk '/^Swap:/ {print $3}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Swap:/ {print $3}'", {silent:true}).stdout.split('\n')[0])
    let free = raw ? shelljs.exec("free | awk '/^Swap:/ {print $4}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Swap:/ {print $4}'", {silent:true}).stdout.split('\n')[0])
    let shared = raw ? shelljs.exec("free | awk '/^Swap:/ {print $5}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Swap:/ {print $5}'", {silent:true}).stdout.split('\n')[0])
    let chached = raw ? shelljs.exec("free | awk '/^Swap:/ {print $6}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Swap:/ {print $6}'", {silent:true}).stdout.split('\n')[0])
    let avail = raw ? shelljs.exec("free | awk '/^Swap:/ {print $7}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Swap:/ {print $7}'", {silent:true}).stdout.split('\n')[0])

    return JSON.parse(JSON.stringify({ total: total, used: used, free: free, shared: shared, chached: chached, available: avail}))
}
// Memory End

module.exports = { SwapMemory, VirtualMemory}

// Handlers

const bytestohuman = (bytes) => {
    const sizes = ['KB', 'MB', 'GB', 'TB'];
    bytes = bytes || 0
    if (bytes == 0) return '0 B';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    const size = bytes / Math.pow(1024, i);
    const formattedSize = parseFloat(size.toFixed(2));
    return `${formattedSize} ${sizes[i]}`;
}