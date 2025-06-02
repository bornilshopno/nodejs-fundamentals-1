"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todosrouter_1 = __importDefault(require("./todos/todosrouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); //parser
app.use("/todos", todosrouter_1.default);
app.get('/', (req, res) => {
    console.log(req.url);
    res.send('Hello World!!!You are reading my express server!');
});
exports.default = app;
