import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ImageDocumentsRepository } from '../image-documents-repository'

export class PrismaImageDocumentsRepository
  implements ImageDocumentsRepository
{
  async create(data: Prisma.ImagesDocumentCreateInput) {
    const images = await prisma.imagesDocument.create({
      data,
    })

    return images
  }
}
