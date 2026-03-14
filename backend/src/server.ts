import express, {Request, Response, NextFunction, Router} from "express";
import { router } from "./routes/user.routes";
import { ContatoRouter } from "./routes/contato.routes";   


const app = express()
app.use(express.json())
app.use(router)
app.use(ContatoRouter)

app.listen(3333, () => console.log('Servidor on'))