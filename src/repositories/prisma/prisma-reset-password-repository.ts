import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ResetPasswordRepository } from '../reset-password-repository'

export class PrismaResetPasswordRepository implements ResetPasswordRepository {
  async create(data: Prisma.PasswordResetCreateInput) {
    const passwordReset = await prisma.passwordReset.create({
      data,
    })

    return passwordReset
  }
}
