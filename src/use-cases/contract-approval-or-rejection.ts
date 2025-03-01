import { ContractsRepository } from '@/repositories/contratcs-repository'
import { StageContract } from '@prisma/client'

interface ContractApprovalorRejectionUseCaseRequest {
  contractId: string
  status: StageContract
}

export class ContractApprovalorRejectionUseCase {
  constructor(private contractRepository: ContractsRepository) {}

  async execute({
    contractId,
    status,
  }: ContractApprovalorRejectionUseCaseRequest) {
    const contract = await this.contractRepository.alterStatusContract(
      contractId,
      status,
    )

    if (!contract) {
      throw new Error('Contract is not asseble')
    }
  }
}
