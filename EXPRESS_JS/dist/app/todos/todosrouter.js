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
const express_1 = __importDefault(require("express"));
// import fs from "fs";
// import path from "path";
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
const todosRouter = express_1.default.Router();
// const filepath = path.join(__dirname, "../../../DB/todo.json")
//get all data
todosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get operation");
    const db = mongodb_1.client.db("todosDB");
    const todosCollection = db.collection("todos");
    const todos = yield todosCollection.find().toArray();
    res.json(todos);
}));
//Get a single data
todosRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // console.log("Single get operation", "id=", id)
    const db = mongodb_1.client.db("todosDB");
    const todosCollection = db.collection("todos");
    const todo = yield todosCollection.findOne({ _id: new mongodb_2.ObjectId(id) });
    const toto_string = JSON.stringify(todo);
    res.json({ "message": "success" });
}));
//POST a data
todosRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority, isCompleted } = req.body;
    const db = mongodb_1.client.db("todosDB");
    const todosCollection = db.collection("todos");
    yield todosCollection.insertOne({
        title: title,
        description: description,
        priority: priority,
        isCompleted: false
    });
    const todos = yield todosCollection.find().toArray();
    res.json({ todos });
}));
//update full data
todosRouter.put("/update-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const { title, description, isCompleted, priority } = req.body;
    console.log(id, title, description, isCompleted, priority);
    const db = mongodb_1.client.db("todosDB");
    const todosCollection = db.collection("todos");
    const updated_todo = yield todosCollection.updateOne(filter, { $set: { title, description, isCompleted, priority } }, { upsert: true });
    res.json(updated_todo);
}));
//Delete operation using param
todosRouter.delete("/delete-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    const db = mongodb_1.client.db("todosDB");
    const todosCollection = db.collection("todos");
    const result = yield todosCollection.deleteOne({ _id: new mongodb_2.ObjectId(id) });
    res.send({ "okay": "okay" });
}));
exports.default = todosRouter;
