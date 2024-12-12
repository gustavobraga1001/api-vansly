import { Contract, Prisma } from '@prisma/client'

export interface ContractsRepository {
  findActiveContractsByDriverId(userId: string): Promise<Contract[]>
  create(data: Prisma.ContractUncheckedCreateInput): Promise<Contract>
}
