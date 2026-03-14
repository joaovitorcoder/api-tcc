import { Request, Response } from 'express'
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const enviarContato = async (req: Request, res: Response) => {
    const { nome, email, mensagem } = req.body

    try{
        await transporter.sendMail({
            from: `"${nome}" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: "Novo contato do site",
            text: `
                Nome: ${nome}
                Email: ${email}
                Mensagem: ${mensagem}
            `
        })
        res.status(200).json({ mensagem: "Email enviado com sucesso" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ erro: "Erro ao enviar o email" })
    }
}