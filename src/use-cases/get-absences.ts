import { AbsenceRepository } from '@/repositories/absence-repository'

interface GetAbsencesResponse {
  absences: {
    id: string
    date_of_absence: Date
    user_id: string
  }[]
}

export class GetAbsencesUseCase {
  constructor(private abscencesRepository: AbsenceRepository) {}

  async execute(userId: string): Promise<GetAbsencesResponse> {
    const absences = await this.abscencesRepository.findByUserId(userId)

    if (!absences) {
      throw new Error('erro')
    }

    // const absencesDays = await Promise.all(
    //   absences.map(async (absence) => {
    //     console.log(absence)
    //     return {
    //       date: absence.date_of_absence,
    //     }
    //   }),
    // )

    return { absences }
  }
}
