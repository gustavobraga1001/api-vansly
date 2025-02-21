import { UsersRepository } from '@/repositories/users-repository'
import { UserNotAlredyExistsError } from './errors/user-not-already-exists'
import { hash } from 'bcryptjs'

interface AlterPasswordRequest {
  email: string
  newPassword: string
}

export class AlterPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, newPassword }: AlterPasswordRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotAlredyExistsError()
    }

    const hashedPassword = await hash(newPassword, 6)

    const userWithNewPassword = await this.usersRepository.alterPassword(
      user.id,
      hashedPassword,
    )

    return userWithNewPassword
  }
}
