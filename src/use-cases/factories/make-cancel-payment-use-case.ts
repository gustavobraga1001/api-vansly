import { PrismaPaymentsRepository } from '@/repositories/prisma/prisma-payments-repository'
import { CancelPaymentUseCase } from '../cancel-payment'

export function makeCancelPaymentsUseCase() {
  const payementRepository = new PrismaPaymentsRepository()
  const cancelPaymenteUseCase = new CancelPaymentUseCase(payementRepository)

  return cancelPaymenteUseCase
}
