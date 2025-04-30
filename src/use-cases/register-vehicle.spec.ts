import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RegisterVehicleUseCase } from './register-vehicle'
import { VehiclesRepository } from '@/repositories/vehicles-repository'

describe('RegisterVehicleUseCase', () => {
  let vehiclesRepository: VehiclesRepository
  let registerVehicleUseCase: RegisterVehicleUseCase

  beforeEach(() => {
    vehiclesRepository = {
      create: vi.fn(), // mock da função create
    } as any

    registerVehicleUseCase = new RegisterVehicleUseCase(vehiclesRepository)
  })

  it('deve registrar um veículo com sucesso', async () => {
    const input = {
      model: 'Caminhão',
      plate: 'ABC-1234',
      mark: 'Volvo',
      year: '2020',
      totalCapacity: 5000,
      driverId: 'driver-123',
    }

    await registerVehicleUseCase.execute(input)

    expect(vehiclesRepository.create).toHaveBeenCalledOnce()
    expect(vehiclesRepository.create).toHaveBeenCalledWith({
      model: 'Caminhão',
      plate: 'ABC-1234',
      mark: 'Volvo',
      year: '2020',
      total_capacity: 5000,
      driver_id: 'driver-123',
    })
  })
})