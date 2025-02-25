import { UsersRepository } from '@/repositories/users-repository'
import { ResetPasswordRepository } from '@/repositories/reset-password-repository'
import { UserNotAlredyExistsError } from './errors/user-not-already-exists'

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

    // Buscar código vinculado ao email do usuário
    const codeVerify = await this.resetPasswordRepository.findByEmailAndCode(
      user.id,
      code,
    )

    if (!codeVerify) {
      throw new Error('Código inválido')
    }

    // console.log(new Date() < codeVerify.expiresAt)

    // Verificar se o código ainda é válido
    if (codeVerify.expiresAt < new Date()) {
      console.log('caius')
      throw new Error('Código expirado')
    }

    return { isValid: true }
  }
}
