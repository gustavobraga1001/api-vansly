import { Payment, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'
import { PayementRepository } from '../payments-repository'

export class InMemoryPaymentsRepository implements PayementRepository {
  items: Payment[] = []

  async create(data: Prisma.PaymentCreateInput) {
    const payment: Payment = {
      id: randomUUID(),
      mouth: data.mouth,
      value: new Decimal(data.value.toString()),
      payment_at: new Date(),
      contract_id: data.contract.connect?.id ?? 'contract-1',
    }

    this.items.push(payment)

    return payment
  }

  async delete(paymentId: string) {
    const paymentIndex = this.items.findIndex((item) => item.id === paymentId)

    if (paymentIndex === -1) {
      throw new Error('Payment not found')
    }

    this.items.splice(paymentIndex, 1)
  }

  async findByContractId(contractId: string) {
    return this.items.filter((payment) => payment.contract_id === contractId)
  }
}
