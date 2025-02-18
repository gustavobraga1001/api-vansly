import { Prisma, Vehicle } from '@prisma/client'

export interface VehiclesRepository {
  findById(vehicleId: string): Promise<Vehicle | null>
  findByDriverId(vehicleId: string): Promise<Vehicle | null>
  create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle>
}
