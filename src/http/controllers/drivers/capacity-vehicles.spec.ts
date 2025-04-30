import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Get Capacity Vehicle (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get capacity vehicle', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const userResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const createdDriver = await prisma.driver.create({
      data: {
        cnh: '123456789',
        cpf: '12345678900',
        user: {
          connect: {
            id: userResponse.body.user.id,
          },
        },
      },
    })

    await prisma.vehicle.create({
      data: {
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'FXX',
        year: '2020',
        total_capacity: 20,
        driver: {
          connect: {
            id: createdDriver.id,
          },
        },
      },
    })

    const response = await request(app.server)
      .get('/capacity-vehicle')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        MANHA: expect.objectContaining({
          remainingCapacity: expect.any(Number),
          occupancyPercentage: expect.any(Number),
        }),
        TARDE: expect.objectContaining({
          remainingCapacity: expect.any(Number),
          occupancyPercentage: expect.any(Number),
        }),
        NOITE: expect.objectContaining({
          remainingCapacity: expect.any(Number),
          occupancyPercentage: expect.any(Number),
        }),
      }),
    )
  })
})
