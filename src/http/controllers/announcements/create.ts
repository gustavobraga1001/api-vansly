import { makeCreateAnnouncementUseCase } from '@/use-cases/factories/make-create-announcement-use-case copy'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createAnnouncement(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createAnnouncementBodySchema = z.object({
    title: z.string(),
    stars: z.number(),
    city: z.string(),
    monthlyAmount: z.number(),
    driverId: z.string(),
    vehicleId: z.string(),
  })

  const { title, stars, city, monthlyAmount, driverId, vehicleId } =
    createAnnouncementBodySchema.parse(request.body)

  const createAnnouncementUseCase = makeCreateAnnouncementUseCase()
  await createAnnouncementUseCase.execute({
    title,
    stars,
    city,
    monthlyAmount,
    driverId,
    vehicleId,
  })

  return reply.status(201).send()
}
