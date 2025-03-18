import { ContractsRepository } from '@/repositories/contratcs-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { Contract } from '@prisma/client'

interface GetContractsDriverUseCaseRequest {
  userId: string
  type: string
}

interface GetContractsDriverUseCaseResponse {
  contracts: Contract[] | null
}

export class GetContractsDriverUseCase {
  constructor(
    private contractsRepository: ContractsRepository,
    private driversRepository: DriversRepository,
  ) {}

  async execute({
    userId,
    type,
  }: GetContractsDriverUseCaseRequest): Promise<GetContractsDriverUseCaseResponse> {
    const driver = await this.driversRepository.findByUserId(userId)

    if (!driver || !driver.driver?.id) {
      throw new Error('Driver não encontrado')
    }

    if (type === 'PENDENTE') {
      const contracts =
        await this.contractsRepository.findPendingContractsByDriverId(
          driver.driver.id,
        )

      return {
        contracts,
      }
    }

    const contracts =
      await this.contractsRepository.findActiveContractsByDriverId(
        driver.driver.id,
      )

    return {
      contracts,
    }
  }
}
