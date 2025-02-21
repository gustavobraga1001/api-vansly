import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ResetPasswordRepository } from '../reset-password-repository'

export class PrismaResetPasswordRepository implements ResetPasswordRepository {
  async findByEmailAndCode(userId: string, code: string) {
    const resetPasswordWithSameCode = await prisma.passwordReset.findFirst({
      where: {
        code,
        user_id: userId,
      },
    })

    return resetPasswordWithSameCode
  }

  async create(data: Prisma.PasswordResetCreateInput) {
    const passwordReset = await prisma.passwordReset.create({
      data,
    })

    return passwordReset
  }
}
