import express, { Application, Request, Response } from 'express'
import todosRouter from './todos/todosrouter';

const app: Application = express()


app.use(express.json()); //parser

app.use("/todos", todosRouter)

app.get('/', (req: Request, res: Response) => {
  console.log(req.url);
  res.send('Hello World!!!You are reading my express server!')
})





export default app;
