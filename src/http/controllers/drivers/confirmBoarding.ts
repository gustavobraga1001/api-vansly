import { makeConfirmeBoardingUseCase } from '@/use-cases/factories/make-confirm-boarding-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function confirmBoarding(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const confirmBoardingBodySchema = z.object({
    stopId: z.string().uuid(),
  })

  const { stopId } = confirmBoardingBodySchema.parse(request.body)

  try {
    const confirmBoardingUseCase = makeConfirmeBoardingUseCase()
    await confirmBoardingUseCase.execute({
      stopId,
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(500).send({ message: err.message })
    } else {
      return reply.status(500).send({ message: 'An unknown error occurred' })
    }
  }

  return reply.status(204).send()
}
