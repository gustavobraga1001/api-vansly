import { beforeEach, describe, expect, it } from 'vitest'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { InmemoryDriversRepository } from '@/repositories/in-memory/in-memory-drivers-repository'
import { InmemoryImageDocumentsRepository } from '@/repositories/in-memory/in-memory-images-documents-repository'
import { hash } from 'bcryptjs'

let inMemoryUsersRepository: InmemoryUsersRepository
let inMemoryDriverRepository: InmemoryDriversRepository
let inMemoryImageDocumentRepository: InmemoryImageDocumentsRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InmemoryUsersRepository()
    inMemoryDriverRepository = new InmemoryDriversRepository(
      inMemoryUsersRepository,
    )
    inMemoryImageDocumentRepository = new InmemoryImageDocumentsRepository()

    sut = new GetUserProfileUseCase(
      inMemoryUsersRepository,
      inMemoryDriverRepository,
      inMemoryImageDocumentRepository,
    )
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'Jonw Doe',
      email: 'jonwdoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('Jonw Doe')
  })

  it('should be able to get driver profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'Jonw Doe',
      email: 'jonwdoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await inMemoryDriverRepository.create({
      cpf: '12345678900',
      cnh: '12345678900',
      user_id: createdUser.id,
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    await expect(user.cnh).toEqual('12345678900')
  })

  it('should be able to get driver docs images', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'Jonw Doe',
      email: 'jonwdoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const createdDriver = await inMemoryDriverRepository.create({
      id: 'driver-1',
      cpf: '12345678900',
      cnh: '12345678900',
      user_id: createdUser.id,
    })

    await inMemoryImageDocumentRepository.create({
      url: 'https://example.png',
      name: 'CNH',
      driver: {
        connect: { id: createdDriver.id },
      },
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    await expect(user.docs_images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: expect.any(String),
        }),
      ]),
    )
  })
})
