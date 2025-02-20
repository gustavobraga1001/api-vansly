import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaResetPasswordRepository } from '@/repositories/prisma/prisma-reset-password-repository'
import { ResetPasswordUseCase } from '../reset-password'

export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const resetPasswordRepository = new PrismaResetPasswordRepository()
  const ResetPaswordUseCase = new ResetPasswordUseCase(
    usersRepository,
    resetPasswordRepository,
  )

  return ResetPaswordUseCase
}
