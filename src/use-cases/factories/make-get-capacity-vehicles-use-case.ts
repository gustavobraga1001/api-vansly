import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { GetCapacityVehicleUseCase } from '../get-capacity-vehicle'
import { PrismaRegisterVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'

export function makeGetCapacityVehicleUseCase() {
  const contractRepository = new PrismaContractsRepository()
  const driversRepository = new PrismaDriversRepository()
  const vehicleRepository = new PrismaRegisterVehiclesRepository()
  const getCapacityVehicleUseCase = new GetCapacityVehicleUseCase(
    contractRepository,
    driversRepository,
    vehicleRepository,
  )

  return getCapacityVehicleUseCase
}
