import express, { Application, NextFunction, Request, Response } from 'express'
import todosRouter from './todos/todosrouter';

const app: Application = express()


app.use(express.json()); //parser

app.use("/todos", todosRouter)

app.get('/',
  (req: Request, res: Response, next: NextFunction) => {
    console.log("I am just a placeholder", { url: req.url, method: req.method, header: req.header });
    next()//this is forwarding to the next function called below
  },//middleware function

  // (req: Request, res: Response) => {
  //   console.log(req.url);
  //   res.send('Hello World!!!You are reading my express server!')
  // })

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send('Hello World!!!You are reading my express server!')
    } catch (error) {
      next(error)
    }
  })


app.get('/error',

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send('Welcome to error er duniya')
    } catch (error) {
      next(error)
    }
  })

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" })
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log("error", error);
    res.status(400).json({ message: "Something went wrong from global error handler", error })
  }
})





export default app;
