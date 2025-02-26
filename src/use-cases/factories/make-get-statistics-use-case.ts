import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { GetStatistics } from '../get-statistics'

export function makeGetStatisticsUseCase() {
  const contractRepository = new PrismaContractsRepository()
  const driversRepository = new PrismaDriversRepository()
  // eslint-disable-next-line new-cap
  const getStatisticsUseCase = new GetStatistics(
    contractRepository,
    driversRepository,
  )

  return getStatisticsUseCase
}
