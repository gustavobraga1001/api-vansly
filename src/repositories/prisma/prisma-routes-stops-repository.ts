import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { RoutesStopsRepository } from '../routes-stops-repository'

export class PrismaRoutesStopsRepository implements RoutesStopsRepository {
  async create(data: Prisma.RouteStopUncheckedCreateInput) {
    const routesStops = await prisma.routeStop.create({
      data,
    })

    return routesStops
  }
}
