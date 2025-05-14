import { UsersRepository } from '@/repositories/users-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { UserNotAlredyExistsError } from './errors/user-not-already-exists'
import { ImageDocumentsRepository } from '@/repositories/image-documents-repository'

interface ImageDocsProps {
  url: string
  name: string
}

interface RegisterDriverUseCaseRequest {
  cnh: string
  cpf: string
  images: ImageDocsProps[]
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

    const userIsDriver = await this.driversRepository.findByUserId(userId)

    if (userIsDriver?.driver) {
      throw new Error('Driver is exists')
    }

    const driver = await this.driversRepository.create({
      cnh,
      cpf,
      user_id: userId,
    })

    await Promise.all(
      images.map((image) =>
        this.imagesDocumentsRepository.create({
          url: image.url,
          name: image.name,
          driver: {
            connect: { id: driver.id },
          },
        }),
      ),
    )

    return { driver }
  }
}
