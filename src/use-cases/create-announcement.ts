import { AnnouncementRepository } from '@/repositories/announcement-repository'

interface CreateAnnouncementUseCaseRequest {
  title: string
  stars: number
  city: string
  monthlyAmount: number
  driverId: string
  vehicleId: string
}

export class CreateAnnouncementUseCase {
  constructor(private announcementRepository: AnnouncementRepository) {}

  async execute({
    title,
    city,
    stars,
    monthlyAmount,
    driverId,
    vehicleId,
  }: CreateAnnouncementUseCaseRequest) {
    await this.announcementRepository.create({
      title,
      city,
      stars,
      monthlyAmount,
      driver_id: driverId,
      vehicle_id: vehicleId,
    })
  }
}
