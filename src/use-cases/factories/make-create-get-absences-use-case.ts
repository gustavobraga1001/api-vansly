import { PrismaAbsencesRepository } from '@/repositories/prisma/prisma-absences-repository'
import { GetAbsencesUseCase } from '../get-absences'

export function makeGetAbsencesUseCase() {
  const absencesRepository = new PrismaAbsencesRepository()
  const getAbsencesUseCase = new GetAbsencesUseCase(absencesRepository)

  return getAbsencesUseCase
}
