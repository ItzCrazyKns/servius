const shelljs = require("shelljs");

const bytestohuman = (bytes) => {
    const sizes = ['KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 B';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    const size = bytes / Math.pow(1024, i);
    const formattedSize = parseFloat(size.toFixed(2));
    return `${formattedSize} ${sizes[i]}`;
}

// Memory Start 
const VirtualMemory = (raw) => {
    raw = raw || false

    let total = raw ? shelljs.exec("free | awk '/^Mem:/ {print $2}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Mem:/ {print $2}'", {silent:true}).stdout.split('\n')[0])
    let used = raw ? shelljs.exec("free | awk '/^Mem:/ {print $3}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Mem:/ {print $3}'", {silent:true}).stdout.split('\n')[0])
    let free = raw ? shelljs.exec("free | awk '/^Mem:/ {print $4}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Mem:/ {print $4}'", {silent:true}).stdout.split('\n')[0])
    let shared = raw ? shelljs.exec("free | awk '/^Mem:/ {print $5}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Mem:/ {print $5}'", {silent:true}).stdout.split('\n')[0])
    let chached = raw ? shelljs.exec("free | awk '/^Mem:/ {print $6}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Mem:/ {print $6}'", {silent:true}).stdout.split('\n')[0])
    let avail = raw ? shelljs.exec("free | awk '/^Mem:/ {print $7}'", {silent:true}).stdout.split('\n')[0] : bytestohuman(shelljs.exec("free | awk '/^Mem:/ {print $7}'", {silent:true}).stdout.split('\n')[0])

    return JSON.parse(JSON.stringify({ total: total, used: used, free: free, shared: shared, chached: chached, available: avail}))
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