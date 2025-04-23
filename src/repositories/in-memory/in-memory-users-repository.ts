import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InmemoryUsersRepository implements UsersRepository {
  items: User[] = []

  async alterPassword(userId: string, hashedPassword: string) {
    const user = await prisma.user.update({
      where: { id: userId }, // Localiza o usuário pelo ID
      data: { password_hash: hashedPassword }, // Atualiza a senha criptografada
    })

    return user
  }

  async findById(idUser: string) {
    const user = this.items.find((item) => item.id === idUser)
    return user ?? null
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async edit(userId: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      urlPhoto: data.urlPhoto || null,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
