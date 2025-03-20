import { makeGetDriverAnnouncementUseCase } from '@/use-cases/factories/make-get-driver-announcement'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getDriverAnnouncement(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { driverId } = request.params as { driverId: string } // Tipagem correta para 'id'

  const getDriverAnnouncementUseCase = makeGetDriverAnnouncementUseCase()
  const announcement = await getDriverAnnouncementUseCase.execute(driverId)

  return reply.status(200).send(announcement)
}
