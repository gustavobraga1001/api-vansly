import { PrismaStopsRepository } from '@/repositories/prisma/prisma-stops-repository'
import { PrismaRoutesRepository } from '@/repositories/prisma/prisma-routes-repository'
import { PrismaRoutesStopsRepository } from '@/repositories/prisma/prisma-routes-stops-repository'
import { GetRouteStudentUseCase } from '../get-route-student'

export function makeGetRouteStudentUseCase() {
  const routesRepository = new PrismaRoutesRepository()
  const stopsRepository = new PrismaStopsRepository()
  const routesStopsRepository = new PrismaRoutesStopsRepository()
  const getRouteStudentUseCase = new GetRouteStudentUseCase(
    routesRepository,
    stopsRepository,
    routesStopsRepository,
  )

  return getRouteStudentUseCase
}
