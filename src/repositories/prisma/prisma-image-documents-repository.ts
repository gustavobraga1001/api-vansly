import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ImageDocumentsRepository } from '../image-documents-repository'

export class PrismaImageDocumentsRepository
  implements ImageDocumentsRepository
{
  async findByDriverId(driverId: string) {
    const images = await prisma.imagesDocument.findMany({
      where: {
        driver_id: driverId,
      },
    })

    return images
  }

  async create(data: Prisma.ImagesDocumentCreateInput) {
    const images = await prisma.imagesDocument.create({
      data,
    })

    return images
  }
}
