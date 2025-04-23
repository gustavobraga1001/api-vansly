import { ImagesDocument, Prisma } from '@prisma/client'
import { ImageDocumentsRepository } from '../image-documents-repository'

export class InmemoryImageDocumentsRepository
  implements ImageDocumentsRepository
{
  items: ImagesDocument[] = []

  async create(data: Prisma.ImagesDocumentCreateInput) {
    const image = {
      id: 'image-1',
      url: data.url,
      name: data.name,
      created_at: new Date(),
      driver_id:
        (data.driver as Prisma.DriverCreateNestedOneWithoutImagesDocumentInput)
          .connect?.id ?? 'driver-1',
    }

    this.items.push(image as ImagesDocument)

    return image as ImagesDocument
  }

  async findByDriverId(driverId: string) {
    const images = this.items.filter((item) => item.driver_id === driverId)
    return images
  }
}
