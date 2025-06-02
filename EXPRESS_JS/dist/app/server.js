"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const app_1 = __importDefault(require("./app"));
const port = 5000;
const uri = "mongodb+srv://level2:123456aaa@cluster0.pqwog.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
let server;
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    console.log("connected to : MongoDB");
    const db = yield client.db("todosDB");
    const collection = yield db.collection("todos");
    server = app_1.default.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
bootstrap();
/*
server=>
    server handling=>starting, closing, error handling of server
app=>
    routing handle, middleware, route related error handling
app folder=>
    app business logic handling like create read update delete database related work
*/
