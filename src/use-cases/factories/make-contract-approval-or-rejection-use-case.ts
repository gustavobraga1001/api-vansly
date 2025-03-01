import { PrismaContractsRepository } from '@/repositories/prisma/prisma-contratcs-repository'
import { ContractApprovalorRejectionUseCase } from '../contract-approval-or-rejection'

export function makeContractApprovalorRejectionUseCase() {
  const contractsRepository = new PrismaContractsRepository()
  const contractApprovalorRejectionUseCase =
    new ContractApprovalorRejectionUseCase(contractsRepository)

  return contractApprovalorRejectionUseCase
}
