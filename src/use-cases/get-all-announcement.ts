import { AnnouncementRepository } from '@/repositories/announcement-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { VehiclesRepository } from '@/repositories/vehicles-repository'
import { Decimal } from '@prisma/client/runtime/library'

interface GetAnnouncementsResponse {
  announcements: {
    id: string
    title: string
    stars: number
    city: string
    monthlyAmount: number
    driver: {
      name: string
    }
    vehicle: {
      model: string
    }
  }[]
}

export class GetAllAnnoucementsUseCase {
  constructor(
    private announcementRepository: AnnouncementRepository,
    private driversRepository: DriversRepository,
    private vehiclesRepository: VehiclesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(): Promise<GetAnnouncementsResponse> {
    const announcements = await this.announcementRepository.findAll()

    // Buscar informações adicionais (motoristas e veículos) para cada anúncio

    if (!announcements) {
      throw new Error('erro')
    }
    const announcementsWithDetails = await Promise.all(
      announcements.map(async (announcement) => {
        const driver = await this.driversRepository.findById(
          announcement.driver_id,
        )
        const vehicle = await this.vehiclesRepository.findById(
          announcement.vehicle_id,
        )

        if (!driver || !vehicle) {
          throw new Error('erro')
        }

        const user = await this.usersRepository.findById(driver?.user_id)

        if (!user) {
          throw new Error('erro')
        }

        return {
          id: announcement.id,
          title: announcement.title,
          stars: (announcement.stars as Decimal).toNumber(), // Converter Decimal para number city: announcement.city, monthlyAmount: (announcement.monthlyAmount as Decimal).toNumber(), // Converter Decimal para number,
          city: announcement.city,
          monthlyAmount: (announcement.monthlyAmount as Decimal).toNumber(), // Converter Decimal para number
          driver: {
            name: user.name,
          },
          vehicle: {
            model: vehicle.model,
          },
        }
      }),
    )

    return { announcements: announcementsWithDetails }
  }
}
