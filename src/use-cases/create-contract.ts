import { ContractsRepository } from '@/repositories/contratcs-repository'
import { Contract, Period } from '@prisma/client'

interface ContractUseCaseRequest {
  period: Period
  boarding: string
  landing: string
  institution: string
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
    period,
    boarding,
    landing,
    institution,
    monthlyAmount,
    status,
    userId,
    driverId,
  }: ContractUseCaseRequest): Promise<ContractUseCaseResponse> {
    const contract = await this.contractsRepository.create({
      period,
      boarding,
      landing,
      institution,
      monthlyAmount,
      status,
      user_id: userId,
      driver_id: driverId,
    })

    return { contract }
  }
}
