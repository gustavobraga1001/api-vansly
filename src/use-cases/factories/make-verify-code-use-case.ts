import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaResetPasswordRepository } from '@/repositories/prisma/prisma-reset-password-repository'
import { VerifyCodeUseCase } from '../verify-code'

export function makeVerifyCodeUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const resetPasswordRepository = new PrismaResetPasswordRepository()
  const verifyCodeUseCase = new VerifyCodeUseCase(
    usersRepository,
    resetPasswordRepository,
  )

  return verifyCodeUseCase
}
