import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'
import { GetContractUseCase } from '../get-contract'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { PrismaAnnouncementRepository } from '@/repositories/prisma/prisma-announcement-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeGetContractUseCase() {
  const contractsRepository = new PrismaContractsRepository()
  const driversRepository = new PrismaDriversRepository()
  const announcementRepository = new PrismaAnnouncementRepository()
  const usersRepository = new PrismaUsersRepository()
  const getContractUseCase = new GetContractUseCase(
    contractsRepository,
    driversRepository,
    announcementRepository,
    usersRepository,
  )

  return getContractUseCase
}
