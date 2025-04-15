import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'
import { GetSpecificContractUseCase } from '../get-specific-contract'

export function makeGetSpecificContractUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const contractsRepository = new PrismaContractsRepository()
  const getSpecificContractUseCase = new GetSpecificContractUseCase(
    usersRepository,
    contractsRepository,
  )

  return getSpecificContractUseCase
}
