import { Announcement, Prisma } from '@prisma/client'
import { AnnouncementRepository } from '../announcement-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'node:crypto'

export class InMemoryAnnouncementRepository implements AnnouncementRepository {
  items: Announcement[] = []

  async create(data: Prisma.AnnouncementUncheckedCreateInput) {
    const announcement: Announcement = {
      id: randomUUID(),
      title: data.title,
      stars: new Decimal(data.stars.toString()),
      city: data.city,
      monthlyAmount: new Decimal(data.monthlyAmount.toString()),
      driver_id: data.driver_id,
      vehicle_id: data.vehicle_id,
    }

    this.items.push(announcement)

    return announcement
  }

  async findAll() {
    return this.items
  }

  async findById(announcementId: string) {
    const announcement = this.items.find((item) => item.id === announcementId)
    return announcement ?? null
  }

  async findByDriverId(driverId: string) {
    const announcement = this.items.find((item) => item.driver_id === driverId)
    return announcement ?? null
  }

  edit(data: Prisma.AnnouncementUncheckedCreateInput): Promise<Announcement> {
    const index = this.items.findIndex(
      (item) => item.driver_id === data.driver_id,
    )

    if (index === -1) {
      throw new Error('Announcement not found')
    }

    const current = this.items[index]

    const resolveField = <T>(
      field: T | { set?: T } | undefined,
      fallback: T,
    ): T => {
      if (
        field !== undefined &&
        typeof field === 'object' &&
        field !== null &&
        'set' in field
      ) {
        return field.set !== undefined ? field.set : fallback
      }

      return field !== undefined ? (field as T) : fallback
    }

    const updatedAnnouncement: Announcement = {
      ...current,
      title: resolveField(data.title, current.title),
      stars: new Decimal(data.stars.toString()),
      city: resolveField(data.city, current.city),
      monthlyAmount: new Decimal(data.monthlyAmount.toString()),
      driver_id: resolveField(data.driver_id, current.driver_id),
      vehicle_id: resolveField(data.vehicle_id, current.vehicle_id),
    }

    this.items[index] = updatedAnnouncement

    return Promise.resolve(updatedAnnouncement)
  }
}
