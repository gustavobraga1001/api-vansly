import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const driversRepository = new PrismaDriversRepository()
  const getuserProfileuseCase = new GetUserProfileUseCase(
    usersRepository,
    driversRepository,
  )

  return getuserProfileuseCase
}
