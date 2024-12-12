import { PrismaAnnouncementRepository } from '@/repositories/prisma/prisma-announcement-repository'
import { GetAllAnnoucementsUseCase } from '../get-all-announcement'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaRegisterVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'

export function makeGetAllAnnouncementsUseCase() {
  const announcementRepository = new PrismaAnnouncementRepository()
  const driversRepository = new PrismaDriversRepository()
  const usersRepository = new PrismaUsersRepository()
  const vehiclesRepository = new PrismaRegisterVehiclesRepository()
  const getAllAnnouncementsUseCase = new GetAllAnnoucementsUseCase(
    announcementRepository,
    driversRepository,
    vehiclesRepository,
    usersRepository,
  )

  return getAllAnnouncementsUseCase
}