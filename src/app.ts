import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { contractRoutes } from './http/controllers/contracts/routes'
import { driversRoutes } from './http/controllers/drivers/routes'
import { announcementRoutes } from './http/controllers/announcements/routes'

export const app = fastify()

// Configuração Completa do CORS
app.register(cors, {
  origin: 'https://vite-vansly.vercel.app', // Permitir todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})

// Configuração do JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '1m',
  },
})

// Configuração de Cookies
app.register(fastifyCookie)

// Rotas
app.register(usersRoutes)
app.register(contractRoutes)
app.register(driversRoutes)
app.register(announcementRoutes)

// Tratamento de erros
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
