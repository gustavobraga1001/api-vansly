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
    images: z.array(
      z.object({
        url: z.string(), // ✅ Define o nome da propriedade
        name: z.string(), // ✅ Define o nome da propriedade
      }),
    ),
    userId: z.string().uuid(),
  })

  const { cnh, cpf, images, userId } = registerDriverBodySchema.parse(
    request.body,
  )

  try {
    const registerDriverUseCase = makeRegisterDriverUseCase()
    await registerDriverUseCase.execute({
      cnh,
      cpf,
      images,
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
