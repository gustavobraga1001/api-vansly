import { Prisma, RouteStop } from '@prisma/client'

export interface RoutesStopsRepository {
  findByRouteId(routeId: string): Promise<RouteStop[] | null>
  create(data: Prisma.RouteStopUncheckedCreateInput): Promise<RouteStop>
}
