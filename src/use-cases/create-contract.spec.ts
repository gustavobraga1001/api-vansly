import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InmemoryDriversRepository } from '@/repositories/in-memory/in-memory-drivers-repository'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { InMemoryAnnouncementRepository } from '@/repositories/in-memory/in-memory-announcement-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryContractsRepository } from '@/repositories/in-memory/in-memory-contracts-repository copy'
import { ContractUseCase } from './create-contract'

let usersRepository: InmemoryUsersRepository
let driverRepository: InmemoryDriversRepository
let vehiclesRepository: InMemoryVehiclesRepository
let announcementRepository: InMemoryAnnouncementRepository
let contractsRepository: InMemoryContractsRepository
let sut: ContractUseCase

describe('Get Specific Announcement Use Case', () => {
  beforeEach(() => {
    usersRepository = new InmemoryUsersRepository()
    driverRepository = new InmemoryDriversRepository(usersRepository)
    vehiclesRepository = new InMemoryVehiclesRepository()
    announcementRepository = new InMemoryAnnouncementRepository()
    contractsRepository = new InMemoryContractsRepository()

    sut = new ContractUseCase(contractsRepository)
  })

  it('should be able to create a contract', async () => {
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

    const { contract } = await sut.execute({
      boarding: 'St. Times Square, 2200',
      landing: 'St. Times Square, 2200',
      institution: 'Harvard',
      monthlyAmount: createdAnnouncement.monthlyAmount.toNumber(),
      period: 'MANHA',
      status: 'PENDENTE',
      driverId: createdDriver1.id,
      userId: createdUser2.id,
    })

    expect(contract).toEqual(
      expect.objectContaining({
        driver_id: createdDriver1.id,
        user_id: createdUser2.id,
      }),
    )
  })
})
