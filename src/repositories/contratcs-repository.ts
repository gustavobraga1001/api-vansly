import { Contract, Prisma } from '@prisma/client'

export interface ContractsRepository {
  create(data: Prisma.ContractUncheckedCreateInput): Promise<Contract>
}
