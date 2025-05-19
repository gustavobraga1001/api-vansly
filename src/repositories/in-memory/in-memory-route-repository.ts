import { Period, Prisma, Route } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { RoutesRepository } from '../routes-repository'

export class InMemoryRouteRepository implements RoutesRepository {
  items: Route[] = []

  async create(data: Prisma.RouteUncheckedCreateInput) {
    const route: Route = {
      id: randomUUID(),
      period: data.period,
      date: new Date(data.date),
      driver_id: data.driver_id,
      vehicle_id: data.vehicle_id,
    }

    this.items.push(route)

    return route
  }

  async findByDateAndPeriod(date: Date, period: Period) {
    const route = this.items.find(
      (item) =>
        item.date.getTime() === date.getTime() && item.period === period,
    )
    return route ?? null
  }

  async findById(id: string) {
    const route = this.items.find((item) => item.id === id)
    return route ?? null
  }
}
