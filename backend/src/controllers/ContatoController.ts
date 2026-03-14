import { Request, Response } from 'express'
import nodemailer from "nodemailer"

class contatoController{
    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    enviarContato = async (req: Request, res: Response) => {
        const { nome, email, mensagem } = req.body

        try{
            await this.transporter.sendMail({
                from: `"${nome}" <${email}>`,
                to: process.env.EMAIL_USER,
                subject: "Novo contato do site",
                text: `
                    Nome: ${nome}
                    Email: ${email}
                    Mensagem: ${mensagem}
                `
            })
            res.status(200).json({ mensagem: 'Email enviado com sucesso' })
        } catch (err: any) {
            console.log(err)
            res.status(500).json({ err: 'Erro ao enviar o email' })
        }
    }
}

export default new contatoController()
