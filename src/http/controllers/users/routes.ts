import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { profile } from './profile'
import { refresh } from './refresh'
import { createAbsence } from './absence'
import { getRoute } from './get-route'
import { getAbsences } from './get-absences'
import { logout } from './logout'
import { resetPassword } from './reset-password'
import { verifyCode } from './verify-code'
import { alterPassword } from './alter-password'
import { getRouteStudent } from './get-route-student'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
  app.patch('/forgot-password', resetPassword)
  app.post('/verify-code', verifyCode)
  app.post('/alter-password', alterPassword)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.post('/absence', { onRequest: [verifyJWT] }, createAbsence)
  app.post('/get-absences', { onRequest: [verifyJWT] }, getAbsences)
  app.get('/get-route/:id', { onRequest: [verifyJWT] }, getRoute)
  app.post('/get-route-student', { onRequest: [verifyJWT] }, getRouteStudent)
  app.post('/logout', { onRequest: [verifyJWT] }, logout)
}
