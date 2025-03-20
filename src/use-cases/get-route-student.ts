import { StopsRepository } from '@/repositories/stops-repository'
import { RoutesRepository } from '@/repositories/routes-repository'
import { RoutesStopsRepository } from '@/repositories/routes-stops-repository'
import { Stop } from '@prisma/client'
import { Period } from '@/@types/period'

interface GetRouteStudentUseCaseRequest {
  date: Date
  period: Period
}

interface GetRouteStudentUseCaseResponse {
  stops: Stop[]
}

export class GetRouteStudentUseCase {
  constructor(
    private routesRepository: RoutesRepository,
    private stopsRepository: StopsRepository,
    private routeStopsRepository: RoutesStopsRepository,
  ) {}

  async execute({
    date,
    period,
  }: GetRouteStudentUseCaseRequest): Promise<GetRouteStudentUseCaseResponse> {
    const route = await this.routesRepository.findByDateAndPeriod(date, period)

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
        console.log(`Parada encontrada: ${JSON.stringify(stop)}`)
        return stop
      }),
    ) // Filtra qualquer valor undefined
    const validStops = stops.filter((stop): stop is Stop => stop !== undefined)

    return {
      stops: validStops,
    }
  }
}
