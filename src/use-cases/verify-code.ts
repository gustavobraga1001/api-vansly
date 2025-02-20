import { UsersRepository } from '@/repositories/users-repository'
import { ResetPasswordRepository } from '@/repositories/reset-password-repository'
import { createTransporter } from '@/lib/mail'
import { UserNotAlredyExistsError } from './errors/user-not-already-exists'
import { env } from '@/env'

interface VerifyCodeRequest {
  email: string
  code: string
}

export class VerifyCodeUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private resetPasswordRepository: ResetPasswordRepository,
  ) {}

  async execute({ email, code }: VerifyCodeRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotAlredyExistsError()
    }

    const code = await this.resetPasswordRepository.findByEmail(email, code)

    // Gerar código de 6 dígitos

    // Expira em 5 minutos
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    const transporter = createTransporter()

    // Enviar e-mail
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: email,
      subject: 'Redefinição de Senha',
      text: `Seu código de verificação é: ${code}`,
    })

    // Salvar código no banco de dados
    await this.resetPasswordRepository.create({
      code,
      expiresAt,
      user: { connect: { id: user.id } },
    })
  }
}
