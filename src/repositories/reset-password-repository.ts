import { PasswordReset, Prisma } from '@prisma/client'

export interface ResetPasswordRepository {
  create(data: Prisma.PasswordResetCreateInput): Promise<PasswordReset>
  findByEmailAndCode(
    userId: string,
    code: string,
  ): Promise<PasswordReset | null>
}
