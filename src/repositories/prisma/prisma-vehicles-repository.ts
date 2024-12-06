import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { VehiclesRepository } from '../vehicles-repository'

export class PrismaRegisterVehiclesRepository implements VehiclesRepository {
  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = await prisma.vehicle.create({
      data,
    })

    return vehicle
  }
}
