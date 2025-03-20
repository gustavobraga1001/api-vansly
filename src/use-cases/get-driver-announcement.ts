import { AnnouncementRepository } from '@/repositories/announcement-repository'
import { ImageRepository } from '@/repositories/image-repository'
import { Decimal } from '@prisma/client/runtime/library'

export class GetDriverAnnouncementUseCase {
  constructor(
    private announcementRepository: AnnouncementRepository,
    private imageRepository: ImageRepository,
  ) {}

  async execute(driverId: string) {
    const announcement =
      await this.announcementRepository.findByDriverId(driverId)

    if (!announcement) {
      throw new Error('Announcement not found')
    }

    const images = await this.imageRepository.findByAnnouncementId(
      announcement.id,
    )

    return {
      announcement: {
        id: announcement.id,
        title: announcement.title,
        city: announcement.city,
        monthlyAmount: (announcement.monthlyAmount as Decimal).toNumber(), // Converter Decimal para number
        images: images?.map((image) => image.url) || null,
      },
    }
  }
}
