import { Prisma, Stop } from '@prisma/client'

export interface StopsRepository {
  findByStopId(stopId: string): Promise<Stop | null>
  create(data: Prisma.StopCreateInput): Promise<Stop>
}
