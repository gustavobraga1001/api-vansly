import { UserNotAlredyExistsError } from '@/use-cases/errors/user-not-already-exists'
import { makeAlterPasswordUseCase } from '@/use-cases/factories/make-alter-password-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function alterPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const alterPasswordBodySchema = z.object({
    email: z.string().email(),
    newPassword: z.string().min(6),
  })

  const { email, newPassword } = alterPasswordBodySchema.parse(request.body)

  try {
    const alterPasswordUseCase = makeAlterPasswordUseCase()
    await alterPasswordUseCase.execute({
      email,
      newPassword,
    })
  } catch (err) {
    if (err instanceof UserNotAlredyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
