import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InmemoryUsersRepository implements UsersRepository {
  items: User[] = []

  async alterPassword(userId: string, hashedPassword: string) {
    const userIndex = this.items.findIndex((item) => item.id === userId)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.items[userIndex].password_hash = hashedPassword
    return this.items[userIndex]
  }

  async findById(idUser: string) {
    const user = this.items.find((item) => item.id === idUser)
    return user ?? null
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    return user ?? null
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      urlPhoto: data.urlPhoto ?? null,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async edit(userId: string, data: Prisma.UserUpdateInput): Promise<User> {
    const userIndex = this.items.findIndex((item) => item.id === userId)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const current = this.items[userIndex]

    const resolveField = <T>(
      field: T | { set?: T } | undefined,
      fallback: T,
    ): T => {
      if (
        field !== undefined &&
        typeof field === 'object' &&
        field !== null &&
        'set' in field
      ) {
        return field.set !== undefined ? field.set : fallback
      }

      return field !== undefined ? (field as T) : fallback
    }

    const updatedUser: User = {
      ...current,
      name: resolveField(data.name, current.name),
      email: resolveField(data.email, current.email),
      urlPhoto: resolveField(data.urlPhoto, current.urlPhoto),
      password_hash: resolveField(data.password_hash, current.password_hash),
    }

    this.items[userIndex] = updatedUser

    return updatedUser
  }
}
