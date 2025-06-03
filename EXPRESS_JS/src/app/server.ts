import app from "./app";
import { client } from "./config/mongodb";
const port = 5000;



let server;


const bootstrap = async () => {
    await client.connect();
    console.log("connected to : MongoDB");
    // const db= await client.db("todosDB");
    // const collection =await db.collection("todos");
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
