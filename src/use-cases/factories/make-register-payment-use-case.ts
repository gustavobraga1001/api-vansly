import { PrismaPaymentsRepository } from '@/repositories/prisma/prisma-payments-repository'
import { RegisterPaymentUseCase } from '../register-payment'
import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'

export function makeResgisterPaymentsUseCase() {
  const payementRepository = new PrismaPaymentsRepository()
  const contractRepository = new PrismaContractsRepository()
  const registerPaymenteUseCase = new RegisterPaymentUseCase(
    contractRepository,
    payementRepository,
  )

  return registerPaymenteUseCase
}
