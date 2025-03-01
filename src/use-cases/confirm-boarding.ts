import { StopsRepository } from '@/repositories/stops-repository'

interface ConfirmBoardingUseCaseRequest {
  stopId: string
}

export class ConfirmBoardingUseCase {
  constructor(private stopsRepository: StopsRepository) {}

  async execute({ stopId }: ConfirmBoardingUseCaseRequest) {
    const stop = await this.stopsRepository.findByStopId(stopId)
    if (stop) {
      stop.status = true
      stop.validated_at = new Date(new Date().getTime() - 3 * 60 * 60 * 1000)
      await this.stopsRepository.updateStop(stop)
    }
  }
}
