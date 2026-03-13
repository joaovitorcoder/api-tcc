import {Router, Response, Request} from "express"
import prismaClient from "./prisma"

const router = Router()

router.post('/', async (req, res) => {
    const {telefone, senha, nome, data} = req.body
    try {
    const novousuario = await prismaClient.usuario.create({
      data: {
        telefone,
        senha,
        nome,
        data: new Date(data)
        
      }
    });
    res.status(201).json(novousuario);
  } catch (err: any) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuario', detalhe: err.message });
  }
})
router.get('/', (req: Request, res: Response) => {
    res.json({nome: 'jv'})
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const usuario = await prismaClient.usuario.delete({
      where: { id }
    })
    res.json({ mensagem: 'Usuario deletado', usuario })
  } catch (err: any) {
    res.status(404).json({ erro: 'Usuario não encontrado', detalhe: err.message })
  }
})

export {router}