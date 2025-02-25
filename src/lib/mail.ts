import nodemailer from 'nodemailer'
import { env } from '../env/index'

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
})

const send = (to: string, subject: string, body: string) => {
  transporter.sendMail({
    from: 'suporte@vansly.com',
    to,
    subject,
    text: body,
  })
}

export default send
