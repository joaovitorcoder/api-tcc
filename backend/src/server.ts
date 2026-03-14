import express, {Request, Response, NextFunction, Router} from "express";
import userRoutes from "./routes/user.routes";
import contatoRouter from "./routes/contato.routes";   


const app = express()
app.use(express.json())
app.use(userRoutes)
app.use(contatoRouter)

app.listen(3333, () => console.log('Servidor on'))