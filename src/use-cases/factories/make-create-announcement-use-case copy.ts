import { PrismaAnnouncementRepository } from '@/repositories/prisma/prisma-announcement-repository'
import { CreateAnnouncementUseCase } from '../create-announcement'

export function makeCreateAnnouncementUseCase() {
  const announcementRepository = new PrismaAnnouncementRepository()
  const createAnnouncementUseCase = new CreateAnnouncementUseCase(
    announcementRepository,
  )

  return createAnnouncementUseCase
}
