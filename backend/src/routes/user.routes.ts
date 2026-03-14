import {Router} from "express"
import UserController from "../controllers/UserController"

const router = Router()

router.post('/', UserController.cadastrarUser)
router.get('/', UserController.buscarUser)
router.get('/:id', UserController.consultarUser)
router.delete('/:id', UserController.deletarUser)
router.put('/:id', UserController.alterarUser)

export {router}