import { Prisma, Stop } from '@prisma/client'

export interface StopsRepository {
  create(data: Prisma.StopCreateInput): Promise<Stop>
}
