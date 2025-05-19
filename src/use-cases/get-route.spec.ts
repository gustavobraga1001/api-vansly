import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InmemoryDriversRepository } from '@/repositories/in-memory/in-memory-drivers-repository'
import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicles-repository'
import { InMemoryAnnouncementRepository } from '@/repositories/in-memory/in-memory-announcement-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryContractsRepository } from '@/repositories/in-memory/in-memory-contracts-repository copy'
import { hash } from 'bcryptjs'
import { InMemoryRouteRepository } from '@/repositories/in-memory/in-memory-route-repository'
import { InMemoryStopRepository } from '@/repositories/in-memory/in-memory-routes-stops-repository'
import { InMemoryRoutesStopsRepository } from '@/repositories/in-memory/in-memory-stop-repository copy'
import { GetRouteUseCase } from './get-route'

let usersRepository: InmemoryUsersRepository
let driverRepository: InmemoryDriversRepository
let vehiclesRepository: InMemoryVehiclesRepository
let announcementRepository: InMemoryAnnouncementRepository
let contractsRepository: InMemoryContractsRepository
let routeRepository: InMemoryRouteRepository
let stopsRepository: InMemoryStopRepository
let routesStopsRepository: InMemoryRoutesStopsRepository
let sut: GetRouteUseCase

describe('Get Route Use Case', () => {
  beforeEach(() => {
    usersRepository = new InmemoryUsersRepository()
    driverRepository = new InmemoryDriversRepository(usersRepository)
    vehiclesRepository = new InMemoryVehiclesRepository()
    announcementRepository = new InMemoryAnnouncementRepository()
    contractsRepository = new InMemoryContractsRepository()
    routeRepository = new InMemoryRouteRepository()
    stopsRepository = new InMemoryStopRepository()
    routesStopsRepository = new InMemoryRoutesStopsRepository()

    sut = new GetRouteUseCase(
      routeRepository,
      stopsRepository,
      routesStopsRepository,
    )
  })

  it('should be able to get a route', async () => {
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

    const createdRoute = await routeRepository.create({
      date: new Date('2023-10-01'),
      period: 'MANHA',
      driver_id: createdDriver1.id,
      vehicle_id: createdVehicle1.id,
    })

    const stop = await stopsRepository.create({
      address: 'St. Times Square, 2200',
      status: false,
      user: {
        connect: {
          id: createdUser2.id,
        },
      },
    })

    await routesStopsRepository.create({
      route_id: createdRoute.id,
      stop_id: stop.id,
    })

    const { stops } = await sut.execute({ id: createdRoute.id })
    expect(stops).toHaveLength(1)
  })
})
