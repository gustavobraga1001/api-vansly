import { prisma } from '@/lib/prisma'
import { Period, Prisma, StageContract } from '@prisma/client'
import { ContractsRepository } from '../contratcs-repository'

export class PrismaContractsRepository implements ContractsRepository {
  async findById(contractId: string) {
    const contract = await prisma.contract.findUnique({
      where: {
        id: contractId,
      },
    })

    return contract
  }

  async alterStatusContract(contractId: string, status: StageContract) {
    const contract = await this.findById(contractId)

    if (!contract) {
      throw new Error('Contrato não encontrado')
    }

    await prisma.contract.update({
      where: {
        id: contractId,
      },
      data: {
        status,
      },
    })

    return contract
  }

  async findByUserId(userId: string) {
    const contractsUser = await prisma.contract.findFirst({
      where: {
        user_id: userId,
      },
    })

    return contractsUser
  }

  async findActiveContractsByDriverIdAndPeriod(
    driverId: string,
    period: Period,
  ) {
    const contractsEnablesPeriod = await prisma.contract.findMany({
      where: {
        driver_id: driverId,
        period,
      },
    })

    return contractsEnablesPeriod
  }

  async findActiveContractsByDriverId(driverId: string) {
    const contractsEnables = await prisma.contract.findMany({
      where: {
        driver_id: driverId,
        status: 'ACEITO',
      },
    })

    return contractsEnables
  }

  async findPendingContractsByDriverId(driverId: string) {
    const contractsEnables = await prisma.contract.findMany({
      where: {
        driver_id: driverId,
        status: 'PENDENTE',
      },
    })

    return contractsEnables
  }

  async create(data: Prisma.ContractUncheckedCreateInput) {
    const contract = await prisma.contract.create({
      data,
    })

    return contract
  }
}
