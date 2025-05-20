import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Get Route Driver (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get route', async () => {
    const createdUser1 = await prisma.user.create({
      data: {
        name: 'Jonw Doe',
        email: 'jonwdoe@gmail.com',
        password_hash: await hash('123456', 6),
      },
    })

    const createdDriver1 = await prisma.driver.create({
      data: {
        id: 'driver-1',
        cpf: '12345678900',
        cnh: '12345678900',
        user_id: createdUser1.id,
      },
    })

    const createdVehicle1 = await prisma.vehicle.create({
      data: {
        mark: 'Toyota',
        plate: '473DGSF',
        model: 'FXX',
        year: '2020',
        total_capacity: 20,
        driver_id: createdDriver1.id,
      },
    })

    const createdAnnouncement = await prisma.announcement.create({
      data: {
        title: 'Vans John Doe',
        stars: 4,
        city: 'San Franciso',
        monthlyAmount: 400,
        driver_id: createdDriver1.id,
        vehicle_id: createdVehicle1.id,
      },
    })

    const createdUser2 = await prisma.user.create({
      data: {
        name: 'Mark Mule',
        email: 'markmule@gmail.com',
        password_hash: await hash('654321', 6),
      },
    })

    await prisma.contract.create({
      data: {
        boarding: 'St. Times Square, 2200',
        landing: 'St. Times Square, 2200',
        institution: 'Harvard',
        monthlyAmount: createdAnnouncement.monthlyAmount.toNumber(),
        period: 'MANHA',
        status: 'ACEITO',
        driver_id: createdDriver1.id,
        user_id: createdUser2.id,
      },
    })

    const createdRoute = await prisma.route.create({
      data: {
        date: new Date('2023-10-01'),
        period: 'MANHA',
        driver_id: createdDriver1.id,
        vehicle_id: createdVehicle1.id,
      },
    })

    const stop = await prisma.stop.create({
      data: {
        address: 'St. Times Square, 2200',
        status: false,
        user: {
          connect: {
            id: createdUser2.id,
          },
        },
      },
    })

    await prisma.routeStop.create({
      data: {
        route_id: createdRoute.id,
        stop_id: stop.id,
      },
    })
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .get(`/get-route/${createdRoute.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    console.log(response.body)
    expect(response.body.route.stops).toHaveLength(1)
    expect(response.statusCode).toEqual(200)
  })
})
