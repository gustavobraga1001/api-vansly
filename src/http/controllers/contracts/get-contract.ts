import { makeGetContractUseCase } from '@/use-cases/factories/make-get-contract-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getContract(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Chamada do caso de uso
  const getContractUseCase = makeGetContractUseCase()
  const contract = await getContractUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(contract)
}
