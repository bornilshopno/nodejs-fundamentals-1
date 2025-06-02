import app from "./app";
const port = 3000;

let server;

const bootstrap = async () => {
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
