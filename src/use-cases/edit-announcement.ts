import { AnnouncementRepository } from '@/repositories/announcement-repository'
import { ImageRepository } from '@/repositories/image-repository'

interface EditAnnouncementUseCaseRequest {
  title: string
  stars: number
  city: string
  monthlyAmount: number
  imagesUrl: string[]
  driverId: string
  vehicleId: string
}

export class EditAnnouncementUseCase {
  constructor(
    private announcementRepository: AnnouncementRepository,
    private imageRespository: ImageRepository,
  ) {}

  async execute({
    title,
    city,
    stars,
    monthlyAmount,
    imagesUrl,
    driverId,
    vehicleId,
  }: EditAnnouncementUseCaseRequest) {
    const announcement = await this.announcementRepository.edit({
      title,
      city,
      stars,
      monthlyAmount,
      driver_id: driverId,
      vehicle_id: vehicleId,
    })

    await this.imageRespository.deleteByAnnouncementId(announcement.id)

    await Promise.all(
      imagesUrl.map((url: string) =>
        this.imageRespository.create({
          url,
          announcement: {
            connect: { id: announcement.id },
          },
        }),
      ),
    )
  }
}
