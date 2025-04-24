import { Image, Prisma } from '@prisma/client'
import { ImageRepository } from '../image-repository'

export class InMemoryImageRepository implements ImageRepository {
  items: Image[] = []

  async create(data: Prisma.ImageCreateInput) {
    const image: Image = {
      id: 'image-1',
      url: data.url,
      announcement_id: data.announcement?.connect?.id ?? 'announcement-1',
    }

    this.items.push(image)

    return image
  }

  async findByAnnouncementId(announcementId: string) {
    const images = this.items.filter(
      (item) => item.announcement_id === announcementId,
    )
    return images.length > 0 ? images : null
  }

  async deleteByAnnouncementId(announcementId: string): void {}

  async edit(data: Prisma.ImageCreateInput): Promise<Image> {}
}
