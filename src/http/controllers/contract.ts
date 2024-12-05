import { makeContractUseCase } from '@/use-cases/factories/make-contract-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createContract(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const contractBodySchema = z.object({
    shift: z.string(),
    boarding: z.string(),
    landing: z.string(),
    monthlyAmount: z.number(),
    status: z.boolean(),
    userId: z.string(),
    driverId: z.string(),
  })

  const { shift, boarding, landing, monthlyAmount, status, userId, driverId } =
    contractBodySchema.parse(request.body)

  try {
    const contractUseCase = makeContractUseCase()
    await contractUseCase.execute({
      shift,
      boarding,
      landing,
      monthlyAmount,
      status,
      userId,
      driverId,
    })
  } catch (err) {
    return reply.status(500).send()
  }

  return reply.status(201).send()
}
