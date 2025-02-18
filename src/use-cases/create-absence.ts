import { AbsenceRepository } from '@/repositories/absence-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { UserNotAlredyExistsError } from './errors/user-not-already-exists'
import { AbsenceAlreadyExistsError } from './errors/absence-already-exists-error'

interface CreateAbsenceUseCaseRequest {
  dateOfAbsence: Date
  userId: string
}

export class CreateAbsenceUseCase {
  constructor(
    private absenceRepository: AbsenceRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ dateOfAbsence, userId }: CreateAbsenceUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotAlredyExistsError()
    }

    const absenceWithSameDateAndUser =
      await this.absenceRepository.findByUserIdAndDate(userId, dateOfAbsence)

    if (
      absenceWithSameDateAndUser?.date_of_absence.getTime() ===
        dateOfAbsence.getTime() &&
      absenceWithSameDateAndUser.user_id === userId
    ) {
      throw new AbsenceAlreadyExistsError()
    }

    await this.absenceRepository.create({
      date_of_absence: dateOfAbsence,
      user_id: userId,
    })
  }
}
