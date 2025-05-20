import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryStopRepository } from '@/repositories/in-memory/in-memory-routes-stops-repository'
import { ConfirmBoardingUseCase } from './confirm-boarding'

let usersRepository: InmemoryUsersRepository
let stopsRepository: InMemoryStopRepository
let sut: ConfirmBoardingUseCase

describe('Confirm Boarding Use Case', () => {
  beforeEach(() => {
    usersRepository = new InmemoryUsersRepository()
    stopsRepository = new InMemoryStopRepository()

    sut = new ConfirmBoardingUseCase(stopsRepository)
  })

  it('should be able to get a route', async () => {
    const createdUser2 = await usersRepository.create({
      name: 'Mark Mule',
      email: 'markmule@gmail.com',
      password_hash: await hash('654321', 6),
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

    await sut.execute({ stopId: stop.id })
    const stopData = await stopsRepository.findByStopId(stop.id)
    expect(stopData).toEqual(
      expect.objectContaining({
        id: stop.id,
        status: true,
      }),
    )
  })
})
