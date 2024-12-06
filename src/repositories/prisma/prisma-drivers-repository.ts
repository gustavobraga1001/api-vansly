import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { DriversRepository } from '../drivers-repository'

export class PrismaDriversRepository implements DriversRepository {
  async findByUserId(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return null
    }
    const driver = await prisma.driver.findUnique({
      where: { user_id: userId },
    })
    return { user, driver }
  }

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
