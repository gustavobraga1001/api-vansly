import { Prisma, Vehicle } from '@prisma/client'

export interface VehiclesRepository {
  create(data: Prisma.VehicleUncheckedCreateInput): Promise<Vehicle>
}
