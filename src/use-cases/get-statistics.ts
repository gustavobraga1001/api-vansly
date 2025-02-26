import { ContractsRepository } from '@/repositories/contratcs-repository'
import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'

interface GetStatisticsUseCaseRequest {
  userId: string
}

export class GetStatistics {
  constructor(
    private contractsRepository: ContractsRepository,
    private driversRepository: PrismaDriversRepository,
  ) {}

  async execute({ userId }: GetStatisticsUseCaseRequest) {
    const driver = await this.driversRepository.findByUserId(userId)

    if (!driver || !driver.driver) {
      throw new Error('Driver não encontrado')
    }

    const driverId = driver.driver.id

    const contracts =
      await this.contractsRepository.findActiveContractsByDriverId(driverId)

    const amounts: { [key: string]: number } = {
      MANHA: 0,
      TARDE: 0,
      NOITE: 0,
    }

    contracts.forEach((contract) => {
      const period = contract.period.toUpperCase() // Certifique-se de que o período esteja em maiúsculas para evitar erros de comparação
      if (amounts[period as keyof typeof amounts] !== undefined) {
        amounts[period as keyof typeof amounts] +=
          contract.monthlyAmount.toNumber()
      }
    })

    const { MANHA, TARDE, NOITE } = amounts

    console.log('Manhã:', MANHA)
    console.log('Tarde:', TARDE)
    console.log('Noite:', NOITE)

    return amounts
  }
}
