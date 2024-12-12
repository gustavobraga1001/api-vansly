import { Prisma, Route } from '@prisma/client'

export interface RoutesRepository {
  create(data: Prisma.RouteUncheckedCreateInput): Promise<Route>
}
