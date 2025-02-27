import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { RegisterDriverUseCase } from '../registerDriver'
import { PrismaImageDocumentsRepository } from '@/repositories/prisma/prisma-image-documents-repository'

export function makeRegisterDriverUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const driversRepository = new PrismaDriversRepository()
  const imagesDocumentsRepository = new PrismaImageDocumentsRepository()
  const registerDriverUseCase = new RegisterDriverUseCase(
    usersRepository,
    driversRepository,
    imagesDocumentsRepository,
  )

  return registerDriverUseCase
}
