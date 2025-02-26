import { PrismaAnnouncementRepository } from '@/repositories/prisma/prisma-announcement-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaRegisterVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { GetSpecificAnnouncementUseCase } from '../get-specific-announcement'
import { PrismaUploadImageRepository } from '@/repositories/prisma/prisma-image-repository'

export function makeGetSpecificAnnouncementUseCase() {
  const announcementRepository = new PrismaAnnouncementRepository()
  const driversRepository = new PrismaDriversRepository()
  const usersRepository = new PrismaUsersRepository()
  const vehiclesRepository = new PrismaRegisterVehiclesRepository()
  const imageRepository = new PrismaUploadImageRepository()
  const getSpecificAnnouncementUseCase = new GetSpecificAnnouncementUseCase(
    announcementRepository,
    driversRepository,
    vehiclesRepository,
    usersRepository,
    imageRepository,
  )

  return getSpecificAnnouncementUseCase
}
