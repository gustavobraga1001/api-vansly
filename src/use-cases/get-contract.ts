import { ContractsRepository } from '@/repositories/contratcs-repository'
import { Contract } from '@prisma/client'

interface GetContractUseCaseRequest {
  userId: string
}

interface GetContractUseCaseResponse {
  contract: Contract | null
}

export class GetContractUseCase {
  constructor(private contractsRepository: ContractsRepository) {}

  async execute({
    userId,
  }: GetContractUseCaseRequest): Promise<GetContractUseCaseResponse> {
    const contract = await this.contractsRepository.findByUserId(userId)

    return { contract }
  }
}
