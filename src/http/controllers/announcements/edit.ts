import { makeEditAnnouncementUseCase } from '@/use-cases/factories/make-edit-announcement-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function editAnnouncement(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editAnnouncementBodySchema = z.object({
    title: z.string(),
    stars: z.number(),
    city: z.string(),
    monthlyAmount: z.number(),
    imagesUrl: z.array(z.string()),
    driverId: z.string(),
    vehicleId: z.string(),
  })

  const { title, stars, city, monthlyAmount, imagesUrl, driverId, vehicleId } =
    editAnnouncementBodySchema.parse(request.body)

  const editAnnouncementUseCase = makeEditAnnouncementUseCase()
  await editAnnouncementUseCase.execute({
    title,
    stars,
    city,
    monthlyAmount,
    imagesUrl,
    driverId,
    vehicleId,
  })

  return reply.status(201).send()
}
