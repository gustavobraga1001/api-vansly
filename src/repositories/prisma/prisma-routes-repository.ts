import { prisma } from '@/lib/prisma'
import { Period, Prisma } from '@prisma/client'
import { RoutesRepository } from '../routes-repository'

export class PrismaRoutesRepository implements RoutesRepository {
  async findByDateAndPeriod(date: Date, period: Period) {
    const route = await prisma.route.findFirst({
      where: {
        date,
        period,
      },
    })

    return route
  }

  async create(data: Prisma.RouteUncheckedCreateInput) {
    const route = await prisma.route.create({
      data,
    })

    return route
  }
}
