import { beforeEach, describe, expect, it } from 'vitest'
import { GetVehicleUseCase } from './get-vehicle'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'

let inMemoryVehiclesRepository: InMemoryVehiclesRepository
let sut: GetVehicleUseCase

describe('Get Vehicle Use Case', () => {
  beforeEach(() => {
    inMemoryVehiclesRepository = new InMemoryVehiclesRepository()

    sut = new GetVehicleUseCase(inMemoryVehiclesRepository)
  })

  it('should be able to get details the vehicle', async () => {
    const input = {
      model: 'Caminhão',
      plate: 'ABC-1234',
      mark: 'Volvo',
      year: '2020',
      totalCapacity: 20,
      driver_id: 'driver-123',
    }

    const createdVehicle = await inMemoryVehiclesRepository.create({
      model: input.model,
      plate: input.plate,
      mark: input.mark,
      year: input.year,
      total_capacity: input.totalCapacity,
      driver_id: input.driver_id,
    })

    const { vehicle } = await sut.execute({
      driverId: createdVehicle.driver_id,
    })

    expect(vehicle.plate).toEqual('ABC-1234')
  })

  it('not should be able to get details the vehicle', async () => {
    await expect(() =>
      sut.execute({
        driverId: 'driver-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
