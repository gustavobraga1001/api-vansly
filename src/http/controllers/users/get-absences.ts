import { makeGetAbsencesUseCase } from '@/use-cases/factories/make-create-get-absences-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getAbsences(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerDriverBodySchema = z.object({
    userId: z.string(),
  })

  const { userId } = registerDriverBodySchema.parse(request.body)

  try {
    const getAbsences = makeGetAbsencesUseCase()

    const { absences } = await getAbsences.execute(userId)

    return reply.status(200).send({
      absences,
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(500).send({ message: err.message })
    } else {
      return reply.status(500).send({ message: 'An unknown error occurred' })
    }
  }
}
