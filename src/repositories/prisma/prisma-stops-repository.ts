import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { StopsRepository } from '../stops-repository'

export class PrismaStopsRepository implements StopsRepository {
  async create(data: Prisma.StopCreateInput) {
    const stop = await prisma.stop.create({
      data,
    })

    return stop
  }
}
