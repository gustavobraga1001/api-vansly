import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaResetPasswordRepository } from '@/repositories/prisma/prisma-reset-password-repository'
import { ResetPasswordUseCase } from '../reset-password'

export function makeVerifyCodeUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const resetPasswordRepository = new PrismaResetPasswordRepository()
  const verifyCodeUseCase = new ResetPasswordUseCase(
    usersRepository,
    resetPasswordRepository,
  )

  return verifyCodeUseCase
}
