import { ContractsRepository } from '@/repositories/contratcs-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { PrismaPaymentsRepository } from '@/repositories/prisma/prisma-payments-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { Contract } from '@prisma/client'

interface GetPaymentsByDriverIdUseCaseRequest {
  userId: string
  mouth: string
}

export class GetPaymentsByDriverId {
  constructor(
    private contractsRepository: ContractsRepository,
    private paymentsRepository: PrismaPaymentsRepository,
    private driversRepository: PrismaDriversRepository,
    private usersRepository: PrismaUsersRepository,
  ) {}

  async execute({ userId, mouth }: GetPaymentsByDriverIdUseCaseRequest) {
    const driver = await this.driversRepository.findByUserId(userId)

    if (!driver || !driver.driver) {
      throw new Error('Driver não encontrado')
    }

    const driverId = driver.driver.id

    const contracts =
      await this.contractsRepository.findActiveContractsByDriverId(driverId)

    const payments = await Promise.all(
      contracts.map(async (contract: Contract) => {
        const user = await this.usersRepository.findById(contract.user_id) // Use 'await' aqui
        const payment = await this.paymentsRepository.findByContractId(
          contract.id,
          mouth,
        ) // Use 'await' aqui

        if (!payment) {
          // Verifica se o pagamento existe antes de continuar
          return null
        }

        return {
          name: user?.name, // Certifique-se de que 'user' é válido
          payment,
          monthlyAmount: contract.monthlyAmount,
          venciment: contract.created_at,
        }
      }),
    )

    // Filtra valores nulos antes de retornar
    const validPayments = payments.filter((payment) => payment !== null)

    console.log(validPayments)

    return validPayments
  }
}
