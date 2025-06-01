const http = require("http");
const path = require("path");
const fs = require("fs");
const { text, json } = require("stream/consumers");

const filepath = path.join(__dirname, "/DB/todo.json")



const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);
    if (req.url === "/" && req.method === "GET") {
        res.end("Welcome to TODO app server")
    }
    else if (req.url === "/todos" && req.method === "GET") {
        const data = fs.readFileSync(filepath, { encoding: "utf-8" })
        res.writeHead(200, {
            "content-type": "application/json"
        })//setting header
        res.end(data)
    }
    //post a do-to
    else if (req.url === "/todos/create" && req.method === "POST") {
        res.setHeader("content-type", "application/json")
        res.setHeader("email", "node@code.com")
        res.statusCode = 201
        let data = "";
        req.on("data", (chunk) => {
            data = data + chunk;

        });

        req.on('end', () => {
            const { title, body } = JSON.parse(data);
            // console.log(title,body);
            const createdAt = new Date().toLocaleString();
            const allToDos = fs.readFileSync(filepath, { encoding: "utf-8" });
            const parsedData = JSON.parse(allToDos);
            parsedData.push({ title, body, createdAt })

            fs.writeFileSync(filepath, JSON.stringify(parsedData, null, 2), { encoding: "utf8" });
            res.end(JSON.stringify({ title, body, createdAt }))//if error,,need to check here
        });




    }
    else {
        res.end("Server Not Found")
    }

})

server.listen(5000, "127.0.0.1", () => {
    console.log("Server listening to port 5000")
})