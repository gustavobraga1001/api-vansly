import { beforeEach, describe, expect, it } from 'vitest'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryAbsenceRepository } from '@/repositories/in-memory/in-memory-absence-repository'
import { CreateAbsenceUseCase } from './create-absence'
import { hash } from 'bcryptjs'

let usersRepository: InmemoryUsersRepository
let absenceRepository: InMemoryAbsenceRepository
let sut: CreateAbsenceUseCase

describe('Create Absence Use Case', () => {
  beforeEach(() => {
    usersRepository = new InmemoryUsersRepository()
    absenceRepository = new InMemoryAbsenceRepository()
    sut = new CreateAbsenceUseCase(absenceRepository, usersRepository)
  })

  it('should be able create absence', async () => {
    const user = await usersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await sut.execute({
      userId: user.id,
      dateOfAbsence: new Date('2023-10-01'),
    })

    await expect(absenceRepository.findByUserId(user.id)).resolves.toHaveLength(
      1,
    )
  })
})
