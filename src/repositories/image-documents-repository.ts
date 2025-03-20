import { ImagesDocument, Prisma } from '@prisma/client'

export interface ImageDocumentsRepository {
  create(data: Prisma.ImagesDocumentCreateInput): Promise<ImagesDocument>
  findByDriverId(driverId: string): Promise<ImagesDocument[]>
}
