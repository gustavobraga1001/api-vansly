import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ImageRepository } from '../image-repository'

export class PrismaUploadImageRepository implements ImageRepository {
  async findByAnnouncementId(announcementId: string) {
    const images = await prisma.image.findMany({
      where: {
        announcement_id: announcementId,
      },
    })

    if (!images) {
      return null
    }
    return images
  }

  async create(data: Prisma.ImageCreateInput) {
    const image = await prisma.image.create({
      data,
    })

    return image
  }
}
