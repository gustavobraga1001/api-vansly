import { makeGetStatisticsUseCase } from '@/use-cases/factories/make-get-statistics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getStatistics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Chamada do caso de uso
  const getStatisticsUseCase = makeGetStatisticsUseCase()
  const statistics = await getStatisticsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(statistics)
}
