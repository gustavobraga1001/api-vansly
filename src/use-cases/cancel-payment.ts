import { PrismaPaymentsRepository } from '@/repositories/prisma/prisma-payments-repository'

interface CancelPaymentUseCaseRequest {
  paymentId: string
}

export class CancelPaymentUseCase {
  constructor(private paymentsRepository: PrismaPaymentsRepository) {}

  async execute({ paymentId }: CancelPaymentUseCaseRequest) {
    await this.paymentsRepository.delete(paymentId)
  }
}
