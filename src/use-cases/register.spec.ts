import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-mempory-users-repository'
import { UserAlredyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const inMemomyUsersRepository = new InmemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemomyUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const inMemomyUsersRepository = new InmemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemomyUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be ableto register with same email twice', async () => {
    const inMemomyUsersRepository = new InmemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemomyUsersRepository)

    const email = 'jonhdoe@example.com'

    await registerUseCase.execute({
      name: 'Jonh Doe',
      email,
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'Jonh Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlredyExistsError)
  })
})
