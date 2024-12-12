import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { registerDriver } from './registerDriver'
import { registerVehicle } from './registerVehicle'
import { createRoute } from './createRoute'

export async function driversRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/drivers', registerDriver)
  app.post('/vehicles', registerVehicle)
  app.post('/create-route', createRoute)
}