import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { PrismaImageDocumentsRepository } from '@/repositories/prisma/prisma-image-documents-repository'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const driversRepository = new PrismaDriversRepository()
  const imagesDocumentRepository = new PrismaImageDocumentsRepository()
  const getuserProfileuseCase = new GetUserProfileUseCase(
    usersRepository,
    driversRepository,
    imagesDocumentRepository,
  )

  return getuserProfileuseCase
}
