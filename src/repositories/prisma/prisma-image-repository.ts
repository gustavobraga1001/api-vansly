import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ImageRepository } from '../image-repository'

export class PrismaUploadImageRepository implements ImageRepository {
  async deleteByAnnouncementId(announcementId: string) {
    await prisma.image.deleteMany({
      where: {
        announcement_id: announcementId,
      },
    })
  }

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

  async edit(data: Prisma.ImageCreateInput) {
    const image = await prisma.image.update({
      where: {
        id: data.id,
      },
      data,
    })

    return image
  }

  async create(data: Prisma.ImageCreateInput) {
    const image = await prisma.image.create({
      data,
    })

    return image
  }
}
