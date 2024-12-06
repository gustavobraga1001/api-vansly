import { UsersRepository } from '@/repositories/users-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { UserNotAlredyExistsError } from './errors/user-not-already-exists'

interface RegisterDriverUseCaseRequest {
  cnh: string
  cpf: string
  userId: string
}

export class RegisterDriverUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private driversRepository: DriversRepository,
  ) {}

  async execute({ cnh, cpf, userId }: RegisterDriverUseCaseRequest) {
    const userFindId = await this.usersRepository.findById(userId)

    if (!userFindId) {
      throw new UserNotAlredyExistsError()
    }

    const driver = await this.driversRepository.create({
      cnh,
      cpf,
      user_id: userId,
    })

    return { driver }
  }
}
