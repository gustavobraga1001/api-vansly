import { makeGetSpecificAnnouncementUseCase } from '@/use-cases/factories/make-get-specific-announcement'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getSpecificAnnouncement(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getSpecificAnnouncementUseCase = makeGetSpecificAnnouncementUseCase()
  const announcement = await getSpecificAnnouncementUseCase.execute()

  return reply.status(200).send(announcement)
}
