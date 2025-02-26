import { AnnouncementRepository } from '@/repositories/announcement-repository'
import { ImageRepository } from '@/repositories/image-repository'

interface CreateAnnouncementUseCaseRequest {
  title: string
  stars: number
  city: string
  monthlyAmount: number
  imagesUrl: string[]
  driverId: string
  vehicleId: string
}

export class CreateAnnouncementUseCase {
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
  }: CreateAnnouncementUseCaseRequest) {
    const announcement = await this.announcementRepository.create({
      title,
      city,
      stars,
      monthlyAmount,
      driver_id: driverId,
      vehicle_id: vehicleId,
    })

    await Promise.all(
      imagesUrl.map((url: string) =>
        this.imageRespository.create({
          url,
          announcement: {
            connect: { id: announcement.id }, // 🔥 Conectando ao anúncio existente pelo ID
          },
        }),
      ),
    )
  }
}
