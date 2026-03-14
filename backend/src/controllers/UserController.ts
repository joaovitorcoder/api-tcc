import { Response, Request } from "express"
import prismaClient from "../prisma"

class UserController {

    //buscar usuarios cadastrados
    async buscarUser(req: Request, res: Response){
        try{
            const usuarios = await prismaClient.usuario.findMany()
            res.json(usuarios)
        } catch (err: any) {
            res.status(500).json({ 
                err: 'Erro ao buscar os usuarios',
                detalhe: err
            })
        }
    }

    //buscar usuario por id
    async consultarUser(req: Request, res: Response){
        const id = Number(req.params.id)
        try{
            const usuario = await prismaClient.usuario.findUnique({
                where: { id: id}
            })
            res.json(usuario)
        } catch (err: any) {
            res.status(500).json({
                err: 'Erro ao buscar o usuario',
                detalhe: err.message
            })
        }
    }

    //cadastrar usuarios
    async cadastrarUser(req: Request, res: Response){
        const {telefone, senha, nome, data} = req.body
        try{
            const novoUsuario = await prismaClient.usuario.create({
                data: {
                    telefone,
                    senha,
                    nome,
                    data: new Date(data)
                }
            })
            res.status(201).json(novoUsuario)
        } catch (err: any) {
            res.status(500).json({
                err: 'Erro ao cadastrar novo usuario',
                detalhe: err.message
            })
        }
    }

    //deletar usuario por id 
    async deletarUser(req: Request, res: Response){
        const id = Number(req.params.id)
        try{
            const usuario = await prismaClient.usuario.delete({
                where: { id }
            })
            res.json({ mensagem: 'Usuario deletado', usuario })
        } catch (err: any) {
            res.status(404).json({
                err: 'Usuario nao encontrado',
                detalhe: err.message
            })
        }
    }
    
    //alterar usuario por id
    async alterarUser(req: Request, res: Response){
        try{
            const { id } = req.params
            const {telefone, senha, nome, data} = req.body
            const usuarioAtualizado = await prismaClient.usuario.update({
                where: { id: Number(id) },
                data: {
                    telefone,
                    senha,
                    nome,
                    data: new Date(data)
                }
            })
            res.json(usuarioAtualizado)
        } catch (err: any) {
            res.status(500).json({
                err: 'Erro ao alterar o usuario',
                detalhe: err.message
            })
        }
    }
}

export default new UserController()