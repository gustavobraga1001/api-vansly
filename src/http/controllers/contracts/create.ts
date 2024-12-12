import { makeContractUseCase } from '@/use-cases/factories/make-contract-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createContract(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createContractBodySchema = z.object({
    shift: z.string(),
    boarding: z.string(),
    landing: z.string(),
    institution: z.string(),
    monthlyAmount: z.number(),
    status: z.boolean(),
    userId: z.string(),
    driverId: z.string(),
  })

  const {
    shift,
    boarding,
    landing,
    institution,
    monthlyAmount,
    status,
    userId,
    driverId,
  } = createContractBodySchema.parse(request.body)

  const contractUseCase = makeContractUseCase()
  await contractUseCase.execute({
    shift,
    boarding,
    landing,
    institution,
    monthlyAmount,
    status,
    userId,
    driverId,
  })

  return reply.status(201).send()
}