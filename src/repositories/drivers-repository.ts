import { Driver, Prisma, User } from '@prisma/client'

export interface DriversRepository {
  findById(idDriver: string): Promise<Driver | null>
  findByUserId(
    userId: string,
  ): Promise<{ user: User | null; driver: Driver | null } | null>
  create(data: Prisma.DriverUncheckedCreateInput): Promise<Driver>
}
