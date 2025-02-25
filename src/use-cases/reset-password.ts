import { UsersRepository } from '@/repositories/users-repository'
import { ResetPasswordRepository } from '@/repositories/reset-password-repository'
import { UserNotAlredyExistsError } from './errors/user-not-already-exists'
import send from '@/lib/mail'

interface ResetPasswordRequest {
  email: string
}

export class ResetPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private resetPasswordRepository: ResetPasswordRepository,
  ) {}

  async execute({ email }: ResetPasswordRequest) {
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
    send(user.email, 'Codigo de verificação', code)

    // Salvar código no banco de dados
    await this.resetPasswordRepository.create({
      code,
      expiresAt,
      user: { connect: { id: user.id } },
    })
  }
}
