import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AlterPasswordUseCase } from '../alter-password'

export function makeAlterPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const alterPasswordUseCase = new AlterPasswordUseCase(usersRepository)

  return alterPasswordUseCase
}
