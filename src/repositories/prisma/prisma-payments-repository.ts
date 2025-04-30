import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PayementRepository } from '../payments-repository'

export class PrismaPaymentsRepository implements PayementRepository {
  async findByContractId(contractId: string, mouth: string) {
    const payments = await prisma.payment.findMany({
      where: {
        contract_id: contractId,
        mouth,
      },
    })

    return payments
  }

  async create(data: Prisma.PaymentCreateInput) {
    const payment = await prisma.payment.create({ data })

    return payment
  }

  async delete(paymentId: string) {
    await prisma.payment.delete({
      where: {
        id: paymentId,
      },
    })
  }
}
