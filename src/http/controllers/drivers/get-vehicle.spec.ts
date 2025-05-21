import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Get Vehicle (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get datas a vehicle', async () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'bruce@gmail.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const response = await request(app.server)
      .get(`/get-vehicle/${createdDriver1.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.vehicle.mark).toEqual(createdVehicle1.mark)
  })
})
