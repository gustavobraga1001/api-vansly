import { StopsRepository } from '@/repositories/stops-repository'
import { RoutesRepository } from '@/repositories/routes-repository'
import { RoutesStopsRepository } from '@/repositories/routes-stops-repository'
import { Stop } from '@prisma/client'

interface GetRouteUseCaseRequest {
  id: string
}

interface GetRouteUseCaseResponse {
  stops: Stop[]
}

export class GetRouteUseCase {
  constructor(
    private routesRepository: RoutesRepository,
    private stopsRepository: StopsRepository,
    private routeStopsRepository: RoutesStopsRepository,
  ) {}

  async execute({
    id,
  }: GetRouteUseCaseRequest): Promise<GetRouteUseCaseResponse> {
    const route = await this.routesRepository.findById(id)

    if (!route) {
      throw new Error('Não há uma rota ainda')
    }

    const routeStops = await this.routeStopsRepository.findByRouteId(route.id)

    if (!routeStops) {
      throw new Error('Não há uma rota ainda')
    }

    const stops = await Promise.all(
      routeStops.map(async (routeStop) => {
        const stop = await this.stopsRepository.findByStopId(routeStop.stop_id)
        if (!stop) {
          console.error(
            `Parada não encontrada para stop_id: ${routeStop.stop_id}`,
          )
          throw new Error('Parada não encontrada')
        }
        return stop
      }),
    ) // Filtra qualquer valor undefined
    const validStops = stops.filter((stop): stop is Stop => stop !== undefined)

    return {
      stops: validStops,
    }
  }
}
