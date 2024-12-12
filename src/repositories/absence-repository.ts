import { Absence, Prisma } from '@prisma/client'

export interface AbsenceRepository {
  create(data: Prisma.AbsenceUncheckedCreateInput): Promise<Absence>
  findByUserIdAndDate(userId: string, date: Date): Promise<Absence | null>
}
