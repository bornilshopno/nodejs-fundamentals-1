import express from "express";
// import fs from "fs";
// import path from "path";
import { client } from "../config/mongodb";
import { ObjectId } from "mongodb";

const todosRouter = express.Router()

// const filepath = path.join(__dirname, "../../../DB/todo.json")


//get all data
todosRouter.get("/", async (req, res) => {
  console.log("get operation")
  const db = client.db("todosDB");
  const todosCollection = db.collection("todos");
  const todos = await todosCollection.find().toArray();
  res.json(todos)
})
//Get a single data
todosRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log("Single get operation", "id=", id)
  const db = client.db("todosDB");
  const todosCollection = db.collection("todos");
  const todo = await todosCollection.findOne({ _id: new ObjectId(id) })
  const toto_string = JSON.stringify(todo)
  res.json({ "message": "success" })
})



//POST a data
todosRouter.post("/create", async (req, res) => {
  const { title, description, priority, isCompleted } = req.body;
  const db = client.db("todosDB");
  const todosCollection = db.collection("todos");
  await todosCollection.insertOne({
    title: title,
    description: description,
    priority: priority,
    isCompleted: false
  })
  const todos = await todosCollection.find().toArray()


  res.json({ todos })
})

//update full data
todosRouter.put("/update-todo/:id", async (req, res) => {
const id=req.params.id;
const filter= {_id : new ObjectId(id)};
const {title,description,isCompleted,priority}=req.body;
  console.log(id,title,description,isCompleted,priority)
  const db = client.db("todosDB");
  const todosCollection = db.collection("todos");
  const updated_todo=await todosCollection.updateOne(filter,
    {$set:{title,description,isCompleted,priority}},
    {upsert:true})
  res.json(updated_todo)
})

//Delete operation using param
todosRouter.delete("/delete-todo/:id",async(req,res)=>{
  const id=req.params.id;
  console.log(id)
const db = client.db("todosDB");
  const todosCollection = db.collection("todos");
  const result= await todosCollection.deleteOne({_id : new ObjectId(id)});
  res.send({"okay":"okay"})
})



export default todosRouter;