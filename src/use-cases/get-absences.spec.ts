import { beforeEach, describe, expect, it } from 'vitest'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryAbsenceRepository } from '@/repositories/in-memory/in-memory-absence-repository'
import { hash } from 'bcryptjs'
import { GetAbsencesUseCase } from './get-absences'

let usersRepository: InmemoryUsersRepository
let absenceRepository: InMemoryAbsenceRepository
let sut: GetAbsencesUseCase

describe('Get Absences Use Case', () => {
  beforeEach(() => {
    usersRepository = new InmemoryUsersRepository()
    absenceRepository = new InMemoryAbsenceRepository()
    sut = new GetAbsencesUseCase(absenceRepository)
  })

  it('should be able a get all absences', async () => {
    const user = await usersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await absenceRepository.create({
      user_id: user.id,
      date_of_absence: new Date('2023-10-01'),
    })

    const { absences } = await sut.execute(user.id)

    expect(absences).toHaveLength(1)
  })
})
