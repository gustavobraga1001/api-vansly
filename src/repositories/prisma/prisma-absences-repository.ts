import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { AbsenceRepository } from '../absence-repository'

export class PrismaAbsencesRepository implements AbsenceRepository {
  async findByUserIdAndDate(id: string, date_of_absence: Date) {
    const absence = await prisma.absence.findFirst({
      where: {
        user_id: id,
        date_of_absence,
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