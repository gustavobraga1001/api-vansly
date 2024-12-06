import { UsersRepository } from '@/repositories/users-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { User, Driver } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileUseRequest {
  userId: string
}

interface GetUserProfileUseResponse {
  user: {
    id: string
    name: string
    email: string
    password_hash?: string
    created_at: Date
    cnh?: string // Campo opcional para motoristas
    cpf?: string // Campo opcional para motoristas
  }
}

interface DriverWithUser {
  user: User | null
  driver: Driver | null
}

export class GetUserProfileUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private driversRepository: DriversRepository,
  ) {}

  async execute({
    userId,
  }: GetUserProfileUseRequest): Promise<GetUserProfileUseResponse> {
    // Primeiramente, tenta encontrar se o usuário é um motorista
    const driverWithUser: DriverWithUser | null =
      await this.driversRepository.findByUserId(userId)

    if (!driverWithUser || !driverWithUser.user) {
      // Se não for um motorista e o usuário não for encontrado
      const user = await this.usersRepository.findById(userId)

      if (!user) {
        throw new ResourceNotFoundError()
      }

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          password_hash: user.password_hash,
          created_at: user.created_at,
        },
      }
    }

    const { user, driver } = driverWithUser

    if (!driver) {
      // Retorna apenas os dados do usuário se não for motorista
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          password_hash: user.password_hash,
          created_at: user.created_at,
        },
      }
    }

    // Caso seja um motorista, retorna os dados do motorista junto com os dados do usuário
    return {
      user: {
        id: driver.id, // ID de motorista
        name: user.name, // Nome do usuário associado
        email: user.email, // Email do usuário associado
        password_hash: user.password_hash, // Password hash do usuário
        created_at: user.created_at, // Data de criação do usuário
        cnh: driver.cnh, // CNH do motorista
        cpf: driver.cpf, // Renavam do motorista
      },
    }
  }
}
