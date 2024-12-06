import { Driver, Prisma } from '@prisma/client'

export interface DriversRepository {
  findById(idDriver: string): Promise<Driver | null>
  create(data: Prisma.DriverUncheckedCreateInput): Promise<Driver>
}
