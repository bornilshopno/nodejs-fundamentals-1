const http = require("http");
const path = require("path");
const fs = require("fs");
const { text, json } = require("stream/consumers");
const { url } = require("inspector");
const { URL } = require("url");

const filepath = path.join(__dirname, "/DB/todo.json")



const server = http.createServer((req, res) => {

    const url = new URL(req.url, `https://${req.headers.host}`);
    const pathname = url.pathname;
    // console.log(url, "URL")
    // console.log(req.url, req.method);
    if (pathname === "/" && req.method === "GET") {
        res.end("Welcome to TODO app server")
    }
    // GET all todo
    else if (pathname === "/todos" && req.method === "GET") {
        const data = fs.readFileSync(filepath, { encoding: "utf-8" })
        res.writeHead(200, {
            "content-type": "application/json"
        })//setting header
        res.end(data)
    }
    // GET a todo with query
    else if (pathname === "/todo" && req.method === "GET") {
        const title = url.searchParams.get("title");
        console.log(title)
        const data = fs.readFileSync(filepath, { encoding: "utf-8" })
        const parsedData = JSON.parse(data);
        const searchedData = parsedData.find(pd => pd.title === title)
        console.log(searchedData)
        const todo = JSON.stringify(searchedData)

        res.writeHead(200, {
            "content-type": "application/json"
        })//setting header
        res.end(todo)
    }
    //POST a do-to
    else if (pathname === "/todos/create" && req.method === "POST") {
        console.log("checking")
        res.setHeader("content-type", "application/json")
        res.setHeader("email", "node@code.com")
        res.statusCode = 201
        let data = "";
        req.on("data", (chunk) => {
            data = data + chunk;

        });

        req.on('end', () => {
            const { id,title, body } = JSON.parse(data);
            console.log(title,body);
            const createdAt = new Date().toLocaleString();
            const allToDos = fs.readFileSync(filepath, { encoding: "utf-8" });
            const parsedData = JSON.parse(allToDos);
            console.log(parsedData);
            parsedData.push({ id, title, body, createdAt })

            fs.writeFileSync(filepath, JSON.stringify(parsedData, null, 2), { encoding: "utf8" });
            res.end(JSON.stringify({ message: "Todo added successfully" }))
        });




    }
    //UPDATE a do-to
    else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
        res.setHeader("content-type", "application/json")
        res.setHeader("email", "node@code.com")
        res.statusCode = 201
        const title = url.searchParams.get("title");
        console.log(title)
        let data = "";
        req.on("data", (chunk) => {
            data = data + chunk;

        });

        req.on('end', () => {
            const { body } = JSON.parse(data);
            console.log(body, "body");
            // const createdAt = new Date().toLocaleString();
            const allToDos = fs.readFileSync(filepath, { encoding: "utf-8" });
            const parsedData = JSON.parse(allToDos);
            const todoIndex = parsedData.findIndex((todo) => todo.title === title)
            console.log(todoIndex);
            parsedData[todoIndex].body = body;

            fs.writeFileSync(filepath, JSON.stringify(parsedData, null, 2), { encoding: "utf8" });
            res.end(JSON.stringify({ title, body, createdAt: parsedData[todoIndex].createdAt }))//if error,,need to check here
        });




    }
    //DELETE a do-to ///just copied logics
    else if (pathname === "/todos/delete-todo" && req.method === "DELETE") {
        res.setHeader("content-type", "application/json")
        const title = url.searchParams.get("title");
        console.log(title,1)
      
            const allToDos = fs.readFileSync(filepath, { encoding: "utf-8" });
            const parsedData = JSON.parse(allToDos);
            console.log(parsedData)
            // Filter out the todo with the matching title
            const updatedData = parsedData.filter((todo) => todo.title !== title);
            console.log(updatedData)
            fs.writeFileSync(filepath, JSON.stringify(updatedData, null, 2), { encoding: "utf8" });
            res.end(JSON.stringify({ message: "Todo deleted successfully" }))
      
    }
    else {
        res.end("Server Not Found")
    }

})

server.listen(5000, "127.0.0.1", () => {
    console.log("Server listening to port 5000")
})