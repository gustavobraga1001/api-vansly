import { UsersRepository } from '@/repositories/users-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { UserNotAlredyExistsError } from './errors/user-not-already-exists'
import { ImageDocumentsRepository } from '@/repositories/image-documents-repository'

interface RegisterDriverUseCaseRequest {
  cnh: string
  cpf: string
  images: string[]
  userId: string
}

export class RegisterDriverUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private driversRepository: DriversRepository,
    private imagesDocumentsRepository: ImageDocumentsRepository,
  ) {}

  async execute({ cnh, cpf, images, userId }: RegisterDriverUseCaseRequest) {
    const userFindId = await this.usersRepository.findById(userId)

    if (!userFindId) {
      throw new UserNotAlredyExistsError()
    }

    const driver = await this.driversRepository.create({
      cnh,
      cpf,
      user_id: userId,
    })

    await Promise.all(
      images.map((url: string) =>
        this.imagesDocumentsRepository.create({
          url,
          driver: {
            connect: { id: driver.id },
          },
        }),
      ),
    )

    return { driver }
  }
}
