import { makeCreateRouteUseCase } from '@/use-cases/factories/make-create-route-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createRoute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerDriverBodySchema = z.object({
    date: z
      .string() // A data vem como string
      .refine((val) => !isNaN(new Date(val).getTime()), {
        message: 'Invalid date format', // Se a data não for válida, o erro é retornado
      })
      .transform((val) => new Date(val)), // Converte para objeto Date
    period: z.custom(
      (val) => {
        const validPeriods = ['MANHA', 'TARDE', 'NOITE']
        return validPeriods.includes(val)
      },
      { message: 'Invalid period' },
    ),
  })

  const { date, period } = registerDriverBodySchema.parse(request.body)

  try {
    const createRouteUseCase = makeCreateRouteUseCase()
    const route = await createRouteUseCase.execute({
      userId: request.user.sub,
      date,
      period,
    })
    return reply.status(201).send(route)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(500).send({ message: err.message })
    } else {
      return reply.status(500).send({ message: 'An unknown error occurred' })
    }
  }
}
