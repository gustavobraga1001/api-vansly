import { makeGetVehicleUseCase } from '@/use-cases/factories/make-get-vehicle-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getVehicle(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { driverId } = request.params as { driverId: string } // Tipagem correta para 'id'

    const getVehicleUseCase = makeGetVehicleUseCase()
    const vehicle = await getVehicleUseCase.execute({
      driverId,
    })
    return reply.status(200).send(vehicle)
  } catch (err) {
    return reply.status(500).send()
  }
}
