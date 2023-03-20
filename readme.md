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
 *     used: '5.29 GB',
 *     free: '15.89 GB',
 *     shared: '29.83 MB',
 *     chached: '3.82 GB',
 *     available: '22.76 GB'
 * }
 */
```
More Examples Coming Soon.
