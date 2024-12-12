import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { RoutesRepository } from '../routes-repository'

export class PrismaRoutesRepository implements RoutesRepository {
  async create(data: Prisma.RouteUncheckedCreateInput) {
    const route = await prisma.route.create({
      data,
    })

    return route
  }
}
