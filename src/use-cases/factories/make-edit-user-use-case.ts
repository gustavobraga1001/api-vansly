import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { EditUserProfileUseCase } from '../edit-user-profile'

export function makeEditUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const editUserUseCase = new EditUserProfileUseCase(usersRepository)

  return editUserUseCase
}
