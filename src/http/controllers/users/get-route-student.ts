import { makeGetRouteStudentUseCase } from '@/use-cases/factories/make-get-route-student-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getRouteStudent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerBodySchema = z.object({
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

    const { date, period } = registerBodySchema.parse(request.body)

    const getRouteStudentUseCase = makeGetRouteStudentUseCase()

    const { stops } = await getRouteStudentUseCase.execute({
      date,
      period,
    })

    return reply.status(200).send({
      route: {
        stops,
      },
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(404).send({ message: err.message })
    } else {
      return reply.status(500).send({ message: 'An unknown error occurred' })
    }
  }
}
