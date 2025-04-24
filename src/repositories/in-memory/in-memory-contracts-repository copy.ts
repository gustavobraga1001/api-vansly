import { Contract, Prisma } from '@prisma/client'
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
      status: 'PENDENTE',
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
}
