import { Contract, Period, Prisma, StageContract } from '@prisma/client'

export interface ContractsRepository {
  findActiveContractsByDriverId(driverId: string): Promise<Contract[]>
  findPendingContractsByDriverId(driverId: string): Promise<Contract[]>
  findByUserId(userId: string): Promise<Contract | null>
  findById(contractId: string): Promise<Contract | null>
  findActiveContractsByDriverIdAndPeriod(
    driverId: string,
    period: Period,
  ): Promise<Contract[]>
  create(data: Prisma.ContractUncheckedCreateInput): Promise<Contract>
  alterStatusContract(
    contractId: string,
    status: StageContract,
  ): Promise<Contract>
}
