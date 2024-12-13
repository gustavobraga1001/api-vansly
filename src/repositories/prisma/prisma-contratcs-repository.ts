import { prisma } from '@/lib/prisma'
import { Contract, Period, Prisma } from '@prisma/client'
import { ContractsRepository } from '../contratcs-repository'

export class PrismaContractsRepository implements ContractsRepository {
  async findActiveContractsByDriverIdAndPeriod(
    driverId: string,
    period: Period,
  ): Promise<Contract[]> {
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
