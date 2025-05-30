
## **MODULAR SYSTEM**
1. Local Module
2. Build In Module
3. Third Party Module

## **commonjs VS esm**

=> file name with .js // .mjs
=> access throuhg require // import
=> exports/module.exports // export default
=> automatic index.js // need to import

## Terms in Brief

1. Call Stack:
A stack that keeps track of function calls in JavaScript. When a function is called, it's added to the top of the stack. When the function finishes, it's removed. JavaScript executes code synchronously using the call stack.
=> LIFO method
=> Execution Context

2. Web API:
Browser-provided APIs (like setTimeout, DOM events, fetch) that handle asynchronous tasks outside the call stack. Once the task completes, its callback is sent to the task queue.

3. Event Loop:
The event loop checks if the call stack is empty. If it is, it moves tasks from the task queues (micro or macro) to the call stack to be executed. This allows asynchronous code to run in a non-blocking way.

Event Loop Phase =>
Synchronous codes
All Microtasks
One Macrotask
Repeat

4. Macro Task Queue:
Holds tasks like setTimeout, setInterval, and some I/O. After the call stack is empty, the event loop takes one macro task at a time and executes it.

5. Micro Task Queue:
Holds tasks like Promise.then, catch, and queueMicrotask. Micro tasks are processed before the next macro task, giving them higher priority.
Promise
queueMicrotask()
Mutation Server (frameworks=> DOM)
Process.nextTick() (NodeJS/Top Priority among microtasks)

6. Callback Functions:
A callback function is a function passed as an argument to another function to be executed later. Often used in asynchronous operations like setTimeout, event listeners, or fetch.

Example:

```
setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000);
```
Here, the arrow function is a callback that runs after the timer ends.

7. Heap:
The heap is a memory space where JavaScript stores objects, arrays, and functions. Unlike the call stack (which is for executing functions), the heap is used for storing data.


## **HOW WEB WORKS??**
https://www.facebook.com/profile
protocol=>https
domainname=>www.facebook.com which refers a ip address:port of DNS server
/profile=>resources/path
|||||
device connects the DNS by TCP/IP (Transmission Control Protocol/Internet Protocol)
sents **http request** (consist of req line=>method(CRUD),path,protocal, headers=>extra information ie: cookies,accesibilities body=>request body)
|||||
server makes **http respond** (start line=> respond code and message, headers=> info of response ie-content type, length etc, body=> data(html,json))
|||||
browser render page based on response

