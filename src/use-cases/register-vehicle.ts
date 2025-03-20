import { VehiclesRepository } from '@/repositories/vehicles-repository'

interface RegisterVehicleUseCaseRequest {
  model: string
  plate: string
  mark: string
  year: string
  totalCapacity: number
  driverId: string
}

export class RegisterVehicleUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async execute({
    model,
    plate,
    mark,
    year,
    totalCapacity,
    driverId,
  }: RegisterVehicleUseCaseRequest) {
    await this.vehiclesRepository.create({
      model,
      plate,
      mark,
      year,
      total_capacity: totalCapacity,
      driver_id: driverId,
    })
  }
}
