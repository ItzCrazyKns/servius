# Servius 
Servius is a comprehensive npm package for server monitoring,providing tracking of CPU load, free memory, disk usage, process count, and other important system resources. It also offers details on CPU, server uptime, last boot time, OS, disk partitions,process management and Much More.

# Supported Operating Systems
- Linux

# Example Usage
## System Info
### Uptime
```js
const servius = require('servius')

// The function returns the amount of time that the system has been running.

const uptime = servius.uptime()

console.log(uptime)

/* Example Output =>
 * 3 weeks, 4 days, 1 hour, 27 minutes
 */
````
### GetOS

```js
const servius = require('servius')

// The `getOS` function retrieves information about the operating system running on the current system and returns an object containing details such as the distributor, name, version, and codename.

const os = servius.GetOS()

console.log(os)

/* Example Output => 
 *  {
 *   distributor: 'Ubuntu',
 *   name: 'Ubuntu 20.04.5 LTS',
 *   version: '20.04',
 *   codename: 'focal'
 *  }
 */
```
### Boot Time

```js
const servius = require('servius')

// The bootTime function retrieves the system's boot time .By Default This Function returns boot time in the format of `YYYY-MM-DD HH:MM:SS`, but if the `raw` parameter is true it will return the boot time in  the format of a Unix timestamp. The bootTime function can be useful for monitoring system performance and diagnosing issues related to system uptime.

const time = servius.bootTime(false) //here raw is false

console.log(time)

/* Example Output => 
 * 2023-02-22T14:24:16.000Z
 */
```
### Get User
```js
const servius = require('servius')

// The `getUsers` function retrieves information about currently logged-in users on the system and returns an array of objects, with each object containing details such as the user's name, terminal (tty), login date and time, and host. This function can be useful for monitoring system activity and identifying who is currently using the system.

const users = servius.getUsers()

console.log(users)

/* Example Output => 
 * [
 *      {
 *          name: 'root',
 *          tty: 'pts/5',
 *          date: '2023-03-19',
 *          time: '14:59',
 *          host: 'xxx.xxx.xxx.xxx'
 *      }
 *  ]
 */
```

## Memory
### Virutal Memory
```js
const servius = require('servius')

// The `VirtualMemory` function retrieves information about the virtual memory usage of the current system, including the total amount of virtual memory available, the amount of virtual memory currently used, and the amount of virtual memory currently available for use etc. This function can be useful for monitoring system performance and diagnosing issues related to memory usage.

const mem = servius.VirtualMemory(false) // here raw is false

console.log(mem)

/* Example Output => 
 * {
 *     total: '31.87 GB',
 *     free: '15.89 GB',
 *     shared: '29.83 MB',
 *     chached: '3.82 GB',
 *     available: '22.76 GB'
 * }
 * Note: `Used` Has Been Removed For A While Will Be Added In Future Versions
 */
```
### Swap Memory
```js
const servius = require('servius')

/* The `SwapMemory` function retrieves information about the swap memory usage of the current system. The output includes the total amount of swap memory available, the amount of swap memory currently used, and the amount of swap memory currently available for use, as well as additional information about shared, cached memory, and availability.

This function can be useful for monitoring system performance and diagnosing issues related to memory usage. It provides information about the usage of swap memory, which is used when physical memory is full or when a process needs more memory than is physically available. */

const swapmem = servius.SwapMemory(false) // here raw is false

console.log(swapmem)

/* Example Output => 
 * {
 *     total: '0',
 *     used: '0',
 *     free: '0',
 *     shared: '0',
 *     chached: '0',
 *     available: '0'
 * }
 * **Note** This Only Works With System That Have Swap Enabled Otherwise It Will Return `0`
 */ 
```

## Disk
### VirtualDisk
```js
const servius = require('servius')

/* The `VirtualDisk` function retrieves information about the usage of the disk space of the current system, including the total amount of disk space available, the amount of disk space currently used, the amount of disk space available for use, and the percentage of disk space used. This function can be useful for monitoring disk space usage and diagnosing issues related to storage. */

const disk = servius.VirtualDisk(false) // here raw is false

console.log(disk)

/* Example Output => 
 * {
 *    total: '496.03 GB',
 *    used: '96.34 GB',
 *    available: '399.68 GB',
 *    used_perc: '20%'
 * }
 */ 
```
### DiskPart
```js
const servius = require('servius')

/* The `DiskPart` function retrieves information about the disk partitions on the current system, including the partition name, filesystem type, size, and mount point. This function can be useful for inspecting the available disk space and identifying the location of specific files or directories. */

const diskpart = servius.DiskPart()

console.log(diskpart)

/* Example Output => 
 * [
  {
    name: 'sda',
    fstype: 'hfs',
    size: 512G,
    mountpoint: /dev
  },
  {
    name: 'sda1',
    fstype: 'hfs',
    size: '511.9G',
    mountpoint: /etc/hosts
  }
]
 */ 
```
## Cpu
### cpuTimes
```js
const servius = require('servius')

/* Returns a Object That Contains The Time Taken By Cpu To Execute a Specefic Process. */

const cputimes = servius.cpuTimes()

console.log(cputimes)

/* Example Output => 
* {
*     user: '73.80',
*     system: '0.00',
*     nice: '0.00',
*     idle: '0.00',
*     steal: '0.00'
*  }*/ 
```
### cpuCount
```js
const servius = require('servius')

/* Returns the number of the logical cpu cores. */

const cpucount = servius.cpuCount()

console.log(cpucount)

/* Example Output => 
* 16
*/
```

### cpu
```js
const servius = require('servius')

/* The cpu function retrieves information about the CPU of the current system, including the CPU name, CPU speed, number of cores, and load average. This function can be useful for monitoring system performance and diagnosing issues related to CPU usage. */

const cpuinf = servius.cpu()

console.log(cpuinf)

/* Example Output => 
* {
*     name: 'Intel(R) Core(TM) i5 CPU 12400F @ 4.40GHz',
*     speed: 2826,
*     cores: 8,
*     loadAvg: [ 0.1, 0.2, 0.1]
*  }
*/
```