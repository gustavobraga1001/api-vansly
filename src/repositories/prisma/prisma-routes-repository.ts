import { prisma } from '@/lib/prisma'
import { Period, Prisma } from '@prisma/client'
import { RoutesRepository } from '../routes-repository'
import { startOfDay, endOfDay } from 'date-fns'

export class PrismaRoutesRepository implements RoutesRepository {
  async findById(id: string) {
    const route = await prisma.route.findFirst({
      where: {
        id,
      },
    })

    return route
  }

  async findByDateAndPeriod(date: Date, period: Period) {
    const route = await prisma.route.findFirst({
      where: {
        date: {
          gte: startOfDay(date), // Data maior ou igual ao início do dia
          lte: endOfDay(date), // Data menor ou igual ao fim do dia
        },
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
