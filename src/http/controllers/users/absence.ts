import { AbsenceAlreadyExistsError } from '@/use-cases/errors/absence-already-exists-error'
import { UserNotAlredyExistsError } from '@/use-cases/errors/user-not-already-exists'
import { makeCreateAbsenceUseCase } from '@/use-cases/factories/make-create-absence-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createAbsence(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createAbsenceBodySchema = z.object({
    dateOfAbsence: z
      .string() // A data vem como string
      .refine((val) => !isNaN(new Date(val).getTime()), {
        message: 'Invalid date format', // Se a data não for válida, o erro é retornado
      })
      .transform((val) => new Date(val)), // Converte para objeto Date
    userId: z.string().uuid(),
  })

  const { dateOfAbsence, userId } = createAbsenceBodySchema.parse(request.body)

  try {
    const createAbsenceUseCase = makeCreateAbsenceUseCase()
    await createAbsenceUseCase.execute({
      dateOfAbsence,
      userId,
    })
  } catch (err) {
    if (err instanceof UserNotAlredyExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof AbsenceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    return reply.status(500).send()
  }

  return reply.status(201).send()
}
