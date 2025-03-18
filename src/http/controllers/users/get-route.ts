import { makeGetRouteUseCase } from '@/use-cases/factories/make-get-route-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getRoute(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as { id: string } // Tipagem correta para 'id'

    const getRouteUseCase = makeGetRouteUseCase()

    const { stops } = await getRouteUseCase.execute({
      id,
    })

    return reply.status(200).send({
      route: {
        stops,
      },
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(404).send({ message: err.message })
    } else {
      return reply.status(500).send({ message: 'An unknown error occurred' })
    }
  }
}
