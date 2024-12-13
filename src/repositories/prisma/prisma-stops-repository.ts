import { prisma } from '@/lib/prisma'
import { Prisma, Stop } from '@prisma/client'
import { StopsRepository } from '../stops-repository'

export class PrismaStopsRepository implements StopsRepository {
  async updateStop(stop: Stop) {
    return prisma.stop.update({ where: { id: stop.id }, data: stop })
  }

  async findByStopId(stopId: string) {
    const stops = await prisma.stop.findFirst({
      where: {
        id: stopId,
      },
    })

    return stops
  }

  async create(data: Prisma.StopCreateInput) {
    const stop = await prisma.stop.create({
      data,
    })

    return stop
  }
}
