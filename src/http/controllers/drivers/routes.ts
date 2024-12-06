import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { registerDriver } from './registerDriver'
import { registerVehicle } from './registerVehicle'

export async function driversRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/drivers', registerDriver)
  app.post('/vehicles', registerVehicle)
}
