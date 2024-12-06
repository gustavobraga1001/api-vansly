import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { DriversRepository } from '../drivers-repository'

export class PrismaDriversRepository implements DriversRepository {
  async findById(id: string) {
    const driver = await prisma.driver.findUnique({
      where: {
        id,
      },
    })

    return driver
  }

  async create(data: Prisma.DriverUncheckedCreateInput) {
    const driver = await prisma.driver.create({
      data,
    })

    return driver
  }
}
