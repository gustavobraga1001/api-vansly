import { PrismaAnnouncementRepository } from '@/repositories/prisma/prisma-announcement-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaRegisterVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { GetSpecificAnnoucementUseCase } from '../get-specific-announcement'

export function makeGetSpecificAnnouncementUseCase() {
  const announcementRepository = new PrismaAnnouncementRepository()
  const driversRepository = new PrismaDriversRepository()
  const usersRepository = new PrismaUsersRepository()
  const vehiclesRepository = new PrismaRegisterVehiclesRepository()
  const getSpecificAnnouncementUseCase = new GetSpecificAnnoucementUseCase(
    announcementRepository,
    driversRepository,
    vehiclesRepository,
    usersRepository,
  )

  return getSpecificAnnouncementUseCase
}
