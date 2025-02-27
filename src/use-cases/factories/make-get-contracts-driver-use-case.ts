import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { GetContractsDriverUseCase } from '../get-contracts-driver'

export function makeGetContractsDriverUseCase() {
  const contractsRepository = new PrismaContractsRepository()
  const driversRepository = new PrismaDriversRepository()
  const getContractsDriverUseCase = new GetContractsDriverUseCase(
    contractsRepository,
    driversRepository,
  )

  return getContractsDriverUseCase
}
