import { UserNotAlredyExistsError } from '@/use-cases/errors/user-not-already-exists'
import { makeRegisterDriverUseCase } from '@/use-cases/factories/make-register-driver-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerDriver(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerDriverBodySchema = z.object({
    cnh: z.string().min(9).max(9),
    cpf: z.string().min(11).max(11),
    userId: z.string().uuid(),
  })

  const { cnh, cpf, userId } = registerDriverBodySchema.parse(request.body)

  try {
    const registerDriverUseCase = makeRegisterDriverUseCase()
    await registerDriverUseCase.execute({
      cnh,
      cpf,
      userId,
    })
  } catch (err) {
    if (err instanceof UserNotAlredyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}