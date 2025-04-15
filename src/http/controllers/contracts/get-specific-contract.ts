import { makeGetSpecificContractUseCase } from '@/use-cases/factories/make-get-specific-contract'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getSpecificContract(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { contractId } = request.params as { contractId: string } // Tipagem correta para 'id'

  const getSpecificContractUseCase = makeGetSpecificContractUseCase()
  const contract = await getSpecificContractUseCase.execute(contractId)

  return reply.status(200).send(contract)
}
