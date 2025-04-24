import { beforeEach, describe, expect, it } from 'vitest'
import { CreateAnnouncementUseCase } from './create-announcement'
import { InMemoryAnnouncementRepository } from '@/repositories/in-memory/in-memory-announcement-repository'
import { InMemoryImageRepository } from '@/repositories/in-memory/in-memory-image-repository'

let inMemoryAnnoucementRepository: InMemoryAnnouncementRepository
let inMemoryImageRepository: InMemoryImageRepository
let sut: CreateAnnouncementUseCase

describe('Create Announcement Use Case', () => {
  beforeEach(() => {
    inMemoryAnnoucementRepository = new InMemoryAnnouncementRepository()
    inMemoryImageRepository = new InMemoryImageRepository()
    sut = new CreateAnnouncementUseCase(
      inMemoryAnnoucementRepository,
      inMemoryImageRepository,
    )
  })

  it('should be able to create a announcement', async () => {
    const { announcement } = await sut.execute({
      title: 'Vans John Doe',
      stars: 4,
      city: 'San Franciso',
      monthlyAmount: 400,
      imagesUrl: [],
      driverId: 'driver-1',
      vehicleId: 'vehicle-1',
    })

    expect(announcement.id).toEqual(expect.any(String))
  })
})
