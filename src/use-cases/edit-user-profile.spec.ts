import { beforeEach, describe, expect, it } from 'vitest'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { EditUserProfileUseCase } from './edit-user-profile'
import { hash } from 'bcryptjs'

let inMemoryUsersRepository: InmemoryUsersRepository
let sut: EditUserProfileUseCase

describe('Edit User Profile sUse Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InmemoryUsersRepository()
    sut = new EditUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to edit image profile or in the any property', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe.example.com',
      urlPhoto: 'http://image.png',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      urlPhoto: 'http://image2.png',
    })

    expect(user.urlPhoto).toEqual('http://image2.png')
  })
})
