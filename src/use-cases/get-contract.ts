import { AnnouncementRepository } from '@/repositories/announcement-repository'
import { ContractsRepository } from '@/repositories/contratcs-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Contract } from '@prisma/client'

interface GetContractUseCaseRequest {
  userId: string
}

interface GetContractUseCaseResponse {
  contract: Contract | null
  nameDriver: string | null
  title: string | null
}

export class GetContractUseCase {
  constructor(
    private contractsRepository: ContractsRepository,
    private driversRepository: DriversRepository,
    private announcementRepository: AnnouncementRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: GetContractUseCaseRequest): Promise<GetContractUseCaseResponse> {
    const contract = await this.contractsRepository.findByUserId(userId)

    if (!contract) {
      return { contract: null, nameDriver: null, title: null }
    }

    const driver = await this.driversRepository.findById(contract.driver_id)
    const announcement = await this.announcementRepository.findByDriverId(
      contract.driver_id,
    )

    // Verifica se driver existe antes de buscar o usuário
    const user = driver
      ? await this.usersRepository.findById(driver.user_id)
      : null

    return {
      contract,
      nameDriver: user?.name || null, // Retorna apenas o nome do usuário
      title: announcement?.title || null,
    }
  }
}
