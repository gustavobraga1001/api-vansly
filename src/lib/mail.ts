import nodemailer from 'nodemailer'
import { env } from '../env/index'

export const createTransporter = () => {
  // Defina o serviço de e-mail e as credenciais
  return nodemailer.createTransport({
    service: 'gmail', // Ou outro provedor, por exemplo, 'smtp.mailtrap.io'
    auth: {
      user: env.EMAIL_USER, // Usuário de e-mail
      pass: env.EMAIL_PASS, // Senha do e-mail
    },
  })
}
