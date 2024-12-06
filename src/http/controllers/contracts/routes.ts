import { FastifyInstance } from 'fastify'
import { createContract } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function contractRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/contracts', createContract)
}
