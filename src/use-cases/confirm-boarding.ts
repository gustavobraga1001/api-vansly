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
      await this.stopsRepository.updateStop(stop)
    }
  }
}
