import { ContractsRepository } from '@/repositories/contratcs-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { VehiclesRepository } from '@/repositories/vehicles-repository'
import { Contract } from '@prisma/client'

interface GetCapacityVehicleUseCaseRequest {
  userId: string
}

export class GetCapacityVehicleUseCase {
  constructor(
    private contractsRepository: ContractsRepository,
    private driversRepository: DriversRepository,
    private vehicleRepository: VehiclesRepository,
  ) {}

  async execute({ userId }: GetCapacityVehicleUseCaseRequest) {
    const driver = await this.driversRepository.findByUserId(userId)

    if (!driver?.driver) {
      throw new Error('Driver não encontrado')
    }

    const vehicle = await this.vehicleRepository.findByDriverId(
      driver.driver.id,
    )

    if (!vehicle) {
      throw new Error('Veículo não encontrado')
    }

    // Inicializa as variáveis para armazenar a capacidade restante por período
    let capacityManha = vehicle.total_capacity.toNumber() // Capacidade dividida por 3 períodos
    let capacityTarde = vehicle.total_capacity.toNumber()
    let capacityNoite = vehicle.total_capacity.toNumber()

    const contracts =
      await this.contractsRepository.findActiveContractsByDriverId(
        driver.driver.id,
      )

    // Percorre todos os contratos e subtrai a quantidade de cada período
    contracts.forEach((contract: Contract) => {
      switch (contract.period) {
        case 'MANHA':
          capacityManha -= 1 // Subtrai 1 para cada contrato no período manhã
          break
        case 'TARDE':
          capacityTarde -= 1 // Subtrai 1 para cada contrato no período tarde
          break
        case 'NOITE':
          capacityNoite -= 1 // Subtrai 1 para cada contrato no período noite
          break
        default:
          // Se o período não for um dos esperados, podemos ignorar ou lançar um erro
          break
      }
    })

    // Calcula a porcentagem de ocupação para cada período
    const percentageManha =
      ((vehicle.total_capacity.toNumber() - capacityManha) /
        vehicle.total_capacity.toNumber()) *
      100
    const percentageTarde =
      ((vehicle.total_capacity.toNumber() - capacityTarde) /
        vehicle.total_capacity.toNumber()) *
      100
    const percentageNoite =
      ((vehicle.total_capacity.toNumber() - capacityNoite) /
        vehicle.total_capacity.toNumber()) *
      100

    // Retorna a capacidade restante e a porcentagem de ocupação por período
    return {
      MANHA: {
        remainingCapacity: capacityManha,
        occupancyPercentage: percentageManha,
      },
      TARDE: {
        remainingCapacity: capacityTarde,
        occupancyPercentage: percentageTarde,
      },
      NOITE: {
        remainingCapacity: capacityNoite,
        occupancyPercentage: percentageNoite,
      },
    }
  }
}
