import { Image, Prisma } from '@prisma/client'

export interface ImageRepository {
  create(data: Prisma.ImageCreateInput): Promise<Image>
  deleteByAnnouncementId(announcementId: string): void
  edit(data: Prisma.ImageCreateInput): Promise<Image>
  findByAnnouncementId(announcementId: string): Promise<Image[] | null>
}
