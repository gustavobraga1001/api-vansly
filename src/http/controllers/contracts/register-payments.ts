import { makeResgisterPaymentsUseCase } from '@/use-cases/factories/make-register-payment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPayment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPaymenteBodySchema = z.object({
    contractId: z.string(),
    value: z.number(),
    mouth: z.string(),
  })

  const { contractId, mouth, value } = registerPaymenteBodySchema.parse(
    request.body,
  )

  const registerPaymenteUseCase = makeResgisterPaymentsUseCase()
  const payment = await registerPaymenteUseCase.execute({
    contract_id: contractId,
    mouth,
    value,
  })

  return reply.status(201).send({ payment })
}
