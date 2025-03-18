import { PrismaAbsencesRepository } from '@/repositories/prisma/prisma-absences-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'
import { CreateRouteUseCase } from '../create-route'
import { PrismaRegisterVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { PrismaStopsRepository } from '@/repositories/prisma/prisma-stops-repository'
import { PrismaRoutesRepository } from '@/repositories/prisma/prisma-routes-repository'
import { PrismaRoutesStopsRepository } from '@/repositories/prisma/prisma-routes-stops-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'

export function makeCreateRouteUseCase() {
  const absencesRepository = new PrismaAbsencesRepository()
  const usersRepository = new PrismaUsersRepository()
  const contractsRepository = new PrismaContractsRepository()
  const routesRepository = new PrismaRoutesRepository()
  const vehiclesRepository = new PrismaRegisterVehiclesRepository()
  const stopsRepository = new PrismaStopsRepository()
  const routesStopsRepository = new PrismaRoutesStopsRepository()
  const driversRepository = new PrismaDriversRepository()
  const createAbsenceUseCase = new CreateRouteUseCase(
    absencesRepository,
    usersRepository,
    contractsRepository,
    routesRepository,
    vehiclesRepository,
    stopsRepository,
    routesStopsRepository,
    driversRepository,
  )

  return createAbsenceUseCase
}
