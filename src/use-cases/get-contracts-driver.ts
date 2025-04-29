import { ContractsRepository } from '@/repositories/contratcs-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { UsersRepository } from '@/repositories/users-repository'
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
    private usersRepository: UsersRepository,
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

    const contractsActives =
      await this.contractsRepository.findActiveContractsByDriverId(
        driver.driver.id,
      )

    const contracts = await Promise.all(
      contractsActives.map(async (contract) => {
        const user = await this.usersRepository.findById(contract.user_id)
        return {
          ...contract,
          user: {
            id: user?.id,
            name: user?.name,
            email: user?.email,
          },
        }
      }),
    )

    return {
      contracts,
    }
  }
}
