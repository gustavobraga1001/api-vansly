import { describe, it, expect, beforeEach } from 'vitest'
import { GetCapacityVehicleUseCase } from './get-capacity-vehicle'
import { InmemoryDriversRepository } from '@/repositories/in-memory/in-memory-drivers-repository'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { InMemoryContractsRepository } from '@/repositories/in-memory/in-memory-contracts-repository copy'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let vehiclesRepository: InMemoryVehiclesRepository
let contractsRepository: InMemoryContractsRepository
let driversRepository: InmemoryDriversRepository
let usersRepository: InmemoryUsersRepository
let sut: GetCapacityVehicleUseCase

describe('Get Capacity Vehicle Use Case', () => {
  beforeEach(() => {
    usersRepository = new InmemoryUsersRepository()
    vehiclesRepository = new InMemoryVehiclesRepository()
    contractsRepository = new InMemoryContractsRepository()
    driversRepository = new InmemoryDriversRepository(usersRepository)
    sut = new GetCapacityVehicleUseCase(
      contractsRepository,
      driversRepository,
      vehiclesRepository,
    )
  })

  it('deve registrar um veículo com sucesso', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: 'hashed_password',
    })
    const driver = await driversRepository.create({
      user_id: user.id,
      cnh: '12345678900',
      cpf: '12345678900',
    })

    await vehiclesRepository.create({
      model: 'Caminhão',
      plate: 'ABC-1234',
      mark: 'Volvo',
      year: '2020',
      total_capacity: 20,
      driver_id: driver.id,
    })

    const capacityVehicle = await sut.execute({ userId: user.id })

    expect(capacityVehicle).toEqual(
      expect.objectContaining({
        MANHA: expect.objectContaining({
          remainingCapacity: expect.any(Number),
          occupancyPercentage: expect.any(Number),
        }),
        TARDE: expect.objectContaining({
          remainingCapacity: expect.any(Number),
          occupancyPercentage: expect.any(Number),
        }),
        NOITE: expect.objectContaining({
          remainingCapacity: expect.any(Number),
          occupancyPercentage: expect.any(Number),
        }),
      }),
    )
  })
})
