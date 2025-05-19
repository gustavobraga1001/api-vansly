import { Prisma, Stop } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { StopsRepository } from '../stops-repository'

export class InMemoryStopRepository implements StopsRepository {
  items: Stop[] = []

  async create(data: Prisma.StopCreateInput) {
    const stop: Stop = {
      id: randomUUID(),
      address: data.address,
      status: data.status,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user?.connect?.id ?? 'default-user-id', // Ajuste conforme necessário
    }

    this.items.push(stop)

    return stop
  }

  async findByStopId(stopId: string) {
    const stop = this.items.find((item) => item.id === stopId)
    return stop ?? null
  }

  async updateStop(stop: Stop) {
    const stopIndex = this.items.findIndex((item) => item.id === stop.id)

    if (stopIndex === -1) {
      throw new Error('Stop not found')
    }

    this.items[stopIndex] = stop

    return stop
  }
}
