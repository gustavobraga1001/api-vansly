import { PasswordReset, Prisma } from '@prisma/client'

export interface ResetPasswordRepository {
  create(data: Prisma.PasswordResetCreateInput): Promise<PasswordReset>
}
