import { Prisma, Stop } from '@prisma/client'

export interface StopsRepository {
  updateStop(stop: Stop): Promise<Stop>
  findByStopId(stopId: string): Promise<Stop | null>
  create(data: Prisma.StopCreateInput): Promise<Stop>
}
