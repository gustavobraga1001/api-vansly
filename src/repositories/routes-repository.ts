import { Period, Prisma, Route } from '@prisma/client'

export interface RoutesRepository {
  findByDateAndPeriod(date: Date, period: Period): Promise<Route | null>
  create(data: Prisma.RouteUncheckedCreateInput): Promise<Route>
}
