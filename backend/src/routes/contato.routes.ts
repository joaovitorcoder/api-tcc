import { Router } from 'express'
import { enviarContato } from '../controllers/ContatoController'

const router = Router()

router.post('/contato', enviarContato)

export { router as ContatoRouter }