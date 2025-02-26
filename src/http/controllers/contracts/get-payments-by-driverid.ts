import { makeGetPaymentsByDriverIdUseCase } from '@/use-cases/factories/make-get-payments-by-driverid-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getPaymentsByDriverId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { mouth } = request.params as { mouth: string } // Tipagem correta para 'id'

  // Chamada do caso de uso
  const getPaymentsByDriverIdUseCase = makeGetPaymentsByDriverIdUseCase()
  const payments = await getPaymentsByDriverIdUseCase.execute({
    userId: request.user.sub,
    mouth,
  })

  return reply.status(200).send(payments)
}
