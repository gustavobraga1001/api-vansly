import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ContractsRepository } from '../contratcs-repository'

export class PrismaContractsRepository implements ContractsRepository {
  async create(data: Prisma.ContractUncheckedCreateInput) {
    const contract = await prisma.contract.create({
      data,
    })

    return contract
  }
}
