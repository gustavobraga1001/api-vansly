import { PrismaAnnouncementRepository } from '@/repositories/prisma/prisma-announcement-repository'
import { PrismaUploadImageRepository } from '@/repositories/prisma/prisma-image-repository'
import { GetDriverAnnouncementUseCase } from '../get-driver-announcement'

export function makeGetDriverAnnouncementUseCase() {
  const announcementRepository = new PrismaAnnouncementRepository()
  const imageRepository = new PrismaUploadImageRepository()
  const getDriverAnnouncementUseCase = new GetDriverAnnouncementUseCase(
    announcementRepository,
    imageRepository,
  )

  return getDriverAnnouncementUseCase
}
