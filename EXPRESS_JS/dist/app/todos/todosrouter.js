"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const todosRouter = express_1.default.Router();
const filepath = path_1.default.join(__dirname, "../../../DB/todo.json");
todosRouter.get("/", (req, res) => {
    const data = fs_1.default.readFileSync(filepath, { encoding: "utf-8" });
    const query = req.query;
    console.log(data);
    console.log(query.title);
    res.send(query);
});
todosRouter.post("/create", (req, res) => {
    const data = req.body;
    console.log(req.query);
    res.send("hello postings");
});
//3fVzkr2#dj_Lkww
//level2 for mongodb
exports.default = todosRouter;
