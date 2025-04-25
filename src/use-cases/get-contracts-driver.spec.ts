import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InmemoryDriversRepository } from '@/repositories/in-memory/in-memory-drivers-repository'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { InMemoryAnnouncementRepository } from '@/repositories/in-memory/in-memory-announcement-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryContractsRepository } from '@/repositories/in-memory/in-memory-contracts-repository copy'
import { GetContractsDriverUseCase } from './get-contracts-driver'

let usersRepository: InmemoryUsersRepository
let driverRepository: InmemoryDriversRepository
let vehiclesRepository: InMemoryVehiclesRepository
let announcementRepository: InMemoryAnnouncementRepository
let contractsRepository: InMemoryContractsRepository
let sut: GetContractsDriverUseCase

describe('Get Contracts Driver Use Case', () => {
  beforeEach(() => {
    usersRepository = new InmemoryUsersRepository()
    driverRepository = new InmemoryDriversRepository(usersRepository)
    vehiclesRepository = new InMemoryVehiclesRepository()
    announcementRepository = new InMemoryAnnouncementRepository()
    contractsRepository = new InMemoryContractsRepository()

    sut = new GetContractsDriverUseCase(contractsRepository, driverRepository)
  })

  it('should be able to get a driver pending contracts', async () => {
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
      email: 'markmule@example.com',
      password_hash: await hash('654321', 6),
    })

    const createdUser3 = await usersRepository.create({
      name: 'Ralph Machio',
      email: 'ralph@example.com',
      password_hash: await hash('656565', 6),
    })

    const createdContract = await contractsRepository.create({
      boarding: '1616 Pine St, San Francisco, CA 94109',
      landing: '1616 Pine St, San Francisco, CA 94109',
      institution: 'San Francisco State University (SFSU)',
      monthlyAmount: createdAnnouncement.monthlyAmount.toNumber(),
      period: 'MANHA',
      status: 'PENDENTE',
      driver_id: createdDriver1.id,
      user_id: createdUser2.id,
    })

    const createdContract2 = await contractsRepository.create({
      boarding: '2745 Mission St, San Francisco, CA 94110',
      landing: '2745 Mission St, San Francisco, CA 94110',
      institution: 'San Francisco State University (SFSU)',
      monthlyAmount: createdAnnouncement.monthlyAmount.toNumber(),
      period: 'TARDE',
      status: 'PENDENTE',
      driver_id: createdDriver1.id,
      user_id: createdUser3.id,
    })

    const { contracts } = await sut.execute({
      userId: createdUser1.id,
      type: 'PENDENTE',
    })

    expect(contracts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: createdUser2.id,
          period: createdContract.period,
          status: 'PENDENTE',
        }),
        expect.objectContaining({
          user_id: createdUser3.id,
          period: createdContract2.period,
          status: 'PENDENTE',
        }),
      ]),
    )
  })
})
