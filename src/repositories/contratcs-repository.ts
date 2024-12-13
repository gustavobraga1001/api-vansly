import { Contract, Period, Prisma } from '@prisma/client'

export interface ContractsRepository {
  findActiveContractsByDriverId(driverId: string): Promise<Contract[]>
  findActiveContractsByDriverIdAndPeriod(
    driverId: string,
    period: Period,
  ): Promise<Contract[]>
  create(data: Prisma.ContractUncheckedCreateInput): Promise<Contract>
}
