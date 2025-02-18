import { makeGetAllAnnouncementsUseCase } from '@/use-cases/factories/make-get-specific-announcement'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllAnnouncement(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllAnnouncementsUseCase = makeGetAllAnnouncementsUseCase()
  const announcements = await getAllAnnouncementsUseCase.execute()

  return reply.status(200).send(announcements)
}
