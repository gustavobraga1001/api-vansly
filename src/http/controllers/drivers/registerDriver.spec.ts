import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Register Driver (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a driver', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const userResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    console.log(userResponse.body.user.id)

    const response = await request(app.server)
      .post('/drivers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        cnh: '123456789',
        cpf: '12345678900',
        userId: userResponse.body.user.id,
        images: [],
      })

    expect(response.statusCode).toEqual(201)
  })
})
