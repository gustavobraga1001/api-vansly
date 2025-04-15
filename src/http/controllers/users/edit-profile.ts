import { makeEditUserUseCase } from '@/use-cases/factories/make-edit-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function editProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    urlPhoto: z.string(),
  })

  const { name, email, urlPhoto } = registerBodySchema.parse(request.body)

  const editUserProfile = makeEditUserUseCase()

  const { user } = await editUserProfile.execute({
    userId: request.user.sub,
    name,
    email,
    urlPhoto,
  })

  return reply.status(201).send({
    user,
  })
}
