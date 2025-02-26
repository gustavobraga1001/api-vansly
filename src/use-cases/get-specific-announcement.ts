import { AnnouncementRepository } from '@/repositories/announcement-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { ImageRepository } from '@/repositories/image-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { VehiclesRepository } from '@/repositories/vehicles-repository'
import { Driver } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

interface GetAnnouncementsResponse {
  announcement: {
    id: string
    title: string
    stars: number
    city: string
    monthlyAmount: number
    images: string[] | null
    driver: Driver & {
      name: string
    }
    vehicle: {
      model: string
    }
  }
}

export class GetSpecificAnnouncementUseCase {
  constructor(
    private announcementRepository: AnnouncementRepository,
    private driversRepository: DriversRepository,
    private vehiclesRepository: VehiclesRepository,
    private usersRepository: UsersRepository,
    private imageRepository: ImageRepository,
  ) {}

  async execute(announcementId: string): Promise<GetAnnouncementsResponse> {
    const announcement =
      await this.announcementRepository.findById(announcementId)

    if (!announcement) {
      throw new Error('Announcement not found')
    }

    // Buscando driver e vehicle em paralelo
    const [driver, vehicle] = await Promise.all([
      this.driversRepository.findById(announcement.driver_id),
      this.vehiclesRepository.findById(announcement.vehicle_id),
    ])

    const images = await this.imageRepository.findByAnnouncementId(
      announcement.id,
    )

    if (!driver || !vehicle) {
      throw new Error('Driver or vehicle not found')
    }

    // Buscando o usuário associado ao driver
    const user = await this.usersRepository.findById(driver.user_id)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      announcement: {
        id: announcement.id,
        title: announcement.title,
        stars: (announcement.stars as Decimal).toNumber(), // Converter Decimal para number
        city: announcement.city,
        monthlyAmount: (announcement.monthlyAmount as Decimal).toNumber(), // Converter Decimal para number
        images: images?.map((image) => image.url) || null,
        driver: {
          ...driver,
          name: user.name,
        },
        vehicle: {
          model: vehicle.model,
        },
      },
    }
  }
}
