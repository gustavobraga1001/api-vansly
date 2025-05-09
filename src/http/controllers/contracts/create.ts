import { makeContractUseCase } from '@/use-cases/factories/make-contract-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createContract(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createContractBodySchema = z.object({
    period: z.enum(['MANHA', 'TARDE', 'NOITE']),
    boarding: z.string(),
    landing: z.string().optional().default(''),
    institution: z.string(),
    monthlyAmount: z.number(),
    userId: z.string(),
    driverId: z.string(),
  })

  const {
    period,
    boarding,
    landing,
    institution,
    monthlyAmount,
    userId,
    driverId,
  } = createContractBodySchema.parse(request.body)

  const contractUseCase = makeContractUseCase()
  await contractUseCase.execute({
    period,
    boarding,
    landing,
    institution,
    monthlyAmount,
    status: 'PENDENTE',
    userId,
    driverId,
  })

  return reply.status(201).send()
}
