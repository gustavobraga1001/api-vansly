import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { RegisterDriverUseCase } from '../registerDriver'

export function makeRegisterDriverUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const driversRepository = new PrismaDriversRepository()
  const registerDriverUseCase = new RegisterDriverUseCase(
    usersRepository,
    driversRepository,
  )

  return registerDriverUseCase
}
