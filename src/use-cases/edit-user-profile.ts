import { UsersRepository } from '@/repositories/users-repository'

export class EditUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId, name, email, urlPhoto }) {
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
