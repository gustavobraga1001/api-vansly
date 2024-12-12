import { makeCreateRouteUseCase } from '@/use-cases/factories/make-create-route-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createRoute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerDriverBodySchema = z.object({
    driverId: z.string().uuid(),
    date: z
      .string() // A data vem como string
      .refine((val) => !isNaN(new Date(val).getTime()), {
        message: 'Invalid date format', // Se a data não for válida, o erro é retornado
      })
      .transform((val) => new Date(val)), // Converte para objeto Date
  })

  const { driverId, date } = registerDriverBodySchema.parse(request.body)

  try {
    const createRouteUseCase = makeCreateRouteUseCase()
    await createRouteUseCase.execute({
      driverId,
      date,
    })
  } catch (err) {
    return reply.status(500).send()
  }

  return reply.status(201).send()
}
