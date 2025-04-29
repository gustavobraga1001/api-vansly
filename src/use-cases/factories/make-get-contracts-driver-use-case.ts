import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { GetContractsDriverUseCase } from '../get-contracts-driver'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeGetContractsDriverUseCase() {
  const contractsRepository = new PrismaContractsRepository()
  const driversRepository = new PrismaDriversRepository()
  const usersRepository = new PrismaUsersRepository()
  const getContractsDriverUseCase = new GetContractsDriverUseCase(
    contractsRepository,
    driversRepository,
    usersRepository,
  )

  return getContractsDriverUseCase
}
