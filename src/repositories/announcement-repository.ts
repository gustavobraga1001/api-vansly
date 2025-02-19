import { Announcement, Prisma } from '@prisma/client'

export interface AnnouncementRepository {
  create(data: Prisma.AnnouncementUncheckedCreateInput): Promise<Announcement>
  findAll(): Promise<Announcement[] | null>
  findById(announcementId: string): Promise<Announcement | null>
  findByDriverId(driverId: string): Promise<Announcement | null>
}
