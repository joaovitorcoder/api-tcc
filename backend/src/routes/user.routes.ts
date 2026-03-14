import { Router } from "express"
import UserController from "../controllers/UserController"

const userRoutes = Router()

userRoutes.post('/', UserController.cadastrarUser)
userRoutes.get('/', UserController.buscarUser)
userRoutes.get('/:id', UserController.consultarUser)
userRoutes.delete('/:id', UserController.deletarUser)
userRoutes.put('/:id', UserController.alterarUser)

export default userRoutes