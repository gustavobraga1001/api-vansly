import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createAnnouncement } from './create'
import { getAllAnnouncement } from './listAll'
import { getSpecificAnnouncement } from './specific'
import { uploadImage } from './upload'
import fastifyMultipart from '@fastify/multipart'
import { getImage } from './get-image'
import fastifyStatic from '@fastify/static'
import path from 'path'

export async function announcementRoutes(app: FastifyInstance) {
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads'), // Caminho do diretório de uploads
    prefix: '/uploads/', // Prefixo da URL para acessar as imagens
  })
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // Limite de 10MB
    },
  })
  app.addHook('onRequest', verifyJWT)
  app.post('/announcements', { onRequest: [verifyJWT] }, createAnnouncement)
  app.get('/get-announcements', { onRequest: [verifyJWT] }, getAllAnnouncement)
  app.get(
    '/get-specific-announcement/:announcementId',
    { onRequest: [verifyJWT] },
    getSpecificAnnouncement,
  )
  // Rota de upload de imagem com o middleware fastify-multipart
  app.post('/upload', uploadImage)
  app.get('/uploads/:filename', getImage)
}
