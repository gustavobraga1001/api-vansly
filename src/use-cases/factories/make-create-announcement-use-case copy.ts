import { PrismaAnnouncementRepository } from '@/repositories/prisma/prisma-announcement-repository'
import { CreateAnnouncementUseCase } from '../create-announcement'
import { PrismaUploadImageRepository } from '@/repositories/prisma/prisma-image-repository'

export function makeCreateAnnouncementUseCase() {
  const announcementRepository = new PrismaAnnouncementRepository()
  const imageRespository = new PrismaUploadImageRepository()
  const createAnnouncementUseCase = new CreateAnnouncementUseCase(
    announcementRepository,
    imageRespository,
  )

  return createAnnouncementUseCase
}
