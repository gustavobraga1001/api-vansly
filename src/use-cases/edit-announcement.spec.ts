import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InmemoryDriversRepository } from '@/repositories/in-memory/in-memory-drivers-repository'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { InMemoryImageRepository } from '@/repositories/in-memory/in-memory-image-repository'
import { InMemoryAnnouncementRepository } from '@/repositories/in-memory/in-memory-announcement-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { EditAnnouncementUseCase } from './edit-announcement'

let usersRepository: InmemoryUsersRepository
let driverRepository: InmemoryDriversRepository
let vehiclesRepository: InMemoryVehiclesRepository
let imagesRepository: InMemoryImageRepository
let announcementRepository: InMemoryAnnouncementRepository
let sut: EditAnnouncementUseCase

describe('Edit Announcement Use Case', () => {
  beforeEach(() => {
    usersRepository = new InmemoryUsersRepository()
    driverRepository = new InmemoryDriversRepository(usersRepository)
    vehiclesRepository = new InMemoryVehiclesRepository()
    imagesRepository = new InMemoryImageRepository()
    announcementRepository = new InMemoryAnnouncementRepository()

    sut = new EditAnnouncementUseCase(announcementRepository, imagesRepository)
  })

  it('should be able to get all annoucements', async () => {
    const createdUser = await usersRepository.create({
      name: 'Jonw Doe',
      email: 'jonwdoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const createdDriver = await driverRepository.create({
      id: 'driver-1',
      cpf: '12345678900',
      cnh: '12345678900',
      user_id: createdUser.id,
    })

    const createdVehicle = await vehiclesRepository.create({
      mark: 'Toyota',
      plate: '473DGSF',
      model: 'FXX',
      year: '2020',
      total_capacity: 20,
      driver_id: createdDriver.id,
    })

    const createdAnnouncement = await announcementRepository.create({
      title: 'Vans John Doe',
      stars: 4,
      city: 'San Franciso',
      monthlyAmount: 400,
      driver_id: createdDriver.id,
      vehicle_id: createdVehicle.id,
    })

    await sut.execute({
      city: createdAnnouncement.city,
      stars: 5,
      title: createdAnnouncement.title,
      monthlyAmount: createdAnnouncement.monthlyAmount.toNumber(),
      imagesUrl: [], // ou alguma URL válida de imagem
      driverId: createdDriver.id, // ou use createdAnnouncement.driver_id
      vehicleId: createdVehicle.id, // idem
    })

    const newAnnoucement = await announcementRepository.findById(
      createdAnnouncement.id,
    )

    expect(Number(newAnnoucement?.stars)).toBe(5)
  })
})
