import { VehiclesRepository } from '@/repositories/vehicles-repository'

interface RegisterVehicleUseCaseRequest {
  model: string
  plate: string
  mark: string
  year: string
  driverId: string
}

export class RegisterVehicleUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async execute({
    model,
    plate,
    mark,
    year,
    driverId,
  }: RegisterVehicleUseCaseRequest) {
    await this.vehiclesRepository.create({
      model,
      plate,
      mark,
      year,
      driver_id: driverId,
    })
  }
}
