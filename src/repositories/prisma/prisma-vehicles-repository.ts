import { prisma } from '@/lib/prisma'
import { Prisma, Vehicle } from '@prisma/client'
import { VehiclesRepository } from '../vehicles-repository'

export class PrismaRegisterVehiclesRepository implements VehiclesRepository {
  async findById(vehicleId: string): Promise<Vehicle | null> {
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: vehicleId,
      },
    })

    return vehicle
  }

  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = await prisma.vehicle.create({
      data,
    })

    return vehicle
  }
}
