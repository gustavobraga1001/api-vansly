import { UserNotAlredyExistsError } from '@/use-cases/errors/user-not-already-exists'
import { makeVerifyCodeUseCase } from '@/use-cases/factories/make-verify-code-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { isValid, z } from 'zod'

export async function verifyCode(request: FastifyRequest, reply: FastifyReply) {
  const verifyCodeBodySchema = z.object({
    email: z.string().email(),
    code: z.string(),
  })

  const { email, code } = verifyCodeBodySchema.parse(request.body)

  try {
    const verifyCodeUseCase = makeVerifyCodeUseCase()
    const isValid = await verifyCodeUseCase.execute({ email, code })

    return reply.status(200).send(isValid) // 🟢 Agora a variável isValid é retornada corretamente
  } catch (err) {
    if (err instanceof UserNotAlredyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send({ message: 'Erro interno no servidor' })
  }
}
