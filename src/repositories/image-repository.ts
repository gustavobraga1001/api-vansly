import { Image, Prisma } from '@prisma/client'

export interface ImageRepository {
  create(data: Prisma.ImageCreateInput): Promise<Image>
  findByAnnouncementId(announcementId: string): Promise<Image[] | null>
}
