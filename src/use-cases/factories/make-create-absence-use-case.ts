import { PrismaAbsencesRepository } from '@/repositories/prisma/prisma-absences-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateAbsenceUseCase } from '../create-absence'

export function makeCreateAbsenceUseCase() {
  const absencesRepository = new PrismaAbsencesRepository()
  const usersRepository = new PrismaUsersRepository()
  const createAbsenceUseCase = new CreateAbsenceUseCase(
    absencesRepository,
    usersRepository,
  )

  return createAbsenceUseCase
}
