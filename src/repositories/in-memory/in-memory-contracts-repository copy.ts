import { Contract, Period, Prisma, StageContract } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'
import { ContractsRepository } from '../contratcs-repository'

export class InMemoryContractsRepository implements ContractsRepository {
  items: Contract[] = []

  async create(data: Prisma.ContractUncheckedCreateInput) {
    const contract: Contract = {
      id: randomUUID(),
      period: data.period,
      boarding: data.boarding,
      landing: data.landing || data.boarding,
      institution: data.institution,
      monthlyAmount: new Decimal(data.monthlyAmount.toString()),
      driver_id: data.driver_id,
      user_id: data.user_id,
      status: data.status ?? 'PENDENTE',
      created_at: new Date(),
    }

    this.items.push(contract)

    return contract
  }

  async findActiveContractsByDriverId(driverId: string) {
    const contractsActives = this.items
      .filter((item) => item.driver_id === driverId)
      .filter((item) => item.status === 'ACEITO')

    return contractsActives ?? null
  }

  async alterStatusContract(contractId: string, status: StageContract) {
    const contractIndex = this.items.findIndex((item) => item.id === contractId)

    if (contractIndex === -1) {
      throw new Error('Contract not found')
    }

    this.items[contractIndex].status = status

    return this.items[contractIndex]
  }

  async findActiveContractsByDriverIdAndPeriod(
    driverId: string,
    period: Period,
  ) {
    const contractsByDriverIdAndPeriod = this.items
      .filter((item) => item.driver_id === driverId)
      .filter((item) => item.period === period)

    return contractsByDriverIdAndPeriod ?? null
  }

  async findById(contractId: string) {
    const contract = this.items.find((item) => item.id === contractId)

    return contract ?? null
  }

  async findByUserId(userId: string) {
    const contract = this.items.find((item) => item.user_id === userId)

    return contract ?? null
  }

  async findPendingContractsByDriverId(driverId: string) {
    const contractsPendingByDriverId = this.items
      .filter((item) => item.driver_id === driverId)
      .filter((item) => item.status === 'PENDENTE')

    return contractsPendingByDriverId ?? null
  }
}
