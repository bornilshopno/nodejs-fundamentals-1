import express from "express";
import fs from "fs";
import path from "path";

const todosRouter = express.Router()



const filepath = path.join(__dirname, "../../../DB/todo.json")

todosRouter.get("/", (req, res) => {
    const data = fs.readFileSync(filepath, { encoding: "utf-8" });
    const query=req.query;
    console.log(data)
    console.log(query.title);
    res.send(query)
})

todosRouter.post("/create",(req,res)=>{
  const data=req.body;
  console.log(req.query);
  res.send("hello postings")
})



//3fVzkr2#dj_Lkww
//level2 for mongodb


export default todosRouter;