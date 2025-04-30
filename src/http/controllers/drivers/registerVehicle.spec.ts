import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Register Driver (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a vehicle', async () => {
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

    const response = await request(app.server)
      .post('/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        plate: 'ABC1234',
        mark: 'Toyota',
        model: 'FXX',
        year: '2020',
        totalCapacity: 20,
        driverId: createdDriver.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
