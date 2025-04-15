import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { AbsenceRepository } from '../absence-repository'
import { endOfDay, startOfDay } from 'date-fns'

export class PrismaAbsencesRepository implements AbsenceRepository {
  async findByUserId(userId: string) {
    const absences = await prisma.absence.findMany({
      where: {
        user_id: userId,
      },
    })

    return absences
  }

  async findByUserIdAndDate(id: string, date_of_absence: Date) {
    const absence = await prisma.absence.findFirst({
      where: {
        user_id: id,
        date_of_absence: {
          gte: startOfDay(date_of_absence), // Data maior ou igual ao início do dia
          lte: endOfDay(date_of_absence), // Data menor ou igual ao fim do dia
        },
      },
    })

    return absence
  }

  async create(data: Prisma.AbsenceUncheckedCreateInput) {
    const absence = await prisma.absence.create({
      data,
    })

    return absence
  }
}
