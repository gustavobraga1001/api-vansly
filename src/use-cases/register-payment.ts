import { ContractsRepository } from '@/repositories/contratcs-repository'
import { PrismaPaymentsRepository } from '@/repositories/prisma/prisma-payments-repository'

interface RegisterPaymentUseCaseRequest {
  contract_id: string
  value: number
  mouth: string
}

export class RegisterPaymentUseCase {
  constructor(
    private contractsRepository: ContractsRepository,
    private paymentsRepository: PrismaPaymentsRepository,
  ) {}

  async execute({ contract_id, mouth, value }: RegisterPaymentUseCaseRequest) {
    const payment = this.paymentsRepository.create({
      contract: { connect: { id: contract_id } },
      value,
      mouth,
      payment_at: new Date(),
    })

    return payment
  }
}
