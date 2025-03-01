import { makeContractApprovalorRejectionUseCase } from '@/use-cases/factories/make-contract-approval-or-rejection-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function contractApprovalorRejection(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const contractApprovalorRejectionBodySchema = z.object({
    contractId: z.string(),
    status: z.enum(['ACEITO', 'PENDENTE', 'NEGADO']),
  })

  const { contractId, status } = contractApprovalorRejectionBodySchema.parse(
    request.body,
  )

  const contractApprovalorRejectionUseCase =
    makeContractApprovalorRejectionUseCase()
  await contractApprovalorRejectionUseCase.execute({
    contractId,
    status,
  })

  return reply.status(204).send()
}
