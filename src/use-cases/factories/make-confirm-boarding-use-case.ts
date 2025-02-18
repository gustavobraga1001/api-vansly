import { ConfirmBoardingUseCase } from '../confirm-boarding'
import { PrismaStopsRepository } from '@/repositories/prisma/prisma-stops-repository'

export function makeConfirmeBoardingUseCase() {
  const stopsRepository = new PrismaStopsRepository()
  const confirmBoardingUseCase = new ConfirmBoardingUseCase(stopsRepository)

  return confirmBoardingUseCase
}
