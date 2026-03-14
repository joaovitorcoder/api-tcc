import {Router, Response, Request, request, response} from "express"
import prismaClient from "../prisma"

//buscar usuarios
const buscarUser = async (req: Request, res: Response) => {
    try{
        const usuarios = await prismaClient.usuario.findMany()
        res.json(usuarios)
    } catch (error: any) {
        res.status(500).json({ error: 'erro ao buscar os usuarios', detalhe: error.message})
    }
}

//consultar usuario por id
const consultarUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
        const usuario = await prismaClient.usuario.findUnique({
            where: { id: id }
        })
        res.json(usuario)
    } catch (error: any) {
        res.status(500).json({
            erro: 'Erro ao buscar o usuario',
            detalhe: error.message
        })
    }
}

//cadastrar usuarios
const cadastrarUser = async (req: Request, res: Response) => {
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
        res.status(500).json({ erro: 'Erro ao cadastrar usuario', detalhe: err.message})
    }
}

//deletar usuario por id 
const deletarUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try{
        const usuario = await prismaClient.usuario.delete({
            where: { id }
        })
        res.json({ mensagem: 'Usuario deletado', usuario })
    } catch (err: any) {
        res.status(404).json({ erro: 'Usuario nao encontrado', detalhe: err.message })
    }
}

//alterar usuario por id
const alterarUser = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const { telefone, senha, nome, data } = req.body
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
        res.status(500).json({ erro: 'Erro ao alterar o usuario', detalhe: err.message })
    }
}

export default {
    buscarUser,
    consultarUser,
    cadastrarUser,
    deletarUser,
    alterarUser
}