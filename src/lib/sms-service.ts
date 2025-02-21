import twilio from 'twilio'
import { env } from '@/env'

const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)

export async function sendSms(to: string, message: string) {
  try {
    const response = await client.messages.create({
      body: message,
      from: env.TWILIO_PHONE_NUMBER,
      to,
    })

    console.log('SMS enviado com sucesso:', response.sid)
  } catch (error) {
    console.error('Erro ao enviar SMS:', error)
    throw new Error('Falha ao enviar SMS')
  }
}
