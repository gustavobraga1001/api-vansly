import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { AnnouncementRepository } from '../announcement-repository'

export class PrismaAnnouncementRepository implements AnnouncementRepository {
  async findById(announcementId: string) {
    const announcements = await prisma.announcement.findFirst({
      where: { id: announcementId },
    })

    return announcements
  }

  async findAll() {
    const announcements = await prisma.announcement.findMany()

    return announcements
  }

  async create(data: Prisma.AnnouncementUncheckedCreateInput) {
    const announcement = await prisma.announcement.create({
      data,
    })

    return announcement
  }
}
