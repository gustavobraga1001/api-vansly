import { Prisma, Payment } from '@prisma/client'

export interface PayementRepository {
  create(data: Prisma.PaymentCreateInput): Promise<Payment>
  findByContractId(contractid: string, mouth: string): Promise<Payment[] | null>
}
