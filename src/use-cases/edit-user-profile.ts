import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface EditUserUseCaseRequest {
  userId: string
  name: string
  email: string
  urlPhoto: string
}

interface EditUserUseCaseResponse {
  user: User
}

export class EditUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    email,
    urlPhoto,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.edit(userId, {
      name,
      email,
      urlPhoto,
    })

    return {
      user,
    }
  }
}
