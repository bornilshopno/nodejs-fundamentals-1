
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



## **LOGGER APP WITH NODE JS**

below codes for making a logger app. with terminal command it will write text in a file.

The **process.argv** property returns an array containing the command-line arguments passed when the Node.js process was launched. The first element will be execPath. See process.argv0 if access to the original value of argv[0] is needed. The second element will be the path to the JavaScript file being executed. The remaining elements will be any additional command-line arguments.

For example, assuming the following script for process-args.js:

import { argv } from 'node:process';

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
Launching the Node.js process as:

node process-args.js one two=three four
Would generate the output:

0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four

```js
const path = require("path");
const fs = require("fs");
const inputArguments = process.argv.slice(2);//process.argv provides the text enterer in the terminal.ie=['folderpath','filepath','full','text'] when terninal command is ='nodejs filename full text'
const text = inputArguments.join(" ");
const timestamp = new Date().toString();
const message = `${timestamp}: \n ${text} \n`
const filepath = path.join(__dirname, "log.txt");

if (!text) {
    console.log(" X please provide a message to log");
    console.log("Example : node index.js Hello World");
    process.exit(1);
}

else {
    fs.appendFile(filepath, message, { encoding: "utf-8" }, () => {
        console.log("your text append successfully")
    })
}
```


## Important terms used in TODO_APP

```js

//to get into the file
const path = require("path");
const filepath = path.join(__dirname, "/DB/todo.json");

//getting the url
const { URL } = require("url");
const url = new URL(req.url, `https://${req.headers.host}`);
const pathname = url.pathname;
const title = url.searchParams.get("title");// output:string when ?title=string is in url 

// basic route
if (pathname === "/" && req.method === "GET") {
        res.end("Welcome to TODO app server")
    }
//read data from a file
const data = fs.readFileSync(filepath, { encoding: "utf-8" })

//write parsedData to a file. null and 2 is for formating the data in the file written
 fs.writeFileSync(filepath, JSON.stringify(parsedData, null, 2), { encoding: "utf8" });
```