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
const todosrouter_1 = __importDefault(require("./todos/todosrouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); //parser
app.use("/todos", todosrouter_1.default);
app.get('/', (req, res, next) => {
    console.log("I am just a placeholder", { url: req.url, method: req.method, header: req.header });
    next(); //this is forwarding to the next function called below
}, //middleware function
// (req: Request, res: Response) => {
//   console.log(req.url);
//   res.send('Hello World!!!You are reading my express server!')
// })
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('Hello World!!!You are reading my express server!');
    }
    catch (error) {
        next(error);
    }
}));
app.get('/error', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('Welcome to error er duniya');
    }
    catch (error) {
        next(error);
    }
}));
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({ message: "Something went wrong from global error handler", error });
    }
});
exports.default = app;
