import { UserNotAlredyExistsError } from '@/use-cases/errors/user-not-already-exists'
import { makeResetPasswordUseCase } from '@/use-cases/factories/make-reset-password-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const resetPasswordBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = resetPasswordBodySchema.parse(request.body)

  try {
    const resetPasswordUseCase = makeResetPasswordUseCase()
    await resetPasswordUseCase.execute({
      email,
    })
  } catch (err) {
    if (err instanceof UserNotAlredyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
