import { makeRegisterVehicleUseCase } from '@/use-cases/factories/make-vehicles-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerVehicle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerVehicleBodySchema = z.object({
    model: z.string(),
    plate: z.string(),
    mark: z.string(),
    year: z.string(),
    totalCapacity: z.number(),
    driverId: z.string().uuid(),
  })

  const { model, plate, mark, year, totalCapacity, driverId } =
    registerVehicleBodySchema.parse(request.body)

  try {
    const registerVehicleUseCase = makeRegisterVehicleUseCase()
    await registerVehicleUseCase.execute({
      model,
      plate,
      mark,
      year,
      totalCapacity,
      driverId,
    })
  } catch (err) {
    return reply.status(500).send()
  }
  return reply.status(201).send()
}
