import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterDriverUseCase } from './registerDriver'
import { InmemoryDriversRepository } from '@/repositories/in-memory/in-memory-drivers-repository'
import { InmemoryImageDocumentsRepository } from '@/repositories/in-memory/in-memory-images-documents-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

let inMemoryUsersRepository: InmemoryUsersRepository
let inMemoryDriverRepository: InmemoryDriversRepository
let inMemoryImageDocumentRepository: InmemoryImageDocumentsRepository
let sut: RegisterDriverUseCase

describe('Register Driver Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InmemoryUsersRepository()
    inMemoryDriverRepository = new InmemoryDriversRepository(
      inMemoryUsersRepository,
    )
    inMemoryImageDocumentRepository = new InmemoryImageDocumentsRepository()

    sut = new RegisterDriverUseCase(
      inMemoryUsersRepository,
      inMemoryDriverRepository,
      inMemoryImageDocumentRepository,
    )
  })

  it('should be able to register driver', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'Jonw Doe',
      email: 'jonwdoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { driver } = await sut.execute({
      cpf: '123456789',
      cnh: '12345678900',
      userId: createdUser.id,
      images: [],
    })

    expect(driver.cnh).toEqual(expect.any(String))
  })

  it('should not be able to register driver with same user', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'Jonw Doe',
      email: 'jonwdoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await sut.execute({
      cpf: '12345678900',
      cnh: '12345678900',
      userId: createdUser.id,
      images: [],
    })

    await expect(() =>
      sut.execute({
        cpf: '12345678800',
        cnh: '12345478800',
        userId: createdUser.id,
        images: [],
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
