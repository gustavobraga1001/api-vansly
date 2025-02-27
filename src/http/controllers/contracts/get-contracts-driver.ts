import { makeGetContractsDriverUseCase } from '@/use-cases/factories/make-get-contracts-driver-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getContractDriver(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getContractsDriverUseCase = makeGetContractsDriverUseCase()
    const contracts = await getContractsDriverUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send(contracts)
  } catch (error) {
    return reply.status(400).send({ message: 'Você não tem contratos ativos' })
  }
}
