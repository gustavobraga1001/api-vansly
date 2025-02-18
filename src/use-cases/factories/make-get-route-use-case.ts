import { PrismaStopsRepository } from '@/repositories/prisma/prisma-stops-repository'
import { PrismaRoutesRepository } from '@/repositories/prisma/prisma-routes-repository'
import { PrismaRoutesStopsRepository } from '@/repositories/prisma/prisma-routes-stops-repository'
import { GetRouteUseCase } from '../get-route'

export function makeGetRouteUseCase() {
  const routesRepository = new PrismaRoutesRepository()
  const stopsRepository = new PrismaStopsRepository()
  const routesStopsRepository = new PrismaRoutesStopsRepository()
  const getRouteUseCase = new GetRouteUseCase(
    routesRepository,
    stopsRepository,
    routesStopsRepository,
  )

  return getRouteUseCase
}
