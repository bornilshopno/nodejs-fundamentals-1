const path = require("path");
const fs = require("fs");
// console.log(process.argv);

const inputArguments = process.argv.slice(2);
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

// console.log(filepath)