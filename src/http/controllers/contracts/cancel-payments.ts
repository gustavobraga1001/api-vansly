import { makeCancelPaymentsUseCase } from '@/use-cases/factories/make-cancel-payment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function cancelPayment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cancelPaymenteBodySchema = z.object({
    paymentId: z.string(),
  })

  const { paymentId } = cancelPaymenteBodySchema.parse(request.body)

  const cancelPaymentUseCase = makeCancelPaymentsUseCase()
  await cancelPaymentUseCase.execute({ paymentId })

  return reply.status(204)
}
