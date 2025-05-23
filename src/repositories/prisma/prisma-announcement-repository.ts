import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { AnnouncementRepository } from '../announcement-repository'

export class PrismaAnnouncementRepository implements AnnouncementRepository {
  async findByDriverId(driverId: string) {
    const announcement = await prisma.announcement.findFirst({
      where: {
        driver_id: driverId,
      },
    })

    return announcement
  }

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

  async edit(data: Prisma.AnnouncementUncheckedCreateInput) {
    const announcement = await prisma.announcement.update({
      where: {
        driver_id: data.driver_id,
      },
      data,
    })

    return announcement
  }

  async create(data: Prisma.AnnouncementUncheckedCreateInput) {
    const announcement = await prisma.announcement.create({
      data,
    })

    return announcement
  }
}
