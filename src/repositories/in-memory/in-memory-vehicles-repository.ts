import { Prisma, Vehicle } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'
import { VehiclesRepository } from '../vehicles-repository'

export class InMemoryVehiclesRepository implements VehiclesRepository {
  items: Vehicle[] = []

  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = {
      id: randomUUID(),
      model: data.model,
      plate: data.plate,
      mark: data.mark,
      year: data.year,
      total_capacity: new Decimal(data.year),
      driver_id: data.driver_id,
    }

    this.items.push(vehicle)

    return vehicle
  }

  async findById(vehicleId: string) {
    const vehicle = this.items.find((item) => item.id === vehicleId)
    return vehicle ?? null
  }

  async findByDriverId(driverId: string) {
    const vehicle = this.items.find((item) => item.driver_id === driverId)
    return vehicle ?? null
  }
}
