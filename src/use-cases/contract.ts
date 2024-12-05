import { ContractsRepository } from '@/repositories/contratcs-repository'
import { Contract } from '@prisma/client'

interface ContractUseCaseRequest {
  shift: string
  boarding: string
  landing: string
  monthlyAmount: number
  status: boolean
  userId: string
  driverId: string
}

interface ContractUseCaseResponse {
  contract: Contract
}

export class ContractUseCase {
  constructor(private contractsRepository: ContractsRepository) {}

  async execute({
    shift,
    boarding,
    landing,
    monthlyAmount,
    status,
    userId,
    driverId,
  }: ContractUseCaseRequest): Promise<ContractUseCaseResponse> {
    const contract = await this.contractsRepository.create({
      shift,
      boarding,
      landing,
      monthlyAmount,
      status,
      user_id: userId,
      driver_id: driverId,
    })

    return { contract }
  }
}
