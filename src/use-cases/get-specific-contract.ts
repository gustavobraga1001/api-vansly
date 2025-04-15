import { ContractsRepository } from '@/repositories/contratcs-repository'
import { UsersRepository } from '@/repositories/users-repository'

export class GetSpecificContractUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private contractsRepository: ContractsRepository,
  ) {}

  async execute(contractId: string) {
    console.log(contractId)
    const contract = await this.contractsRepository.findById(contractId)

    if (!contract) {
      throw new Error('Contract not found')
    }

    const user = await this.usersRepository.findById(contract.user_id)

    return {
      ...contract,
      user,
    }
  }
}
