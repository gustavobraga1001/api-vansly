import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'
import { GetContractUseCase } from '../get-contract'

export function makeGetContractUseCase() {
  const contractsRepository = new PrismaContractsRepository()
  const getContractUseCase = new GetContractUseCase(contractsRepository)

  return getContractUseCase
}
