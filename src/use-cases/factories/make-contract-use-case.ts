import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'
import { ContractUseCase } from '../contract'

export function makeContractUseCase() {
  const contractsRepository = new PrismaContractsRepository()
  const contractUseCase = new ContractUseCase(contractsRepository)

  return contractUseCase
}
