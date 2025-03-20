import { PrismaRegisterVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { GetVehicleUseCase } from '../get-vehicle'

export function makeGetVehicleUseCase() {
  const vehicleRepository = new PrismaRegisterVehiclesRepository()
  const getVehicleUseCase = new GetVehicleUseCase(vehicleRepository)

  return getVehicleUseCase
}
