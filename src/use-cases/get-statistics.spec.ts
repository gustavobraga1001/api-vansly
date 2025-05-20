import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InmemoryDriversRepository } from '@/repositories/in-memory/in-memory-drivers-repository'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { InMemoryAnnouncementRepository } from '@/repositories/in-memory/in-memory-announcement-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryContractsRepository } from '@/repositories/in-memory/in-memory-contracts-repository copy'
import { GetStatistics } from './get-statistics'

let usersRepository: InmemoryUsersRepository
let driverRepository: InmemoryDriversRepository
let vehiclesRepository: InMemoryVehiclesRepository
let announcementRepository: InMemoryAnnouncementRepository
let contractsRepository: InMemoryContractsRepository
let sut: GetStatistics

describe('Get Statistics Use Case', () => {
  beforeEach(() => {
    usersRepository = new InmemoryUsersRepository()
    driverRepository = new InmemoryDriversRepository(usersRepository)
    vehiclesRepository = new InMemoryVehiclesRepository()
    announcementRepository = new InMemoryAnnouncementRepository()
    contractsRepository = new InMemoryContractsRepository()

    sut = new GetStatistics(contractsRepository, driverRepository)
  })

  it('should be able to get statistics', async () => {
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

    const createdUser2 = await usersRepository.create({
      name: 'Mark Mule',
      email: 'markmule@gmail.com',
      password_hash: await hash('654321', 6),
    })

    const createdUser3 = await usersRepository.create({
      name: 'John Snow',
      email: 'snow@gmail.com',
      password_hash: await hash('453627', 6),
    })

    await contractsRepository.create({
      boarding: 'St. Times Square, 2200',
      landing: 'St. Times Square, 2200',
      institution: 'Harvard',
      monthlyAmount: createdAnnouncement.monthlyAmount.toNumber(),
      period: 'MANHA',
      status: 'ACEITO',
      driver_id: createdDriver1.id,
      user_id: createdUser2.id,
    })

    await contractsRepository.create({
      boarding: 'St. Times Square, 2230',
      landing: 'St. Times Square, 2230',
      institution: 'Harvard',
      monthlyAmount: createdAnnouncement.monthlyAmount.toNumber(),
      period: 'TARDE',
      status: 'ACEITO',
      driver_id: createdDriver1.id,
      user_id: createdUser3.id,
    })

    const amounts = await sut.execute({
      userId: createdUser1.id,
    })

    expect(amounts).toEqual(
      expect.objectContaining({
        MANHA: expect.any(Number),
        TARDE: expect.any(Number),
        NOITE: expect.any(Number),
      }),
    )
  })
})
