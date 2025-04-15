import { PrismaAnnouncementRepository } from '@/repositories/prisma/prisma-announcement-repository'
import { PrismaUploadImageRepository } from '@/repositories/prisma/prisma-image-repository'
import { EditAnnouncementUseCase } from '../edit-announcement'

export function makeEditAnnouncementUseCase() {
  const announcementRepository = new PrismaAnnouncementRepository()
  const imageRespository = new PrismaUploadImageRepository()
  const editAnnouncementUseCase = new EditAnnouncementUseCase(
    announcementRepository,
    imageRespository,
  )

  return editAnnouncementUseCase
}
