import { makeGetSpecificAnnouncementUseCase } from '@/use-cases/factories/make-get-specific-announcement'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getSpecificAnnouncement(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { announcementId } = request.params as { announcementId: string } // Tipagem correta para 'id'

  const getSpecificAnnouncementUseCase = makeGetSpecificAnnouncementUseCase()
  const announcement =
    await getSpecificAnnouncementUseCase.execute(announcementId)

  return reply.status(200).send(announcement)
}
