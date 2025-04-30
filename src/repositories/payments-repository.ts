import { Prisma, Payment } from '@prisma/client'

export interface PayementRepository {
  create(data: Prisma.PaymentCreateInput): Promise<Payment>
  delete(paymentId: string): void
  findByContractId(contractid: string, mouth: string): Promise<Payment[] | null>
}
