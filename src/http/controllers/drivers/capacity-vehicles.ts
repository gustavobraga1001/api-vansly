import { makeGetCapacityVehicleUseCase } from '@/use-cases/factories/make-get-capacity-vehicles-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function capacityVehicle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getcapacityVehicleUseCase = makeGetCapacityVehicleUseCase()
    const capacity = await getcapacityVehicleUseCase.execute({
      userId: request.user.sub,
    })
    return reply.status(200).send(capacity)
  } catch (err) {
    return reply.status(500).send()
  }
}
