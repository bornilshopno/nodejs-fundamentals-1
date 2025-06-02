import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";
const port = 5000;


const uri = "mongodb+srv://level2:123456aaa@cluster0.pqwog.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let server;


const bootstrap = async () => {
    await client.connect();
    console.log("connected to : MongoDB");
    const db= await client.db("todosDB");
    const collection =await db.collection("todos");
    server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}


bootstrap();

/*
server=>
    server handling=>starting, closing, error handling of server
app=>
    routing handle, middleware, route related error handling
app folder=>
    app business logic handling like create read update delete database related work
*/
