import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InmemoryDriversRepository } from '@/repositories/in-memory/in-memory-drivers-repository'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { InMemoryImageRepository } from '@/repositories/in-memory/in-memory-image-repository'
import { InMemoryAnnouncementRepository } from '@/repositories/in-memory/in-memory-announcement-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetSpecificAnnouncementUseCase } from './get-specific-announcement'
import { InMemoryContractsRepository } from '@/repositories/in-memory/in-memory-contracts-repository copy'

let usersRepository: InmemoryUsersRepository
let driverRepository: InmemoryDriversRepository
let vehiclesRepository: InMemoryVehiclesRepository
let imagesRepository: InMemoryImageRepository
let announcementRepository: InMemoryAnnouncementRepository
let contractsRepository: InMemoryContractsRepository
let sut: GetSpecificAnnouncementUseCase

describe('Get Specific Announcement Use Case', () => {
  beforeEach(() => {
    usersRepository = new InmemoryUsersRepository()
    driverRepository = new InmemoryDriversRepository(usersRepository)
    vehiclesRepository = new InMemoryVehiclesRepository()
    imagesRepository = new InMemoryImageRepository()
    announcementRepository = new InMemoryAnnouncementRepository()
    contractsRepository = new InMemoryContractsRepository()

    sut = new GetSpecificAnnouncementUseCase(
      announcementRepository,
      driverRepository,
      vehiclesRepository,
      usersRepository,
      imagesRepository,
      contractsRepository,
    )
  })

  it('should be able to get a specifc annoucement', async () => {
    const createdUser1 = await usersRepository.create({
      name: 'Jonw Doe',
      email: 'jonwdoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const createdDriver1 = await driverRepository.create({
      id: 'driver-1',
      cpf: '12345678900',
      cnh: '12345678900',
      user_id: createdUser1.id,
    })

    const createdVehicle1 = await vehiclesRepository.create({
      mark: 'Toyota',
      plate: '473DGSF',
      model: 'FXX',
      year: '2020',
      total_capacity: 20,
      driver_id: createdDriver1.id,
    })

    const createdAnnouncement = await announcementRepository.create({
      title: 'Vans John Doe',
      stars: 4,
      city: 'San Franciso',
      monthlyAmount: 400,
      driver_id: createdDriver1.id,
      vehicle_id: createdVehicle1.id,
    })

    const { announcement } = await sut.execute(createdAnnouncement.id)

    expect(announcement).toEqual(
      expect.objectContaining({
        monthlyAmount: 400,
      }),
    )
  })
})
