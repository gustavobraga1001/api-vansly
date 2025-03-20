import { VehiclesRepository } from '@/repositories/vehicles-repository'

interface GetVehicleUseCaseRequest {
  driverId: string
}

export class GetVehicleUseCase {
  constructor(private vehicleRepository: VehiclesRepository) {}

  async execute({ driverId }: GetVehicleUseCaseRequest) {
    const vehicle = await this.vehicleRepository.findByDriverId(driverId)

    if (!vehicle) {
      throw new Error('Veículo não encontrado')
    }
    return {
      vehicle,
    }
  }
}
