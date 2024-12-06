import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { registerDriver } from './registerDriver'

export async function driversRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/drivers', registerDriver)
}
