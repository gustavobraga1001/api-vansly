import { Absence, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { AbsenceRepository } from '../absence-repository'

export class InMemoryAbsenceRepository implements AbsenceRepository {
  items: Absence[] = []

  async create(data: Prisma.AbsenceUncheckedCreateInput) {
    const absence: Absence = {
      id: randomUUID(),
      date_of_absence: new Date(data.date_of_absence),
      user_id: data.user_id,
    }

    this.items.push(absence)

    return absence
  }

  async findByUserId(userId: string) {
    const absence = this.items.filter((item) => item.user_id === userId)
    return absence ?? null
  }

  asyncfindByUserIdAndDate(userId: string, date: Date) {
    const absence = this.items.find(
      (item) =>
        item.user_id === userId &&
        item.date_of_absence.getTime() === date.getTime(),
    )
    return absence ?? null
  }

  async findByUserIdAndDate(userId: string, date: Date) {
    const absence = this.items.find(
      (item) =>
        item.user_id === userId &&
        item.date_of_absence.getTime() === date.getTime(),
    )
    return absence ?? null
  }
}
