import { PrismaPaymentsRepository } from '@/repositories/prisma/prisma-payments-repository'
import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { GetPaymentsByDriverId } from '../get-payments-by-driver'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeGetPaymentsByDriverIdUseCase() {
  const payementRepository = new PrismaPaymentsRepository()
  const contractRepository = new PrismaContractsRepository()
  const driversRepository = new PrismaDriversRepository()
  const usersRepository = new PrismaUsersRepository()
  // eslint-disable-next-line new-cap
  const getPaymentsByDriverIdUseCase = new GetPaymentsByDriverId(
    contractRepository,
    payementRepository,
    driversRepository,
    usersRepository,
  )

  return getPaymentsByDriverIdUseCase
}
