import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createAnnouncement } from './create'
import { getAllAnnouncement } from './listAll'
import { getSpecificAnnouncement } from './specific'
import { getDriverAnnouncement } from './driver-announcement'
import { editAnnouncement } from './edit'

export async function announcementRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/announcements', { onRequest: [verifyJWT] }, createAnnouncement)
  app.patch('/edit-announcement', { onRequest: [verifyJWT] }, editAnnouncement)
  app.get('/get-announcements', { onRequest: [verifyJWT] }, getAllAnnouncement)
  app.get(
    '/get-specific-announcement/:announcementId',
    { onRequest: [verifyJWT] },
    getSpecificAnnouncement,
  )
  app.get(
    '/get-announcement-driver/:driverId',
    { onRequest: [verifyJWT] },
    getDriverAnnouncement,
  )
}
