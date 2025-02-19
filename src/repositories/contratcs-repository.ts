import { Contract, Period, Prisma } from '@prisma/client'

export interface ContractsRepository {
  findActiveContractsByDriverId(driverId: string): Promise<Contract[]>
  findByUserId(userId: string): Promise<Contract | null>
  findActiveContractsByDriverIdAndPeriod(
    driverId: string,
    period: Period,
  ): Promise<Contract[]>
  create(data: Prisma.ContractUncheckedCreateInput): Promise<Contract>
}
