import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Confirm Boarding (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to confirm boarding', async () => {
    const createdUser1 = await prisma.user.create({
      data: {
        name: 'Bruce Wayne',
        email: 'bruce@gmail.com',
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'bruce@gmail.com',
      password: '123456',
    })

    const { token } = authResponse.body

    await request(app.server)
      .post('/create-route')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: new Date('2023-10-01T00:00:00'),
        period: 'MANHA',
      })

    const stop = await prisma.stop.findFirst({
      where: {
        user_id: createdUser2.id,
      },
    })

    const response = await request(app.server)
      .patch('/confirm-boarding')
      .set('Authorization', `Bearer ${token}`)
      .send({
        stopId: stop?.id,
      })
    expect(response.statusCode).toEqual(204)
  })
})
