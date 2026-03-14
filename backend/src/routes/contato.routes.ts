import { Router } from 'express'
import ContatoController from '../controllers/ContatoController'

const contatoRouter = Router()

contatoRouter.post('/contato', ContatoController.enviarContato)

export default contatoRouter