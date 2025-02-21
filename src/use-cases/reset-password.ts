import { UsersRepository } from '@/repositories/users-repository'
import { ResetPasswordRepository } from '@/repositories/reset-password-repository'
import { UserNotAlredyExistsError } from './errors/user-not-already-exists'
import Axios from 'axios'
import { env } from '@/env'

interface ResetPasswordRequest {
  email: string
  phoneNumber: string
}

export class ResetPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private resetPasswordRepository: ResetPasswordRepository,
  ) {}

  // Função para enviar SMS
  private async sendSms(phoneNumber: string, code: string) {
    const url = `https://rest-api.telesign.com/v1/messaging`

    try {
      const response = await Axios.post(
        url,
        {
          phone_number: `55${phoneNumber}`,
          message: `Your code is ${code}`,
          message_type: 'ARN', // Tipo de mensagem
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(env.CUSTOMERID + ':' + env.APIKEY).toString('base64')}`,
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.status === 200) {
        console.log('SMS enviado com sucesso')
      } else {
        console.error('Erro ao enviar SMS', response.data)
      }
    } catch (error) {
      console.error(
        'Erro ao enviar SMS:',
        error.response ? error.response.data : error.message,
      )
    }
  }

  async execute({ email, phoneNumber }: ResetPasswordRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotAlredyExistsError()
    }

    console.log(user)

    // Gerar código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // Expira em 5 minutos
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    // Enviar SMS com o código
    await this.sendSms(phoneNumber, code)

    console.log('E-mail enviado com sucesso!')

    // Salvar código no banco de dados
    await this.resetPasswordRepository.create({
      code,
      expiresAt,
      user: { connect: { id: user.id } },
    })
  }
}
