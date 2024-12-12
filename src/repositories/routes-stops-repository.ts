import { Prisma, RouteStop } from '@prisma/client'

export interface RoutesStopsRepository {
  create(data: Prisma.RouteStopUncheckedCreateInput): Promise<RouteStop>
}
