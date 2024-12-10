import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createAnnouncement } from './create'
import { getAllAnnouncement } from './listAll'

export async function announcementRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/announcements', createAnnouncement)
  app.get('/get-announcements', getAllAnnouncement)
}
