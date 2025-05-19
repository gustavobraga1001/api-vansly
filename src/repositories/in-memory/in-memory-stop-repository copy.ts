import { Prisma, RouteStop } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { RoutesStopsRepository } from '../routes-stops-repository'

export class InMemoryRoutesStopsRepository implements RoutesStopsRepository {
  items: RouteStop[] = []

  async create(data: Prisma.RouteStopUncheckedCreateInput) {
    const routeStop: RouteStop = {
      id: randomUUID(),
      route_id: data.route_id,
      stop_id: data.stop_id,
    }

    this.items.push(routeStop)

    return routeStop
  }

  async findByRouteId(routeId: string) {
    const routeStop = this.items.filter((item) => item.route_id === routeId)
    return routeStop ?? null
  }
}
